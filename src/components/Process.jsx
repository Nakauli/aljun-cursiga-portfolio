import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader.jsx";
import { processSteps } from "../data/process.js";

export default function Process() {
  return (
    <section id="process" className="relative z-10 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Development Process" title="From a rough idea to a dependable release">
          I keep projects understandable and collaborative, balancing visual decisions with technical requirements at
          every stage.
        </SectionHeader>

        <div className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-[12.5%] right-[12.5%] top-10 hidden h-px bg-gradient-to-r from-cyan-400 via-emerald-300 to-amber-300 lg:block" />
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.title}
                className="relative rounded-[8px] border border-slate-200/80 bg-white/75 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.055]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="relative z-10 mb-5 flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-[8px] border border-cyan-400/30 bg-cyan-500/10 text-cyan-700 shadow-glow dark:text-cyan-200">
                    <Icon size={22} />
                  </div>
                  <span className="font-display text-2xl font-bold text-slate-300 dark:text-white/20">{step.number}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-slate-950 dark:text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{step.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
