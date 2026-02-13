import { useSettingsStore } from "../store/settingsStore.ts";
import { translations } from "./translations.ts";

export function useTranslation() {
  const language = useSettingsStore((state) => state.language);
  const t = translations[language];

  return { t, language };
}
