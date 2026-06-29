import {
  isTMA,
  mockTelegramEnv,
  type ThemeParams,
} from "@telegram-apps/sdk-react";

/**
 * Mocks the Telegram environment for local development.
 *
 * When the app is opened OUTSIDE of Telegram (e.g. `npm run dev` in a regular
 * browser), `isTMA()` is false and there is no Telegram WebView to provide
 * launch params / theme / user. This injects a believable fake so the UI is
 * fully workable during development.
 *
 * It is a strict no-op in production / inside a real Telegram client.
 */
export function setupMockEnv(): void {
  // Never mock when actually running inside Telegram.
  if (isTMA()) {
    return;
  }

  const themeParams: ThemeParams = {
    accent_text_color: "#6ab2f2",
    bg_color: "#17212b",
    button_color: "#5288c1",
    button_text_color: "#ffffff",
    destructive_text_color: "#ec3942",
    header_bg_color: "#17212b",
    hint_color: "#708499",
    link_color: "#6ab3f3",
    secondary_bg_color: "#232e3c",
    section_bg_color: "#17212b",
    section_header_text_color: "#6ab3f3",
    subtitle_text_color: "#708499",
    text_color: "#f5f5f5",
  };

  const initDataRaw = new URLSearchParams([
    [
      "user",
      JSON.stringify({
        id: 99281932,
        first_name: "Turbo",
        last_name: "Tester",
        username: "turbo_tester",
        language_code: "en",
        is_premium: true,
        allows_write_to_pm: true,
        photo_url: "",
      }),
    ],
    ["hash", "mock-hash"],
    ["signature", "mock-signature"],
    ["auth_date", Math.floor(Date.now() / 1000).toString()],
    ["start_param", "debug"],
    ["chat_type", "sender"],
    ["chat_instance", "-1234567890123456789"],
  ]).toString();

  mockTelegramEnv({
    launchParams: {
      tgWebAppThemeParams: themeParams,
      tgWebAppData: initDataRaw,
      tgWebAppVersion: "8.4",
      tgWebAppPlatform: "tdesktop",
    },
  });

  console.info(
    "[mockEnv] Running outside Telegram — injected a mock Telegram environment for development."
  );
}
