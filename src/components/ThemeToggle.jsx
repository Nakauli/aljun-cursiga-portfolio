import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ themeConfig }) {
  const isDark = themeConfig.theme === "dark";

  return (
    <button
      type="button"
      onClick={themeConfig.toggleTheme}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300/80 bg-white/80 text-slate-800 shadow-sm backdrop-blur transition hover:border-cyan-500 hover:text-cyan-700 dark:border-white/15 dark:bg-white/10 dark:text-slate-100 dark:hover:border-cyan-300 dark:hover:text-cyan-200"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
