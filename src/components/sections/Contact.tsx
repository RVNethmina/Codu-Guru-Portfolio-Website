"use client";

import { motion } from "motion/react";
import { Building2, GraduationCap, Mail, MapPin, MessageSquare, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { contactEmail, project, supervisors } from "@/data/site";

const subjects = ["Research Collaboration", "General Inquiry", "Using Code Guru", "Academic Partnership", "Other"];

const field =
  "w-full rounded-xl border border-white/10 bg-ink/70 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-violet/60 focus:ring-4 focus:ring-violet/10";

export function Contact() {
  const [sent, setSent] = useState(false);

  // A static site has no mail server, so the form composes an email in the visitor's own mail app.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = `${f.get("first") ?? ""} ${f.get("last") ?? ""}`.trim();
    const body = `${f.get("message") ?? ""}\n\n— ${name}\n${f.get("email") ?? ""}`;
    const href = `mailto:${contactEmail}?subject=${encodeURIComponent(`[Code Guru] ${f.get("subject")}`)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  const info = [
    { icon: Building2, label: "Institution", lines: [project.institution + " (SLIIT)", project.location] },
    { icon: GraduationCap, label: "Faculty", lines: [project.faculty, project.department] },
    { icon: Mail, label: "Supervisors", lines: supervisors.map((s) => s.email ?? "") },
    { icon: MapPin, label: "Project", lines: [`${project.id} · ${project.module}`] },
  ];

  return (
    <section id="contact" className="relative overflow-hidden py-28">
      <div className="absolute inset-x-0 bottom-0 h-[500px] bg-gradient-to-t from-violet/10 to-transparent" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <Reveal x={-30} y={0}>
          <span className="inline-flex items-center gap-2 rounded-full border border-violet/30 bg-violet/10 px-4 py-1.5 font-mono text-xs tracking-[0.18em] text-violet uppercase">
            <MessageSquare className="size-3.5" /> Connect With Us
          </span>
          <h2 className="mt-5 font-display text-4xl leading-tight font-bold text-white sm:text-5xl">
            We&apos;d love to
            <br />
            <span className="text-gradient">hear from you</span>
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-slate-400">
            Questions about Code Guru, collaboration ideas, or want to try it in your programming lab? Reach out through the form or the
            details below.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {info.map((it, i) => (
              <motion.div
                key={it.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="flex gap-4"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-violet/25 bg-violet/10 text-violet">
                  <it.icon className="size-5" />
                </span>
                <div>
                  <div className="text-xs font-semibold tracking-wider text-slate-500 uppercase">{it.label}</div>
                  {it.lines.map((l) =>
                    it.label === "Supervisors" ? (
                      <a key={l} href={`mailto:${l}`} className="block text-sm text-slate-300 hover:text-sky">
                        {l}
                      </a>
                    ) : (
                      <div key={l} className="text-sm text-slate-300">
                        {l}
                      </div>
                    ),
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>

        <Reveal x={30} y={0} delay={0.1}>
          <form onSubmit={onSubmit} className="glass relative overflow-hidden rounded-3xl p-7 sm:p-9">
            <div className="absolute -top-24 -right-24 size-56 rounded-full bg-sky/20 blur-3xl" aria-hidden />
            <div className="relative grid gap-4 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-400 uppercase">Your email</span>
                <input required type="email" name="email" placeholder="you@example.com" className={field} />
              </label>
              <label>
                <span className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-400 uppercase">First name</span>
                <input required name="first" className={field} />
              </label>
              <label>
                <span className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-400 uppercase">Last name</span>
                <input name="last" className={field} />
              </label>
              <label className="sm:col-span-2">
                <span className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-400 uppercase">Subject</span>
                <select name="subject" className={field} defaultValue={subjects[0]}>
                  {subjects.map((s) => (
                    <option key={s} className="bg-ink">
                      {s}
                    </option>
                  ))}
                </select>
              </label>
              <label className="sm:col-span-2">
                <span className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-400 uppercase">Message</span>
                <textarea required name="message" rows={5} className={`${field} resize-none`} />
              </label>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex items-center justify-center gap-2 rounded-xl bg-brand py-3.5 font-semibold text-white shadow-[0_0_30px_rgba(99,102,241,0.35)] sm:col-span-2"
              >
                <Send className="size-4" />
                {sent ? "Opening your mail app…" : "Send Message"}
              </motion.button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
