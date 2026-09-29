"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-brand shadow-[0_0_12px_rgba(99,102,241,0.8)]"
      style={{ scaleX }}
    />
  );
}
