"use client";

import { motion, useInView } from "motion/react";
import { ArrowRight, Keyboard, Lightbulb, Network, ScanSearch, ShieldCheck, Timer, TreeDeciduous, Waypoints } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Node = { id: string; x: number; y: number; w: number; h: number; title: string; sub: string[]; color: string };

const nodes: Node[] = [
  { id: "ext", x: 20, y: 50, w: 220, h: 96, title: "VS Code Extension", sub: ["Code Coach · TypeScript", "squiggles · CodeLens · hints"], color: "#0ea5e9" },
  { id: "portal", x: 20, y: 300, w: 220, h: 96, title: "Web Portal", sub: ["Next.js · one account", "lessons · games · pairing"], color: "#8b5cf6" },
  { id: "api", x: 310, y: 160, w: 220, h: 126, title: "Code Coach API", sub: ["FastAPI · Tree-sitter", "calibrated ML gates", "identity: Argon2id · JWT"], color: "#6366f1" },
  { id: "sg", x: 680, y: 20, w: 240, h: 96, title: "Study Guider", sub: ["Random Forest · Graph RAG", "Neo4j skill graph"], color: "#0ea5e9" },
  { id: "pp", x: 680, y: 176, w: 240, h: 96, title: "PairPath", sub: ["Socket.IO · PostgreSQL", "XGBoost state classifier"], color: "#10b981" },
  { id: "ge", x: 680, y: 332, w: 240, h: 96, title: "Gamification Engine", sub: ["Node.js · rule-based", "3 adaptive game modules"], color: "#f59e0b" },
];

const BUS_X = 600;

const paths = [
  { d: "M240 98 C 280 98, 270 200, 310 200", color: "#0ea5e9", dur: 2.4 },
  { d: "M240 348 C 280 348, 270 250, 310 250", color: "#8b5cf6", dur: 2.8 },
  { d: `M530 223 L ${BUS_X} 223`, color: "#6366f1", dur: 1.2 },
  { d: `M${BUS_X} 223 C ${BUS_X + 30} 223, ${BUS_X + 20} 68, 680 68`, color: "#0ea5e9", dur: 2.2 },
  { d: `M${BUS_X} 223 L 680 224`, color: "#10b981", dur: 1.6 },
  { d: `M${BUS_X} 223 C ${BUS_X + 30} 223, ${BUS_X + 20} 380, 680 380`, color: "#f59e0b", dur: 2.6 },
];

const pipeline = [
  { icon: Keyboard, label: "Keystrokes", note: "student types" },
  { icon: Timer, label: "900 ms debounce", note: "wait for a pause" },
  { icon: TreeDeciduous, label: "Tree-sitter AST", note: "parse snapshot" },
  { icon: ScanSearch, label: "Features", note: "52 per file · 16 per loop" },
  { icon: ShieldCheck, label: "Calibrated gate", note: "only where rules guess" },
  { icon: Lightbulb, label: "3-level hints", note: "never the answer" },
];

function Pipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [active, setActive] = useState(-1);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setActive((a) => (a + 1) % (pipeline.length + 2)), 700);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div ref={ref} className="glass mt-8 rounded-3xl p-6 sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-xl font-bold text-white">Code Coach detection pipeline</h3>
        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-300">
          3.9 ms median end-to-end · 0.006 ms per candidate
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {pipeline.map((p, i) => {
          const on = active >= i && active < pipeline.length + 1;
          return (
            <div key={p.label} className="relative">
              <motion.div
                animate={{
                  borderColor: on ? "rgba(139,92,246,0.6)" : "rgba(255,255,255,0.06)",
                  backgroundColor: on ? "rgba(139,92,246,0.12)" : "rgba(255,255,255,0.02)",
                  y: active === i ? -4 : 0,
                }}
                className="h-full rounded-2xl border p-4"
              >
                <motion.span
                  animate={{ color: on ? "#c4b5fd" : "#64748b", scale: active === i ? 1.15 : 1 }}
                  className="inline-block"
                >
                  <p.icon className="size-6" />
                </motion.span>
                <div className="mt-3 text-sm font-semibold text-white">{p.label}</div>
                <div className="mt-0.5 text-xs text-slate-500">{p.note}</div>
              </motion.div>
              {i < pipeline.length - 1 && (
                <ArrowRight className="absolute top-1/2 -right-[14px] z-10 hidden size-4 -translate-y-1/2 text-slate-600 lg:block" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Architecture() {
  return (
    <section id="architecture" className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Platform Architecture"
          icon={<Network className="size-3.5" />}
          accent="#6366f1"
          title={
            <>
              How the pieces <span className="text-gradient">talk</span>
            </>
          }
          lead="Independently deployable microservices, each owning its data. Reads go over REST; reactions travel as typed learning events — so a struggle in the editor can become a lesson, a pairing prompt or a new practice plan."
        />

        <div className="glass overflow-x-auto rounded-3xl p-4 sm:p-8">
          <svg viewBox="0 0 940 440" className="mx-auto w-full min-w-[720px]">
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="busGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
            </defs>

            {/* event bus */}
            <motion.rect
              x={BUS_X - 6}
              y={40}
              width={12}
              height={370}
              rx={6}
              fill="url(#busGrad)"
              opacity={0.35}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            />
            <text x={BUS_X} y={432} textAnchor="middle" className="fill-slate-400 font-mono text-[11px]">
              typed learning events
            </text>

            {paths.map((p, i) => (
              <g key={i}>
                <motion.path
                  d={p.d}
                  fill="none"
                  stroke={p.color}
                  strokeOpacity={0.45}
                  strokeWidth={2}
                  strokeDasharray="6 6"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.12 }}
                />
                <circle r="5" fill={p.color} filter="url(#glow)">
                  <animateMotion dur={`${p.dur}s`} repeatCount="indefinite" path={p.d} begin={`${i * 0.35}s`} />
                </circle>
              </g>
            ))}

            {nodes.map((n, i) => (
              <motion.g
                key={n.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              >
                <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={16} fill="#111729" stroke={n.color} strokeOpacity={0.5} />
                <rect x={n.x} y={n.y} width={4} height={n.h} rx={2} fill={n.color} />
                <text x={n.x + 20} y={n.y + 32} className="fill-white font-sans text-[16px] font-bold">
                  {n.title}
                </text>
                {n.sub.map((s, k) => (
                  <text key={s} x={n.x + 20} y={n.y + 56 + k * 20} className="fill-slate-400 font-mono text-[11.5px]">
                    {s}
                  </text>
                ))}
              </motion.g>
            ))}
          </svg>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Waypoints className="size-3.5 text-violet" /> Sibling services validate tokens via the owner&apos;s introspection endpoint
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-emerald-400" /> Sign-out is revoked platform-wide immediately
          </span>
        </div>

        <Pipeline />
      </div>
    </section>
  );
}
