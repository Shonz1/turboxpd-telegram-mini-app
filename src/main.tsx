import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";

// Mock the Telegram environment BEFORE anything from the SDK is initialized,
// so the app is fully workable when opened outside Telegram during development.
import { setupMockEnv } from "@/telegram/mockEnv";
import { init } from "@/telegram/init";

import App from "@/App";
import "@/index.css";

setupMockEnv();

// Telegram appends its launch params (tgWebAppData, tgWebAppVersion, etc.)
// directly to the URL hash, e.g. "#tgWebAppData=user%3D...". HashRouter
// treats the hash as the path, so the router sees "/tgWebAppData=..." and
// finds no matching route. Strip those params before the router mounts.
if (window.location.hash.startsWith("#tgWebApp")) {
  window.history.replaceState(null, "", window.location.pathname + "#/");
}

try {
  init({ debug: import.meta.env.DEV });
} catch (err) {
  console.error("Failed to initialize the Telegram SDK", err);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);
