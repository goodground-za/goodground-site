"use client";

import Link from "next/link";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";

import { Icon } from "./Icon";

/**
 * Site header for every inner page: logo pill, centre breadcrumb pill, MENU
 * pill (README 4.5). Light by default; `dark` for the 404.
 *
 * The menu panel is the live one (components/home2026/HomeChrome.tsx): same
 * <dialog> structure and open/close behaviour, restyled with the new tokens.
 * Process and FAQ are added to its links, as the brief asks.
 *
 * Breadcrumb: parent parts are links; the last part is the current page.
 */
export type Crumb = { label: string; href?: string };

const MENU = [
  { n: "01", label: "About", href: "/about" },
  { n: "02", label: "Work", href: "/work" },
  { n: "03", label: "Services", href: "/services" },
  { n: "04", label: "Process", href: "/process" },
  { n: "05", label: "Pricing", href: "/pricing" },
  { n: "06", label: "Insights", href: "/insights" },
  { n: "07", label: "FAQ", href: "/faq" },
  { n: "08", label: "Contact", href: "/contact" },
];

export function SiteHeader({ crumbs, dark = false }: { crumbs?: Crumb[]; dark?: boolean }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("gg-scroll-locked", open);
    return () => document.body.classList.remove("gg-scroll-locked");
  }, [open]);

  const handleClose = useCallback(() => {
    setOpen(false);
    openButtonRef.current?.focus({ preventScroll: true });
  }, []);

  const openMenu = () => {
    dialogRef.current?.showModal();
    setOpen(true);
    closeButtonRef.current?.focus();
  };

  const onMenuLinkClick = () => dialogRef.current?.close();

  return (
    <>
      <header className={dark ? "gg-header gg-header--dark" : "gg-header"} id="top">
        <Link className="gg-header__logo" href="/" aria-label="GoodGround home">
          goodground
        </Link>

        {crumbs && crumbs.length && !dark ? (
          <nav className="gg-header__crumbs" aria-label="Breadcrumb">
            {crumbs.map((crumb, i) => {
              const last = i === crumbs.length - 1;
              return (
                <Fragment key={crumb.label}>
                  {i > 0 ? <span aria-hidden="true">{"  /  "}</span> : null}
                  {crumb.href && !last ? (
                    <Link className="gg-text-link" href={crumb.href}>
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current={last ? "page" : undefined}>{crumb.label}</span>
                  )}
                </Fragment>
              );
            })}
          </nav>
        ) : null}

        <button
          type="button"
          ref={openButtonRef}
          className="gg-header__menu"
          aria-haspopup="dialog"
          aria-controls="gg-site-menu"
          aria-expanded={open}
          onClick={openMenu}
        >
          Menu
          <Icon name="menu" size={18} stroke={2.2} />
        </button>
      </header>

      <dialog ref={dialogRef} className="gg-menu" id="gg-site-menu" aria-labelledby="gg-menu-heading" onClose={handleClose}>
        <div className="gg-menu__top">
          <Link className="gg-header__logo" href="/" onClick={onMenuLinkClick}>
            goodground
          </Link>
          <button
            type="button"
            ref={closeButtonRef}
            className="gg-header__menu"
            aria-label="Close menu"
            onClick={() => dialogRef.current?.close()}
          >
            Close
            <Icon name="x" size={18} stroke={2.2} />
          </button>
        </div>

        <h2 id="gg-menu-heading" className="gg-sr-only">
          Explore GoodGround
        </h2>

        <nav className="gg-menu__nav" aria-label="Main navigation">
          {MENU.map((item) => (
            <Link key={item.n} href={item.href} onClick={onMenuLinkClick}>
              <span className="gg-menu__num">{item.n}</span>
              {item.label}
              <Icon name="arrow-up-right" size={28} stroke={1.8} />
            </Link>
          ))}
        </nav>

        <div className="gg-menu__bottom">
          <a href="mailto:hello@goodground.co.za">hello@goodground.co.za</a>
          <span>George, Garden Route</span>
        </div>
      </dialog>
    </>
  );
}
