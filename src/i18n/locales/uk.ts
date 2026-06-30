const uk = {
  nav: {
    home: "Головна",
    profile: "Профіль",
    settings: "Налаштування",
  },
  home: {
    welcome: "Ласкаво просимо 👋",
    welcomeUser: "Привіт, {{name}} 👋",
    subtitle:
      "Стартовий Telegram Mini App на React, офіційному SDK telegram-apps та shadcn/ui.",
    features: {
      telegramNative: {
        title: "Telegram-нативний",
        description: "Тема, вʼюпорт, кнопка назад та initData підключені.",
      },
      adaptiveTheming: {
        title: "Адаптивна тема",
        description: "Токени shadcn відповідають кольоровій схемі Telegram.",
      },
      viteReact: {
        title: "Vite + React 19",
        description: "Швидкий HMR-сервер та оптимізована production-збірка.",
      },
    },
    exploreProfile: "Відкрийте профіль",
    exploreProfileSub: "Дані, які Telegram передає застосунку.",
    open: "Відкрити",
  },
  profile: {
    title: "Профіль",
    noData:
      "Дані користувача Telegram недоступні. Відкрийте застосунок у Telegram, щоб побачити профіль.",
    userId: "ID користувача",
    username: "Імʼя користувача",
    language: "Мова",
  },
  settings: {
    title: "Налаштування",
    preferences: "Параметри",
    followTheme: "Слідувати темі Telegram",
    colorScheme: "Поточна кольорова схема: {{scheme}}",
    dark: "темна",
    light: "світла",
    hapticFeedback: "Тактильний відгук",
    hapticFeedbackSub: "Вібрація при підтримуваних діях",
    about: "Про застосунок",
    appVersion: "Версія застосунку",
    platform: "Платформа",
    telegramVersion: "Версія Telegram",
    builtWith: "Створено на React, telegram-apps SDK та shadcn/ui",
  },
} as const;

export default uk;
