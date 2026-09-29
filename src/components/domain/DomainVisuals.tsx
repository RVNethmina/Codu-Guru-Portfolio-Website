"use client";

import { motion } from "motion/react";
import {
  AlertTriangle,
  BookOpen,
  Bot,
  Check,
  Frown,
  Gamepad2,
  GraduationCap,
  Play,
  Sparkles,
  Users,
  Wrench,
  X,
  XCircle,
} from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";

/* ---------------- Literature: orbiting research directions ---------------- */

const topics = [
  { icon: Wrench, label: "Error repair", color: "#f43f5e", angle: -90 },
  { icon: Bot, label: "AI assistants", color: "#0ea5e9", angle: 0 },
  { icon: GraduationCap, label: "Adaptive tutoring", color: "#10b981", angle: 90 },
  { icon: Users, label: "Pair programming", color: "#f59e0b", angle: 180 },
];

export function LiteratureVisual() {
  const R = 138;
  return (
    <div className="relative mx-auto size-[360px]">
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-[42px] border-white/15 rounded-full border border-dashed border-white/10" />
        <svg className="absolute inset-0" viewBox="0 0 360 360">
          {topics.map((t, i) => {
            const rad = (t.angle * Math.PI) / 180;
            return (
              <motion.line
                key={t.label}
                x1="180"
                y1="180"
                x2={180 + 100 * Math.cos(rad)}
                y2={180 + 100 * Math.sin(rad)}
                stroke={t.color}
                strokeOpacity="0.4"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
              />
            );
          })}
        </svg>

        {topics.map((t, i) => {
          const rad = (t.angle * Math.PI) / 180;
          const x = 180 + R * Math.cos(rad);
          const y = 180 + R * Math.sin(rad);
          return (
            <motion.div
              key={t.label}
              className="absolute size-0"
              style={{ left: x, top: y }}
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.12, type: "spring" }}
                className="absolute top-0 left-0 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
              >
                <span
                  className="grid size-12 place-items-center rounded-xl border bg-surface"
                  style={{ borderColor: `${t.color}55`, color: t.color, boxShadow: `0 0 24px ${t.color}33` }}
                >
                  <t.icon className="size-5" />
                </span>
                <span className="text-[10px] font-semibold tracking-wider whitespace-nowrap text-slate-400 uppercase">{t.label}</span>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="absolute top-1/2 left-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-brand shadow-[0_0_50px_rgba(99,102,241,0.6)]"
      >
        <BookOpen className="size-9 text-white" />
      </motion.div>
      <motion.div
        className="absolute top-1/2 left-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border-violet"
        animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      />
    </div>
  );
}

/* ---------------- Problem: the run → fail → frustration loop ---------------- */

const loop = [
  { icon: Play, label: "Run", color: "#0ea5e9" },
  { icon: XCircle, label: "Fail", color: "#f43f5e" },
  { icon: Frown, label: "Frustration", color: "#f59e0b" },
];

export function ProblemVisual() {
  const R = 110;
  return (
    <div className="relative mx-auto size-[320px]">
      <svg className="absolute inset-0" viewBox="0 0 320 320">
        <circle cx="160" cy="160" r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="2" />
        <motion.circle
          cx="160"
          cy="160"
          r={R}
          fill="none"
          stroke="url(#loopGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * R * 0.22} ${2 * Math.PI * R}`}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <defs>
          <linearGradient id="loopGrad">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
        </defs>
      </svg>
      {loop.map((n, i) => {
        const a = ((-90 + i * 120) * Math.PI) / 180;
        return (
          <motion.div
            key={n.label}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
            style={{ left: 160 + R * Math.cos(a), top: 160 + R * Math.sin(a) }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 1 }}
          >
            <span className="grid size-12 place-items-center rounded-full border-2 bg-ink" style={{ borderColor: n.color, color: n.color }}>
              <n.icon className="size-5" />
            </span>
            <span className="text-[11px] font-semibold text-slate-300">{n.label}</span>
          </motion.div>
        );
      })}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          className="font-display text-4xl font-bold text-rose-400"
        >
          30–50%
        </motion.div>
        <p className="mt-1 max-w-[130px] text-[11px] leading-tight text-slate-400">withdrawal &amp; failure in intro programming</p>
      </div>
    </div>
  );
}

/* ---------------- Gap: capability matrix ---------------- */

const cols = ["Real-time", "Explains", "Adaptive", "Collab", "Integrated"];
const rows: { name: string; v: boolean[]; hl?: boolean }[] = [
  { name: "Linters / static tools", v: [true, false, false, false, false] },
  { name: "AI code assistants", v: [true, false, false, false, false] },
  { name: "Error repair (TRACER)", v: [false, false, false, false, false] },
  { name: "Monitoring (CodeDive)", v: [true, false, false, false, false] },
  { name: "Learning dashboards", v: [false, false, true, false, false] },
  { name: "Code Guru", v: [true, true, true, true, true], hl: true },
];

export function GapVisual() {
  return (
    <div className="w-full max-w-[460px] overflow-x-auto">
      <table className="w-full text-left text-[12.5px]">
        <thead>
          <tr>
            <th className="pb-3 font-medium text-slate-500" />
            {cols.map((c) => (
              <th key={c} className="px-1 pb-3 text-center font-medium tracking-wide text-slate-400">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <motion.tr
              key={r.name}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: ri * 0.08 }}
              className={r.hl ? "bg-gradient-to-r from-violet/20 to-sky/10" : "border-t border-white/5"}
            >
              <td className={`py-2.5 pr-2 pl-2 whitespace-nowrap ${r.hl ? "rounded-l-lg font-bold text-white" : "text-slate-300"}`}>
                {r.hl && <LogoMark className="mr-1.5 inline size-4 align-[-3px]" />}
                {r.name}
              </td>
              {r.v.map((ok, ci) => (
                <td key={ci} className={`py-2.5 text-center ${r.hl && ci === r.v.length - 1 ? "rounded-r-lg" : ""}`}>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + ri * 0.08 + ci * 0.05, type: "spring", stiffness: 300 }}
                    className={`inline-grid size-5 place-items-center rounded-full ${
                      ok ? (r.hl ? "bg-emerald-400 text-ink" : "bg-emerald-500/20 text-emerald-400") : "bg-white/5 text-slate-600"
                    }`}
                  >
                    {ok ? <Check className="size-3" strokeWidth={3} /> : <X className="size-3" />}
                  </motion.span>
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------- Objectives: four components around one learner ---------------- */

const quads = [
  { label: "Code Coach", sub: "detect", color: "#8b5cf6", icon: AlertTriangle },
  { label: "Study Guider", sub: "teach", color: "#0ea5e9", icon: BookOpen },
  { label: "PairPath", sub: "collaborate", color: "#10b981", icon: Users },
  { label: "Gamification", sub: "motivate", color: "#f59e0b", icon: Gamepad2 },
];

export function ObjectivesVisual() {
  return (
    <div className="relative mx-auto size-[320px]">
      {[150, 110, 70].map((r, i) => (
        <motion.div
          key={r}
          className="absolute top-1/2 left-1/2 rounded-full border border-white/10"
          style={{ width: r * 2, height: r * 2, marginLeft: -r, marginTop: -r }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1, type: "spring" }}
        />
      ))}
      <motion.div
        className="absolute top-1/2 left-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "conic-gradient(from 0deg, transparent 0deg, rgba(139,92,246,0.35) 40deg, transparent 80deg)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />
      {quads.map((q, i) => {
        const a = ((-135 + i * 90) * Math.PI) / 180;
        return (
          <motion.div
            key={q.label}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{ left: 160 + 112 * Math.cos(a), top: 160 + 112 * Math.sin(a) }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.12, type: "spring" }}
          >
            <span className="grid size-11 place-items-center rounded-xl bg-ink" style={{ color: q.color, boxShadow: `0 0 0 1px ${q.color}66, 0 0 20px ${q.color}44` }}>
              <q.icon className="size-5" />
            </span>
            <span className="mt-1 text-[11px] font-bold text-white">{q.label}</span>
            <span className="font-mono text-[10px]" style={{ color: q.color }}>
              {q.sub}()
            </span>
          </motion.div>
        );
      })}
      <div className="absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-surface ring-2 ring-violet/60">
        <Sparkles className="size-6 text-violet" />
      </div>
    </div>
  );
}

/* ---------------- Methodology: measured pipeline ---------------- */

const steps = [
  "Generate verified synthetic corpus",
  "Hold out hand-written code",
  "Train LR · RF · SVM",
  "Select by validation F1",
  "Calibrate per-type thresholds",
  "Gate per candidate, not per file",
];

export function MethodologyVisual() {
  return (
    <div className="relative w-full max-w-[380px] pl-8">
      <div className="absolute top-3 bottom-3 left-[13px] w-[2px] bg-white/10" />
      <motion.div
        className="absolute top-3 left-[13px] w-[2px] bg-gradient-to-b from-violet via-indigo to-sky"
        initial={{ height: 0 }}
        animate={{ height: "calc(100% - 24px)" }}
        transition={{ duration: 2.4, ease: "easeInOut" }}
      />
      <ol className="space-y-3">
        {steps.map((s, i) => (
          <motion.li
            key={s}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.36 }}
            className="relative"
          >
            <motion.span
              className="absolute top-1/2 -left-8 grid size-7 -translate-y-1/2 place-items-center rounded-full border-2 border-indigo bg-ink font-mono text-[11px] font-bold text-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + i * 0.36, type: "spring" }}
            >
              {i + 1}
            </motion.span>
            <div className="ml-3 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2 font-mono text-[12px] text-slate-300">{s}</div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

/* ---------------- Technologies: layered stack ---------------- */

const layers = [
  { name: "Editor", items: ["VS Code API", "TypeScript", "CodeLens"], color: "#0ea5e9" },
  { name: "Portal", items: ["Next.js", "React", "Socket.IO"], color: "#8b5cf6" },
  { name: "Services", items: ["FastAPI", "Node.js", "Tree-sitter"], color: "#6366f1" },
  { name: "Intelligence", items: ["scikit-learn", "XGBoost", "LangChain"], color: "#f59e0b" },
  { name: "Data", items: ["Neo4j", "PostgreSQL", "Firestore"], color: "#10b981" },
  { name: "Cloud", items: ["Docker", "Cloud Run", "JWT · Argon2id"], color: "#f43f5e" },
];

export function TechnologiesVisual() {
  return (
    <div className="w-full max-w-[420px] space-y-2">
      {layers.map((l, i) => (
        <motion.div
          key={l.name}
          initial={{ opacity: 0, y: -24, rotateX: 50 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: i * 0.1, type: "spring", stiffness: 140, damping: 16 }}
          className="flex items-center gap-3 rounded-xl border bg-ink/60 px-3 py-2"
          style={{ borderColor: `${l.color}40` }}
        >
          <span className="w-20 shrink-0 font-mono text-[10.5px] font-bold tracking-wider uppercase" style={{ color: l.color }}>
            {l.name}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {l.items.map((it) => (
              <span key={it} className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-slate-300">
                {it}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
