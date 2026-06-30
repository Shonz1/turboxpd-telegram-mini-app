const ru = {
  nav: {
    home: "Главная",
    profile: "Профиль",
    settings: "Настройки",
  },
  home: {
    welcome: "Добро пожаловать 👋",
    welcomeUser: "Привет, {{name}} 👋",
    subtitle:
      "Стартовое Telegram Mini App на React, официальном SDK telegram-apps и shadcn/ui.",
    features: {
      telegramNative: {
        title: "Telegram-нативный",
        description: "Тема, вьюпорт, кнопка назад и initData подключены.",
      },
      adaptiveTheming: {
        title: "Адаптивная тема",
        description: "Токены shadcn следуют цветовой схеме Telegram.",
      },
      viteReact: {
        title: "Vite + React 19",
        description: "Быстрый HMR-сервер и оптимизированная production-сборка.",
      },
    },
    exploreProfile: "Откройте профиль",
    exploreProfileSub: "Данные, которые Telegram передаёт приложению.",
    open: "Открыть",
  },
  profile: {
    title: "Профиль",
    noData:
      "Данные пользователя Telegram недоступны. Откройте приложение внутри Telegram, чтобы увидеть профиль.",
    userId: "ID пользователя",
    username: "Имя пользователя",
    language: "Язык",
  },
  settings: {
    title: "Настройки",
    preferences: "Параметры",
    followTheme: "Следовать теме Telegram",
    colorScheme: "Текущая цветовая схема: {{scheme}}",
    dark: "тёмная",
    light: "светлая",
    hapticFeedback: "Тактильный отклик",
    hapticFeedbackSub: "Вибрация при поддерживаемых действиях",
    about: "О приложении",
    appVersion: "Версия приложения",
    platform: "Платформа",
    telegramVersion: "Версия Telegram",
    builtWith: "Создано на React, telegram-apps SDK и shadcn/ui",
  },
} as const;

export default ru;
