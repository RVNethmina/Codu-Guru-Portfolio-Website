"use client";

import { AnimatePresence, motion } from "motion/react";
import { CalendarDays, Check, Clock, Copy, Download, FileText, FolderDown, Globe, Package, Presentation } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { VSCodeIcon, GithubIcon } from "@/components/ui/BrandIcons";
import { documents, links, presentations, type Deliverable } from "@/data/site";

function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(command).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        });
      }}
      className="group flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-ink/80 px-4 py-3 text-left font-mono text-[12.5px] text-slate-300 transition hover:border-sky/40"
      aria-label="Copy install command"
    >
      <span className="truncate">
        <span className="text-emerald-400">$</span> {command}
      </span>
      {copied ? <Check className="size-4 shrink-0 text-emerald-400" /> : <Copy className="size-4 shrink-0 text-slate-500 group-hover:text-sky" />}
    </button>
  );
}

function ProductCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Reveal className="relative overflow-hidden rounded-3xl border border-sky/25 bg-gradient-to-br from-sky/15 via-surface/80 to-surface/80 p-8">
        <motion.div
          aria-hidden
          className="absolute -top-16 -right-16 text-sky/10"
          animate={{ rotate: [0, 8, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <VSCodeIcon className="size-64" />
        </motion.div>
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky/30 bg-sky/10 px-3 py-1 text-xs font-medium text-sky-200">
            <Package className="size-3.5" /> VS Code Marketplace · v{links.extensionVersion}
          </span>
          <h3 className="mt-5 font-display text-3xl font-bold text-white">{links.extensionName}</h3>
          <p className="mt-3 max-w-md leading-relaxed text-slate-400">
            Beginner-friendly Java analysis, three-level hints and progress-aware feedback — right inside VS Code. Also on Open VSX for
            Cursor, VSCodium and Windsurf.
          </p>
          <div className="mt-6 max-w-md">
            <CopyCommand command={`code --install-extension ${links.extensionId}`} />
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={links.extension}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-sky px-5 py-2.5 font-semibold text-ink transition hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(14,165,233,0.6)]"
            >
              <VSCodeIcon className="size-4" /> Install from Marketplace
            </a>
            <a
              href={links.extensionReleases}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 font-semibold text-white transition hover:bg-white/5"
            >
              <GithubIcon className="size-4" /> .vsix releases
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="relative overflow-hidden rounded-3xl border border-violet/25 bg-gradient-to-br from-violet/15 via-surface/80 to-surface/80 p-8">
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" /> Live platform
          </span>
          <h3 className="mt-5 font-display text-3xl font-bold text-white">Code Guru Web Portal</h3>
          <p className="mt-3 max-w-md leading-relaxed text-slate-400">
            One account for your insights, study plan, micro-lessons, practice games and pair programming sessions.
          </p>

          {/* mini browser */}
          <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-ink/80">
            <div className="flex items-center gap-2 border-b border-white/5 px-3 py-2">
              <span className="size-2 rounded-full bg-rose-400/70" />
              <span className="size-2 rounded-full bg-amber-300/70" />
              <span className="size-2 rounded-full bg-emerald-400/70" />
              <span className="ml-2 flex-1 truncate rounded bg-white/5 px-2 py-0.5 font-mono text-[10.5px] text-slate-400">
                {links.webApp.replace("https://", "")}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 p-3">
              {["Insights", "Lessons", "Practice", "Pairing"].map((t, i) => (
                <motion.div
                  key={t}
                  className="rounded-lg border border-white/5 bg-white/[0.03] p-2"
                  animate={{ borderColor: ["rgba(255,255,255,0.05)", "rgba(139,92,246,0.5)", "rgba(255,255,255,0.05)"] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i }}
                >
                  <div className="h-1.5 w-2/3 rounded bg-violet/50" />
                  <div className="mt-2 h-6 rounded bg-white/5" />
                  <div className="mt-1.5 text-center text-[9.5px] text-slate-500">{t}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={links.webApp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 font-semibold text-white transition hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]"
            >
              <Globe className="size-4" /> Open Web App
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

/** Deliverables are listed for reference; only entries with a `url` (the research paper) can be downloaded. */
function DeliverableCard({ d, index }: { d: Deliverable; index: number }) {
  const Icon = d.kind === "PPTX" ? Presentation : FileText;
  const downloadable = Boolean(d.url);
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className={clsx(
        "group relative flex flex-col rounded-2xl border p-5 transition-colors",
        downloadable
          ? "border-sky/40 bg-gradient-to-b from-sky/10 to-surface/70 shadow-[0_0_30px_rgba(14,165,233,0.12)] hover:border-sky/70"
          : "border-line bg-surface/70 hover:border-violet/40",
      )}
    >
      <div className="flex items-start justify-between">
        <span
          className={clsx(
            "grid size-12 place-items-center rounded-xl transition group-hover:scale-110 group-hover:rotate-[-6deg]",
            downloadable ? "bg-sky/15 text-sky-300" : "bg-indigo/15 text-indigo-300",
          )}
        >
          <Icon className="size-6" />
        </span>
        <span className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-[10.5px] font-bold text-slate-300">{d.kind}</span>
      </div>
      <h4 className="mt-4 font-display text-lg font-bold text-white">{d.title}</h4>
      <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-slate-500">{d.description}</p>

      {d.files && (
        <ul className="mt-4 space-y-1.5 border-t border-white/5 pt-3">
          {d.files.map((f) => (
            <li key={f.label} className="flex items-center gap-2 text-[12.5px] text-slate-400">
              <span className="size-1.5 shrink-0 rounded-full bg-indigo/60" />
              <span className="truncate">{f.label}</span>
              {f.url && (
                <a href={f.url} target="_blank" rel="noreferrer" className="ml-auto text-sky hover:text-white" aria-label={`Download ${f.label}`}>
                  <Download className="size-4" />
                </a>
              )}
            </li>
          ))}
        </ul>
      )}

      {(d.date || d.url) && (
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/5 pt-3">
          {d.date ? (
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <CalendarDays className="size-3.5" /> {d.date}
            </span>
          ) : (
            <span />
          )}
          {d.url && (
            <a
              href={d.url}
              // Files hosted on this site download directly; external links open in a new tab.
              {...(d.url.startsWith("/") ? { download: "" } : { target: "_blank", rel: "noreferrer" })}
              className="inline-flex items-center gap-1.5 rounded-lg bg-sky px-3 py-1.5 text-xs font-semibold text-ink transition hover:shadow-[0_0_20px_rgba(14,165,233,0.6)]"
            >
              <Download className="size-3.5" /> Download
            </a>
          )}
        </div>
      )}
    </motion.article>
  );
}

export function Downloads() {
  const [tab, setTab] = useState<"documents" | "presentations">("documents");
  const list = tab === "documents" ? documents : presentations;

  return (
    <section id="downloads" className="relative overflow-hidden py-28">
      <div className="grid-bg absolute inset-0 mask-fade-y opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Project Artifacts"
          icon={<FolderDown className="size-3.5" />}
          accent="#0ea5e9"
          title={
            <>
              Downloads &amp; <span className="text-gradient">Resources</span>
            </>
          }
          lead="Try the tools we built and explore the documents and presentations behind the research."
        />

        <ProductCards />

        <Reveal className="glass mt-10 rounded-[2rem] p-6 sm:p-10">
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <h3 className="font-display text-2xl font-bold text-white">Academic Deliverables</h3>
              <p className="mt-1 text-slate-400">Proposals, research paper, theses, logbook, final report and presentations.</p>
            </div>
            <div className="flex rounded-full border border-line bg-ink/60 p-1">
              {(
                [
                  ["documents", `Documents (${documents.length})`],
                  ["presentations", `Presentations (${presentations.length})`],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={clsx("relative rounded-full px-5 py-2 text-sm font-semibold transition-colors", tab === id ? "text-white" : "text-slate-400")}
                >
                  {tab === id && (
                    <motion.span layoutId="dl-tab" className="absolute inset-0 rounded-full bg-brand" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                  )}
                  <span className="relative">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {list.map((d, i) => (
                <DeliverableCard key={`${tab}-${d.title}`} d={d} index={i} />
              ))}
              {list.length % 4 !== 0 && (
                <motion.div
                  key={`${tab}-more`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hidden flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 p-5 text-center lg:flex"
                  style={{ gridColumn: `span ${4 - (list.length % 4)}` }}
                >
                  <motion.span
                    animate={{ rotate: [0, 8, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="grid size-12 place-items-center rounded-xl bg-white/5 text-slate-500"
                  >
                    <Clock className="size-6" />
                  </motion.span>
                  <p className="mt-3 font-display font-semibold text-slate-300">More on the way</p>
                  <p className="mt-1 max-w-[220px] text-xs text-slate-500">New deliverables are added here as each milestone is completed.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
