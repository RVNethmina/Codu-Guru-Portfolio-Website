"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { CheckCircle2, Compass, FileCode2, Lightbulb, Loader2, Target } from "lucide-react";
import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";

type Seg = { t: string; c: string; bug?: boolean };
type Line = { indent: number; segs: Seg[] };

const K = "text-[#c792ea]"; // keyword
const T = "text-[#82aaff]"; // type
const N = "text-[#f78c6c]"; // number
const S = "text-[#c3e88d]"; // string / method
const P = "text-slate-400"; // punctuation
const I = "text-slate-200"; // identifier
const F = "text-[#ffcb6b]"; // field

const buggyLoop: Seg[] = [
  { t: "for", c: K },
  { t: " (", c: P },
  { t: "int", c: T },
  { t: " i = ", c: I },
  { t: "0", c: N },
  { t: "; ", c: P },
  { t: "i ", c: I, bug: true },
  { t: "<=", c: K, bug: true },
  { t: " marks", c: I, bug: true },
  { t: ".", c: P, bug: true },
  { t: "length", c: F, bug: true },
  { t: "; i++) {", c: P },
];

const fixedLoop: Seg[] = buggyLoop.map((s) => ({ ...s, t: s.t === "<=" ? "<" : s.t, bug: false }));

const baseLines: Line[] = [
  { indent: 0, segs: [{ t: "public class ", c: K }, { t: "Scores", c: T }, { t: " {", c: P }] },
  {
    indent: 1,
    segs: [
      { t: "public static void ", c: K },
      { t: "main", c: S },
      { t: "(", c: P },
      { t: "String", c: T },
      { t: "[] args) {", c: P },
    ],
  },
  {
    indent: 2,
    segs: [
      { t: "int", c: T },
      { t: "[] marks = {", c: I },
      { t: "72, 85, 64, 90", c: N },
      { t: "};", c: P },
    ],
  },
  { indent: 2, segs: [{ t: "int", c: T }, { t: " total = ", c: I }, { t: "0", c: N }, { t: ";", c: P }] },
  { indent: 2, segs: buggyLoop },
  { indent: 3, segs: [{ t: "total += marks[i]", c: I }, { t: ";", c: P }] },
  { indent: 2, segs: [{ t: "}", c: P }] },
  {
    indent: 2,
    segs: [
      { t: "System", c: T },
      { t: ".out.", c: P },
      { t: "println", c: S },
      { t: "(total);", c: P },
    ],
  },
  { indent: 1, segs: [{ t: "}", c: P }] },
  { indent: 0, segs: [{ t: "}", c: P }] },
];

const BUG_LINE = 4;

const hints = [
  {
    icon: Lightbulb,
    level: "Concept",
    color: "#f59e0b",
    text: "Array indexes start at 0, so the last valid index is always one less than the length.",
  },
  {
    icon: Compass,
    level: "Guidance",
    color: "#0ea5e9",
    text: "Look at the loop condition. For 4 marks, which values does i take — and is each one a real index?",
  },
  {
    icon: Target,
    level: "Targeted",
    color: "#8b5cf6",
    text: "Reconsider the comparison operator in  i <= marks.length.",
  },
];

type Phase = "typing" | "analyzing" | "flagged" | "hint1" | "hint2" | "hint3" | "fixing" | "resolved";

const totalChars = (lines: Line[]) => lines.reduce((n, l) => n + l.segs.reduce((m, s) => m + s.t.length, 0), 0);

type Laid = { visible: Seg[]; cursor: boolean; started: boolean };

/** Truncates the code to the first `budget` characters and marks where the typing cursor sits. */
function layoutLines(lines: Line[], budget: number): Laid[] {
  let left = budget;
  let cursorPlaced = false;
  return lines.map((line) => {
    const visible: Seg[] = [];
    for (const s of line.segs) {
      if (left <= 0) break;
      visible.push({ ...s, t: s.t.slice(0, left) });
      left -= s.t.length;
    }
    const cursor = !cursorPlaced && Number.isFinite(budget) && left <= 0 && visible.length > 0;
    if (cursor) cursorPlaced = true;
    return { visible, cursor, started: visible.length > 0 };
  });
}

/** Groups consecutive `bug` segments so one squiggle can underline them together. */
function groupSegs(segs: Seg[]): (Seg | Seg[])[] {
  const out: (Seg | Seg[])[] = [];
  for (const s of segs) {
    const last = out[out.length - 1];
    if (s.bug && Array.isArray(last)) last.push(s);
    else out.push(s.bug ? [s] : s);
  }
  return out;
}

export function CodeEditorDemo() {
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, { amount: 0.3 });
  const [chars, setChars] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [cycle, setCycle] = useState(0);

  const lines = useMemo(
    () => baseLines.map((l, i) => (i === BUG_LINE && (phase === "fixing" || phase === "resolved") ? { ...l, segs: fixedLoop } : l)),
    [phase],
  );
  const max = useMemo(() => totalChars(baseLines), []);

  // typing
  useEffect(() => {
    if (!inView || phase !== "typing") return;
    if (chars >= max) {
      const t = setTimeout(() => setPhase("analyzing"), 350);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setChars((c) => Math.min(max, c + 3)), 22);
    return () => clearTimeout(t);
  }, [chars, max, phase, inView]);

  // phase timeline
  useEffect(() => {
    if (!inView) return;
    const next: Partial<Record<Phase, [Phase, number]>> = {
      analyzing: ["flagged", 1100],
      flagged: ["hint1", 1400],
      hint1: ["hint2", 2600],
      hint2: ["hint3", 2600],
      hint3: ["fixing", 2800],
      fixing: ["resolved", 900],
    };
    if (phase === "resolved") {
      const t = setTimeout(() => {
        setChars(0);
        setPhase("typing");
        setCycle((c) => c + 1);
      }, 3200);
      return () => clearTimeout(t);
    }
    const n = next[phase];
    if (!n) return;
    const t = setTimeout(() => setPhase(n[0]), n[1]);
    return () => clearTimeout(t);
  }, [phase, inView]);

  const flagged = ["flagged", "hint1", "hint2", "hint3"].includes(phase);
  const hintCount = phase === "hint1" ? 1 : phase === "hint2" ? 2 : phase === "hint3" ? 3 : 0;

  const laid = layoutLines(lines, phase === "typing" ? chars : Infinity);

  return (
    <div ref={wrap} className="relative w-full">
      <div className="absolute -inset-6 rounded-[28px] bg-brand opacity-20 blur-3xl" aria-hidden />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020]/95 shadow-2xl shadow-black/50">
        {/* title bar */}
        <div className="flex items-center gap-2 border-b border-white/5 bg-[#0e1428] px-4 py-2.5">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <div className="ml-4 flex items-center gap-1.5 rounded-t-md border-x border-t border-white/5 bg-[#0b1020] px-3 py-1 font-mono text-[11px] text-slate-300">
            <FileCode2 className="size-3.5 text-[#f89820]" />
            Scores.java
            {phase === "typing" && <span className="ml-1 size-1.5 rounded-full bg-slate-400" />}
          </div>
          <span className="ml-auto hidden font-mono text-[10px] text-slate-500 sm:block">VS Code · Code Coach</span>
        </div>

        {/* code */}
        <div className="relative min-h-[300px] py-3 font-mono text-[12px] leading-[1.7] sm:text-[13px]">
          {lines.map((line, li) => {
            const { visible: vis, cursor: showCursor, started } = laid[li];
            const visible = started || phase !== "typing";
            return (
              <div
                key={li}
                className={clsx(
                  "flex pr-4 transition-colors",
                  li === BUG_LINE && flagged && "bg-rose-500/[0.07]",
                  li === BUG_LINE && phase === "resolved" && "bg-emerald-500/[0.07]",
                )}
              >
                <span className="w-10 shrink-0 pr-3 text-right text-slate-600 select-none">{visible ? li + 1 : ""}</span>
                <span style={{ paddingLeft: `${line.indent * 1.25}rem` }} className="whitespace-pre">
                  {groupSegs(vis).map((g, gi) =>
                    Array.isArray(g) ? (
                      <span key={gi} className={clsx(flagged && "squiggle")}>
                        {g.map((b, bi) => (
                          <span key={bi} className={b.c}>
                            {b.t}
                          </span>
                        ))}
                      </span>
                    ) : (
                      <span key={gi} className={g.c}>
                        {g.t}
                      </span>
                    ),
                  )}
                  {showCursor && <span className="ml-px inline-block h-[1.1em] w-[2px] translate-y-[3px] animate-blink bg-violet" />}
                </span>
                {li === BUG_LINE && flagged && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="ml-3 hidden truncate text-[11px] text-rose-400/80 italic md:inline"
                  >
                    ● off-by-one loop boundary
                  </motion.span>
                )}
              </div>
            );
          })}

          {/* hint card */}
          <AnimatePresence>
            {flagged && (
              <motion.div
                key={`card-${cycle}`}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="absolute top-[128px] right-3 left-10 z-10 rounded-xl border border-white/10 bg-[#131a33]/95 p-3 shadow-xl shadow-black/60 backdrop-blur sm:left-14"
              >
                <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2">
                  <span className="flex items-center gap-2 font-sans text-[12px] font-semibold text-white">
                    <span className="size-2 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
                    Off-by-one loop boundary
                  </span>
                  <span className="rounded bg-violet/15 px-1.5 py-0.5 font-mono text-[10px] text-violet">gate p = 0.99</span>
                </div>
                <div className="mt-2 space-y-1.5">
                  {hintCount === 0 && (
                    <p className="font-sans text-[11.5px] text-slate-400">Reveal hints one at a time — stop as soon as you understand.</p>
                  )}
                  {hints.slice(0, hintCount).map((h) => (
                    <motion.div
                      key={h.level}
                      initial={{ opacity: 0, x: -8, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: "auto" }}
                      className="flex gap-2 font-sans text-[11.5px] leading-snug"
                    >
                      <h.icon className="mt-0.5 size-3.5 shrink-0" style={{ color: h.color }} />
                      <span className="text-slate-300">
                        <b style={{ color: h.color }}>{h.level}: </b>
                        {h.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* status bar */}
        <div className="flex items-center justify-between bg-gradient-to-r from-violet/80 to-indigo/80 px-3 py-1 font-mono text-[10.5px] text-white">
          <span className="flex items-center gap-1.5">
            {phase === "analyzing" ? (
              <>
                <Loader2 className="size-3 animate-spin" /> Code Coach: Analyzing…
              </>
            ) : phase === "resolved" ? (
              <>
                <CheckCircle2 className="size-3" /> Resolved without seeing the answer
              </>
            ) : flagged ? (
              <>● 1 finding · {hintCount}/3 hints</>
            ) : (
              <>✓ Code Coach: Ready</>
            )}
          </span>
          <span className="opacity-80">Java · UTF-8</span>
        </div>
      </div>
    </div>
  );
}
