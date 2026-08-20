"use client";

import {
  useRef,
  useState,
  type DragEvent as ReactDragEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
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
  const state = useRef({ active: false, startX: 0, startScroll: 0, travelled: 0 });

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || event.button !== 0) return;
    if (skipWhen && window.matchMedia(skipWhen).matches) return;

    const el = ref.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;

    state.current = { active: true, startX: event.clientX, startScroll: el.scrollLeft, travelled: 0 };
    setDragging(true);

    // Without this the browser starts its own native link-drag the moment
    // the pointer moves off an <a> (every card here is one), which cancels
    // the pointermove stream and the pan silently never happens. It also
    // stops the text selection a horizontal drag would otherwise sweep up.
    // Links still focus and activate on click, which is what matters.
    event.preventDefault();

    // Capture so the pan keeps tracking if the pointer leaves the banner.
    if (event.isTrusted) el.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!state.current.active) return;
    const el = ref.current;
    if (!el) return;

    const dx = event.clientX - state.current.startX;
    state.current.travelled = Math.max(state.current.travelled, Math.abs(dx));
    el.scrollLeft = state.current.startScroll - dx;
  };

  const stop = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!state.current.active) return;
    state.current.active = false;
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

  // Belt and braces alongside the preventDefault above: anything inside the
  // banner that is natively draggable (links, images) is refused here too.
  const onDragStart = (event: ReactDragEvent<HTMLDivElement>) => event.preventDefault();

  return {
    dragging,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: stop,
      onPointerCancel: stop,
      onClickCapture,
      onDragStart,
    },
  };
}
