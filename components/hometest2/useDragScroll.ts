"use client";

import {
  useRef,
  useState,
  type DragEvent as ReactDragEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
  type SyntheticEvent as ReactSyntheticEvent,
} from "react";

/** Past this much pointer travel, the gesture counts as a drag, not a click. */
const DRAG_THRESHOLD_PX = 5;

/**
 * Click-and-drag panning for a horizontal `overflow-x-auto` scroller.
 *
 * Two things this deliberately does not do:
 *
 * - It ignores touch pointers. Touch already pans the scroller natively, with
 *   momentum and rubber-banding the browser does far better than JS can, and
 *   intercepting it only makes it worse.
 * - It swallows the click that would otherwise fire at the end of a drag.
 *   The cards inside these banners are links, so without this, dragging
 *   across one and letting go would navigate away.
 */
export function useDragScroll(
  ref: RefObject<HTMLDivElement | null>,
  { skipWhen }: { skipWhen?: string } = {},
) {
  // `active` is a ref, not the `dragging` state, because it is read inside
  // pointermove. State updates are asynchronous, so the first moves after
  // pointerdown would still see `dragging === false` and be dropped. The
  // state exists purely to drive the cursor/select-none class.
  const [dragging, setDragging] = useState(false);
  const state = useRef({ active: false, captured: false, startX: 0, startScroll: 0, travelled: 0 });

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || event.button !== 0) return;
    if (skipWhen && window.matchMedia(skipWhen).matches) return;

    const el = ref.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;

    state.current = { active: true, captured: false, startX: event.clientX, startScroll: el.scrollLeft, travelled: 0 };
    setDragging(true);

    // Two things deliberately NOT done here:
    //
    // No preventDefault(). Per the Pointer Events spec that suppresses the
    // compatibility mouse events for this pointer, and `click` is one of
    // them, so every card in the banner would stop being clickable.
    //
    // No setPointerCapture() either. Capturing retargets the whole
    // interaction, including the click, to the capturing element, so the
    // anchor underneath never sees it and the card silently stops opening.
    // Capture is taken in onPointerMove instead, once the pointer has
    // actually travelled far enough to count as a drag rather than a click.
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!state.current.active) return;
    const el = ref.current;
    if (!el) return;

    const dx = event.clientX - state.current.startX;
    state.current.travelled = Math.max(state.current.travelled, Math.abs(dx));

    // Only now is this a drag, so only now is it safe to capture: the pan
    // keeps tracking if the pointer leaves the banner, and a plain click
    // never went through this branch at all.
    if (!state.current.captured && state.current.travelled > DRAG_THRESHOLD_PX) {
      state.current.captured = true;
      if (event.isTrusted) el.setPointerCapture(event.pointerId);
    }

    el.scrollLeft = state.current.startScroll - dx;
  };

  const stop = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!state.current.active) return;
    state.current.active = false;
    state.current.captured = false;
    setDragging(false);
    const el = ref.current;
    if (el?.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId);
  };

  // Capture phase, so this runs before the link's own handler.
  //
  // The distance is *consumed* here rather than just read. Only the single
  // click that a drag generates should be swallowed; leaving the value set
  // meant every later click on the banner was cancelled too, which made the
  // cards permanently unclickable once you had dragged once.
  const onClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    const wasDrag = state.current.travelled > DRAG_THRESHOLD_PX;
    state.current.travelled = 0;
    if (!wasDrag) return;
    event.preventDefault();
    event.stopPropagation();
  };

  // Every card in these banners is an <a>, and links are natively draggable.
  // Left alone, pressing on one and moving starts the browser's own
  // drag-the-URL gesture, which cancels the pointermove stream and the pan
  // silently never happens. Refusing dragstart keeps the stream alive without
  // touching the click behaviour.
  const onDragStart = (event: ReactDragEvent<HTMLDivElement>) => event.preventDefault();

  // Only while actually panning: a horizontal drag across cards would
  // otherwise sweep up a text selection and leave it highlighted.
  const onSelectStart = (event: ReactSyntheticEvent) => {
    if (state.current.active) event.preventDefault();
  };

  return {
    dragging,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: stop,
      onPointerCancel: stop,
      onClickCapture,
      onDragStart,
      onSelectStart,
    },
  };
}
