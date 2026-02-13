import { useState } from "react";
import { Settings, Sun, Moon, Monitor, Globe, X } from "lucide-react";
import { useSettingsStore } from "../store/settingsStore.ts";

type Theme = "light" | "dark" | "system";
type Language = "es" | "en";

export const SettingsButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, language, setTheme, setLanguage } = useSettingsStore();

  const themes = [
    { value: "light" as Theme, label: "Claro", icon: Sun },
    { value: "dark" as Theme, label: "Oscuro", icon: Moon },
    { value: "system" as Theme, label: "Sistema", icon: Monitor },
  ];

  const languages = [
    { value: "es" as Language, label: "Español", flag: "🇪🇸" },
    { value: "en" as Language, label: "English", flag: "🇺🇸" },
  ];

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    // Mostrar mensaje de que se aplicó el cambio
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 group"
        aria-label="Configuración"
      >
        <Settings className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Settings Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <button
            className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar modal"
            tabIndex={-1}
          />

          {/* Modal */}
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                  <Settings className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Configuración
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                aria-label="Cerrar"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Theme Selection */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Tema
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {themes.map((t) => {
                  const Icon = t.icon;
                  const isActive = theme === t.value;
                  return (
                    <button
                      key={t.value}
                      onClick={() => handleThemeChange(t.value)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        isActive
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 mx-auto mb-2 ${
                          isActive
                            ? "text-blue-600"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          isActive
                            ? "text-blue-600"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {t.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Language Selection */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Globe className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Idioma
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {languages.map((lang) => {
                  const isActive = language === lang.value;
                  return (
                    <button
                      key={lang.value}
                      onClick={() => handleLanguageChange(lang.value)}
                      className={`p-4 rounded-xl border-2 transition-all flex items-center justify-center space-x-2 ${
                        isActive
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                    >
                      <span className="text-2xl">{lang.flag}</span>
                      <span
                        className={`text-sm font-medium ${
                          isActive
                            ? "text-blue-600"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {lang.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Info */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
              <p className="text-sm text-blue-900 dark:text-blue-200">
                <strong>💡 Tip:</strong> El tema "Sistema" se ajusta
                automáticamente según las preferencias de tu dispositivo.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
