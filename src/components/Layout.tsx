import type { ReactNode } from "react";

import { BottomNav } from "@/components/BottomNav";

/**
 * App shell: a scrollable content area that fills the Telegram viewport, plus a
 * fixed bottom navigation bar. The height is bound to the Telegram viewport CSS
 * variable so the layout tracks the client's actual visible area, falling back
 * to `100dvh` outside Telegram.
 */
export function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{ height: "var(--tg-viewport-stable-height, 100dvh)" }}
    >
      <main
        className="flex-1 overflow-y-auto"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="mx-auto w-full max-w-md px-4 py-5">{children}</div>
      </main>
      <BottomNav />
    </div>
  );
}
