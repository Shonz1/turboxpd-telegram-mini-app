# TurboXPD — Telegram Mini App

A starter [Telegram Mini App](https://core.telegram.org/bots/webapps) built with
**React 19**, the official **[`@telegram-apps/sdk-react`](https://docs.telegram-mini-apps.com/)**
SDK, **Tailwind CSS v4**, and **[shadcn/ui](https://ui.shadcn.com/)**.

It ships a small but complete foundation you can build a real product on:

- 🎨 **Adaptive theming** — shadcn's design tokens are mapped onto Telegram's
  theme variables (`--tg-theme-*`), so the UI automatically matches the user's
  Telegram color scheme (light/dark + accent colors). See `src/index.css`.
- 📱 **Telegram-native** — mini app / theme params / viewport / back button are
  mounted and bound to CSS variables in `src/telegram/init.ts`. The native back
  button is wired to the router in `src/telegram/BackButtonRouter.tsx`.
- 👤 **Init data** — the Profile screen reads the authenticated Telegram user
  from `initData`.
- 🧭 **Navigation** — three demo screens (Home / Profile / Settings) with a
  bottom tab bar.
- 🧪 **Works outside Telegram** — `src/telegram/mockEnv.ts` injects a mock
  Telegram environment during development, so `npm run dev` is fully usable in a
  regular browser.

## Tech stack

| Concern    | Choice                                            |
| ---------- | ------------------------------------------------- |
| Build tool | Vite 6                                            |
| Framework  | React 19 + TypeScript                             |
| Telegram   | `@telegram-apps/sdk-react` v3                     |
| Styling    | Tailwind CSS v4 (`@tailwindcss/vite`) + shadcn/ui |
| Routing    | `react-router-dom` v7                             |
| Icons      | `lucide-react`                                    |

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173 — runs with a mocked Telegram env
```

### Scripts

| Command           | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Start the Vite dev server (mocked Telegram env).     |
| `npm run build`   | Type-check (`tsc -b`) and build to `dist/`.          |
| `npm run preview` | Preview the production build locally.                |
| `npm run lint`    | Run ESLint.                                          |

## Project structure

```
src/
├── main.tsx                  # entry: mock env → init SDK → render
├── App.tsx                   # routes + global Telegram helpers
├── index.css                 # Tailwind v4 + theme-token ↔ --tg-theme-* bridge
├── telegram/
│   ├── init.ts               # mount miniApp/themeParams/viewport/backButton + bindCssVars
│   ├── mockEnv.ts            # mock Telegram env for local dev (no-op in Telegram)
│   ├── ThemeSync.tsx         # toggles `.dark` from miniApp.isDark
│   └── BackButtonRouter.tsx  # native back button ↔ router
├── components/
│   ├── Layout.tsx            # viewport-sized shell + bottom nav
│   ├── BottomNav.tsx         # Home / Profile / Settings tabs
│   └── ui/                   # shadcn/ui primitives
└── pages/
    ├── HomePage.tsx
    ├── ProfilePage.tsx       # reads initData.user
    └── SettingsPage.tsx      # reads useLaunchParams()
```

### Adding more shadcn/ui components

The project is configured for the shadcn CLI (`components.json`):

```bash
npx shadcn@latest add dialog
```

## Deploying

A Telegram Mini App must be served over **HTTPS**. The build is a static site:

```bash
npm run build      # outputs to dist/
```

Upload `dist/` to any static host (Vercel, Netlify, Cloudflare Pages, GitHub
Pages, S3 + CloudFront, …). The Vite `base` is set to `./` (relative paths), so
it works whether you host it at a domain root or a subpath.

### Register the app with @BotFather

1. Talk to [@BotFather](https://t.me/BotFather) and create a bot (`/newbot`).
2. Create a Mini App with `/newapp` (or set a menu-button web app via
   `/mybots → Bot Settings → Menu Button`) and provide your **HTTPS** URL.
3. Open the bot in Telegram and launch the Mini App.

### Testing inside Telegram during development

`npm run dev` runs over plain HTTP on localhost, which Telegram cannot load
directly. Expose it over HTTPS with a tunnel and point your Mini App URL at it:

```bash
npm run dev
# in another terminal, e.g.:
npx cloudflared tunnel --url http://localhost:5173
# or: ngrok http 5173
```

Then set the resulting HTTPS URL as your Mini App URL in @BotFather.

## License

MIT
