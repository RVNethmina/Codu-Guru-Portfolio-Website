"use client";

import { motion } from "motion/react";
import type { ComponentType } from "react";
import { Puzzle, UserRound } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { CoachMini, GameMini, GuiderMini, PairMini } from "@/components/components/MiniDemos";
import { components } from "@/data/site";

const demos: Record<string, ComponentType> = {
  "code-coach": CoachMini,
  "study-guider": GuiderMini,
  pairpath: PairMini,
  gamification: GameMini,
};

export function Components() {
  return (
    <section id="components" className="relative py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo/[0.04] to-transparent" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="System Components"
          icon={<Puzzle className="size-3.5" />}
          accent="#0ea5e9"
          title={
            <>
              Four components. <span className="text-gradient">One learner.</span>
            </>
          }
          lead="Each component watches the same student from a different angle — the code, the pattern of mistakes, the collaboration and the motivation — and shares what it sees through one event vocabulary."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {components.map((c, i) => {
            const Demo = demos[c.id];
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px 0px" }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard glow={c.color} max={5} className="h-full rounded-3xl">
                  <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface/70 p-6 backdrop-blur sm:p-7">
                    <div
                      className="absolute inset-x-0 top-0 h-px"
                      style={{ background: `linear-gradient(90deg, transparent, ${c.color}, transparent)` }}
                    />
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div>
                        <span className="font-mono text-xs" style={{ color: c.color }}>
                          0{i + 1} / {c.tagline}
                        </span>
                        <h3 className="mt-1 font-display text-2xl font-bold text-white">{c.name}</h3>
                      </div>
                      <span
                        className="flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs whitespace-nowrap text-slate-300"
                        style={{ borderColor: `${c.color}40` }}
                      >
                        <UserRound className="size-3.5" style={{ color: c.color }} />
                        {c.owner}
                      </span>
                    </div>

                    <Demo />

                    <p className="mt-5 flex-1 text-[15px] leading-relaxed text-slate-400">{c.description}</p>

                    <div className="mt-5 grid grid-cols-3 gap-2">
                      {c.stats.map((s) => (
                        <div key={s.label} className="rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5 text-center">
                          <div className="font-display text-lg font-bold text-white">{s.value}</div>
                          <div className="text-[10.5px] tracking-wide text-slate-500 uppercase">{s.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {c.tech.map((t) => (
                        <span key={t} className="rounded-md px-2 py-0.5 font-mono text-[11px]" style={{ color: c.color, background: `${c.color}14` }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </article>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
