"use client";

import { motion } from "motion/react";
import { Brain, Bug, Crosshair, Gauge, Target, Users, Zap, type LucideIcon } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { errorTypeF1, metrics, pairPathStates } from "@/data/site";

const icons: Record<string, LucideIcon> = { bug: Bug, target: Target, crosshair: Crosshair, zap: Zap, users: Users, brain: Brain };

function Ring({ value, color, icon: Icon }: { value: number; color: string; icon: LucideIcon }) {
  const frac = value <= 1 ? value : 1;
  const R = 34;
  const C = 2 * Math.PI * R;
  return (
    <div className="relative mx-auto size-20">
      <svg viewBox="0 0 80 80" className="size-full -rotate-90">
        <circle cx="40" cy="40" r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5" />
        <motion.circle
          cx="40"
          cy="40"
          r={R}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          whileInView={{ strokeDashoffset: C * (1 - frac) }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
      </svg>
      <Icon className="absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2" style={{ color }} />
    </div>
  );
}

function Bar({ label, value, color, delay }: { label: string; value: number; color: string; delay: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="font-mono font-semibold" style={{ color }}>
          <CountUp value={value} decimals={3} duration={1.4} />
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="relative h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}66, ${color})` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${value * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, delay, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="absolute inset-y-0 right-0 w-8 animate-pulse rounded-full bg-white/40 blur-sm" />
        </motion.div>
      </div>
    </div>
  );
}

export function Metrics() {
  return (
    <section id="metrics" className="relative overflow-hidden bg-[#070a14] py-28">
      {/* orbit ellipses */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {[1, 0.8, 0.6].map((s, i) => (
          <motion.div
            key={s}
            className="absolute top-1/2 left-1/2 rounded-[50%] border border-white/[0.05]"
            style={{ width: `${s * 110}%`, height: `${s * 900}px`, x: "-50%", y: "-50%" }}
            animate={{ rotate: i % 2 ? -360 : 360 }}
            transition={{ duration: 120 + i * 30, repeat: Infinity, ease: "linear" }}
          />
        ))}
        <div className="absolute top-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-indigo/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Evaluation Metrics"
          icon={<Gauge className="size-3.5" />}
          accent="#10b981"
          title="System Performance"
          lead="Measured results reported in our research paper for Code Coach, PairPath and Study Guider."
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group rounded-3xl border border-line bg-surface/60 p-5 text-center backdrop-blur transition-colors hover:border-white/15"
              style={{ boxShadow: "0 0 0 0 transparent" }}
            >
              <Ring value={m.value} color={m.color} icon={icons[m.icon]} />
              <div className="mt-4 font-display text-3xl font-bold text-white">
                <CountUp value={m.value} decimals={m.decimals} />
                <span className="ml-0.5 text-base" style={{ color: m.color }}>
                  {m.suffix}
                </span>
              </div>
              <div className="mt-1 text-[13px] font-medium text-slate-400">{m.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-5">
          <Reveal className="glass rounded-3xl p-7 lg:col-span-3">
            <div className="mb-1 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-white">Gated detection — test F1 per error type</h3>
              <span className="rounded-md bg-violet/15 px-2 py-0.5 font-mono text-[11px] text-violet">logistic regression</span>
            </div>
            <p className="mb-6 text-sm text-slate-500">The five error types whose rules must guess are gated by a calibrated classifier.</p>
            <div className="space-y-4">
              {errorTypeF1.map((e, i) => (
                <Bar key={e.label} label={e.label} value={e.f1} color="#8b5cf6" delay={i * 0.1} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="glass flex flex-col rounded-3xl p-7 lg:col-span-2">
            <h3 className="font-display text-lg font-bold text-white">File-level vs candidate-level gating</h3>
            <p className="mt-1 text-sm text-slate-500">Precision on 50 files that each hide one real off-by-one and one correct look-alike loop.</p>
            <div className="mt-6 flex flex-1 items-end justify-center gap-10">
              {[
                { label: "File-level", v: 0.5, color: "#f43f5e" },
                { label: "Candidate-level", v: 1, color: "#10b981" },
              ].map((b, i) => (
                <div key={b.label} className="flex flex-col items-center">
                  <span className="mb-2 font-mono text-xl font-bold" style={{ color: b.color }}>
                    <CountUp value={b.v} decimals={3} />
                  </span>
                  <div className="flex h-44 w-16 items-end overflow-hidden rounded-xl bg-white/5">
                    <motion.div
                      className="w-full rounded-xl"
                      style={{ background: `linear-gradient(to top, ${b.color}55, ${b.color})` }}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${b.v * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, delay: 0.2 + i * 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <span className="mt-2 text-xs text-slate-400">{b.label}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-center text-xs text-slate-500">Recall stays 1.000 in both — candidate scoring removes every false alarm.</p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="glass mt-6 rounded-3xl p-7">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-display text-lg font-bold text-white">PairPath — F1 per collaboration state</h3>
            <span className="font-mono text-xs text-slate-500">accuracy 0.892 · +0.261 macro-F1 over rule baseline</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-5">
            {pairPathStates.map((s, i) => (
              <Bar key={s.label} label={s.label} value={s.f1} color={s.color} delay={i * 0.08} />
            ))}
          </div>
        </Reveal>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-slate-600">
          PairPath and Study Guider figures come from synthetic, verified-by-construction data; Code Coach&apos;s off-by-one, operator and
          array-length types are tested on a hand-written holdout. A platform-wide user study is planned future work.
        </p>
      </div>
    </section>
  );
}
