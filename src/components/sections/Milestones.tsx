"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { CalendarDays, Check, Flag, GitBranch, GitCommitHorizontal } from "lucide-react";
import clsx from "clsx";
import { useLayoutEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { milestones, type MilestoneStatus } from "@/data/site";

const statusStyle: Record<MilestoneStatus, { color: string; label: string }> = {
  completed: { color: "#10b981", label: "✓ Completed" },
  current: { color: "#0ea5e9", label: "● In Progress" },
  upcoming: { color: "#64748b", label: "○ Upcoming" },
};

/** Deterministic short "commit hash" for decoration. */
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

export function Milestones() {
  const trackRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [geom, setGeom] = useState({ height: 1, currentY: 1 });

  const currentIndex = Math.max(
    0,
    milestones.findIndex((m) => m.status === "current"),
  );

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const node = nodeRefs.current[currentIndex];
      if (!track || !node) return;
      const t = track.getBoundingClientRect();
      const n = node.getBoundingClientRect();
      setGeom({ height: t.height, currentY: n.top - t.top + n.height / 2 });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [currentIndex]);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 65%", "end 65%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });
  const headY = useTransform(smooth, (p) => Math.min(p * geom.height, geom.currentY));
  const fillH = useTransform(headY, (y) => `${y}px`);

  return (
    <section id="milestones" className="relative overflow-hidden py-28">
      <div className="dot-bg absolute inset-0 mask-fade-y opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Project Roadmap"
          icon={<Flag className="size-3.5" />}
          accent="#f59e0b"
          title={
            <>
              Project <span className="text-gradient">Milestones</span>
            </>
          }
          lead={
            <>
              Our history as a commit graph — scroll and watch <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-sky">HEAD</code>{" "}
              move through every checkpoint until it reaches where we are today.
            </>
          }
        />

        <div ref={trackRef} className="relative">
          {/* rail */}
          <div className="absolute top-0 bottom-0 left-5 w-[3px] -translate-x-1/2 rounded-full bg-white/[0.07] md:left-1/2" />
          <div
            className="absolute top-0 bottom-0 left-5 w-[3px] -translate-x-1/2 md:left-1/2"
            style={{ backgroundImage: "repeating-linear-gradient(to bottom, rgba(148,163,184,0.25) 0 6px, transparent 6px 14px)" }}
          />
          <motion.div
            className="absolute top-0 left-5 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-emerald-400 via-emerald-400 to-sky shadow-[0_0_14px_rgba(16,185,129,0.6)] md:left-1/2"
            style={{ height: fillH }}
          />

          {/* HEAD marker */}
          <motion.div className="pointer-events-none absolute left-5 z-20 md:left-1/2" style={{ y: headY }}>
            <div className="relative -translate-x-1/2 -translate-y-1/2">
              <span className="absolute inset-0 animate-ping rounded-full bg-sky/40" />
              <span className="relative grid size-8 place-items-center rounded-full bg-sky text-ink shadow-[0_0_24px_#0ea5e9]">
                <GitCommitHorizontal className="size-4" strokeWidth={3} />
              </span>
              <span className="absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded-md md:block border border-sky/40 bg-ink px-2 py-0.5 font-mono text-[10px] whitespace-nowrap text-sky">
                HEAD → dev
              </span>
            </div>
          </motion.div>

          <ol className="relative space-y-10 md:space-y-4">
            {milestones.map((m, i) => {
              const st = statusStyle[m.status];
              const left = i % 2 === 0;
              return (
                <li key={m.title} className="relative grid md:grid-cols-2 md:gap-16">
                  {/* node */}
                  <span
                    ref={(el) => {
                      nodeRefs.current[i] = el;
                    }}
                    className={clsx(
                      "absolute top-8 left-5 z-10 grid size-5 -translate-x-1/2 place-items-center rounded-full border-2 md:left-1/2",
                      m.status === "completed" && "border-emerald-400 bg-emerald-400 text-ink",
                      m.status === "current" && "border-sky bg-ink",
                      m.status === "upcoming" && "border-dashed border-slate-500 bg-ink",
                    )}
                  >
                    {m.status === "completed" && <Check className="size-3" strokeWidth={4} />}
                  </span>

                  <motion.article
                    initial={{ opacity: 0, x: left ? -60 : 60, scale: 0.94 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-80px 0px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -4 }}
                    className={clsx(
                      "relative ml-12 rounded-2xl border bg-surface/80 p-5 backdrop-blur md:ml-0",
                      left ? "md:col-start-1" : "md:col-start-2",
                      m.status === "upcoming" && "opacity-60 hover:opacity-100",
                    )}
                    style={{
                      borderColor: `${st.color}${m.status === "upcoming" ? "33" : "55"}`,
                      boxShadow: m.status === "current" ? `0 0 40px ${st.color}33` : undefined,
                    }}
                  >
                    <div className="absolute inset-x-5 top-0 h-[2px] rounded-full" style={{ background: st.color }} />
                    {/* connector */}
                    <span
                      className={clsx(
                        "absolute top-[2.35rem] hidden h-px w-16 md:block",
                        left ? "-right-16" : "-left-16",
                      )}
                      style={{ background: `${st.color}66` }}
                    />
                    <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <GitBranch className="size-3.5" /> commit <span className="text-amber-300/80">{hash(m.title)}</span>
                      </span>
                      <span>#{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="mt-2 font-display text-lg font-bold text-white">{m.title}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                      <span className="flex items-center gap-1 text-slate-400">
                        <CalendarDays className="size-3.5" /> {m.date ?? "Date TBA"}
                      </span>
                      <span className="rounded-full border border-indigo/40 bg-indigo/10 px-2 py-0.5 text-[11px] text-indigo-200">{m.type}</span>
                      <span className="rounded-full px-2 py-0.5 text-[11px] font-medium" style={{ color: st.color, background: `${st.color}1a` }}>
                        {st.label}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{m.description}</p>
                  </motion.article>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-14 flex justify-center gap-6 text-sm text-slate-400">
          {(Object.keys(statusStyle) as MilestoneStatus[]).map((k) => (
            <span key={k} className="flex items-center gap-2 capitalize">
              <span className="size-2.5 rounded-full" style={{ background: statusStyle[k].color }} />
              {k === "current" ? "Current" : k}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
