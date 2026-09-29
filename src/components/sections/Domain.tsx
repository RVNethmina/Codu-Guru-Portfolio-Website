"use client";

import { AnimatePresence, motion } from "motion/react";
import { BookOpen, ChevronRight, Crosshair, Layers, Lightbulb, Search, TriangleAlert, Zap, type LucideIcon } from "lucide-react";
import clsx from "clsx";
import { useState, type ComponentType } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  GapVisual,
  LiteratureVisual,
  MethodologyVisual,
  ObjectivesVisual,
  ProblemVisual,
  TechnologiesVisual,
} from "@/components/domain/DomainVisuals";
import { domainTabs } from "@/data/site";

const meta: Record<string, { icon: LucideIcon; color: string; Visual: ComponentType }> = {
  literature: { icon: BookOpen, color: "#8b5cf6", Visual: LiteratureVisual },
  problem: { icon: TriangleAlert, color: "#f43f5e", Visual: ProblemVisual },
  gap: { icon: Zap, color: "#f59e0b", Visual: GapVisual },
  objectives: { icon: Crosshair, color: "#10b981", Visual: ObjectivesVisual },
  methodology: { icon: Lightbulb, color: "#0ea5e9", Visual: MethodologyVisual },
  technologies: { icon: Layers, color: "#6366f1", Visual: TechnologiesVisual },
};

export function Domain() {
  const [active, setActive] = useState(domainTabs[0].id);
  const tab = domainTabs.find((t) => t.id === active)!;
  const { icon: Icon, color, Visual } = meta[tab.id];

  return (
    <section id="domain" className="relative overflow-hidden py-28">
      <div className="dot-bg absolute inset-0 mask-fade-y opacity-40" aria-hidden />
      <motion.div
        aria-hidden
        className="absolute top-40 left-1/2 size-[700px] -translate-x-1/2 rounded-full blur-[160px]"
        animate={{ backgroundColor: `${color}22` }}
        transition={{ duration: 0.8 }}
      />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Project Domain"
          icon={<Search className="size-3.5" />}
          title={
            <>
              Research <span className="text-gradient">Foundation</span>
            </>
          }
          lead="The literature, problem, gap, objectives, methodology and technologies behind Code Guru."
        />

        <div className="mb-10 flex flex-wrap justify-center gap-2" role="tablist">
          {domainTabs.map((t) => {
            const M = meta[t.id];
            const on = t.id === active;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(t.id)}
                className={clsx(
                  "relative flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors",
                  on ? "border-transparent text-white" : "border-line bg-surface/40 text-slate-400 hover:border-white/15 hover:text-slate-200",
                )}
              >
                {on && (
                  <motion.span
                    layoutId="domain-tab"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: `linear-gradient(135deg, ${M.color}, ${M.color}99)`, boxShadow: `0 8px 30px ${M.color}55` }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <M.icon className="relative size-4" />
                <span className="relative">{t.label}</span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <AnimatePresence mode="wait">
            <motion.article
              key={tab.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="glass relative overflow-hidden rounded-3xl p-8 sm:p-10"
            >
              <div className="absolute -top-20 -right-20 size-48 rounded-full blur-3xl" style={{ background: `${color}30` }} />
              <motion.span
                initial={{ rotate: -20, scale: 0.6 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 220 }}
                className="grid size-14 place-items-center rounded-2xl border"
                style={{ borderColor: `${color}55`, background: `${color}18`, color }}
              >
                <Icon className="size-7" />
              </motion.span>
              <h3 className="mt-6 font-display text-3xl font-bold text-white">{tab.title}</h3>
              <p className="mt-4 text-[17px] leading-relaxed text-slate-300">{tab.lead}</p>
              <ul className="mt-6 space-y-3">
                {tab.points.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                    className="flex gap-3 text-[15px] leading-relaxed text-slate-400"
                  >
                    <ChevronRight className="mt-1 size-4 shrink-0" style={{ color }} />
                    {p}
                  </motion.li>
                ))}
              </ul>
            </motion.article>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="glass relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-3xl p-6 sm:p-8"
            >
              <div className="grid-bg absolute inset-0 opacity-50" aria-hidden />
              <div className="relative flex w-full scale-[0.85] justify-center sm:scale-100 xl:scale-110">
                <Visual />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
