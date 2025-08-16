import { create } from "zustand";

export type Theme = "system" | "light" | "dark";

type ThemeState = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  hydrate: () => void;
};

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = theme === "dark" || (theme === "system" && prefersDark);
  root.classList.toggle("dark", isDark);
  root.style.colorScheme = isDark ? "dark" : "light";
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: "system",
  hydrate: () => {
    try {
      const saved = window.localStorage.getItem("theme") as Theme | null;
      if (saved) {
        set({ theme: saved });
        applyTheme(saved);
      } else {
        applyTheme("system");
      }
    } catch {
      // ignore
    }
  },
  setTheme: (t) => {
    try {
      window.localStorage.setItem("theme", t);
    } catch {}
    set({ theme: t });
    applyTheme(t);
  },
}));

