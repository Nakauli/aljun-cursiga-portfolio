import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, GitCommitHorizontal } from "lucide-react";
import SectionHeader from "./SectionHeader.jsx";
import { profile } from "../data/profile.js";
import { siteUpdates } from "../data/updates.js";

export default function Updates() {
  return (
    <section id="updates" className="relative z-10 border-y border-slate-200/70 bg-white/35 px-4 py-24 dark:border-white/10 dark:bg-white/[0.025]">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Recent Updates" title="A portfolio that keeps moving">
          A short, public record of meaningful improvements made to the site and its visitor experience.
        </SectionHeader>

        <div className="grid gap-px overflow-hidden rounded-[8px] border border-slate-200 bg-slate-200 dark:border-white/10 dark:bg-white/10">
          {siteUpdates.map((update, index) => (
            <motion.article
              key={update.date}
              className="grid gap-5 bg-white/90 p-6 dark:bg-[#071827]/95 md:grid-cols-[180px_1fr_auto] md:items-start"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
            >
              <p className="flex items-center gap-2 text-sm font-bold text-cyan-700 dark:text-cyan-300">
                <CalendarDays size={17} aria-hidden="true" />
                {update.date}
              </p>
              <div>
                <h3 className="font-display text-lg font-semibold text-slate-950 dark:text-white">{update.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{update.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {update.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <GitCommitHorizontal className="hidden text-slate-400 md:block" size={22} aria-hidden="true" />
            </motion.article>
          ))}
        </div>

        <a
          href={`${profile.github}/commits/main`}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-cyan-700 transition hover:text-cyan-500 dark:text-cyan-300"
        >
          View complete commit history
          <ArrowUpRight size={17} />
        </a>
      </div>
    </section>
  );
}
