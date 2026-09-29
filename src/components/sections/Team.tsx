"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Building2, GraduationCap, Mail, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { members, project, supervisors, type Person } from "@/data/site";

const accents = ["#8b5cf6", "#0ea5e9", "#10b981", "#f59e0b", "#6366f1", "#f43f5e"];

function initials(name: string) {
  const parts = name.replace(/^(Ms|Mrs|Mr|Dr|Prof)\.?\s+/i, "").split(/\s+/).filter(Boolean);
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function Avatar({ person, color, size = "size-24" }: { person: Person; color: string; size?: string }) {
  return (
    <div className={`relative ${size} shrink-0`}>
      <motion.div
        className="absolute -inset-[3px] rounded-full"
        style={{ background: `conic-gradient(from 0deg, ${color}, transparent 40%, ${color}88 70%, ${color})` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <div className="relative grid size-full place-items-center overflow-hidden rounded-full bg-ink-2">
        {person.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={person.photo} alt={person.name} className="size-full object-cover" />
        ) : (
          <span className="font-display text-2xl font-bold" style={{ color }}>
            {initials(person.name)}
          </span>
        )}
      </div>
    </div>
  );
}

function Socials({ p, color }: { p: Person; color: string }) {
  const items = [
    p.email && { href: `mailto:${p.email}`, label: "E-Mail", icon: <Mail className="size-3.5" /> },
    p.linkedin && { href: p.linkedin, label: "LinkedIn", icon: <LinkedinIcon className="size-3.5" /> },
    p.github && { href: p.github, label: "GitHub", icon: <GithubIcon className="size-3.5" /> },
    p.scholar && { href: p.scholar, label: "Scholar", icon: <GraduationCap className="size-3.5" /> },
  ].filter(Boolean) as { href: string; label: string; icon: ReactNode }[];

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {items.map((it) => (
        <a
          key={it.label}
          href={it.href}
          target={it.href.startsWith("mailto:") ? undefined : "_blank"}
          rel="noreferrer"
          className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:text-white"
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = color)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
        >
          {it.icon}
          {it.label}
        </a>
      ))}
    </div>
  );
}

export function Team() {
  return (
    <section id="team" className="relative overflow-hidden py-28">
      <div className="absolute top-1/3 left-1/2 size-[800px] -translate-x-1/2 rounded-full bg-violet/10 blur-[160px]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Research Group"
          icon={<Users className="size-3.5" />}
          title={
            <>
              Meet Our <span className="text-gradient">Team</span>
            </>
          }
          lead="The researchers and supervisors behind Code Guru."
        />

        <h3 className="mb-6 text-center font-mono text-xs tracking-[0.3em] text-slate-500 uppercase">Supervisors</h3>
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {supervisors.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
            >
              <TiltCard glow={accents[i + 4]} className="rounded-3xl">
                <div className="flex flex-col items-center gap-5 rounded-3xl border border-line bg-surface/70 p-7 text-center backdrop-blur sm:flex-row sm:text-left">
                  <Avatar person={s} color={accents[i + 4]} />
                  <div className="flex-1">
                    <span className="font-mono text-xs tracking-widest uppercase" style={{ color: accents[i + 4] }}>
                      {s.role}
                    </span>
                    <h4 className="mt-1 font-display text-xl font-bold text-white">{s.name}</h4>
                    <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-slate-400 sm:justify-start">
                      <Building2 className="size-3.5" /> {s.focus}
                    </p>
                    <p className="text-sm text-slate-500">{project.institution}</p>
                    <div className="mt-4 flex sm:[&>div]:justify-start">
                      <Socials p={s} color={accents[i + 4]} />
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <h3 className="mt-16 mb-6 text-center font-mono text-xs tracking-[0.3em] text-slate-500 uppercase">Research Members</h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((m, i) => {
            const color = accents[i];
            return (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 40, rotate: i % 2 ? 2 : -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard glow={color} className="h-full rounded-3xl">
                  <div className="relative flex h-full flex-col items-center overflow-hidden rounded-3xl border border-line bg-surface/70 p-6 text-center backdrop-blur">
                    <div className="absolute inset-x-0 top-0 h-24 opacity-30" style={{ background: `linear-gradient(180deg, ${color}, transparent)` }} />
                    {m.role === "Group Leader" && (
                      <span className="absolute top-4 right-4 rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] font-bold tracking-wide text-amber-300 uppercase">
                        ★ Leader
                      </span>
                    )}
                    <div className="relative mt-2">
                      <Avatar person={m} color={color} />
                    </div>
                    <h4 className="relative mt-5 font-display text-lg font-bold text-white">{m.name}</h4>
                    <p className="text-sm text-slate-400">{m.role}</p>
                    <span
                      className="mt-3 rounded-full px-3 py-1 font-mono text-[11px] font-semibold"
                      style={{ color, background: `${color}1a`, border: `1px solid ${color}40` }}
                    >
                      {m.focus}
                    </span>
                    <p className="mt-3 flex-1 text-xs text-slate-500">
                      {m.regNo} · Undergraduate
                      <br />
                      {project.department}
                    </p>
                    <div className="mt-5">
                      <Socials p={m} color={color} />
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
