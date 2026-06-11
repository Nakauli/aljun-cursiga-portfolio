import { motion } from "framer-motion";

export default function SectionHeader({ eyebrow, title, children }) {
  return (
    <motion.div
      className="mx-auto mb-12 max-w-3xl text-center"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-bold text-slate-950 dark:text-white sm:text-4xl">{title}</h2>
      {children && <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">{children}</p>}
    </motion.div>
  );
}
