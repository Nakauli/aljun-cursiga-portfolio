import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-cyan-400 via-emerald-300 to-amber-300"
      style={{ scaleX: prefersReducedMotion ? scrollYProgress : scaleX }}
      aria-hidden="true"
    />
  );
}
