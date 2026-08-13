"use client";

import { useEffect, useState } from "react";
import { AnimatedNumber } from "@/components/AnimatedNumber";

/**
 * The /work "proof" panel: this site measuring itself in the visitor's own
 * browser, on their own connection, right now.
 *
 * Everything here is read from the browser's real Performance APIs. Nothing is
 * hard-coded, and nothing is fetched from us, which is the whole point: a
 * visitor can open developer tools and verify every number on the panel.
 *
 * Two things this file has to get right:
 *
 * 1. IT MUST NOT CAUSE LAYOUT SHIFT. A panel that reports CLS and then shifts
 *    the page while populating would be measuring its own damage and lying
 *    about it. Every value slot reserves its final height up front and the
 *    tile count never changes after mount, so going from "measuring" to a
 *    number swaps text inside a fixed box.
 *
 * 2. IT MUST DEGRADE HONESTLY. `largest-contentful-paint` and `layout-shift`
 *    are Chromium-only at time of writing. Rather than invent numbers or show
 *    a broken tile, unsupported metrics are dropped and the ones every browser
 *    does report (Navigation Timing, Resource Timing) carry the panel.
 */

// Google's published Core Web Vitals thresholds for a "good" rating. These are
// the real, documented numbers, not our own invention.
const LCP_GOOD_MS = 2500;
const CLS_GOOD = 0.1;
const TTFB_GOOD_MS = 800;

type Measurement = {
  /** Largest Contentful Paint in ms, or null where the browser doesn't report it. */
  lcpMs: number | null;
  /** Cumulative Layout Shift, or null where the browser doesn't report it. */
  cls: number | null;
  /** Fallback timing every browser reports, used when LCP is unavailable. */
  domReadyMs: number;
  /** Time to First Byte. Navigation Timing, so every browser reports it. */
  ttfbMs: number;
  bytes: number;
};

const supports = (type: string) =>
  typeof PerformanceObserver !== "undefined" &&
  PerformanceObserver.supportedEntryTypes?.includes(type);

function formatSeconds(ms: number) {
  return `${(ms / 1000).toFixed(2)}s`;
}

function formatCls(value: number) {
  return value.toFixed(2);
}

function formatBytes(bytes: number) {
  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(2)}MB`
    : `${Math.round(bytes / 1024)}KB`;
}

export function LiveMetrics() {
  const [result, setResult] = useState<Measurement | null>(null);

  useEffect(() => {
    let lcpMs = 0;
    let cls = 0;
    const observers: PerformanceObserver[] = [];

    // `buffered: true` replays entries recorded before this component mounted,
    // so hydrating late doesn't cost us the measurement.
    if (supports("largest-contentful-paint")) {
      const po = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) lcpMs = Math.max(lcpMs, entry.startTime);
      });
      po.observe({ type: "largest-contentful-paint", buffered: true });
      observers.push(po);
    }

    if (supports("layout-shift")) {
      // CLS is NOT the sum of every shift, which is the obvious-looking and
      // wrong implementation. Google scores the largest "session window": a run
      // of shifts each within 1s of the previous and 5s of the first. Summing
      // everything instead over-reports badly. A browser resize alone produced
      // 0.47 on this page during development while Chrome's own trace said
      // 0.00, which would have had the panel libelling the site it exists to
      // vouch for.
      let sessionValue = 0;
      let sessionFirst = 0;
      let sessionLast = 0;

      const po = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Shifts within 500ms of a user interaction are user-initiated and
          // excluded, matching Google.
          const shift = entry as PerformanceEntry & { value: number; hadRecentInput: boolean };
          if (shift.hadRecentInput) continue;

          const inSameSession =
            sessionValue > 0 &&
            shift.startTime - sessionLast < 1000 &&
            shift.startTime - sessionFirst < 5000;

          if (inSameSession) {
            sessionValue += shift.value;
          } else {
            sessionValue = shift.value;
            sessionFirst = shift.startTime;
          }
          sessionLast = shift.startTime;
          cls = Math.max(cls, sessionValue);
        }
      });
      po.observe({ type: "layout-shift", buffered: true });
      observers.push(po);
    }

    // Let LCP settle and give any late-loading resource a chance to land before
    // taking the snapshot. This delay is also the beat that makes the reveal
    // feel like a measurement rather than a static number.
    const timer = window.setTimeout(() => {
      for (const po of observers) po.disconnect();

      const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];

      const sum = (pick: (r: PerformanceResourceTiming | PerformanceNavigationTiming) => number) =>
        (nav ? pick(nav) : 0) + resources.reduce((total, r) => total + pick(r), 0);

      // transferSize is 0 on a fully cached repeat visit. Falling back to the
      // decoded size keeps the figure meaningful instead of showing "0KB".
      const transferred = sum((r) => r.transferSize || 0);
      const bytes = transferred > 0 ? transferred : sum((r) => r.decodedBodySize || 0);

      setResult({
        lcpMs: lcpMs > 0 ? lcpMs : null,
        cls: supports("layout-shift") ? cls : null,
        domReadyMs: nav ? nav.domContentLoadedEventEnd : 0,
        ttfbMs: nav ? nav.responseStart : 0,
        bytes,
      });
    }, 1200);

    return () => {
      window.clearTimeout(timer);
      for (const po of observers) po.disconnect();
    };
  }, []);

  // Tiles are decided from browser capability, not from the result, so the
  // count is identical before and after measuring. That is what keeps this
  // panel from shifting the page it is grading.
  // Both flags are derived from `result` and NEVER from calling supports()
  // during render. `supports()` is false on the server (no PerformanceObserver)
  // and true in Chrome, so branching on it here rendered three tiles server-side
  // and four after hydration: a React hydration error, and a tile appearing out
  // of nowhere would shift the layout this panel is grading.
  // Since `result` is null on the server AND on the first client render, both
  // passes agree, and the real values only arrive in a later committed update.
  const hasLcp = result ? result.lcpMs !== null : true;
  const hasCls = result ? result.cls !== null : true;

  return (
    <div className="mt-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* When the browser reports LCP this is the real Core Web Vital and
            Google's 2.5s bar applies. When it doesn't (Safari and Firefox at
            time of writing, and any page Chrome loaded in the background), we
            fall back to DOMContentLoaded and MUST drop the Google attribution
            with it: that threshold is defined for LCP specifically, and
            borrowing it for a different metric would be the exact kind of
            not-quite-true number this panel exists to avoid. */}
        <MetricTile
          label="Loaded in"
          hint={hasLcp ? "Largest Contentful Paint" : "Time to content ready"}
          value={result ? (result.lcpMs ?? result.domReadyMs) : null}
          format={formatSeconds}
          fill={result ? 1 - Math.min((result.lcpMs ?? result.domReadyMs) / LCP_GOOD_MS, 1) : 0}
          verdict={
            hasLcp
              ? `Google rates under ${LCP_GOOD_MS / 1000}s as good`
              : "Your browser doesn't report Google's LCP metric"
          }
        />

        {/* Always rendered, never conditional: the tile count has to be identical
            on the server and the client. Where the browser has no layout-shift
            API the tile stays empty and says so, which is more honest than
            quietly dropping the least flattering metric to measure. */}
        <MetricTile
          label="Layout shift"
          hint="How much moved while loading"
          value={result ? result.cls : null}
          format={formatCls}
          fill={hasCls && result ? 1 - Math.min((result.cls ?? 0) / CLS_GOOD, 1) : 0}
          verdict={
            hasCls
              ? `Google rates under ${CLS_GOOD} as good`
              : "Your browser doesn't report this one"
          }
        />

        <MetricTile
          label="Server reply"
          hint="How fast our server answered"
          value={result ? result.ttfbMs : null}
          format={formatSeconds}
          fill={result ? 1 - Math.min(result.ttfbMs / TTFB_GOOD_MS, 1) : 0}
          verdict={`Google rates under ${TTFB_GOOD_MS / 1000}s as good`}
        />

        <MetricTile
          label="Page weight"
          hint="Everything this page downloaded"
          value={result ? result.bytes : null}
          format={formatBytes}
          verdict="Measured on your connection"
        />
      </div>

      {/* aria-live so a screen reader is told the readout finished rather than
          being left on "measuring" forever. */}
      <p aria-live="polite" className="text-ht-purple/70 mt-6 max-w-[62ch] text-[14px] leading-[1.6]">
        {result
          ? "Measured in your browser, on your device, over the last second. Not on ours, and not on a good day in a lab."
          : "Measuring this page in your browser."}
      </p>
    </div>
  );
}

function MetricTile({
  label,
  hint,
  value,
  format,
  fill,
  verdict,
}: {
  label: string;
  hint: string;
  value: number | null;
  format: (value: number) => string;
  /** 0 to 1, fuller is better. Omitted for tiles with no published threshold. */
  fill?: number;
  verdict: string;
}) {
  return (
    <div className="rounded-card ring-ht-pink shadow-[0_14px_0_0_var(--color-ht-pink)] bg-white p-6 ring-2">
      <p className="font-ht-display text-ht-purple text-[13px] font-bold tracking-[0.1em] uppercase">
        {label}
      </p>

      {/* Fixed height: the "measuring" placeholder and the final number occupy
          exactly the same box, so populating it shifts nothing. tabular-nums
          stops the digits jittering while the value counts up. */}
      <div className="flex h-[3.25rem] items-center">
        {value === null ? (
          <span className="font-ht-display text-ht-purple/30 text-[clamp(1.75rem,3.4vw,2.5rem)] font-bold tabular-nums">
            &mdash;
          </span>
        ) : (
          <AnimatedNumber
            value={value}
            format={format}
            duration={0.9}
            className="font-ht-display text-ht-purple text-[clamp(1.75rem,3.4vw,2.5rem)] font-bold tabular-nums"
          />
        )}
      </div>

      {fill === undefined ? (
        // Spacer matching the bar's height so tiles with and without a bar line
        // up, rather than the grid rows staggering.
        <div aria-hidden="true" className="mt-1 h-[6px]" />
      ) : (
        <div aria-hidden="true" className="bg-ht-purple/10 mt-1 h-[6px] overflow-hidden rounded-full">
          <div
            className="bg-ht-orange h-full origin-left rounded-full transition-transform duration-700 ease-out"
            style={{ transform: `scaleX(${Math.max(fill, 0)})` }}
          />
        </div>
      )}

      <p className="text-ht-purple/70 mt-4 text-[13px] leading-[1.5]">{hint}</p>
      <p className="text-ht-purple/70 mt-1 text-[12px] leading-[1.5] italic">{verdict}</p>
    </div>
  );
}
