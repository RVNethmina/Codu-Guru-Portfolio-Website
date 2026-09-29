"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";

/** A soft spotlight that trails the pointer on devices with a fine pointer. */
export function CursorGlow() {
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { stiffness: 120, damping: 20 });
  const sy = useSpring(y, { stiffness: 120, damping: 20 });
  const bg = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, rgba(99,102,241,0.09), transparent 70%)`;

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  return <motion.div aria-hidden className="pointer-events-none fixed inset-0 z-[1]" style={{ background: bg }} />;
}
