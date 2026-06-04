'use client'

const icons = [
  // walls — bricks
  <svg key="walls" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="6" width="15" height="7" rx="0.5"/><rect x="21" y="6" width="15" height="7" rx="0.5"/>
    <rect x="4" y="15" width="7" height="7" rx="0.5"/><rect x="13" y="15" width="14" height="7" rx="0.5"/><rect x="29" y="15" width="7" height="7" rx="0.5"/>
    <rect x="4" y="24" width="15" height="7" rx="0.5"/><rect x="21" y="24" width="15" height="7" rx="0.5"/>
  </svg>,
  // floors — parquet
  <svg key="floors" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 32 L20 16 L36 32"/><path d="M4 26 L14 16"/><path d="M16 28 L26 18"/><path d="M28 30 L36 22"/>
    <path d="M4 32 L36 32"/><path d="M8 28 L32 28" strokeOpacity="0.4"/>
  </svg>,
  // ceilings — lamp
  <svg key="ceilings" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12 L36 12" strokeWidth="2"/><line x1="20" y1="12" x2="20" y2="20"/>
    <path d="M14 20 Q20 26 26 20"/><path d="M16 20 L24 20"/>
    <line x1="20" y1="27" x2="20" y2="34" strokeOpacity="0.4"/>
    <line x1="14" y1="28" x2="10" y2="34" strokeOpacity="0.3"/><line x1="26" y1="28" x2="30" y2="34" strokeOpacity="0.3"/>
  </svg>,
  // finishing — door
  <svg key="finishing" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="6" width="22" height="32" rx="0.5"/><rect x="12" y="9" width="16" height="29" rx="0.5"/>
    <circle cx="24" cy="25" r="1.5"/><path d="M12 9 Q20 4 28 9"/>
  </svg>,
  // bathrooms — bathtub
  <svg key="bathrooms" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 20 Q6 32 12 32 L28 32 Q34 32 34 20"/><line x1="6" y1="20" x2="34" y2="20" strokeWidth="2"/>
    <line x1="12" y1="32" x2="12" y2="36"/><line x1="28" y1="32" x2="28" y2="36"/>
    <line x1="20" y1="14" x2="20" y2="20"/><path d="M16 14 L24 14" strokeWidth="2"/>
  </svg>,
  // kitchens — stove
  <svg key="kitchens" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="24" width="32" height="10" rx="1"/><circle cx="13" cy="18" r="5"/><circle cx="13" cy="18" r="2.5" strokeOpacity="0.4"/>
    <circle cx="27" cy="18" r="5"/><circle cx="27" cy="18" r="2.5" strokeOpacity="0.4"/>
    <path d="M11 8 Q12 5 11 2" strokeOpacity="0.5"/><path d="M15 8 Q16 5 15 2" strokeOpacity="0.5"/>
  </svg>,
  // installations — valve
  <svg key="installations" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="20" x2="14" y2="20" strokeWidth="2"/><line x1="26" y1="20" x2="36" y2="20" strokeWidth="2"/>
    <circle cx="20" cy="20" r="6"/><circle cx="20" cy="20" r="2" fill="currentColor" stroke="none"/>
    <line x1="20" y1="8" x2="20" y2="14" strokeWidth="2"/><line x1="20" y1="26" x2="20" y2="34" strokeWidth="2"/>
    <path d="M29 4 L25 12 L28 12 L24 20" strokeWidth="1.8"/>
  </svg>,
  // turnkey — house
  <svg key="turnkey" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 20 L20 8 L34 20"/><path d="M9 18 L9 34 L31 34 L31 18"/>
    <rect x="15" y="24" width="10" height="10" rx="0.5"/>
    <path d="M24 4 L27 7 L33 1" strokeWidth="2"/>
  </svg>,
]

// Fixed positions: [top%, left%, size-px, opacity, rotation]
const positions = [
  [8,  10, 47, 0.18, -15],
  [12, 82, 36, 0.14,  20],
  [72, 11, 39, 0.12,  10],
  [75, 84, 49, 0.16, -8],
  [30,  8, 31, 0.10,  25],
  [55, 86, 34, 0.12, -20],
  [85, 32, 42, 0.13,  5],
  [20, 66, 39, 0.11, -12],
] as const

export function HeroFloatingIcons() {
  return (
    <div className="hidden lg:block absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map((icon, i) => {
        const [top, left, size, opacity, rotate] = positions[i]
        return (
          <div
            key={i}
            className="absolute text-beige"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: size,
              height: size,
              opacity,
              transform: `rotate(${rotate}deg)`,
            }}
          >
            {icon}
          </div>
        )
      })}
    </div>
  )
}
