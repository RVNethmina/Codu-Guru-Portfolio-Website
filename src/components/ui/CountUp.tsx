"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Props = { value: number; decimals?: number; duration?: number; className?: string };

export function CountUp({ value, decimals = 0, duration = 1.8, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });
  const [display, setDisplay] = useState((0).toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, value, decimals, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
