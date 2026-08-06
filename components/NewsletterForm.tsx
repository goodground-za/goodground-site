"use client";

import { useState } from "react";

/**
 * Copy deck §5. Built, not wired: there is no list to subscribe to yet, and it
 * says so rather than faking a success state.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");

  return (
    <form
      className="mt-6"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      {/* The pitch is a description, not a label: as a <label> it became the
          input's accessible name and screen readers read the whole sentence. */}
      <p id="newsletter-pitch" className="font-ht-body text-[14px] leading-[1.6] text-white/75">
        Practical website and growth advice for South African small businesses. No jargon, no
        spam.
      </p>
      <div className="mt-3 flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@business.co.za"
          aria-describedby="newsletter-pitch newsletter-status"
          disabled
          className="rounded-pill font-ht-body h-10 min-w-0 flex-1 border border-white/25 bg-white/5 px-4 text-[14px] text-white placeholder:text-white/45 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled
          className="rounded-pill bg-ht-orange font-ht-display h-10 shrink-0 px-5 text-[14px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          Join
        </button>
      </div>
      <p id="newsletter-status" className="font-ht-body mt-2 text-[12px] text-white/60">
        We&rsquo;ll open sign-ups when we have something worth sending.
      </p>
    </form>
  );
}
