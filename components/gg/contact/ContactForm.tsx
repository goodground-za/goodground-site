"use client";

import { useEffect, useRef, useState } from "react";

import { site } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import { EMAIL_RE, REPLY_TIME, TOPICS, pick, firstName, type TopicKey } from "@/lib/enquiryShared";

import { Button, ButtonLink } from "../Button";
import { mailtoFor, postEnquiry } from "../enquiry";
import { Field, TextArea } from "../Field";
import { Icon } from "../Icon";

type Status = "idle" | "submitting" | "success" | "failed";

/**
 * Contact 03 · quick message form. Same field behaviour, spam rules, sending
 * and success/failure as /start-project step 4 (it posts to the same endpoint,
 * formType=contact). Errors show on blur or submit. "A new project" slides a
 * hint card under the topic field; nothing typed is lost if they stay.
 * ?topic=support (or any topic key) preselects the topic.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<TopicKey>("general");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [serverErrors, setServerErrors] = useState<Partial<Record<"fullName" | "email" | "message", string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [copy, setCopy] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
  const loadedAt = useRef(0);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadedAt.current = Date.now();
    const wanted = pick.topic(new URLSearchParams(window.location.search).get("topic"));
    // Preselecting from the URL is one setState after mount, by design.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (wanted) setTopic(wanted);
  }, []);

  const errors = {
    fullName: serverErrors.fullName ?? (touched.fullName || submitted ? (name.trim() ? undefined : "Please add your name.") : undefined),
    email:
      serverErrors.email ??
      (touched.email || submitted
        ? !email.trim()
          ? "We need an email to reply to."
          : EMAIL_RE.test(email.trim())
            ? undefined
            : "Add the rest of your email, for example name@business.co.za"
        : undefined),
    message: serverErrors.message ?? (touched.message || submitted ? (message.trim() ? undefined : "Add a message so we know how to help.") : undefined),
  };

  const send = async () => {
    setSubmitted(true);
    const bad = !name.trim() ? "fullName" : !EMAIL_RE.test(email.trim()) ? "email" : !message.trim() ? "message" : null;
    if (bad) {
      const el = document.getElementById(`ct-${bad}`);
      el?.focus();
      el?.scrollIntoView({ block: "center" });
      return;
    }
    setStatus("submitting");
    const result = await postEnquiry({
      formType: "contact",
      fullName: name,
      email,
      topic,
      message,
      pageUrl: window.location.pathname,
      loadedAt: String(loadedAt.current),
      website: (document.getElementById("ct-website") as HTMLInputElement | null)?.value,
    });
    if (result.status === "success") {
      setSentEmail(email.trim());
      setCopy(result.copy);
      setStatus("success");
      trackEvent("enquiry_sent", { form: "contact", topic });
      return;
    }
    if (result.status === "invalid") {
      setServerErrors(result.errors);
      setStatus("idle");
      return;
    }
    setStatus("failed");
  };

  const reset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setTopic("general");
    setTouched({});
    setSubmitted(false);
    setServerErrors({});
    setStatus("idle");
    loadedAt.current = Date.now();
    requestAnimationFrame(() => document.getElementById("ct-fullName")?.focus());
  };

  const emailLink = mailtoFor(`Message · ${TOPICS[topic]}`, [`Name: ${name}`, `Email: ${email}`, `Topic: ${TOPICS[topic]}`, "", message]);

  if (status === "success") {
    return (
      <div className="ct-done" role="status" ref={root}>
        <span className="ct-done__badge" aria-hidden="true">
          <Icon name="check" size={30} stroke={2.4} />
        </span>
        <h3 tabIndex={-1} ref={(el) => el?.focus({ preventScroll: true })}>
          Thanks{name ? `, ${firstName(name)}` : ""}, your message is in.
        </h3>
        <p>
          {copy ? `We’ve sent a copy to ${sentEmail || "your inbox"} and will` : "We will"} reply within {REPLY_TIME}.
        </p>
        <Button variant="outline" onClick={reset}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      className="ct-form"
      noValidate
      action="/api/enquiry"
      method="post"
      onSubmit={(event) => {
        event.preventDefault();
        void send();
      }}
    >
      <input type="hidden" name="formType" value="contact" />
      <div className="ct-form__row">
        <Field
          label="Your name"
          name="fullName"
          idPrefix="ct"
          placeholder="Full name"
          autoComplete="name"
          required
          value={name}
          error={errors.fullName}
          onChange={(e) => {
            setName(e.target.value);
            setServerErrors((s) => ({ ...s, fullName: undefined }));
          }}
          onBlur={() => setTouched((t) => ({ ...t, fullName: true }))}
        />
        <Field
          label="Email"
          name="email"
          idPrefix="ct"
          type="email"
          placeholder="name@business.co.za"
          autoComplete="email"
          required
          value={email}
          error={errors.email}
          onChange={(e) => {
            setEmail(e.target.value);
            setServerErrors((s) => ({ ...s, email: undefined }));
          }}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
        />
      </div>

      <div className="gg-field">
        <label className="gg-field__label" htmlFor="ct-topic">
          What’s it about?
        </label>
        <div className="ct-select">
          <select
            id="ct-topic"
            name="topic"
            className="gg-field__control"
            value={topic}
            onChange={(e) => setTopic(pick.topic(e.target.value) ?? "general")}
          >
            {(Object.keys(TOPICS) as TopicKey[]).map((key) => (
              <option key={key} value={key}>
                {TOPICS[key]}
              </option>
            ))}
          </select>
          <Icon name="chev" size={18} stroke={2.2} />
        </div>
      </div>

      <div className={topic === "project" ? "ct-hint is-on" : "ct-hint"}>
        <div className="ct-hint__clip">
          <div className="ct-hint__in" inert={topic !== "project"}>
            <p>
              <strong>For projects, the 4-step form gets you a fixed price faster</strong>
              <span>Your message stays here if you’d rather send it this way.</span>
            </p>
            <ButtonLink href="/start-project?ref=contact" variant="coral">
              Start your project
            </ButtonLink>
          </div>
        </div>
      </div>

      <TextArea
        label="Message"
        name="message"
        idPrefix="ct"
        placeholder="How can we help?"
        rows={5}
        required
        value={message}
        error={errors.message}
        onChange={(e) => {
          setMessage(e.target.value);
          setServerErrors((s) => ({ ...s, message: undefined }));
        }}
        onBlur={() => setTouched((t) => ({ ...t, message: true }))}
      />

      <div className="ct-trap" aria-hidden="true">
        <label htmlFor="ct-website">Do not fill this in</label>
        <input id="ct-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "failed" ? (
        <>
          <div className="ct-fail" role="alert">
            <Icon name="alert" size={22} stroke={2} />
            <p>
              <strong>We couldn’t send that just now.</strong>
              <span>Your message is still here. Try again, or email it to us in one tap.</span>
            </p>
          </div>
          <div className="ct-form__buttons">
            <Button type="submit" variant="coral">
              Try again
            </Button>
            <ButtonLink href={emailLink} variant="outline">
              Email my message instead
            </ButtonLink>
          </div>
        </>
      ) : (
        <div className="ct-form__buttons">
          <Button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending…" : "Send message"}
          </Button>
          <p className="ct-form__fine">
            Or email <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
      )}
    </form>
  );
}
