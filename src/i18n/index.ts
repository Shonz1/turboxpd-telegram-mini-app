import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en";
import ru from "./locales/ru";
import uk from "./locales/uk";

export const SUPPORTED_LANGS = ["en", "ru", "uk"] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

function resolveLanguage(code: string | undefined): SupportedLang {
  if (!code) return "en";
  const lang = code.toLowerCase();
  // "uk" and "ua" both map to Ukrainian
  if (lang === "uk" || lang === "ua") return "uk";
  if ((SUPPORTED_LANGS as readonly string[]).includes(lang))
    return lang as SupportedLang;
  return "en";
}

export function initI18n(telegramLanguageCode?: string): void {
  const lng = resolveLanguage(telegramLanguageCode);

  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      uk: { translation: uk },
    },
    lng,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });
}

export default i18n;
