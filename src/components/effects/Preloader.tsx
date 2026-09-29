"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/ui/Logo";

const lines = [
  { text: "$ javac CodeGuru.java", color: "text-slate-300" },
  { text: "  parsing with tree-sitter ........ ok", color: "text-slate-500" },
  { text: "  loading hint catalog (15 types) .. ok", color: "text-slate-500" },
  { text: "  connecting learning events ....... ok", color: "text-slate-500" },
  { text: "✓ BUILD SUCCESSFUL — welcome!", color: "text-emerald-400" },
];

/** A short "compile" boot sequence shown once on first paint. */
export function Preloader() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timers = lines.map((_, i) => setTimeout(() => setStep(i + 1), 180 + i * 230));
    const end = setTimeout(() => {
      setDone(true);
      document.body.style.overflow = "";
    }, 180 + lines.length * 230 + 420);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(end);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="grid-bg absolute inset-0 mask-fade-y opacity-60" />
          <div className="relative w-[min(92vw,460px)]">
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 14 }}
              className="mx-auto mb-6 w-fit"
            >
              <LogoMark className="size-16 drop-shadow-[0_0_30px_rgba(139,92,246,0.7)]" />
            </motion.div>
            <div className="glass overflow-hidden rounded-xl">
              <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
                <span className="size-2.5 rounded-full bg-rose-500/80" />
                <span className="size-2.5 rounded-full bg-amber-400/80" />
                <span className="size-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-3 font-mono text-[11px] text-slate-500">terminal — code-guru</span>
              </div>
              <div className="min-h-[150px] space-y-1.5 p-4 font-mono text-[12.5px]">
                {lines.slice(0, step).map((l) => (
                  <motion.div key={l.text} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className={l.color}>
                    {l.text}
                  </motion.div>
                ))}
                {step < lines.length && <span className="inline-block h-4 w-2 animate-blink bg-violet" />}
              </div>
            </div>
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full bg-brand"
                initial={{ width: "0%" }}
                animate={{ width: `${(step / lines.length) * 100}%` }}
                transition={{ duration: 0.25 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
