import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import SectionHeader from "./SectionHeader.jsx";
import { faqs } from "../data/faqs.js";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative z-10 px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeader eyebrow="FAQ" title="A few useful answers before we talk">
          Clear expectations make the first conversation more productive.
        </SectionHeader>

        <div className="border-t border-slate-200 dark:border-white/10">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <div key={faq.question} className="border-b border-slate-200 dark:border-white/10">
                <button
                  type="button"
                  className="flex w-full items-center gap-4 py-5 text-left"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                >
                  <span className="grid h-10 w-10 flex-none place-items-center rounded-[8px] bg-cyan-500/10 text-cyan-700 dark:text-cyan-300">
                    <MessageCircleQuestion size={18} aria-hidden="true" />
                  </span>
                  <span className="flex-1 font-display text-base font-semibold text-slate-950 dark:text-white sm:text-lg">{faq.question}</span>
                  <ChevronDown
                    className={`flex-none text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-cyan-600 dark:text-cyan-300" : ""}`}
                    size={19}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={answerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pl-14 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base sm:leading-8">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
