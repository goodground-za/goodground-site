"use client";

import { useEffect, useRef, useState } from "react";

import { site } from "@/content/site";
import { REPLY_TIME } from "@/lib/enquiryShared";

import { SocialIcon } from "@/components/SocialIcon";

import { Icon, type IconName } from "../Icon";

const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=George%2C+Western+Cape%2C+South+Africa";

/**
 * Contact 03 · channels. Email can be copied (Clipboard API, falling back to
 * selecting the text); the label becomes "Copied" with a check for 2s and a
 * toast rises for 2.5s (role=status). WhatsApp opens the chat in a new tab.
 * The map is a static card, not a Google Maps embed, so nothing third-party
 * loads with the page; clicking it opens Google Maps for George.
 */
export function Channels() {
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(false);
  const timers = useRef<number[]>([]);
  const emailText = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const list = timers.current;
    return () => list.forEach((t) => window.clearTimeout(t));
  }, []);

  const copy = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(site.email);
      ok = true;
    } catch {
      // Fall back: select the visible address so Ctrl+C works.
      const el = emailText.current;
      if (el) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        try {
          ok = document.execCommand("copy");
        } catch {
          ok = false;
        }
      }
    }
    if (!ok) return;
    setCopied(true);
    setToast(true);
    timers.current.push(window.setTimeout(() => setCopied(false), 2000));
    timers.current.push(window.setTimeout(() => setToast(false), 2500));
  };

  const row = (icon: IconName) => (
    <span className="ct-ch__icon" aria-hidden="true">
      <Icon name={icon} size={22} stroke={2} />
    </span>
  );

  return (
    <>
    <div className="ct-channels" data-reveal="stagger" style={{ "--gg-stagger-step": "80ms" } as React.CSSProperties}>
      <div className="ct-ch">
        {row("mail")}
        <span className="ct-ch__text">
          <small>
            <span className="gg-resp-long">Email</span>
            <span className="gg-resp-short">Email · tap to copy</span>
          </small>
          <strong ref={emailText}>{site.email}</strong>
        </span>
        <button type="button" className="ct-ch__action" onClick={copy}>
          <Icon name={copied ? "check" : "doc"} size={14} stroke={2.2} />
          {copied ? "Copied" : "Copy"}
        </button>
        <button type="button" className="ct-ch__tap" onClick={copy} aria-label="Copy email address" />
      </div>

      <a className="ct-ch" href={site.whatsapp.link} target="_blank" rel="noopener noreferrer">
        {row("chat")}
        <span className="ct-ch__text">
          <small>WhatsApp</small>
          <strong>Message us directly</strong>
        </span>
        <span className="ct-ch__action" aria-hidden="true">
          <Icon name="arrow" size={14} stroke={2.2} />
          Open
        </span>
        <span className="gg-sr-only"> (opens in new tab)</span>
      </a>

      <div className="ct-ch ct-ch--static">
        {row("clock")}
        <span className="ct-ch__text">
          <small>Reply time</small>
          <strong>Within {REPLY_TIME}</strong>
        </span>
      </div>

      <div className="ct-ch ct-ch--pin">
        {row("pin")}
        <span className="ct-ch__text">
          <small>Based in</small>
          <strong>
            {site.address.locality}, {site.address.area}
          </strong>
        </span>
      </div>

      <div className="ct-socials">
        {site.socials.map((social) => (
          <a key={social.platform} href={social.href} target="_blank" rel="noopener noreferrer">
            <SocialIcon platform={social.platform} className="size-[18px]" />
            {social.name}
            <span className="gg-sr-only"> (opens in new tab)</span>
          </a>
        ))}
      </div>

      <a className="ct-map" href={MAPS_URL} target="_blank" rel="noopener noreferrer" data-reveal="fade-up">
        <span className="ct-map__bg" aria-hidden="true" />
        <span className="ct-map__pill">
          <Icon name="pin" size={20} stroke={2} />
          <span>
            <strong>
              {site.address.locality}, {site.address.area}
            </strong>
            <small>{site.address.region} · working with clients across South Africa</small>
          </span>
        </span>
        <span className="gg-sr-only"> Open George in Google Maps (opens in new tab)</span>
      </a>

    </div>

      {/* Outside the staggered column: its reveal rules would override the toast's own fade. */}
      <div className={toast ? "ct-toast is-on" : "ct-toast"} role="status">
        {toast ? (
          <>
            <Icon name="check" size={16} stroke={2.4} />
            Email address copied
          </>
        ) : null}
      </div>
    </>
  );
}
