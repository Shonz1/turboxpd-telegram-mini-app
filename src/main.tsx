import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Mock the Telegram environment BEFORE anything from the SDK is initialized,
// so the app is fully workable when opened outside Telegram during development.
import { setupMockEnv } from "@/telegram/mockEnv";
import { init } from "@/telegram/init";

import App from "@/App";
import "@/index.css";

setupMockEnv();

try {
  init({ debug: import.meta.env.DEV });
} catch (err) {
  console.error("Failed to initialize the Telegram SDK", err);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
