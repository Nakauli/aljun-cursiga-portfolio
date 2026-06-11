export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.08)_1px,transparent_1px)] bg-[size:64px_64px] opacity-45 animate-slow-pan dark:opacity-35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(45,212,191,0.14),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(251,191,36,0.09),transparent_24%),radial-gradient(circle_at_50%_90%,rgba(244,114,182,0.08),transparent_30%)]" />
      <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent animate-pulse-line" />
      <svg className="absolute inset-0 h-full w-full opacity-30 dark:opacity-40" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <path
          d="M0 170H250L320 240H560L635 166H900L1010 276H1440"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-cyan-500"
        />
        <path
          d="M0 650H210L310 550H520L618 650H870L948 572H1440"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-emerald-500"
        />
        <path
          d="M120 0V190M360 240V420M760 166V0M1060 276V470M1180 572V900"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-amber-400"
        />
      </svg>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.5)_48%,transparent_52%)] bg-[length:100%_9px] opacity-[0.025] dark:opacity-[0.04]" />
    </div>
  );
}
