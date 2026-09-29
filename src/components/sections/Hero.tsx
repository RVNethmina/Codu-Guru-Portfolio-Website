"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Brain, Cpu, GraduationCap, Sparkles, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CodeEditorDemo } from "@/components/hero/CodeEditorDemo";
import { CodeParticles } from "@/components/effects/CodeParticles";
import { CountUp } from "@/components/ui/CountUp";
import { VSCodeIcon } from "@/components/ui/BrandIcons";
import { heroStats, heroWords, links, project } from "@/data/site";

const START = 2.0; // wait for the preloader

function TypedWord() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = heroWords[index];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && text === word) t = setTimeout(() => setDeleting(true), 1800);
    else if (deleting && text === "") {
      t = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % heroWords.length);
      }, 250);
    } else {
      t = setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? 45 : 90,
      );
    }
    return () => clearTimeout(t);
  }, [text, deleting, index]);

  return (
    <span className="text-gradient-anim">
      {text}
      <span className="ml-1 inline-block h-[0.85em] w-[4px] translate-y-[0.08em] animate-blink rounded-sm bg-sky align-baseline" />
    </span>
  );
}

const floaters = [
  { icon: Cpu, label: "Tree-sitter AST", className: "-left-6 top-10", delay: 0 },
  { icon: Zap, label: "3.9 ms analysis", className: "-right-4 top-1/3", delay: 1.2 },
  { icon: Brain, label: "Calibrated ML gate", className: "-left-10 bottom-16", delay: 2.1 },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yEditor = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative isolate flex min-h-screen items-center overflow-hidden pt-24 pb-16">
      {/* background */}
      <div className="absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0 mask-fade-y opacity-70" />
        <div className="absolute top-1/4 -left-40 size-[560px] rounded-full bg-violet/20 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 size-[520px] rounded-full bg-sky/15 blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {[380, 560, 760, 980].map((s, i) => (
            <motion.div
              key={s}
              className="absolute rounded-full border border-white/[0.04]"
              style={{ width: s, height: s, left: -s / 2, top: -s / 2 }}
              animate={{ scale: [1, 1.04, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
        <CodeParticles />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1.05fr_1fr] lg:px-8">
        <motion.div style={{ y: yText, opacity: fade }} className="min-w-0">
          <motion.a
            href="#team"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: START, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-violet/30 bg-violet/10 px-4 py-1.5 text-xs font-medium text-violet-200 sm:text-sm"
          >
            <GraduationCap className="size-4 text-violet" />
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            {project.institution}
          </motion.a>

          <h1 className="mt-7 font-display text-5xl leading-[1.02] font-bold tracking-tight text-white sm:text-6xl xl:text-7xl">
            {["Every", "bug", "is", "a"].map((w, i) => (
              <motion.span
                key={w}
                className="mr-[0.25em] inline-block"
                initial={{ opacity: 0, y: 40, rotateX: -60 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: START + 0.1 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {w === "bug" ? <span className="squiggle decoration-2">{w}</span> : w}
              </motion.span>
            ))}
            <br />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: START + 0.5 }}>
              <TypedWord />
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: START + 0.6, duration: 0.7 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400"
          >
            <span className="font-semibold text-slate-200">Code Guru</span> is a real-time learning support platform for novice Java
            programmers — scaffolded hints instead of fixes, micro-lessons built around their own mistakes, behaviour-aware pair
            programming and adaptive practice games.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: START + 0.75, duration: 0.7 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a
              href="#domain"
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white shadow-[0_0_30px_rgba(99,102,241,0.45)] transition hover:scale-[1.03] hover:shadow-[0_0_44px_rgba(99,102,241,0.7)]"
            >
              <Sparkles className="size-4" />
              Explore Research
              <ArrowDown className="size-4 transition group-hover:translate-y-0.5" />
            </a>
            <a
              href={links.extension}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 font-semibold text-white backdrop-blur transition hover:border-sky/50 hover:bg-sky/10"
            >
              <VSCodeIcon className="size-4 text-sky" />
              Install Extension
            </a>
            <a
              href={links.webApp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 font-semibold text-white backdrop-blur transition hover:border-violet/50 hover:bg-violet/10"
            >
              Open Web App ↗
            </a>
          </motion.div>

          <motion.dl
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: START + 0.9 } } }}
            className="mt-12 grid max-w-lg grid-cols-2 gap-4 border-t border-white/5 pt-6 sm:grid-cols-4"
          >
            {heroStats.map((s) => (
              <motion.div key={s.label} variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl font-bold text-white sm:text-3xl">
                  <CountUp value={s.value} decimals={s.decimals ?? 0} />
                  <span className="text-lg text-violet">{s.suffix}</span>
                </dd>
                <p className="mt-1 text-[10px] tracking-[0.14em] text-slate-500 uppercase sm:text-[11px]">{s.label}</p>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          style={{ y: yEditor }}
          initial={{ opacity: 0, x: 40, rotateY: -12 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ delay: START + 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-w-0 [perspective:1200px]"
        >
          {floaters.map((f) => (
            <motion.div
              key={f.label}
              className={`absolute z-20 hidden items-center gap-2 rounded-full border border-white/10 bg-surface/90 px-3 py-1.5 text-xs font-medium text-slate-200 shadow-lg backdrop-blur xl:flex ${f.className}`}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: f.delay, ease: "easeInOut" }}
            >
              <f.icon className="size-3.5 text-sky" />
              {f.label}
            </motion.div>
          ))}
          <CodeEditorDemo />
        </motion.div>
      </div>

      <motion.a
        href="#domain"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: START + 1.4 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.3em] text-slate-500 md:flex"
      >
        SCROLL
        <span className="flex h-9 w-5 justify-center rounded-full border border-slate-600 pt-1.5">
          <motion.span
            className="size-1.5 rounded-full bg-sky"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </span>
      </motion.a>
    </section>
  );
}
