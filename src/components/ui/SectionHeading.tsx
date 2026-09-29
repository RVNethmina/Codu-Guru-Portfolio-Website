"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  icon?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  accent?: string;
};

export function SectionHeading({ eyebrow, icon, title, lead, accent = "#8b5cf6" }: Props) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      <motion.span
        initial={{ opacity: 0, y: 12, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-xs font-medium tracking-[0.18em] uppercase"
        style={{ borderColor: `${accent}55`, color: accent, background: `${accent}12` }}
      >
        {icon}
        {eyebrow}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
      >
        {title}
      </motion.h2>
      {lead && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="mt-4 text-lg leading-relaxed text-slate-400"
        >
          {lead}
        </motion.p>
      )}
    </div>
  );
}
