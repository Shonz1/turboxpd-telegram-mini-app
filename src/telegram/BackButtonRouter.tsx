import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { backButton } from "@telegram-apps/sdk-react";

/**
 * Wires Telegram's hardware/native back button to the router:
 *  - shows it on every route except the root ("/")
 *  - navigating back with it pops the history stack
 *
 * Uses `.ifAvailable()` / availability checks so it is a no-op outside Telegram.
 * Renders nothing.
 */
export function BackButtonRouter() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Toggle visibility based on the current route.
  useEffect(() => {
    if (!backButton.isMounted()) {
      return;
    }
    if (pathname === "/") {
      backButton.hide();
    } else {
      backButton.show();
    }
  }, [pathname]);

  // Bind the click handler once; `onClick` returns an unsubscribe function.
  useEffect(() => {
    if (!backButton.onClick.isAvailable()) {
      return;
    }
    return backButton.onClick(() => {
      navigate(-1);
    });
  }, [navigate]);

  return null;
}
