import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle.jsx";
import { profile } from "../data/profile.js";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ themeConfig }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visibleEntry) setActiveSection(visibleEntry.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0.05, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-4 z-40 px-4">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-[8px] border px-4 py-3 backdrop-blur-xl transition ${
          scrolled
            ? "border-slate-200/80 bg-white/90 shadow-panel dark:border-white/15 dark:bg-[#071827]/80"
            : "border-white/40 bg-white/50 dark:border-white/10 dark:bg-white/5"
        }`}
        aria-label="Primary navigation"
      >
        <a href="#home" className="flex items-center gap-3 font-display font-bold text-slate-950 dark:text-white">
          <span className="grid h-10 w-10 place-items-center rounded-[8px] border border-cyan-400/40 bg-cyan-500/10 text-cyan-700 dark:text-cyan-200">
            AC
          </span>
          <span className="hidden sm:block">{profile.name}</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={activeSection === link.href.slice(1) ? "location" : undefined}
              className={`rounded-[8px] px-3 py-2 text-sm font-medium transition ${
                activeSection === link.href.slice(1)
                  ? "bg-cyan-500/10 text-cyan-700 dark:text-cyan-200"
                  : "text-slate-700 hover:bg-slate-900/5 hover:text-cyan-700 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-cyan-200"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={profile.cvPath}
            download
            className="hidden rounded-[8px] border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-800 transition hover:bg-cyan-500 hover:text-white dark:border-cyan-300/40 dark:text-cyan-100 dark:hover:bg-cyan-300 dark:hover:text-slate-950 md:inline-flex"
          >
            Download CV
          </a>
          <ThemeToggle themeConfig={themeConfig} />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300/80 bg-white/80 text-slate-800 backdrop-blur transition hover:border-cyan-500 hover:text-cyan-700 dark:border-white/15 dark:bg-white/10 dark:text-slate-100 lg:hidden"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mx-auto mt-3 max-w-6xl rounded-[8px] border border-slate-200 bg-white/95 p-3 shadow-panel backdrop-blur-xl dark:border-white/15 dark:bg-[#071827]/95 lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            <div className="grid gap-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={activeSection === link.href.slice(1) ? "location" : undefined}
                  className={`rounded-[8px] px-4 py-3 text-sm font-semibold transition ${
                    activeSection === link.href.slice(1)
                      ? "bg-cyan-500/10 text-cyan-700 dark:text-cyan-200"
                      : "text-slate-700 hover:bg-slate-100 hover:text-cyan-700 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-cyan-200"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
