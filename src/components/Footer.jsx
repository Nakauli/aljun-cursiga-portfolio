import { ContactRound, Download, Github, Mail, Printer } from "lucide-react";
import { profile } from "../data/profile.js";

const sectionLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Learning", href: "#learning" },
  { label: "Services", href: "#services" },
];

const resourceLinks = [
  { label: "GitHub repository", href: profile.github, icon: Github, external: true },
  { label: "Download CV", href: profile.cvPath, icon: Download, download: true },
  { label: "Save contact card", href: profile.contactCardPath, icon: ContactRound, download: true },
  { label: "Send an email", href: `mailto:${profile.email}`, icon: Mail },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-200/80 px-4 pb-8 pt-14 text-sm text-slate-600 dark:border-white/10 dark:text-slate-400">
      <div className="mx-auto grid max-w-6xl gap-10 border-b border-slate-200/80 pb-12 dark:border-white/10 md:grid-cols-[1.3fr_0.7fr_1fr]">
        <div>
          <a href="#home" className="font-display text-xl font-bold text-slate-950 dark:text-white">
            {profile.name}
          </a>
          <p className="mt-3 max-w-sm leading-7">{profile.tagline}</p>
          <a href="#contact" className="mt-5 inline-flex items-center gap-2 font-bold text-cyan-700 transition hover:text-cyan-500 dark:text-cyan-300">
            {profile.availability.status}
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
          </a>
        </div>

        <nav aria-label="Footer sections">
          <p className="font-bold uppercase tracking-[0.14em] text-slate-900 dark:text-white">Explore</p>
          <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 md:grid-cols-1">
            {sectionLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-cyan-700 dark:hover:text-cyan-300">
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        <div>
          <p className="font-bold uppercase tracking-[0.14em] text-slate-900 dark:text-white">Resources</p>
          <div className="mt-4 grid gap-3">
            {resourceLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  download={link.download}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  className="inline-flex items-center gap-2 transition hover:text-cyan-700 dark:hover:text-cyan-300"
                >
                  <Icon size={16} aria-hidden="true" />
                  {link.label}
                </a>
              );
            })}
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 text-left transition hover:text-cyan-700 dark:hover:text-cyan-300"
            >
              <Printer size={16} aria-hidden="true" />
              Print portfolio
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-2 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <p>Built with React, thoughtful iteration, and continuous learning.</p>
      </div>
    </footer>
  );
}
