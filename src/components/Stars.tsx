'use client'

export default function Stars() {
  const stars = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    left: `${(i * 37 + 5) % 100}%`,
    delay: `${(i * 2.3) % 20}s`,
    duration: `${25 + (i * 3.7) % 30}s`,
    size: i % 4 === 0 ? '3px' : '2px',
  }))

  return (
    <div className="stars">
      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            left: s.left,
            animationDelay: s.delay,
            animationDuration: s.duration,
            width: s.size,
            height: s.size,
            bottom: 0,
          }}
        />
      ))}
    </div>
  )
}
