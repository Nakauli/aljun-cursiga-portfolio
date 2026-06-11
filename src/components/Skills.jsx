import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader.jsx";
import { skillCategories } from "../data/skills.js";

const toneClasses = {
  cyan: "from-cyan-400/20 to-cyan-400/5 text-cyan-700 dark:text-cyan-200",
  emerald: "from-emerald-400/20 to-emerald-400/5 text-emerald-700 dark:text-emerald-200",
  amber: "from-amber-400/20 to-amber-400/5 text-amber-700 dark:text-amber-200",
  rose: "from-rose-400/20 to-rose-400/5 text-rose-700 dark:text-rose-200",
  indigo: "from-indigo-400/20 to-indigo-400/5 text-indigo-700 dark:text-indigo-200",
  violet: "from-violet-400/20 to-violet-400/5 text-violet-700 dark:text-violet-200",
};

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Skills and Tools" title="A practical stack for creative web work">
          Frontend craft, backend fundamentals, design tools, and productivity systems grouped for quick scanning.
        </SectionHeader>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skillCategories.map((category, index) => (
            <motion.article
              key={category.title}
              className="rounded-[8px] border border-slate-200/80 bg-white/75 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.055]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-slate-950 dark:text-white">{category.title}</h3>
                <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:border-white/10 dark:text-slate-400">
                  {category.items.length} tools
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {category.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.name}
                      className={`group rounded-[8px] border border-slate-200/80 bg-gradient-to-br p-4 transition hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-glow dark:border-white/10 ${toneClasses[category.tone]}`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="mb-3 h-7 w-7 transition group-hover:scale-110" aria-hidden="true" />
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">{item.name}</div>
                      <div className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                        {category.title}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
