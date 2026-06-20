import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import AnimatedBackground from "./components/AnimatedBackground.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import EngineeringProof from "./components/EngineeringProof.jsx";
import Experience from "./components/Experience.jsx";
import Learning from "./components/Learning.jsx";
import Process from "./components/Process.jsx";
import Updates from "./components/Updates.jsx";
import Services from "./components/Services.jsx";
import Faq from "./components/Faq.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import BackToTop from "./components/BackToTop.jsx";
import Loader from "./components/Loader.jsx";

const IndustryStack = lazy(() => import("./components/IndustryStack.jsx"));

const getInitialTheme = () => {
  if (typeof window === "undefined") return "dark";
  const storedTheme = window.localStorage.getItem("theme");
  if (storedTheme) return storedTheme;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [loading, setLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const themeConfig = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((current) => (current === "dark" ? "light" : "dark")),
    }),
    [theme],
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setLoading(false);
      return undefined;
    }
    const timer = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-950 antialiased transition-colors duration-500 dark:bg-[#06131f] dark:text-slate-50">
        <AnimatePresence>{loading && <Loader />}</AnimatePresence>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ScrollProgress />
        <AnimatedBackground />
        <Navbar themeConfig={themeConfig} />
        <main id="main-content">
          <Hero />
          <About />
          <Skills />
          <Suspense
            fallback={
              <section id="industry-stack" className="relative z-10 px-4 py-24">
                <div className="mx-auto max-w-6xl border-y border-slate-200/80 py-12 text-center dark:border-white/10">
                  <p className="font-display text-xl font-bold text-slate-950 dark:text-white">Loading industry stack...</p>
                </div>
              </section>
            }
          >
            <IndustryStack />
          </Suspense>
          <Projects />
          <EngineeringProof />
          <Experience />
          <Learning />
          <Process />
          <Updates />
          <Services />
          <Faq />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
        <motion.div
          className="pointer-events-none fixed inset-x-0 bottom-0 z-[1] h-24 bg-gradient-to-t from-slate-50 to-transparent dark:from-[#06131f]"
          aria-hidden="true"
        />
      </div>
    </MotionConfig>
  );
}
