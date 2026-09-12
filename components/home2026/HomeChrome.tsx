"use client";

import Link from "next/link";

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
 * Closing by any route — Escape, the backdrop, the Close button — returns
 * focus to the control that opened it.
 */
export function HomeChrome() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", open);
    return () => document.body.classList.remove("menu-is-open");
  }, [open]);

  const handleClose = useCallback(() => {
    setOpen(false);
    // Focus goes back to the control that opened the menu, so closing by
    // Escape, backdrop or the Close button all leave the keyboard where it
    // started. On a menu click the component is unmounting into the next page
    // anyway, and that page takes focus from the top.
    openButtonRef.current?.focus({ preventScroll: true });
  }, []);

  const openMenu = () => {
    dialogRef.current?.showModal();
    setOpen(true);
    closeButtonRef.current?.focus();
  };

  // Every menu item is a page link now, so this only has to shut the dialog
  // and let <Link> navigate. (The delivered version also moved focus to an
  // in-page section when a menu anchor was followed; nothing in the menu is an
  // anchor any more, so that path was removed rather than left unreachable.)
  const onMenuLinkClick = () => dialogRef.current?.close();

  /**
   * Every item goes to its own page, not to a section of this one. The labels
   * are the delivered design's; the destinations match content/site.ts's
   * navLinks, so the menu and the shared <Nav /> on every other page cannot
   * drift apart.
   *
   * "Our craft" -> /work is deliberate and matches the note in site.ts: the
   * destination is one concept build plus the studio's own site, and calling
   * it "Work" in a nav promises a client portfolio that isn't there yet.
   */
  const MENU = [
    { n: "01", label: "About", href: "/about" },
    { n: "02", label: "Our craft", href: "/work" },
    { n: "03", label: "Services", href: "/services" },
    { n: "04", label: "Pricing", href: "/pricing" },
    { n: "05", label: "Insights", href: "/insights" },
    { n: "06", label: "Let’s chat", href: "/contact" },
  ];

  return (
    <>
      <header className="site-header" id="top">
        {/* The logo goes home, not to #top. It was an in-page anchor from the
            delivered single-page design; on an inner page that scrolled you to
            the top of the page you were already on. */}
        <Link className="brand-pill" href="/" aria-label="GoodGround home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/home2026/goodground-logo.svg" width={182} height={30} alt="GoodGround" />
        </Link>
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
          <Link className="brand-pill" href="/" onClick={onMenuLinkClick}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/home2026/goodground-logo.svg"
              width={182}
              height={30}
              alt="GoodGround home"
            />
          </Link>
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
            <Link key={item.n} href={item.href} onClick={onMenuLinkClick}>
              <span>{item.n}</span>
              {item.label}
              <span className="menu-arrow" aria-hidden="true">
                ↗︎
              </span>
            </Link>
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
