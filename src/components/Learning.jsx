import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "./SectionHeader.jsx";
import { learningGoals } from "../data/learning.js";

const statusClasses = {
  "In progress": "bg-emerald-400/15 text-emerald-700 dark:text-emerald-300",
  Next: "bg-cyan-400/15 text-cyan-700 dark:text-cyan-300",
  Exploring: "bg-amber-400/15 text-amber-700 dark:text-amber-300",
  Planned: "bg-slate-400/15 text-slate-700 dark:text-slate-300",
};

export default function Learning() {
  return (
    <section id="learning" className="relative z-10 border-y border-slate-200/70 bg-white/35 px-4 py-24 dark:border-white/10 dark:bg-white/[0.025]">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Learning Roadmap" title="Building beyond the current stack">
          A transparent view of the technologies and engineering habits I am intentionally developing next.
        </SectionHeader>

        <div className="grid gap-px overflow-hidden rounded-[8px] border border-slate-200 bg-slate-200 md:grid-cols-2 dark:border-white/10 dark:bg-white/10">
          {learningGoals.map((goal, index) => {
            const Icon = goal.icon;
            return (
              <motion.article
                key={goal.title}
                className="group bg-white/90 p-6 transition hover:bg-cyan-50/80 dark:bg-[#071827]/95 dark:hover:bg-cyan-400/[0.07]"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-[8px] bg-slate-900 text-white dark:bg-cyan-300 dark:text-slate-950">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusClasses[goal.status]}`}>{goal.status}</span>
                </div>
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-300">{goal.focus}</p>
                <h3 className="mt-2 flex items-center gap-2 font-display text-xl font-semibold text-slate-950 dark:text-white">
                  {goal.title}
                  <ArrowUpRight className="text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-600" size={17} />
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{goal.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
