import { motion } from "framer-motion";
import { BadgeCheck, BookOpen, Brush, Code2 } from "lucide-react";
import SectionHeader from "./SectionHeader.jsx";
import { profile } from "../data/profile.js";

const cards = [
  { icon: Code2, title: "Web Systems", text: "Responsive interfaces, application flows, and database-aware project thinking." },
  { icon: Brush, title: "Creative Layout", text: "Publication, print, yearbook, and visual composition experience." },
  { icon: BookOpen, title: "Continuous Learning", text: "A Computer Science path built around practice, iteration, and useful outputs." },
];

export default function About() {
  return (
    <section id="about" className="relative z-10 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="About" title="A developer with a designer's eye">
          I combine technical structure with visual clarity, building portfolio-ready web experiences that feel useful,
          modern, and intentional.
        </SectionHeader>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            className="rounded-[8px] border border-slate-200/80 bg-white/75 p-6 shadow-panel backdrop-blur dark:border-white/10 dark:bg-white/[0.06]"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg leading-9 text-slate-700 dark:text-slate-300">{profile.about}</p>
            <div className="mt-8 space-y-4">
              {profile.highlights.map((highlight) => (
                <div key={highlight} className="flex gap-3 text-slate-700 dark:text-slate-200">
                  <BadgeCheck className="mt-1 flex-none text-emerald-500" size={20} />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.article
                  key={card.title}
                  className="rounded-[8px] border border-slate-200/80 bg-white/70 p-5 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-glow dark:border-white/10 dark:bg-white/[0.055]"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                >
                  <div className="mb-4 grid h-12 w-12 place-items-center rounded-[8px] bg-cyan-500/10 text-cyan-700 dark:text-cyan-200">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-slate-950 dark:text-white">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{card.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
