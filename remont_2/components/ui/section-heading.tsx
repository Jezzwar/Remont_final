interface SectionHeadingProps {
  label: string
  title: string
  linkText?: string
  linkHref?: string
}

export function SectionHeading({ label, title, linkText, linkHref }: SectionHeadingProps) {
  return (
    <div className="flex items-end justify-between mb-10">
      <div>
        <p className="text-beige text-[10px] uppercase tracking-[0.25em] font-heading mb-3 flex items-center gap-2">
          <span className="text-beige">+</span> {label}
        </p>
        <h2 className="font-heading font-black text-[clamp(1.5rem,4vw,3rem)] text-white uppercase leading-tight tracking-tight">
          {title}
        </h2>
      </div>
      {linkText && linkHref && (
        <a
          href={linkHref}
          className="hidden sm:flex items-center gap-2 text-white/40 hover:text-white text-[10px] uppercase tracking-[0.2em] font-heading transition-colors mb-2 whitespace-nowrap"
        >
          {linkText} →
        </a>
      )}
    </div>
  )
}
