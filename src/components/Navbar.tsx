"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { VSCodeIcon } from "@/components/ui/BrandIcons";
import { links, nav } from "@/data/site";

export function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    const sections = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-line bg-ink/75 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#home" aria-label="Code Guru home">
          <Logo />
        </a>

        <ul className="hidden items-center gap-0.5 rounded-full border border-line bg-surface/50 p-1 backdrop-blur lg:flex">
          {nav.map((n) => (
            <li key={n.id} className="relative">
              <a
                href={`#${n.id}`}
                className={clsx(
                  "relative z-10 block rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                  active === n.id ? "text-white" : "text-slate-400 hover:text-slate-200",
                )}
              >
                {n.label}
              </a>
              {active === n.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full border border-white/10 bg-gradient-to-r from-violet/35 to-sky/25"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={links.extension}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-[0_0_24px_rgba(99,102,241,0.45)] transition hover:shadow-[0_0_34px_rgba(99,102,241,0.7)] sm:flex"
          >
            <VSCodeIcon className="size-4" />
            Get Extension
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid size-10 place-items-center rounded-full border border-line bg-surface/60 text-slate-200 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-line bg-ink/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="grid gap-1 px-5 py-4">
              {nav.map((n, i) => (
                <motion.li key={n.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                  <a
                    href={`#${n.id}`}
                    onClick={() => setOpen(false)}
                    className={clsx(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium",
                      active === n.id ? "bg-violet/15 text-white" : "text-slate-400",
                    )}
                  >
                    <span className="font-mono text-xs text-violet">0{i + 1}</span>
                    {n.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
