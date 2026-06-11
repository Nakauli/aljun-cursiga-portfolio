import { profile } from "../data/profile.js";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-200/80 px-4 py-8 text-center text-sm text-slate-600 dark:border-white/10 dark:text-slate-400">
      <p>&copy; 2026 {profile.name}. Built with code, creativity, and passion.</p>
    </footer>
  );
}
