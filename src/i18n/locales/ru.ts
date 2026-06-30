const ru = {
  nav: {
    home: "Главная",
    profile: "Профиль",
    settings: "Настройки",
  },
  home: {
    vehicles: "Транспортные средства",
    noVehicles: "Нет назначенных ТС.",
    active: "Активен",
    vin: "VIN",
    registrationEnds: "Регистрация до",
    coiEnds: "Страховка до",
    location: "Местоположение",
    availableFrom: "Доступно с",
    quickActions: "Быстрые действия",
    renewRegistration: "Продлить регистрацию",
    renewCoi: "Продлить страховку",
    service: "Обслуживание",
    stopService: "Остановить сервис",
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
