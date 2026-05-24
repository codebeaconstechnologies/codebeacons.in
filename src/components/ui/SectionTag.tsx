interface SectionTagProps {
  label: string
  className?: string
}

export default function SectionTag({ label, className = '' }: SectionTagProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
      {label}
    </span>
  )
}
