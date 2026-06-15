import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader.jsx";
import { services } from "../data/services.js";

export default function Services() {
  return (
    <section id="services" className="relative z-10 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Services" title="What I can help build">
          Clear, practical services for student projects, small businesses, organizations, and personal brands.
        </SectionHeader>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                className="rounded-[8px] border border-slate-200/80 bg-white/75 p-5 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-emerald-400/60 hover:shadow-glow dark:border-white/10 dark:bg-white/[0.055]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-[8px] bg-emerald-500/10 text-emerald-700 dark:text-emerald-200">
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-lg font-semibold text-slate-950 dark:text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{service.description}</p>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
                  Good for: {service.goodFor}
                </p>
                <a
                  href="#contact"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-700 transition hover:text-cyan-500 dark:text-cyan-300"
                  aria-label={`Discuss ${service.title}`}
                >
                  Discuss this service
                  <ArrowRight size={16} />
                </a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
