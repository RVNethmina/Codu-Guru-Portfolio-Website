"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import clsx from "clsx";
import type { MouseEvent, ReactNode } from "react";

type Props = { children: ReactNode; className?: string; glow?: string; max?: number };

/** A card that tilts toward the pointer and carries a soft spotlight. */
export function TiltCard({ children, className, glow = "#8b5cf6", max = 8 }: Props) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rx = useSpring(useTransform(y, [0, 1], [max, -max]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(x, [0, 1], [-max, max]), { stiffness: 200, damping: 18 });
  const gx = useTransform(x, (v) => `${v * 100}%`);
  const gy = useTransform(y, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${gx} ${gy}, ${glow}26, transparent 60%)`;

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={clsx("group relative", className)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      {children}
    </motion.div>
  );
}
