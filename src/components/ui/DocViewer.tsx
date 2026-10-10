"use client";

import { motion } from "motion/react";
import { Eye, Minus, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import viewerPages from "@/data/viewer-pages.json";

type PageSet = { pages: number; width: number; height: number };
const manifest = viewerPages as Record<string, PageSet>;

export function hasPages(slug?: string): slug is string {
  return Boolean(slug && manifest[slug]);
}

const ZOOMS = [0.6, 0.8, 1, 1.25, 1.5];

/**
 * Read-only document viewer. Pages are pre-rendered images (see scripts/render-viewer.py),
 * so there is no original file behind it to save or print.
 */
export function DocViewer({ slug, title, onClose }: { slug: string; title: string; onClose: () => void }) {
  const set = manifest[slug];
  const [zoom, setZoom] = useState(2);
  const [page, setPage] = useState(1);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Block the browser's save and print shortcuts while a document is open.
      if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "p")) e.preventDefault();
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setPage(Number((e.target as HTMLElement).dataset.page));
      },
      { root, rootMargin: "-45% 0px -45% 0px" },
    );
    root.querySelectorAll("[data-page]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [slug]);

  const maxWidth = set.width * ZOOMS[zoom] * (set.width > set.height ? 0.85 : 0.75);

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[200] flex flex-col bg-ink/90 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <header className="flex items-center gap-3 border-b border-white/10 bg-surface/80 px-4 py-3 sm:px-6">
        <span className="hidden size-9 shrink-0 place-items-center rounded-lg bg-indigo/15 text-indigo-300 sm:grid">
          <Eye className="size-4.5" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-display font-semibold text-white">{title}</h3>
          <p className="text-xs text-slate-500">
            Page {page} of {set.pages} · View only
          </p>
        </div>
        <div className="flex items-center rounded-lg border border-white/10">
          <button
            onClick={() => setZoom((z) => Math.max(0, z - 1))}
            disabled={zoom === 0}
            className="p-2 text-slate-300 transition hover:text-white disabled:opacity-30"
            aria-label="Zoom out"
          >
            <Minus className="size-4" />
          </button>
          <span className="w-12 text-center font-mono text-xs text-slate-400">{Math.round(ZOOMS[zoom] * 100)}%</span>
          <button
            onClick={() => setZoom((z) => Math.min(ZOOMS.length - 1, z + 1))}
            disabled={zoom === ZOOMS.length - 1}
            className="p-2 text-slate-300 transition hover:text-white disabled:opacity-30"
            aria-label="Zoom in"
          >
            <Plus className="size-4" />
          </button>
        </div>
        <button onClick={onClose} className="rounded-lg border border-white/10 p-2 text-slate-300 transition hover:bg-white/5 hover:text-white" aria-label="Close viewer">
          <X className="size-4" />
        </button>
      </header>

      <div ref={scroller} className="flex-1 overflow-auto overscroll-contain px-3 py-6 sm:px-6" data-lenis-prevent>
        <motion.div
          className="mx-auto flex select-none flex-col gap-4"
          style={{ maxWidth }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {Array.from({ length: set.pages }, (_, i) => (
            <div key={i} data-page={i + 1} className="relative overflow-hidden rounded-md bg-white shadow-2xl shadow-black/50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/viewer/${slug}/${i + 1}.webp`}
                alt={`${title} — page ${i + 1}`}
                width={set.width}
                height={set.height}
                loading={i < 2 ? "eager" : "lazy"}
                draggable={false}
                className="pointer-events-none block h-auto w-full"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>,
    document.body,
  );
}
