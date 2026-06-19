import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpDown, CheckCircle2, CircleDot, Code2, ExternalLink, Layers3, Search, X } from "lucide-react";
import SectionHeader from "./SectionHeader.jsx";
import { projectFilters, projects } from "../data/projects.js";

const statusClasses = {
  Active: "bg-cyan-300/90 text-cyan-950",
  Concept: "bg-amber-400/90 text-amber-950",
  Prototype: "bg-indigo-400/90 text-indigo-950",
  Live: "bg-emerald-400/90 text-emerald-950",
};

const statusPriority = { Live: 0, Active: 1, Prototype: 2, Concept: 3 };

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState("featured");
  const [selectedProject, setSelectedProject] = useState(null);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const projectTriggerRef = useRef(null);

  const closeSelectedProject = () => {
    setSelectedProject(null);
    window.requestAnimationFrame(() => projectTriggerRef.current?.focus());
  };

  const visibleProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const matchingProjects = projects.filter((project) => {
      const matchesFilter = activeFilter === "All" || project.filters.includes(activeFilter);
      const searchableText = [project.title, project.type, project.description, ...project.tech].join(" ").toLowerCase();
      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
      return matchesFilter && matchesQuery;
    });

    if (sortMode === "name") {
      return [...matchingProjects].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortMode === "status") {
      return [...matchingProjects].sort((a, b) => statusPriority[a.status] - statusPriority[b.status]);
    }
    return matchingProjects;
  }, [activeFilter, query, sortMode]);

  useEffect(() => {
    if (!selectedProject) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeSelectedProject();
    };
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProject]);

  const keepDialogFocusContained = (event) => {
    if (event.key !== "Tab" || !dialogRef.current) return;
    const focusableElements = dialogRef.current.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement?.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement?.focus();
    }
  };

  return (
    <section id="projects" className="relative z-10 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Projects" title="Selected work and system concepts">
          A mix of academic systems, business websites, design concepts, and portfolio work with room for future live
          links.
        </SectionHeader>

        <div className="mb-8 grid gap-5 border-y border-slate-200/80 py-5 dark:border-white/10">
          <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
            <label className="relative block">
              <span className="sr-only">Search projects</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects or technologies"
                className="w-full rounded-[8px] border border-slate-200 bg-white/80 py-3 pl-11 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
                  aria-label="Clear project search"
                >
                  <X size={16} />
                </button>
              )}
            </label>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400" aria-live="polite">
              {visibleProjects.length} {visibleProjects.length === 1 ? "project" : "projects"} shown
            </p>
          </div>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2" aria-label="Filter projects by category">
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
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <ArrowUpDown size={16} aria-hidden="true" />
              <span>Sort</span>
              <select
                value={sortMode}
                onChange={(event) => setSortMode(event.target.value)}
                className="rounded-[8px] border border-slate-200 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-800 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/10 dark:bg-[#0b1d2b] dark:text-white"
              >
                <option value="featured">Featured order</option>
                <option value="name">Name A-Z</option>
                <option value="status">Most complete</option>
              </select>
            </label>
          </div>
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
                <span
                  className={`absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${statusClasses[project.status]}`}
                >
                  <CircleDot size={12} />
                  {project.status}
                </span>
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
                    onClick={(event) => {
                      projectTriggerRef.current = event.currentTarget;
                      setSelectedProject(project);
                    }}
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

        {visibleProjects.length === 0 && (
          <div className="border-y border-slate-200/80 py-12 text-center dark:border-white/10">
            <p className="font-display text-xl font-semibold text-slate-950 dark:text-white">No matching projects yet</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveFilter("All");
                setSortMode("featured");
              }}
              className="mt-3 text-sm font-semibold text-cyan-700 hover:underline dark:text-cyan-300"
            >
              Reset project filters
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSelectedProject}
          >
            <motion.article
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              aria-describedby="project-dialog-description"
              className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[8px] border border-white/15 bg-white p-6 shadow-panel dark:bg-[#071827] sm:p-8"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              onClick={(event) => event.stopPropagation()}
              onKeyDown={keepDialogFocusContained}
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                      {selectedProject.type}
                    </p>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${statusClasses[selectedProject.status]}`}
                    >
                      <CircleDot size={12} />
                      {selectedProject.status}
                    </span>
                  </div>
                  <h3 id="project-dialog-title" className="mt-2 font-display text-3xl font-bold text-slate-950 dark:text-white">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  className="icon-command flex-none"
                  onClick={closeSelectedProject}
                  aria-label="Close project details"
                >
                  <X size={18} />
                </button>
              </div>
              <img src={selectedProject.image} alt="" className="mt-6 aspect-[16/8] w-full rounded-[8px] object-cover" />
              <p id="project-dialog-description" className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-300">
                {selectedProject.description}
              </p>
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
