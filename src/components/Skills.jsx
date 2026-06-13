import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
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
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const categories = ["All", ...skillCategories.map((category) => category.title)];
  const visibleCategories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return skillCategories
      .filter((category) => activeCategory === "All" || category.title === activeCategory)
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => item.name.toLowerCase().includes(normalizedQuery)),
      }))
      .filter((category) => category.items.length > 0);
  }, [activeCategory, query]);
  const visibleToolCount = visibleCategories.reduce((count, category) => count + category.items.length, 0);

  return (
    <section id="skills" className="relative z-10 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Skills and Tools" title="A practical stack for creative web work">
          Frontend craft, backend fundamentals, design tools, and productivity systems grouped for quick scanning.
        </SectionHeader>

        <div className="mb-8 grid gap-4 border-y border-slate-200/80 py-5 dark:border-white/10 lg:grid-cols-[1fr_auto] lg:items-center">
          <label className="relative block">
            <span className="sr-only">Search skills and tools</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search skills and tools"
              className="w-full rounded-[8px] border border-slate-200 bg-white/80 py-3 pl-11 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
                aria-label="Clear skill search"
              >
                <X size={16} />
              </button>
            )}
          </label>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400" aria-live="polite">
            {visibleToolCount} {visibleToolCount === 1 ? "tool" : "tools"} shown
          </p>
        </div>

        <div className="mb-7 flex flex-wrap gap-2" aria-label="Filter skills by category">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-[8px] border px-3 py-2 text-xs font-semibold transition ${
                activeCategory === category
                  ? "border-cyan-500 bg-cyan-500 text-white"
                  : "border-slate-200 bg-white/70 text-slate-600 hover:border-cyan-400 hover:text-cyan-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleCategories.map((category, index) => (
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

        {visibleCategories.length === 0 && (
          <div className="border-y border-slate-200/80 py-12 text-center dark:border-white/10">
            <p className="font-display text-xl font-semibold text-slate-900 dark:text-white">No matching tools yet</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveCategory("All");
              }}
              className="mt-3 text-sm font-semibold text-cyan-700 hover:underline dark:text-cyan-300"
            >
              Reset skill filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
