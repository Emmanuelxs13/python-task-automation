import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark" | "system";

interface SettingsState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: "light",

      setTheme: (theme) => {
        console.log("⚙️ Store: setTheme called with:", theme);
        set({ theme });
      },
    }),
    {
      name: "securecheck-settings",
    },
  ),
);
