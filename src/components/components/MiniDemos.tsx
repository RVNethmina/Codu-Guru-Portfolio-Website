"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { BookOpen, Check, Compass, Keyboard, Lightbulb, Target, Trophy, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/** Steps through 0..n-1 every `ms` while the element is on screen. */
function useTick(n: number, ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setStep((s) => (s + 1) % n), ms);
    return () => clearInterval(id);
  }, [inView, n, ms]);
  return { ref, step };
}

const screen = "relative h-44 overflow-hidden rounded-2xl border border-white/5 bg-[#0b1020] p-4";

/* ---------- Code Coach ---------- */

const coachHints = [
  { icon: Lightbulb, label: "Concept", color: "#f59e0b" },
  { icon: Compass, label: "Guidance", color: "#0ea5e9" },
  { icon: Target, label: "Targeted", color: "#8b5cf6" },
];

export function CoachMini() {
  const { ref, step } = useTick(5, 1300);
  return (
    <div ref={ref} className={screen}>
      <div className="font-mono text-[12px] leading-6">
        <div className="text-slate-500">
          <span className="mr-3 text-slate-700">12</span>
          <span className="text-[#c792ea]">switch</span> (day) {"{"}
        </div>
        <div className="text-slate-300">
          <span className="mr-3 text-slate-700">13</span>
          {"  "}
          <span className="text-[#c792ea]">case</span> <span className="text-[#f78c6c]">1</span>: <span className={step > 0 ? "squiggle" : ""}>name = &quot;Mon&quot;;</span>
        </div>
        <div className="text-slate-300">
          <span className="mr-3 text-slate-700">14</span>
          {"  "}
          <span className="text-[#c792ea]">case</span> <span className="text-[#f78c6c]">2</span>: name = <span className="text-[#c3e88d]">&quot;Tue&quot;</span>;
        </div>
      </div>
      <div className="absolute inset-x-4 bottom-4 flex gap-2">
        {coachHints.map((h, i) => (
          <motion.span
            key={h.label}
            animate={{ opacity: step > i + 1 ? 1 : 0.25, y: step > i + 1 ? 0 : 6, scale: step === i + 2 ? 1.06 : 1 }}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border py-1.5 text-[11px] font-semibold"
            style={{ borderColor: `${h.color}55`, color: h.color, background: `${h.color}14` }}
          >
            <h.icon className="size-3.5" />
            {h.label}
          </motion.span>
        ))}
      </div>
      <AnimatePresence>
        {step > 0 && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-3 right-3 rounded-md bg-rose-500/15 px-2 py-0.5 font-mono text-[10px] text-rose-300"
          >
            missing break · p=0.996
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Study Guider ---------- */

export function GuiderMini() {
  const { ref, step } = useTick(7, 900);
  const strikes = Math.min(step, 3);
  return (
    <div ref={ref} className={screen}>
      <p className="font-mono text-[10.5px] tracking-wider text-slate-500 uppercase">concept: arrays</p>
      <div className="mt-2 flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ scale: strikes > i ? 1 : 0.7, opacity: strikes > i ? 1 : 0.2 }}
            className="grid size-8 place-items-center rounded-lg bg-rose-500/15 text-rose-400"
          >
            <X className="size-4" strokeWidth={3} />
          </motion.span>
        ))}
        <span className="ml-auto self-center font-mono text-[10.5px] text-slate-500">{strikes}/3 strikes</span>
      </div>
      <AnimatePresence>
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 rounded-xl border border-sky/30 bg-sky/10 p-2.5"
          >
            <div className="flex items-center gap-2 text-[12px] font-semibold text-sky-200">
              <BookOpen className="size-3.5" /> Micro-lesson: why indexes stop at length − 1
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="flex items-center gap-1 rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] text-emerald-300">
                {step >= 5 ? <Check className="size-3" /> : "…"} quiz
              </span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                <motion.div className="h-full bg-gradient-to-r from-sky to-emerald-400" animate={{ width: step >= 5 ? "82%" : "35%" }} transition={{ duration: 0.8 }} />
              </div>
              <span className="font-mono text-[10px] text-slate-400">mastery</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- PairPath ---------- */

const states = [
  { label: "Productive", color: "#10b981", a: [0.7, 0.6] },
  { label: "Driver dominance", color: "#f59e0b", a: [0.95, 0.1] },
  { label: "Passive navigator", color: "#0ea5e9", a: [0.6, 0.05] },
  { label: "Logic struggle", color: "#8b5cf6", a: [0.3, 0.4] },
  { label: "Disengaged", color: "#f43f5e", a: [0.05, 0.05] },
];

export function PairMini() {
  const { ref, step } = useTick(5, 1700);
  const s = states[step];
  return (
    <div ref={ref} className={screen}>
      <div className="space-y-3">
        {["Driver", "Navigator"].map((role, i) => (
          <div key={role} className="flex items-center gap-3">
            <span className={`grid size-8 place-items-center rounded-full text-[11px] font-bold text-white ${i ? "bg-sky/70" : "bg-violet/70"}`}>
              {role[0]}
            </span>
            <div className="flex-1">
              <div className="mb-1 flex items-center justify-between text-[10.5px] text-slate-400">
                <span>{role}</span>
                <Keyboard className="size-3" />
              </div>
              <div className="flex h-5 items-end gap-[3px]">
                {Array.from({ length: 22 }).map((_, k) => (
                  <motion.span
                    key={k}
                    className="w-full rounded-sm"
                    style={{ background: i ? "#0ea5e9" : "#8b5cf6" }}
                    animate={{ height: `${Math.max(8, s.a[i] * 100 * (0.4 + (((k * 37 + step * 11) % 10) / 10) * 0.6))}%` }}
                    transition={{ duration: 0.5 }}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2">
        <span className="font-mono text-[10px] text-slate-500">XGBoost · 180 s window</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
            style={{ color: s.color, background: `${s.color}1f` }}
          >
            ● {s.label}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- Gamification ---------- */

const blocks = ["for (int i = 0; i < n; i++)", "if (a[i] > max)", "max = a[i];"];
const orders = [
  [2, 0, 1],
  [0, 2, 1],
  [0, 1, 2],
];

export function GameMini() {
  const { ref, step } = useTick(5, 1100);
  const order = orders[Math.min(step, 2)];
  const solved = step >= 2;
  return (
    <div ref={ref} className={screen}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10.5px] tracking-wider text-slate-500 uppercase">drag &amp; drop · level {solved && step >= 3 ? 4 : 3}</span>
        <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-300">
          <Trophy className="size-3.5" /> {solved ? 240 : 180} XP
        </span>
      </div>
      <div className="mt-3 space-y-1.5">
        {order.map((b) => (
          <motion.div
            key={b}
            layout
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className={`rounded-lg border px-3 py-1.5 font-mono text-[11.5px] ${
              solved ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200" : "border-white/10 bg-white/[0.04] text-slate-300"
            }`}
            style={{ marginLeft: blocks.indexOf(blocks[b]) * 14 }}
          >
            {blocks[b]}
          </motion.div>
        ))}
      </div>
      <div className="absolute inset-x-4 bottom-3 h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div className="h-full bg-gradient-to-r from-amber-400 to-rose-400" animate={{ width: solved ? "100%" : `${30 + step * 20}%` }} />
      </div>
    </div>
  );
}
