import { motion } from "framer-motion";
import { BriefcaseBusiness } from "lucide-react";
import SectionHeader from "./SectionHeader.jsx";
import { experience } from "../data/experience.js";

export default function Experience() {
  return (
    <section id="experience" className="relative z-10 px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeader eyebrow="Experience" title="Creative production meets academic development">
          A timeline of layout work, publication involvement, and practical Computer Science project building.
        </SectionHeader>

        <div className="relative">
          <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-cyan-400 via-emerald-300 to-amber-300 md:left-1/2" />
          <div className="space-y-6">
            {experience.map((item, index) => (
              <motion.article
                key={item.organization}
                className={`relative md:grid md:grid-cols-2 md:gap-10 ${index % 2 === 0 ? "" : "md:text-right"}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                <div className={`${index % 2 === 0 ? "md:col-start-2" : "md:col-start-1 md:row-start-1"} pl-14 md:pl-0`}>
                  <div className="absolute left-0 top-5 grid h-10 w-10 place-items-center rounded-full border border-cyan-400/50 bg-white text-cyan-700 shadow-glow dark:bg-[#071827] dark:text-cyan-200 md:left-1/2 md:-translate-x-1/2">
                    <BriefcaseBusiness size={18} />
                  </div>
                  <div className="rounded-[8px] border border-slate-200/80 bg-white/75 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-glow dark:border-white/10 dark:bg-white/[0.06]">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                      {item.period}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold text-slate-950 dark:text-white">
                      {item.organization}
                    </h3>
                    <p className="mt-1 font-semibold text-emerald-700 dark:text-emerald-200">{item.role}</p>
                    <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
