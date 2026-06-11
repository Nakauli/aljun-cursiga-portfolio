import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Code2, ExternalLink, Layers3 } from "lucide-react";
import SectionHeader from "./SectionHeader.jsx";
import { projectFilters, projects } from "../data/projects.js";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const visibleProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.filters.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section id="projects" className="relative z-10 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Projects" title="Selected work and system concepts">
          A mix of academic systems, business websites, design concepts, and portfolio work with room for future live
          links.
        </SectionHeader>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {projectFilters.map((filter) => (
            <button
              type="button"
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-[8px] border px-4 py-2 text-sm font-semibold transition ${
                activeFilter === filter
                  ? "border-cyan-500 bg-cyan-500 text-white shadow-glow"
                  : "border-slate-200 bg-white/70 text-slate-700 hover:border-cyan-400 hover:text-cyan-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200 dark:hover:border-cyan-300"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <motion.article
              layout
              key={project.title}
              className="group overflow-hidden rounded-[8px] border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-glow dark:border-white/10 dark:bg-white/[0.065]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.04 }}
              whileHover={{ rotateX: 1.5, rotateY: -1.5 }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} project preview`}
                  className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/75 to-transparent p-4">
                  <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-900">{project.type}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-semibold text-slate-950 dark:text-white">{project.title}</h3>
                <p className="mt-3 min-h-28 text-sm leading-7 text-slate-600 dark:text-slate-300">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-3 gap-2">
                  <button type="button" className="icon-command" aria-label={`View details for ${project.title}`}>
                    <Layers3 size={17} />
                  </button>
                  <button type="button" className="icon-command" aria-label={`Open live demo for ${project.title}`}>
                    <ExternalLink size={17} />
                  </button>
                  <button type="button" className="icon-command" aria-label={`Open source code for ${project.title}`}>
                    <Code2 size={17} />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
