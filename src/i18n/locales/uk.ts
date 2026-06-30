const uk = {
  nav: {
    home: "Головна",
    profile: "Профіль",
    settings: "Налаштування",
  },
  home: {
    vehicles: "Транспортні засоби",
    noVehicles: "Немає призначених ТЗ.",
    active: "Активний",
    vin: "VIN",
    registrationEnds: "Реєстрація до",
    coiEnds: "Страховка до",
    location: "Місцезнаходження",
    availableFrom: "Доступно з",
    quickActions: "Швидкі дії",
    renewRegistration: "Поновити реєстрацію",
    renewCoi: "Поновити страховку",
    service: "Обслуговування",
    stopService: "Зупинити сервіс",
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
