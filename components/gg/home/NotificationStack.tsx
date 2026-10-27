"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { Icon, type IconName } from "../Icon";

type Notice = { icon: IconName; title: string; sub: string; subShort?: string; time: string };

/** Illustrative examples, not real enquiries. The first three are what Figma draws. */
const POOL: Notice[] = [
  { icon: "mail", title: "New enquiry", sub: "Contact form · Garden route", subShort: "Contact form", time: "2m" },
  { icon: "cal", title: "Call booked", sub: "Thursday · 10:00", time: "1h" },
  { icon: "doc", title: "Quote requested", sub: "Kitchen renovation", time: "3h" },
  { icon: "mail", title: "New enquiry", sub: "Contact form · Pretoria", subShort: "Contact form", time: "now" },
  { icon: "cal", title: "Call booked", sub: "Monday · 14:30", time: "now" },
  { icon: "doc", title: "Quote requested", sub: "Bathroom refit", time: "now" },
];

type Item = Notice & { key: number };

const OPACITY = [1, 1, 0.6, 0];

/**
 * Home 02, card 2. Three enquiry notifications. Every 5s a new one slides in at
 * the top, the others move down a slot and the bottom one fades out. Pauses
 * off-screen, while hovered (so it can be read), when the tab is hidden and
 * when motion is off, where it stays a static three.
 */
export function NotificationStack() {
  const [items, setItems] = useState<Item[]>(() => POOL.slice(0, 3).map((n, i) => ({ ...n, key: i })));
  const next = useRef(3);
  const root = useRef<HTMLDivElement>(null);
  const paused = useRef({ visible: false, hover: false });

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      paused.current.visible = entry.isIntersecting;
    });
    observer.observe(el);

    const html = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = window.setInterval(() => {
      const { visible, hover } = paused.current;
      if (!visible || hover || document.hidden || reduce.matches || html.dataset.motion === "off") return;
      const n = next.current++;
      setItems((prev) => [{ ...POOL[n % POOL.length], key: n }, ...prev].slice(0, 4));
    }, 5000);

    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div
      className="hm-notifs"
      ref={root}
      aria-hidden="true"
      onPointerEnter={() => (paused.current.hover = true)}
      onPointerLeave={() => (paused.current.hover = false)}
    >
      {items.map((item, i) => (
        <div
          key={item.key}
          className="hm-notif"
          style={
            {
              "--i": i,
              "--hm-d": `${item.key < 3 ? item.key * 150 : 0}ms`,
              opacity: OPACITY[i],
            } as CSSProperties
          }
        >
          <span className="hm-notif__icon">
            <Icon name={item.icon} size={18} stroke={2} />
          </span>
          <span className="hm-notif__text">
            <strong>{item.title}</strong>
            <span>
              {item.subShort ? (
                <>
                  <span className="gg-resp-short">{item.subShort}</span>
                  <span className="gg-resp-long">{item.sub}</span>
                </>
              ) : (
                item.sub
              )}
            </span>
          </span>
          <span className="hm-notif__time">{item.time}</span>
        </div>
      ))}
    </div>
  );
}
