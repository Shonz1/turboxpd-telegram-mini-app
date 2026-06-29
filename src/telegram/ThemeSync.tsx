import { useEffect } from "react";
import { miniApp, useSignal } from "@telegram-apps/sdk-react";

/**
 * Keeps the document's `.dark` class in sync with the Telegram client's color
 * scheme. `miniApp.isDark` is a reactive signal; `useSignal` re-renders this
 * component whenever it changes.
 *
 * Renders nothing.
 */
export function ThemeSync() {
  const isDark = useSignal(miniApp.isDark);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return null;
}
