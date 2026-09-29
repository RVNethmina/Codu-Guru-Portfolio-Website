"use client";

import { motion } from "motion/react";
import {
  Blocks,
  Boxes,
  Braces,
  Brain,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Layers,
  Network,
  Radio,
  Server,
  Share2,
  Trees,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { techStack } from "@/data/site";

const icons: LucideIcon[] = [Code2, Braces, Zap, Trees, Brain, GitBranch, Workflow, Network, Share2, Radio, Database, Layers, Blocks, Server, Boxes, Cloud];

function Row({ reverse = false }: { reverse?: boolean }) {
  const items = reverse ? [...techStack].reverse() : techStack;
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden mask-fade-x">
      <div className={`flex shrink-0 gap-4 py-2 pr-4 ${reverse ? "animate-marquee-reverse" : "animate-marquee"} hover:[animation-play-state:paused]`}>
        {doubled.map((t, i) => {
          const idx = techStack.findIndex((x) => x.name === t.name);
          const Icon = icons[idx % icons.length];
          return (
            <div
              key={`${t.name}-${i}`}
              className="group flex items-center gap-3 rounded-2xl border border-line bg-surface/60 px-4 py-3 transition hover:-translate-y-0.5 hover:border-white/20"
            >
              <span
                className="grid size-10 place-items-center rounded-xl transition group-hover:scale-110"
                style={{ background: `${t.color}1f`, color: t.color, boxShadow: `0 0 0 1px ${t.color}33 inset` }}
              >
                <Icon className="size-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold whitespace-nowrap text-white">{t.name}</span>
                <span className="block text-xs whitespace-nowrap text-slate-500">{t.note}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TechMarquee() {
  return (
    <section aria-label="Technology stack" className="relative border-y border-line bg-ink-2/80 py-8">
      <div className="space-y-3">
        <Row />
        <Row reverse />
      </div>
    </section>
  );
}

/** A "build pipeline" divider: a moving dashed track with a glowing packet racing across it. */
export function PipelineDivider({ label = "// compiling research foundation" }: { label?: string }) {
  return (
    <div aria-hidden className="relative h-20 overflow-hidden border-b border-line bg-gradient-to-b from-ink-2 to-ink">
      <svg className="absolute inset-x-0 top-1/2 h-2 w-full -translate-y-1/2" preserveAspectRatio="none">
        <motion.line
          x1="0"
          y1="4"
          x2="100%"
          y2="4"
          stroke="rgba(245,158,11,0.55)"
          strokeWidth="3"
          strokeDasharray="28 18"
          animate={{ strokeDashoffset: [0, -46] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
        />
      </svg>
      <motion.div
        className="absolute top-1/2 h-[3px] w-40 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-sky to-white shadow-[0_0_18px_#0ea5e9]"
        animate={{ left: ["-12%", "110%"] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
      />
      <span className="absolute top-2 left-1/2 -translate-x-1/2 font-mono text-[11px] text-slate-600">{label}</span>
    </div>
  );
}
