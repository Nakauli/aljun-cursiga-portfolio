import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Code2, ExternalLink, Layers3, X } from "lucide-react";
import SectionHeader from "./SectionHeader.jsx";
import { projectFilters, projects } from "../data/projects.js";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const visibleProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.filters.includes(activeFilter));
  }, [activeFilter]);

  useEffect(() => {
    if (!selectedProject) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProject]);

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
                  loading="lazy"
                  decoding="async"
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
                  <button
                    type="button"
                    className="icon-command"
                    aria-label={`View details for ${project.title}`}
                    onClick={() => setSelectedProject(project)}
                  >
                    <Layers3 size={17} />
                  </button>
                  <a
                    className={`icon-command ${!project.liveUrl ? "pointer-events-none opacity-40" : ""}`}
                    aria-label={project.liveUrl ? `Open live demo for ${project.title}` : `Live demo unavailable for ${project.title}`}
                    href={project.liveUrl || undefined}
                    target={project.liveUrl ? "_blank" : undefined}
                    rel={project.liveUrl ? "noreferrer" : undefined}
                    aria-disabled={!project.liveUrl}
                  >
                    <ExternalLink size={17} />
                  </a>
                  <a
                    className={`icon-command ${!project.sourceUrl ? "pointer-events-none opacity-40" : ""}`}
                    aria-label={project.sourceUrl ? `Open source code for ${project.title}` : `Source code unavailable for ${project.title}`}
                    href={project.sourceUrl || undefined}
                    target={project.sourceUrl ? "_blank" : undefined}
                    rel={project.sourceUrl ? "noreferrer" : undefined}
                    aria-disabled={!project.sourceUrl}
                  >
                    <Code2 size={17} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.article
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[8px] border border-white/15 bg-white p-6 shadow-panel dark:bg-[#071827] sm:p-8"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                    {selectedProject.type}
                  </p>
                  <h3 id="project-dialog-title" className="mt-2 font-display text-3xl font-bold text-slate-950 dark:text-white">
                    {selectedProject.title}
                  </h3>
                </div>
                <button type="button" className="icon-command flex-none" onClick={() => setSelectedProject(null)} aria-label="Close project details">
                  <X size={18} />
                </button>
              </div>
              <img src={selectedProject.image} alt="" className="mt-6 aspect-[16/8] w-full rounded-[8px] object-cover" />
              <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-300">{selectedProject.description}</p>
              <div className="mt-6 rounded-[8px] border border-cyan-400/25 bg-cyan-400/10 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">Project goal</p>
                <p className="mt-2 font-medium leading-7 text-slate-800 dark:text-slate-100">{selectedProject.goal}</p>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {selectedProject.highlights.map((highlight) => (
                  <div key={highlight} className="flex gap-2 rounded-[8px] border border-slate-200 p-4 text-sm leading-6 text-slate-700 dark:border-white/10 dark:text-slate-200">
                    <CheckCircle2 className="mt-0.5 flex-none text-emerald-500" size={18} />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
