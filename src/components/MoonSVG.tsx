export default function MoonSVG({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="moonGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#c9a06a" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#A77D4D" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#5c4020" stopOpacity="0.4" />
        </radialGradient>
        <filter id="moonBlur">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
        <filter id="moonGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Outer glow ring */}
      <circle cx="60" cy="60" r="55" fill="none" stroke="#A77D4D" strokeWidth="0.5" strokeOpacity="0.2" filter="url(#moonBlur)" />
      <circle cx="60" cy="60" r="48" fill="none" stroke="#A77D4D" strokeWidth="0.3" strokeOpacity="0.15" />
      {/* Moon body */}
      <circle cx="60" cy="60" r="44" fill="url(#moonGrad)" filter="url(#moonGlow)" />
      {/* Craters */}
      <circle cx="45" cy="52" r="5" fill="#5c4020" fillOpacity="0.25" />
      <circle cx="72" cy="44" r="3" fill="#5c4020" fillOpacity="0.2" />
      <circle cx="55" cy="72" r="4" fill="#5c4020" fillOpacity="0.18" />
      <circle cx="78" cy="68" r="2.5" fill="#5c4020" fillOpacity="0.15" />
    </svg>
  )
}
