"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The homepage’s own header and its full-screen menu.
 *
 * The homepage does NOT use the shared <Nav /> — the delivered design ships
 * this instead, which is why the site chrome moved into app/(site)/layout.tsx.
 *
 * Built on the native <dialog> element, as delivered. showModal() gives the
 * focus trap, the Escape handling and the inert background for free; a
 * hand-rolled overlay would have to reimplement all three and would get at
 * least one of them wrong.
 *
 * The close behaviour is the fiddly part and is ported deliberately:
 *  - closing by any route returns focus to the button that opened it
 *  - EXCEPT when a menu link was followed, where focus moves to the section
 *    instead, so a keyboard user lands where they asked to go rather than back
 *    at the top
 *  - that target gets a temporary tabindex, removed on blur, so the page is not
 *    left with a permanently focusable <section>
 */
export function HomeChrome() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  // Set when a link inside the menu was followed, read once the dialog closes.
  const destination = useRef<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", open);
    return () => document.body.classList.remove("menu-is-open");
  }, [open]);

  const handleClose = useCallback(() => {
    setOpen(false);

    const hash = destination.current;
    destination.current = null;
    if (!hash) {
      openButtonRef.current?.focus({ preventScroll: true });
      return;
    }

    const target = document.querySelector<HTMLElement>(hash);
    if (!target) {
      openButtonRef.current?.focus({ preventScroll: true });
      return;
    }

    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    // Read the flag the hero writes, so a visitor who paused the motion also
    // gets an instant jump rather than a long smooth scroll.
    const paused = document.documentElement.dataset.motion === "paused";
    target.scrollIntoView({ behavior: paused ? "instant" : "smooth" });
    target.addEventListener("blur", () => target.removeAttribute("tabindex"), {
      once: true,
    });
  }, []);

  const openMenu = () => {
    dialogRef.current?.showModal();
    setOpen(true);
    closeButtonRef.current?.focus();
  };

  const onMenuLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const link = event.currentTarget;
    const isSamePageAnchor =
      link.hash && link.origin === location.origin && link.pathname === location.pathname;
    if (isSamePageAnchor) {
      event.preventDefault();
      destination.current = link.hash;
      history.replaceState(null, "", link.hash);
    }
    dialogRef.current?.close();
  };

  const MENU = [
    { n: "01", label: "About", href: "#about" },
    { n: "02", label: "Our craft", href: "#work" },
    { n: "03", label: "Services", href: "#services" },
    { n: "04", label: "Pricing", href: "/pricing" },
    { n: "05", label: "Insights", href: "/insights" },
    { n: "06", label: "Let’s chat", href: "#contact" },
  ];

  return (
    <>
      <header className="site-header" id="top">
        <a className="brand-pill" href="#top" aria-label="GoodGround home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/home2026/goodground-logo.svg" width={182} height={30} alt="GoodGround" />
        </a>
        <span className="header-caption">
          Web development studio
          <br />
          South Africa
        </span>
        <button
          type="button"
          ref={openButtonRef}
          className="menu-toggle"
          aria-haspopup="dialog"
          aria-controls="site-menu"
          aria-expanded={open}
          onClick={openMenu}
        >
          <span>Menu</span>
          <span className="menu-lines" aria-hidden="true" />
        </button>
      </header>

      <dialog
        ref={dialogRef}
        className="site-menu"
        id="site-menu"
        aria-labelledby="menu-heading"
        onClose={handleClose}
      >
        <div className="menu-top">
          <a className="brand-pill" href="#top">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/home2026/goodground-logo.svg"
              width={182}
              height={30}
              alt="GoodGround home"
            />
          </a>
          <button
            type="button"
            ref={closeButtonRef}
            className="menu-toggle"
            aria-label="Close menu"
            onClick={() => dialogRef.current?.close()}
          >
            <span>Close</span>
            <span className="close-icon" aria-hidden="true">
              ×
            </span>
          </button>
        </div>

        <h2 id="menu-heading" className="sr-only">
          Explore GoodGround
        </h2>

        <nav className="menu-nav" aria-label="Main navigation">
          {MENU.map((item) => (
            <a key={item.n} href={item.href} onClick={onMenuLinkClick}>
              <span>{item.n}</span>
              {item.label}
              <span className="menu-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </nav>

        <div className="menu-bottom">
          <a href="mailto:hello@goodground.co.za">hello@goodground.co.za</a>
          <span>George, Garden Route</span>
        </div>
      </dialog>
    </>
  );
}
