'use client'

import { useEffect, useRef, useState } from 'react'

interface AudioPlayerProps {
  src: string
  autoPlay?: boolean
  minimal?: boolean
}

export default function AudioPlayer({ src, autoPlay = false, minimal = false }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.src = src
    audio.load()
    if (autoPlay) {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    } else {
      setPlaying(false)
    }
    setProgress(0)
    setCurrentTime(0)
  }, [src, autoPlay])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => {
      setCurrentTime(audio.currentTime)
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0)
    }
    const onLoaded = () => setDuration(audio.duration)
    const onEnded = () => setPlaying(false)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) { audio.pause(); setPlaying(false) }
    else { audio.play().then(() => setPlaying(true)).catch(() => {}) }
  }

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    const val = parseFloat(e.target.value)
    audio.currentTime = (val / 100) * audio.duration
    setProgress(val)
  }

  const fmt = (s: number) => {
    if (!s || isNaN(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <div className="w-full">
      <audio ref={audioRef} preload="metadata" />
      <div className="flex items-center gap-3">
        {/* Play/Pause */}
        <button
          onClick={toggle}
          className="flex-shrink-0 w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center hover:border-gold/80 hover:bg-gold/10 transition-all duration-200 group"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? (
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-gold">
              <rect x="3" y="2" width="4" height="12" rx="1"/>
              <rect x="9" y="2" width="4" height="12" rx="1"/>
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-gold ml-0.5">
              <polygon points="3,1 13,8 3,15"/>
            </svg>
          )}
        </button>

        {/* Progress */}
        <div className="flex-1 flex flex-col gap-1">
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={seek}
            className="audio-progress w-full h-0.5"
          />
          {!minimal && (
            <div className="flex justify-between">
              <span className="text-[10px] text-parchment/30 font-serif">{fmt(currentTime)}</span>
              <span className="text-[10px] text-parchment/30 font-serif">{fmt(duration)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
