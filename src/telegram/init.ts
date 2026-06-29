import {
  backButton,
  initData,
  init as initSDK,
  miniApp,
  setDebug,
  themeParams,
  viewport,
} from "@telegram-apps/sdk-react";

/**
 * Initializes the Telegram Mini Apps SDK and mounts the components used across
 * the app, binding their reactive state to CSS variables.
 *
 * After this runs, the following CSS variable groups are available on the
 * document root and consumed by `src/index.css`:
 *  - `--tg-theme-*`         (theme colors, from themeParams/miniApp)
 *  - `--tg-viewport-*`      (viewport height / stability)
 *  - safe-area insets
 *
 * Every mount uses `.ifAvailable()` so the call is a no-op on Telegram clients
 * or environments where the underlying feature is unsupported, rather than
 * throwing.
 */
export function init(options: { debug: boolean }): void {
  setDebug(options.debug);
  initSDK();

  // Telegram back button — mounted here, shown/hidden per-route by
  // <BackButtonRouter>.
  backButton.mount.ifAvailable();

  // Restore init data (user, chat, auth params) so signals like
  // `initData.user` are populated.
  initData.restore();

  // Mini app + theme params drive the color tokens.
  if (miniApp.mountSync.isAvailable()) {
    miniApp.mountSync();
    miniApp.bindCssVars.ifAvailable();
  }
  if (themeParams.mountSync.isAvailable()) {
    themeParams.mountSync();
    themeParams.bindCssVars.ifAvailable();
  }

  // Viewport mounts asynchronously; bind its CSS vars once ready.
  if (viewport.mount.isAvailable()) {
    viewport
      .mount()
      .then(() => {
        viewport.bindCssVars.ifAvailable();
      })
      .catch((err) => {
        console.error("Failed to mount Telegram viewport", err);
      });
  }
}
