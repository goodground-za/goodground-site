"use client";

import { useState, type CSSProperties } from "react";

import { Icon } from "../Icon";
import { useMedia } from "../useMedia";
import { includedGroups } from "./data";

/**
 * Launch 04. Three group cards from 1100px (STAGGER GRID 120ms). Below that each
 * group is an accordion row, one open, the first open on load; the header is only
 * a button there.
 */
export function IncludedGroups() {
  const [open, setOpen] = useState(0);
  const phone = useMedia("(max-width: 1099px)");

  return (
    <div className="ln-groups" data-reveal="stagger" style={{ "--gg-stagger-step": "120ms" } as CSSProperties}>
      {includedGroups.map((group, index) => {
        const isOpen = open === index;
        const id = `ln-group-${index}`;
        return (
          <div key={group.title} className={isOpen ? "ln-group is-open" : "ln-group"}>
            <div className="ln-group__top">
              <span className={`ln-group__icon ln-group__icon--${group.chip}`} aria-hidden="true">
                <Icon name={group.icon} size={24} stroke={2} />
              </span>
              <span className="ln-group__n" aria-hidden="true">
                {group.n}
              </span>
            </div>
            <h3 className="ln-group__title">
              <button
                type="button"
                className="ln-group__button"
                aria-expanded={phone ? isOpen : undefined}
                aria-controls={phone ? id : undefined}
                onClick={() => setOpen(isOpen ? -1 : index)}
              >
                <span className="ln-group__n-inline" aria-hidden="true">
                  {group.n}
                </span>
                <span className="ln-group__name">{group.title}</span>
                <span className="ln-group__count">{group.items.length} items</span>
                <Icon name="chev" size={16} stroke={2.2} />
              </button>
            </h3>
            <div id={id} className="ln-group__panel">
              <ul className="ln-group__items">
                {group.items.map((item, i) => (
                  <li key={item.title} style={{ "--i": i } as CSSProperties}>
                    <span className="ln-tick" aria-hidden="true">
                      <Icon name="check" size={11} stroke={3} />
                    </span>
                    <span className="ln-group__text">
                      <strong>{item.title}</strong>
                      <span>{item.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
