"use client";

import { useRef } from "react";

import { BottomSheet, type BottomSheetHandle } from "@/components/gg/BottomSheet";
import { Button } from "@/components/gg/Button";

export function SheetDemo() {
  const sheet = useRef<BottomSheetHandle>(null);
  return (
    <>
      <Button variant="outline" onClick={() => sheet.current?.open()}>
        Open bottom sheet
      </Button>
      <BottomSheet
        ref={sheet}
        title="Filter projects"
        footer={
          <div style={{ padding: 20, borderTop: "1px solid var(--gg-line)" }}>
            <Button full onClick={() => sheet.current?.close()}>
              Show 6 projects
            </Button>
          </div>
        }
      >
        <p className="gg-body gg-muted">
          Sheet body. Escape, the close button and a tap on the scrim all close it; focus returns to the button that
          opened it, and the page behind does not scroll.
        </p>
      </BottomSheet>
    </>
  );
}
