import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { Cloud, Database, Layers3, SlidersHorizontal, Sparkles } from "lucide-react";
import { FaGithub, FaJava, FaJsSquare, FaNodeJs, FaPython, FaReact } from "react-icons/fa";
import {
  SiCplusplus,
  SiDocker,
  SiGnubash,
  SiGo,
  SiKotlin,
  SiOpenai,
  SiPostgresql,
  SiRust,
  SiSharp,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import SectionHeader from "./SectionHeader.jsx";
import { industryStackSources, industryStackTools, statusLabels } from "../data/industryStack.js";

const statusStyles = {
  current: "border-emerald-400/50 bg-emerald-400/10 text-emerald-700 dark:text-emerald-200",
  practicing: "border-cyan-400/50 bg-cyan-400/10 text-cyan-700 dark:text-cyan-200",
  exploring: "border-amber-400/60 bg-amber-400/10 text-amber-700 dark:text-amber-200",
};

const stackFilters = [
  { label: "All tools", value: "all" },
  { label: "Languages", value: "languages" },
  { label: "Using now", value: "current" },
  { label: "Practicing", value: "practicing" },
  { label: "Exploring next", value: "exploring" },
];

const iconMap = {
  "AI Coding Tools": SiOpenai,
  "AWS Cloud": Cloud,
  "Bash / Shell": SiGnubash,
  "C#": SiSharp,
  "C++": SiCplusplus,
  Docker: SiDocker,
  GitHub: FaGithub,
  Go: SiGo,
  Java: FaJava,
  JavaScript: FaJsSquare,
  Kotlin: SiKotlin,
  "Node.js": FaNodeJs,
  PostgreSQL: SiPostgresql,
  Python: FaPython,
  React: FaReact,
  Rust: SiRust,
  SQL: Database,
  "Tailwind CSS": SiTailwindcss,
  TypeScript: SiTypescript,
  Vercel: SiVercel,
};

const sceneToolNames = new Set([
  "JavaScript",
  "TypeScript",
  "Python",
  "React",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "GitHub",
  "AWS Cloud",
]);

function drawRoundedRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}

function createToolTexture(tool) {
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 220;
  const context = canvas.getContext("2d");
  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);

  gradient.addColorStop(0, "rgba(15, 23, 42, 0.92)");
  gradient.addColorStop(1, "rgba(8, 47, 73, 0.82)");

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.shadowColor = tool.color;
  context.shadowBlur = 14;
  context.fillStyle = gradient;
  drawRoundedRect(context, 22, 24, 596, 172, 36);
  context.fill();
  context.shadowBlur = 0;
  context.strokeStyle = tool.color;
  context.lineWidth = 4;
  context.globalAlpha = 0.82;
  context.stroke();
  context.globalAlpha = 1;

  context.fillStyle = tool.color;
  context.beginPath();
  context.arc(78, 84, 18, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = "#f8fafc";
  context.font = "700 48px Inter, Arial, sans-serif";
  context.fillText(tool.name, 118, 96);

  context.fillStyle = "rgba(226, 232, 240, 0.88)";
  context.font = "600 25px Inter, Arial, sans-serif";
  context.fillText(statusLabels[tool.status], 118, 142);

  context.fillStyle = "rgba(148, 163, 184, 0.9)";
  context.font = "600 21px Inter, Arial, sans-serif";
  context.fillText(tool.category.toUpperCase(), 430, 142);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function createParticlePositions(count) {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const seed = Math.sin(index * 91.13) * 10000;
    const angle = (index / count) * Math.PI * 2;
    const radius = 2.8 + (seed - Math.floor(seed)) * 4.2;
    positions[index * 3] = Math.cos(angle) * radius;
    positions[index * 3 + 1] = ((index % 11) - 5) * 0.32;
    positions[index * 3 + 2] = Math.sin(angle) * radius;
  }

  return positions;
}

function IndustryStackScene({ tools, totalTools }) {
  const canvasRef = useRef(null);
  const shellRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const shell = shellRef.current;
    if (!canvas || !shell) return undefined;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0.95, 8.8);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    const cyanLight = new THREE.PointLight(0x22d3ee, 7, 18);
    const amberLight = new THREE.PointLight(0xf59e0b, 4.5, 18);
    cyanLight.position.set(-4, 4, 5);
    amberLight.position.set(4, -2, 5);
    scene.add(ambientLight, cyanLight, amberLight);

    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    const coreGeometry = new THREE.IcosahedronGeometry(1.05, 2);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      emissive: 0x0891b2,
      emissiveIntensity: 0.35,
      metalness: 0.5,
      roughness: 0.32,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    orbitGroup.add(core);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.2,
    });

    [2.35, 3.25, 4.05].forEach((radius, index) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.012, 12, 160), ringMaterial.clone());
      ring.rotation.x = Math.PI / 2 + index * 0.32;
      ring.rotation.z = index * 0.28;
      orbitGroup.add(ring);
    });

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(createParticlePositions(150), 3));
    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({
        color: 0xcbd5e1,
        size: 0.035,
        transparent: true,
        opacity: 0.62,
      }),
    );
    orbitGroup.add(particles);

    const connectionMaterial = new THREE.LineBasicMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.17,
    });

    const sprites = tools.map((tool, index) => {
      const angle = (index / tools.length) * Math.PI * 2;
      const layerOffset = (index % 3) - 1;
      const radius = index % 2 === 0 ? 3.35 : 2.55;
      const position = new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle * 1.4) * 0.8 + layerOffset * 0.5,
        Math.sin(angle) * 2.1,
      );
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: createToolTexture(tool),
          transparent: true,
          depthWrite: false,
        }),
      );
      sprite.position.copy(position);
      sprite.scale.set(1.48, 0.51, 1);
      orbitGroup.add(sprite);

      const lineGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), position]);
      const line = new THREE.Line(lineGeometry, connectionMaterial.clone());
      orbitGroup.add(line);

      return sprite;
    });

    const targetRotation = { x: -0.12, y: 0.18 };
    const handlePointerMove = (event) => {
      if (prefersReducedMotion) return;
      const rect = shell.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetRotation.x = -0.12 + y * 0.26;
      targetRotation.y = 0.18 + x * 0.42;
    };

    const resize = () => {
      const rect = shell.getBoundingClientRect();
      const width = Math.max(320, rect.width);
      const height = Math.max(360, rect.height);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    let animationFrame = 0;
    const startedAt = window.performance.now();
    const getElapsedTime = () => (window.performance.now() - startedAt) / 1000;
    const render = () => {
      const elapsed = getElapsedTime();
      core.rotation.y = elapsed * 0.38;
      core.rotation.x = elapsed * 0.18;
      particles.rotation.y = -elapsed * 0.05;
      sprites.forEach((sprite, index) => {
        sprite.material.opacity = 0.82 + Math.sin(elapsed * 1.5 + index) * 0.08;
      });
      renderer.render(scene, camera);
    };

    const animate = () => {
      const elapsed = getElapsedTime();
      orbitGroup.rotation.x += (targetRotation.x - orbitGroup.rotation.x) * 0.045;
      orbitGroup.rotation.y += (targetRotation.y + elapsed * 0.09 - orbitGroup.rotation.y) * 0.035;
      render();
      animationFrame = window.requestAnimationFrame(animate);
    };

    resize();
    shell.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("resize", resize);

    if (prefersReducedMotion) {
      render();
    } else {
      animate();
    }

    return () => {
      shell.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => {
            if (material.map) material.map.dispose();
            material.dispose();
          });
        }
      });
      renderer.dispose();
    };
  }, [prefersReducedMotion, tools]);

  return (
    <div
      ref={shellRef}
      className="relative h-[440px] overflow-hidden rounded-[8px] border border-slate-200/80 bg-slate-950 shadow-panel dark:border-white/10 md:h-[520px]"
    >
      <div
        className="absolute inset-0 bg-[linear-gradient(135deg,rgba(8,47,73,0.95),rgba(15,23,42,0.9)_48%,rgba(20,83,45,0.76))]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:42px_42px]"
        aria-hidden="true"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 h-full w-full"
        role="img"
        aria-label="3D industry stack map showing Aljun's current, practicing, and exploring tools"
      />
      <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
        <span>Interactive stack map</span>
        <span>{totalTools} modern tools</span>
      </div>
    </div>
  );
}

export default function IndustryStack() {
  const [activeFilter, setActiveFilter] = useState("all");
  const sceneTools = useMemo(() => industryStackTools.filter((tool) => sceneToolNames.has(tool.name)), []);
  const statusCounts = useMemo(
    () =>
      industryStackTools.reduce((counts, tool) => {
        counts[tool.status] = (counts[tool.status] || 0) + 1;
        return counts;
      }, {}),
    [],
  );

  const featuredTools = industryStackTools.slice(0, 6);
  const visibleTools = useMemo(() => {
    if (activeFilter === "all") return industryStackTools;
    if (activeFilter === "languages") return industryStackTools.filter((tool) => tool.category === "Language");
    return industryStackTools.filter((tool) => tool.status === activeFilter);
  }, [activeFilter]);

  return (
    <section id="industry-stack" className="relative z-10 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Industry Stack" title="Modern tools I use, practice, and keep sharpening">
          A focused view of the languages, frameworks, databases, cloud tools, and workflows that align with current full-stack development.
        </SectionHeader>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-center">
          <IndustryStackScene tools={sceneTools} totalTools={industryStackTools.length} />

          <div className="space-y-6">
            <div className="border-y border-slate-200/80 py-5 dark:border-white/10">
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(statusLabels).map(([status, label]) => (
                  <div key={status} className="min-w-0">
                    <p className="font-display text-3xl font-bold text-slate-950 dark:text-white">
                      {statusCounts[status] || 0}
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-[8px] border border-cyan-400/40 bg-cyan-400/10 text-cyan-700 dark:text-cyan-200">
                  <Layers3 size={21} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-slate-950 dark:text-white">Full-stack direction</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    The stack shows where the portfolio is strongest today and what is being actively developed for professional work.
                  </p>
                </div>
              </div>

              <div className="grid gap-3">
                {featuredTools.map((tool) => {
                  const Icon = iconMap[tool.name] || Sparkles;
                  return (
                    <motion.article
                      key={tool.name}
                      className="group rounded-[8px] border border-slate-200/80 bg-white/75 p-4 shadow-sm transition hover:-translate-y-1 hover:border-cyan-400/60 dark:border-white/10 dark:bg-white/[0.055]"
                      initial={{ opacity: 0, x: 22 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.45 }}
                    >
                      <div className="flex items-start gap-4">
                        <span
                          className="grid h-11 w-11 shrink-0 place-items-center rounded-[8px] border border-slate-200 bg-white text-slate-700 transition group-hover:border-cyan-400 group-hover:text-cyan-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200"
                          style={{ color: tool.color === "#ffffff" ? undefined : tool.color }}
                        >
                          <Icon size={22} aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-display text-base font-bold text-slate-950 dark:text-white">{tool.name}</h4>
                            <span className={`rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${statusStyles[tool.status]}`}>
                              {statusLabels[tool.status]}
                            </span>
                          </div>
                          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{tool.focus}</p>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-y border-slate-200/80 py-5 dark:border-white/10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="text-cyan-700 dark:text-cyan-300" size={19} aria-hidden="true" />
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              Explore the stack
              <span className="ml-2 font-medium text-slate-500 dark:text-slate-400">
                {visibleTools.length} {visibleTools.length === 1 ? "tool" : "tools"}
              </span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="Filter industry stack">
            {stackFilters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                aria-pressed={activeFilter === filter.value}
                className={`rounded-[8px] border px-3 py-2 text-xs font-bold transition ${
                  activeFilter === filter.value
                    ? "border-cyan-500 bg-cyan-500 text-white"
                    : "border-slate-200 bg-white/70 text-slate-600 hover:border-cyan-400 hover:text-cyan-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300 dark:hover:text-cyan-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">
          {visibleTools.map((tool, index) => {
            const Icon = iconMap[tool.name] || Sparkles;
            return (
              <motion.article
                key={tool.name}
                className="rounded-[8px] border border-slate-200/80 bg-white/70 p-4 shadow-sm transition hover:-translate-y-1 hover:border-cyan-400/60 dark:border-white/10 dark:bg-white/[0.05]"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.42, delay: index * 0.025 }}
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span
                    className="grid h-10 w-10 place-items-center rounded-[8px] border border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200"
                    style={{ color: tool.color === "#ffffff" ? undefined : tool.color }}
                  >
                    <Icon size={21} aria-hidden="true" />
                  </span>
                  <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${statusStyles[tool.status]}`}>
                    {statusLabels[tool.status]}
                  </span>
                </div>
                <h3 className="font-display text-base font-bold text-slate-950 dark:text-white">{tool.name}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  {tool.category}
                </p>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3 border-y border-slate-200/80 py-5 text-sm text-slate-600 dark:border-white/10 dark:text-slate-300">
          <span className="font-bold text-slate-900 dark:text-white">Industry signals checked:</span>
          {industryStackSources.map((source) => (
            <a
              key={source.href}
              href={source.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-[8px] border border-slate-200 bg-white/70 px-3 py-2 font-semibold transition hover:border-cyan-400 hover:text-cyan-700 dark:border-white/10 dark:bg-white/[0.05] dark:hover:text-cyan-200"
            >
              {source.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
