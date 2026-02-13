import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LandingPage } from "./pages/LandingPage.tsx";
import { LoginPage } from "./pages/LoginPage.tsx";
import { RegisterPage } from "./pages/RegisterPage.tsx";
import { DashboardPage } from "./pages/DashboardPage.tsx";
import { DocsPage } from "./pages/DocsPage.tsx";
import { SettingsButton } from "./components/SettingsButton.tsx";
import { useAuthStore } from "./store/authStore.ts";
import { useSettingsStore } from "./store/settingsStore.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const loadFromStorage = useAuthStore((state) => state.loadFromStorage);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const theme = useSettingsStore((state) => state.theme);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  // Aplicar tema cuando cambia - CON LIMPIEZA COMPLETA
  useEffect(() => {
    const root = document.documentElement;

    // Siempre remover primero
    root.classList.remove("dark");

    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "system") {
      const isDark = globalThis.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      if (isDark) {
        root.classList.add("dark");
      }
    }

    console.log(
      "🎨 Theme applied:",
      theme,
      "Dark mode:",
      root.classList.contains("dark"),
    );
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster position="top-right" richColors />
        <SettingsButton />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <DashboardPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/docs"
            element={
              isAuthenticated ? <DocsPage /> : <Navigate to="/login" replace />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
