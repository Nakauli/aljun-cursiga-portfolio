import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import SectionHeader from "./SectionHeader.jsx";
import { engineeringProof } from "../data/engineeringProof.js";

export default function EngineeringProof() {
  return (
    <section id="engineering-proof" className="relative z-10 border-y border-slate-200/80 px-4 py-24 dark:border-white/10">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Engineering proof" title="Claims backed by visible work">
          A concise view of the repository, quality, security, and delivery evidence behind this portfolio.
        </SectionHeader>
        <div className="grid gap-px overflow-hidden rounded-[8px] border border-slate-200 bg-slate-200 dark:border-white/10 dark:bg-white/10 md:grid-cols-2">
          {engineeringProof.map((item, index) => (
            <motion.article
              key={item.title}
              className="bg-white p-6 dark:bg-[#071827]"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <BadgeCheck className="text-emerald-600 dark:text-emerald-300" size={20} aria-hidden="true" />
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{item.title}</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-slate-950 dark:text-white">{item.value}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
