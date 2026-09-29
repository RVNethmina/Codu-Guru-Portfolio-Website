"use client";

import { motion } from "motion/react";
import { Award, Globe, Rocket, Sparkles, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { highlights } from "@/data/site";

const icons: Record<string, LucideIcon> = { rocket: Rocket, globe: Globe, award: Award };
const colors = ["#0ea5e9", "#10b981", "#f59e0b"];

export function Highlights() {
  return (
    <section id="highlights" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Highlights"
          icon={<Sparkles className="size-3.5" />}
          accent="#f59e0b"
          title={
            <>
              What we&apos;ve <span className="text-gradient">shipped</span>
            </>
          }
        />
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((h, i) => {
            const Icon = icons[h.icon];
            const c = colors[i];
            return (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl border border-line bg-surface/70 p-7"
              >
                <motion.div
                  className="absolute -top-24 -right-24 size-48 rounded-full blur-3xl"
                  style={{ background: `${c}33` }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 5, repeat: Infinity, delay: i }}
                />
                <span className="relative font-mono text-xs font-bold tracking-[0.25em] uppercase" style={{ color: c }}>
                  {h.tag}
                </span>
                <div className="relative mt-5 flex items-center gap-4">
                  <span
                    className="grid size-14 place-items-center rounded-2xl transition-transform duration-500 group-hover:rotate-[360deg]"
                    style={{ background: `${c}1a`, color: c, boxShadow: `inset 0 0 0 1px ${c}40` }}
                  >
                    <Icon className="size-7" />
                  </span>
                  <h3 className="font-display text-xl font-bold text-white">{h.title}</h3>
                </div>
                <p className="relative mt-4 leading-relaxed text-slate-400">{h.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
