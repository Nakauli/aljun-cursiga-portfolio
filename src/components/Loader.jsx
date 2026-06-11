import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[60] grid place-items-center bg-[#06131f]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeInOut" } }}
    >
      <motion.div
        className="relative flex h-28 w-28 items-center justify-center rounded-[8px] border border-cyan-300/40 bg-white/5 font-display text-2xl font-bold text-cyan-100 shadow-glow"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        AC
        <motion.span
          className="absolute inset-x-4 bottom-5 h-px bg-cyan-300"
          animate={{ scaleX: [0.25, 1, 0.25], opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}
