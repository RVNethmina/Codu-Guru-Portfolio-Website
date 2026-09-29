"use client";

import { useEffect, useRef } from "react";

const TOKENS = ["{ }", ";", "for", "if", "int", "()", "=>", "[i]", "==", "++", "</>", "null", "while", "i <=", "class", "void", "&&", "return", "//", "0"];
const COLORS = ["139,92,246", "99,102,241", "14,165,233", "16,185,129"];

type Particle = { x: number; y: number; vy: number; vx: number; t: string; c: string; a: number; s: number };

/**
 * Java tokens drifting upward on a canvas, gently pushed away from the pointer.
 * Rendered behind a section; pauses when off-screen.
 */
export function CodeParticles({ density = 38 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const mouse = { x: -9999, y: -9999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let parts: Particle[] = [];

    const spawn = (y?: number): Particle => ({
      x: Math.random() * w,
      y: y ?? Math.random() * h,
      vy: -(0.12 + Math.random() * 0.35),
      vx: (Math.random() - 0.5) * 0.1,
      t: TOKENS[(Math.random() * TOKENS.length) | 0],
      c: COLORS[(Math.random() * COLORS.length) | 0],
      a: 0.08 + Math.random() * 0.22,
      s: 11 + Math.random() * 9,
    });

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((density * w) / 1400);
      parts = Array.from({ length: Math.max(12, count) }, () => spawn());
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 14000) {
          const f = (14000 - d2) / 14000;
          p.x += (dx / Math.sqrt(d2 + 1)) * f * 2.2;
          p.y += (dy / Math.sqrt(d2 + 1)) * f * 2.2;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -20) Object.assign(p, spawn(h + 20));
        ctx.font = `${p.s}px ui-monospace, monospace`;
        ctx.fillStyle = `rgba(${p.c},${p.a})`;
        ctx.fillText(p.t, p.x, p.y);
      }
      if (visible && !reduce) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    });

    resize();
    draw();
    io.observe(canvas);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [density]);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 size-full" />;
}
