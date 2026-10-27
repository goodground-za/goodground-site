"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { Answers } from "./logic";

/**
 * Local-first persistence for the brief. Answers live in localStorage (debounced 800ms after the
 * last keystroke, immediately on choices). Nothing here talks to a server: server drafts and the
 * emailed private link wait on the storage decision (open item 8), so the form says "saved on this
 * device" rather than claiming more. Files are not stored at all: clients paste a share link to a
 * Google Drive, Dropbox or OneDrive folder, so nothing they own is kept on a GoodGround server.
 */
export type Persisted = {
  answers: Answers;
  /** Steps whose "Save and continue" ran. */
  done: number[];
  /** Steps that have been opened at least once (a visited step with missing answers is "Attention"). */
  visited: number[];
  step: number;
  started: boolean;
  sent: boolean;
  savedAt: number;
};

const empty: Persisted = { answers: {}, done: [], visited: [], step: 1, started: false, sent: false, savedAt: 0 };
const KEY = "gg-onboarding-v1";

function read(token: string): Persisted {
  try {
    const raw = localStorage.getItem(`${KEY}:${token}`);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<Persisted>;
    return { ...empty, ...parsed, answers: parsed.answers && typeof parsed.answers === "object" ? parsed.answers : {} };
  } catch {
    return empty;
  }
}

function write(token: string, state: Persisted) {
  try {
    localStorage.setItem(`${KEY}:${token}`, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export type SaveStatus = "idle" | "saving" | "saved" | "offline" | "failed";

export function useBrief(token: string) {
  const [state, setState] = useState<Persisted>(empty);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState<SaveStatus>("idle");
  const latest = useRef(state);
  const timer = useRef(0);
  const dirty = useRef(false);

  // Read the saved draft after hydration (localStorage does not exist on the server).
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const saved = read(token);
      latest.current = saved;
      setState(saved);
      setReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [token]);

  const flush = useCallback(() => {
    window.clearTimeout(timer.current);
    if (!dirty.current) return;
    dirty.current = false;
    const next = { ...latest.current, savedAt: Date.now() };
    latest.current = next;
    setStatus(write(token, next) ? (navigator.onLine ? "saved" : "offline") : "failed");
    setState(next);
  }, [token]);

  const update = useCallback(
    (patch: Partial<Persisted> | ((s: Persisted) => Partial<Persisted>), immediate = false) => {
      const partial = typeof patch === "function" ? patch(latest.current) : patch;
      latest.current = { ...latest.current, ...partial };
      dirty.current = true;
      setState(latest.current);
      setStatus("saving");
      window.clearTimeout(timer.current);
      if (immediate) flush();
      else timer.current = window.setTimeout(flush, 800);
    },
    [flush],
  );

  const setAnswer = useCallback(
    (id: string, value: Answers[string], immediate = false) => update((s) => ({ answers: { ...s.answers, [id]: value } }), immediate),
    [update],
  );

  // Save before the tab goes away.
  useEffect(() => {
    const onHide = () => flush();
    window.addEventListener("pagehide", onHide);
    window.addEventListener("beforeunload", onHide);
    return () => {
      window.removeEventListener("pagehide", onHide);
      window.removeEventListener("beforeunload", onHide);
    };
  }, [flush]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return { state, ready, status, update, setAnswer, flush };
}

/** "Saved just now" / "Saved 3 min ago", refreshed by the caller on a timer. */
export function savedLabel(status: SaveStatus, savedAt: number, now: number): string {
  if (status === "saving") return "Saving…";
  if (status === "offline") return "Offline: saved on this device";
  if (status === "failed") return "Couldn’t save on this device";
  if (!savedAt) return "Saves as you go";
  const minutes = Math.floor((now - savedAt) / 60000);
  return minutes < 1 ? "Saved just now" : `Saved ${minutes} min ago`;
}

export const newId = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID().slice(0, 8) : Math.random().toString(36).slice(2, 10));
