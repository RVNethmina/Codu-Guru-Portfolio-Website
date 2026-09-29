import clsx from "clsx";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={clsx("shrink-0", className)} aria-hidden>
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="55%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#logo-grad)" />
      <g transform="translate(4 4)">
        <path d="M9.5 7.5 5.5 12l4 4.5" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m15.4 6.6.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9z" fill="#fff" />
      </g>
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={clsx("flex items-center gap-2.5", className)}>
      <LogoMark className="size-9 drop-shadow-[0_0_14px_rgba(139,92,246,0.55)]" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-bold tracking-tight text-gradient">Code Guru</span>
        <span className="mt-1 font-mono text-[10px] tracking-[0.2em] text-slate-500">R26-SE-036</span>
      </span>
    </span>
  );
}
