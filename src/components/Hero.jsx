import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, Sparkles } from "lucide-react";
import { profile } from "../data/profile.js";

const statItems = [
  { value: "6", label: "Featured projects" },
  { value: "20+", label: "Tools and technologies" },
  { value: "2019", label: "Creative work since" },
];

export default function Hero() {
  return (
    <section id="home" className="relative z-10 min-h-screen px-4 pb-20 pt-32 sm:pt-36">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-[8px] border border-emerald-500/30 bg-emerald-400/10 px-3 py-2 text-sm font-semibold text-emerald-800 dark:text-emerald-200">
            <Sparkles size={16} />
            Computer Science Student Developer
          </div>
          <h1 className="font-display text-5xl font-bold leading-[1.05] text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>
          <div className="mt-5 h-10 overflow-hidden font-display text-2xl font-semibold text-cyan-700 dark:text-cyan-200 sm:text-3xl">
            <motion.div
              animate={{ y: ["0%", "-20%", "-40%", "-60%", "-80%", "0%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            >
              {profile.roles.map((role) => (
                <div className="h-10" key={role}>
                  {role}
                </div>
              ))}
            </motion.div>
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 dark:text-slate-300">{profile.tagline}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#projects" className="btn-primary">
              View Projects
              <ArrowDown size={18} />
            </a>
            <a href={profile.cvPath} download className="btn-secondary">
              Download CV
              <Download size={18} />
            </a>
            <a href="#contact" className="btn-quiet">
              Contact Me
              <Mail size={18} />
            </a>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
            {statItems.map((item) => (
              <div
                key={item.label}
                className="rounded-[8px] border border-slate-200/80 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.06]"
              >
                <div className="font-display text-2xl font-bold text-slate-950 dark:text-white">{item.value}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-md"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
        >
          <div className="absolute -inset-3 rounded-[8px] border border-cyan-400/30 bg-gradient-to-br from-cyan-400/15 via-transparent to-amber-300/15 blur-xl" />
          <div className="relative overflow-hidden rounded-[8px] border border-white/40 bg-white/75 p-3 shadow-panel backdrop-blur-xl dark:border-white/15 dark:bg-white/[0.08]">
            <img
              src={profile.portrait}
              alt="Professional portrait of Aljun C. Cursiga"
              className="aspect-[4/5] w-full rounded-[6px] object-cover object-center"
            />
            <div className="absolute inset-x-3 bottom-3 rounded-b-[6px] border-t border-white/30 bg-slate-950/75 p-4 text-white backdrop-blur-md">
              <p className="font-display text-lg font-semibold">{profile.role}</p>
              <p className="mt-1 text-sm text-cyan-100">Code, design, systems, and publication craft.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
