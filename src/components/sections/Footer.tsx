"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { GithubIcon, VSCodeIcon } from "@/components/ui/BrandIcons";
import { links, nav, project } from "@/data/site";

export function Footer() {
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 800));

  return (
    <footer className="relative border-t border-line bg-[#070a14]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">{project.title}.</p>
          <div className="mt-5 flex gap-2">
            <a href={links.extension} target="_blank" rel="noreferrer" aria-label="VS Code Marketplace" className="grid size-9 place-items-center rounded-lg border border-line text-slate-400 transition hover:border-sky/50 hover:text-sky">
              <VSCodeIcon className="size-4" />
            </a>
            <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid size-9 place-items-center rounded-lg border border-line text-slate-400 transition hover:border-violet/50 hover:text-white">
              <GithubIcon className="size-4" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-mono text-xs font-semibold tracking-[0.25em] text-slate-400 uppercase">Navigation</h4>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="text-slate-500 transition hover:text-white">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-mono text-xs font-semibold tracking-[0.25em] text-slate-400 uppercase">Research Lab</h4>
          <p className="mt-4 text-sm leading-relaxed text-slate-500">
            {project.institution}
            <br />
            {project.faculty}
            <br />
            {project.location}
          </p>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-slate-600 sm:flex-row lg:px-8">
          <span>
            © {new Date().getFullYear()} Code Guru Research Group · {project.id}
          </span>
          <span className="font-mono">
            built with <span className="text-rose-400">♥</span> and zero off-by-one errors
          </span>
        </div>
      </div>

      <motion.a
        href="#home"
        aria-label="Back to top"
        initial={false}
        animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.6, pointerEvents: show ? "auto" : "none" }}
        whileHover={{ y: -4 }}
        className="fixed right-6 bottom-6 z-40 grid size-12 place-items-center rounded-full bg-brand text-white shadow-[0_0_30px_rgba(99,102,241,0.55)]"
      >
        <ArrowUp className="size-5" />
      </motion.a>
    </footer>
  );
}
