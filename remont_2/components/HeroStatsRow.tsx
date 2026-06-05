'use client'

import { ArrowRight } from 'lucide-react'

interface Props {
  projects: string
  experience: string
  satisfaction: string
  area: string
}

export function HeroStatsRow({ projects, experience, satisfaction, area }: Props) {
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

      {/* Main accent card */}
      <button
        onClick={() => scrollTo('realizacje')}
        className="group relative col-span-1 bg-beige rounded-2xl px-6 py-5 text-left overflow-hidden cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-beige-light/30 to-transparent pointer-events-none" />
        <p className="text-graphite/50 text-[9px] uppercase tracking-[0.25em] font-heading mb-2">Projekty</p>
        <div className="font-bricolage font-black text-[3.5rem] text-graphite leading-none">250+</div>
        <div className="flex items-end justify-between mt-2">
          <p className="text-graphite/70 font-heading text-[12px]">{projects}</p>
          <p className="text-graphite/50 text-[11px] font-heading">{area}</p>
        </div>
        <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-graphite/10 flex items-center justify-center text-graphite/40 group-hover:bg-graphite/20 transition-colors">
          <ArrowRight size={11} />
        </div>
      </button>

      {/* 30 years */}
      <div className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-2xl px-6 py-5">
        <p className="text-white/35 text-[9px] uppercase tracking-[0.25em] font-heading mb-2">Doświadczenie</p>
        <div className="font-bricolage font-black text-[3.5rem] text-white leading-none">30</div>
        <p className="text-white/40 font-heading text-[12px] mt-2">{experience}</p>
      </div>

      {/* 98% */}
      <div className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-2xl px-6 py-5">
        <p className="text-white/35 text-[9px] uppercase tracking-[0.25em] font-heading mb-2">Jakość</p>
        <div className="font-bricolage font-black text-[3.5rem] text-white leading-none">98%</div>
        <p className="text-white/40 font-heading text-[12px] mt-2">{satisfaction}</p>
      </div>

      {/* 4 steps */}
      <div className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-2xl px-6 py-5">
        <p className="text-white/35 text-[9px] uppercase tracking-[0.25em] font-heading mb-2">Proces</p>
        <div className="font-bricolage font-black text-[3.5rem] text-white leading-none">4</div>
        <div className="flex items-end justify-between mt-2">
          <p className="text-white/40 font-heading text-[12px]">Etapy realizacji</p>
          <p className="text-beige/60 text-[11px] font-heading">Zero chaosu</p>
        </div>
      </div>

    </div>
  )
}
