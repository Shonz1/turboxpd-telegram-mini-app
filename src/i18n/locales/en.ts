const en = {
  nav: {
    home: "Home",
    profile: "Profile",
    settings: "Settings",
  },
  home: {
    welcome: "Welcome 👋",
    welcomeUser: "Welcome, {{name}} 👋",
    subtitle:
      "A starter Telegram Mini App built with React, the official telegram-apps SDK, and shadcn/ui.",
    features: {
      telegramNative: {
        title: "Telegram-native",
        description: "Theme, viewport, back button and init data wired in.",
      },
      adaptiveTheming: {
        title: "Adaptive theming",
        description: "shadcn tokens follow the user's Telegram color scheme.",
      },
      viteReact: {
        title: "Vite + React 19",
        description: "Fast HMR dev server and an optimized production build.",
      },
    },
    exploreProfile: "Explore your profile",
    exploreProfileSub: "See the data Telegram passes to the app.",
    open: "Open",
  },
  profile: {
    title: "Profile",
    noData:
      "No Telegram user data is available. Open this app from inside Telegram to see your profile.",
    userId: "User ID",
    username: "Username",
    language: "Language",
  },
  settings: {
    title: "Settings",
    preferences: "Preferences",
    followTheme: "Follow Telegram theme",
    colorScheme: "Color scheme currently {{scheme}}",
    dark: "dark",
    light: "light",
    hapticFeedback: "Haptic feedback",
    hapticFeedbackSub: "Vibrate on supported interactions",
    about: "About",
    appVersion: "App version",
    platform: "Platform",
    telegramVersion: "Telegram version",
    builtWith: "Built with React, telegram-apps SDK & shadcn/ui",
  },
} as const;

export default en;
