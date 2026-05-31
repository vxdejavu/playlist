'use client'

import { useState, useRef, useEffect } from 'react'
import Stars from '@/components/Stars'
import MoonSVG from '@/components/MoonSVG'
import AudioPlayer from '@/components/AudioPlayer'
import { tracks, pickToTrack } from '@/data/tracks'

type Screen = 'landing' | 'picks' | 'reveal' | 'playlist-locked' | 'playlist-open'
type PickStep = 0 | 1 | 2

const MOON_OPTIONS = [
  { label: 'New Moon', svg: (
    <svg viewBox="0 0 60 60" className="w-12 h-12">
      <circle cx="30" cy="30" r="26" fill="#0a0a14" stroke="#A77D4D" strokeWidth="1.5" strokeOpacity="0.6"/>
    </svg>
  )},
  { label: 'Crescent', svg: (
    <svg viewBox="0 0 60 60" className="w-12 h-12">
      <defs>
        <mask id="cMask">
          <circle cx="30" cy="30" r="26" fill="white"/>
          <circle cx="42" cy="30" r="20" fill="black"/>
        </mask>
      </defs>
      <circle cx="30" cy="30" r="26" fill="#A77D4D" fillOpacity="0.7" mask="url(#cMask)"/>
      <circle cx="30" cy="30" r="26" fill="none" stroke="#A77D4D" strokeWidth="1" strokeOpacity="0.4"/>
    </svg>
  )},
  { label: 'Full Moon', svg: (
    <svg viewBox="0 0 60 60" className="w-12 h-12">
      <defs>
        <radialGradient id="fmGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#c9a06a" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#5c4020" stopOpacity="0.5"/>
        </radialGradient>
      </defs>
      <circle cx="30" cy="30" r="26" fill="url(#fmGrad)"/>
    </svg>
  )},
]

const SYMBOL_OPTIONS = [
  { label: 'Flame', svg: (
    <svg viewBox="0 0 60 60" className="w-12 h-12">
      <path d="M30 8 C30 8 18 22 18 34 C18 44 23 52 30 52 C37 52 42 44 42 34 C42 22 30 8 30 8Z" fill="#860003" fillOpacity="0.75"/>
      <path d="M30 22 C30 22 24 30 24 36 C24 42 27 46 30 46 C33 46 36 42 36 36 C36 30 30 22 30 22Z" fill="#A77D4D" fillOpacity="0.6"/>
    </svg>
  )},
  { label: 'Mirror', svg: (
    <svg viewBox="0 0 60 60" className="w-12 h-12">
      <rect x="16" y="10" width="28" height="32" rx="14" fill="none" stroke="#A77D4D" strokeWidth="1.5" strokeOpacity="0.7"/>
      <rect x="20" y="14" width="20" height="24" rx="10" fill="#193B67" fillOpacity="0.4"/>
      <line x1="30" y1="42" x2="30" y2="50" stroke="#A77D4D" strokeWidth="1.5" strokeOpacity="0.6"/>
      <line x1="24" y1="50" x2="36" y2="50" stroke="#A77D4D" strokeWidth="1.5" strokeOpacity="0.6"/>
    </svg>
  )},
  { label: 'Root', svg: (
    <svg viewBox="0 0 60 60" className="w-12 h-12">
      <line x1="30" y1="8" x2="30" y2="52" stroke="#A77D4D" strokeWidth="1.5" strokeOpacity="0.7"/>
      <path d="M30 30 C30 30 16 22 12 14" stroke="#A77D4D" strokeWidth="1.2" strokeOpacity="0.5" fill="none"/>
      <path d="M30 30 C30 30 44 22 48 14" stroke="#A77D4D" strokeWidth="1.2" strokeOpacity="0.5" fill="none"/>
      <path d="M30 40 C30 40 20 36 14 40" stroke="#A77D4D" strokeWidth="1" strokeOpacity="0.4" fill="none"/>
      <path d="M30 40 C30 40 40 36 46 40" stroke="#A77D4D" strokeWidth="1" strokeOpacity="0.4" fill="none"/>
    </svg>
  )},
]

const COLOR_OPTIONS = [
  { label: '', color: '#860003', glow: 'rgba(134,0,3,0.5)' },
  { label: '', color: '#193B67', glow: 'rgba(25,59,103,0.5)' },
  { label: '', color: '#A77D4D', glow: 'rgba(167,125,77,0.5)' },
]

const PICK_QUESTIONS = [
  'Which moon calls to you?',
  'Which symbol speaks first?',
  'Which light finds you?',
]

export default function Home() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [pickStep, setPickStep] = useState<PickStep>(0)
  const [picks, setPicks] = useState<number[]>([])
  const [selectedPick, setSelectedPick] = useState<number | null>(null)
  const [fateTrack, setFateTrack] = useState<number>(0)
  const [revealed, setRevealed] = useState(false)
  const [riddle, setRiddle] = useState('')
  const [riddleError, setRiddleError] = useState(false)
  const [riddleShake, setRiddleShake] = useState(false)
  const [playlistOpen, setPlaylistOpen] = useState(false)
  const [activeTrack, setActiveTrack] = useState<number>(0)
  const [playingSrc, setPlayingSrc] = useState<string>('')
  const [sweeping, setSweeping] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const getAudioSrc = (filename: string) =>
    `/audio/${encodeURIComponent(filename)}`

  const handleStart = () => {
    setScreen('picks')
    setPickStep(0)
    setPicks([])
    setSelectedPick(null)
    setRevealed(false)
  }

  const handlePick = (idx: number) => {
    setSelectedPick(idx)
    setTimeout(() => {
      const newPicks = [...picks, idx]
      setPicks(newPicks)
      setSelectedPick(null)
      if (newPicks.length === 3) {
        const key = newPicks.join('-')
        const trackIdx = pickToTrack[key] ?? 1
        setFateTrack(trackIdx)
        setScreen('reveal')
        setTimeout(() => {
          setRevealed(true)
          setSweeping(true)
          const src = getAudioSrc(tracks[trackIdx].filename)
          setPlayingSrc(src)
          setActiveTrack(trackIdx)
          setTimeout(() => setSweeping(false), 1400)
        }, 600)
      } else {
        setPickStep((pickStep + 1) as PickStep)
      }
    }, 350)
  }

  const handleRiddle = (e: React.FormEvent) => {
    e.preventDefault()
    const val = riddle.trim().toLowerCase()
    if (['moon', 'the moon', 'blue moon'].includes(val)) {
      setPlaylistOpen(true)
      setRiddleError(false)
    } else {
      setRiddleError(true)
      setRiddleShake(true)
      setTimeout(() => setRiddleShake(false), 500)
    }
  }

  const handleTrackClick = (idx: number) => {
    setActiveTrack(idx)
    setPlayingSrc(getAudioSrc(tracks[idx].filename))
  }

  const pickOptions = [MOON_OPTIONS, SYMBOL_OPTIONS, COLOR_OPTIONS]

  return (
    <main className="relative min-h-screen flex flex-col items-center">
      <Stars />

      {/* Faint moon watermark behind all screens */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-[0.04]">
        <MoonSVG className="w-[500px] h-[500px]" />
      </div>

      {/* ── LANDING ── */}
      {screen === 'landing' && (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
          <div className="moon-pulse mb-8">
            <MoonSVG className="w-32 h-32 md:w-44 md:h-44" />
          </div>

          {/* VIIXE Logo */}
          <img
            src="/VIIXE LOGO.png"
            alt="VIIXE"
            className="h-10 md:h-14 object-contain mb-2 opacity-90"
          />

          <div className="ornate-divider w-48 my-4">
            <span className="font-serif text-[10px] tracking-[0.3em] text-gold/60">✦</span>
          </div>

          <p className="font-gothic text-2xl md:text-3xl text-gold/80 mb-2 tracking-wide">
            (IM)MEMORIALIS
          </p>

          <p className="font-serif italic text-parchment/50 text-sm md:text-base mb-1 tracking-wider">
            DÉJÀ VU: Luna Caerulea Oriens
          </p>
          <p className="font-serif text-parchment/30 text-xs tracking-[0.2em] mb-10">
            1ST VIIXE FANMEETING · MAY 31, 2026
          </p>

          <p className="font-serif italic text-parchment/60 text-lg md:text-xl mb-10 tracking-wide">
            "The moon has been waiting for you."
          </p>

          <button
            onClick={handleStart}
            className="gold-glow border border-gold/50 px-10 py-3 font-serif text-gold tracking-[0.2em] text-sm uppercase hover:bg-gold/10 transition-all duration-300"
          >
            Let it choose
          </button>
        </div>
      )}

      {/* ── PICKS ── */}
      {screen === 'picks' && (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
          <p className="font-serif italic text-parchment/40 text-xs tracking-[0.2em] mb-6">
            {pickStep + 1} of 3
          </p>

          <p className="font-gothic text-2xl md:text-3xl text-gold/70 mb-10 tracking-wide">
            {PICK_QUESTIONS[pickStep]}
          </p>

          <div className="flex gap-6 md:gap-10 items-end justify-center flex-wrap">
            {pickStep === 2
              ? COLOR_OPTIONS.map((opt, i) => (
                  <div
                    key={i}
                    onClick={() => handlePick(i)}
                    className={`pick-option flex flex-col items-center gap-3 ${selectedPick === i ? 'selected' : ''}`}
                  >
                    <div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 transition-all duration-300"
                      style={{
                        background: opt.color,
                        borderColor: selectedPick === i ? '#c9a06a' : opt.color,
                        boxShadow: selectedPick === i ? `0 0 24px ${opt.glow}` : `0 0 10px ${opt.glow}`,
                      }}
                    />
                  </div>
                ))
              : pickOptions[pickStep].map((opt: any, i: number) => (
                  <div
                    key={i}
                    onClick={() => handlePick(i)}
                    className={`pick-option flex flex-col items-center gap-3 group ${selectedPick === i ? 'selected' : ''}`}
                  >
                    <div
                      className="w-24 h-24 md:w-28 md:h-28 border border-gold/20 flex items-center justify-center transition-all duration-300 group-hover:border-gold/60"
                      style={{
                        background: selectedPick === i ? 'rgba(167,125,77,0.12)' : 'rgba(10,10,20,0.6)',
                        boxShadow: selectedPick === i ? '0 0 20px rgba(167,125,77,0.3)' : 'none',
                      }}
                    >
                      {opt.svg}
                    </div>
                    <span className="font-serif text-parchment/50 text-xs tracking-[0.15em] uppercase group-hover:text-parchment/80 transition-colors">
                      {opt.label}
                    </span>
                  </div>
                ))
            }
          </div>
        </div>
      )}

      {/* ── REVEAL ── */}
      {screen === 'reveal' && (
        <div className="relative z-10 flex flex-col items-center min-h-screen px-6 pt-16 pb-20">
          {/* Header */}
          <div className={`text-center mb-10 fade-in-up`}>
            <p className="font-gothic text-xl md:text-2xl text-gold/60 mb-1 tracking-wide">
              The moon has spoken.
            </p>
            <div className="ornate-divider w-40 mx-auto mt-3">
              <span className="font-serif text-[10px] tracking-[0.3em] text-gold/40">✦</span>
            </div>
          </div>

          {/* Track reveal */}
          {revealed && (
            <div className="text-center mb-10 fade-in-up delay-1">
              <p className="font-serif text-parchment/40 text-xs tracking-[0.3em] uppercase mb-3">
                Track {String(tracks[fateTrack].id).padStart(2, '0')}
              </p>
              <h2 className="font-gothic text-4xl md:text-5xl text-gold mb-1 tracking-wide">
                {tracks[fateTrack].title}
              </h2>
              {tracks[fateTrack].titleKo && (
                <p className="font-serif text-parchment/30 text-sm tracking-wider">
                  {tracks[fateTrack].titleKo}
                </p>
              )}
              <p className="font-serif italic text-parchment/55 text-sm md:text-base mt-4 max-w-xs mx-auto leading-relaxed tracking-wide">
                "{tracks[fateTrack].flavor}"
              </p>
            </div>
          )}

          {/* Player */}
          {revealed && (
            <div className={`w-full max-w-sm mb-8 fade-in-up delay-2 ${sweeping ? 'sweep-shimmer' : ''} relative border border-gold/25 p-5`}
              style={{ background: 'rgba(10,10,20,0.8)' }}>
              <AudioPlayer src={playingSrc} autoPlay={true} />
            </div>
          )}

          {/* Credits */}
          {revealed && (
            <div className="w-full max-w-sm mb-10 fade-in-up delay-3">
              <div className="border border-gold/10 p-4" style={{ background: 'rgba(10,10,20,0.6)' }}>
                <p className="font-serif text-[10px] tracking-[0.25em] text-gold/40 uppercase mb-3 text-center">Credits</p>
                {tracks[fateTrack].credits.lyrics && (
                  <div className="mb-2">
                    <span className="font-serif text-[10px] tracking-[0.2em] text-parchment/30 uppercase">Lyrics · </span>
                    <span className="font-serif text-xs text-parchment/60">{tracks[fateTrack].credits.lyrics!.join(', ')}</span>
                  </div>
                )}
                <div className="mb-2">
                  <span className="font-serif text-[10px] tracking-[0.2em] text-parchment/30 uppercase">Composed · </span>
                  <span className="font-serif text-xs text-parchment/60">{tracks[fateTrack].credits.composed.join(', ')}</span>
                </div>
                <div>
                  <span className="font-serif text-[10px] tracking-[0.2em] text-parchment/30 uppercase">Produced · </span>
                  <span className="font-serif text-xs text-parchment/60">{tracks[fateTrack].credits.produced.join(', ')}</span>
                </div>
              </div>
            </div>
          )}

          {/* Grimoire unlock */}
          {revealed && (
            <div className="w-full max-w-sm fade-in-up delay-4">
              <div className="text-center mb-6">
                <div className="ornate-divider w-full mb-5">
                  <span className="font-serif text-[10px] tracking-[0.3em] text-gold/40">✦</span>
                </div>

                {!playlistOpen ? (
                  <>
                    {/* Book icon */}
                    <div className={`mb-4 ${riddleShake ? 'shake' : ''}`}>
                      <svg viewBox="0 0 60 60" className="w-12 h-12 mx-auto" fill="none">
                        <rect x="10" y="8" width="36" height="44" rx="2" stroke="#A77D4D" strokeWidth="1.2" strokeOpacity="0.5"/>
                        <rect x="14" y="8" width="4" height="44" fill="#A77D4D" fillOpacity="0.15"/>
                        <line x1="20" y1="20" x2="40" y2="20" stroke="#A77D4D" strokeWidth="0.8" strokeOpacity="0.3"/>
                        <line x1="20" y1="26" x2="40" y2="26" stroke="#A77D4D" strokeWidth="0.8" strokeOpacity="0.3"/>
                        <line x1="20" y1="32" x2="32" y2="32" stroke="#A77D4D" strokeWidth="0.8" strokeOpacity="0.3"/>
                        {/* Lock */}
                        <rect x="25" y="37" width="10" height="8" rx="1" stroke="#A77D4D" strokeWidth="1" strokeOpacity="0.6"/>
                        <path d="M27 37 C27 33 33 33 33 37" stroke="#A77D4D" strokeWidth="1" strokeOpacity="0.6" fill="none"/>
                      </svg>
                    </div>

                    <p className="font-serif italic text-parchment/40 text-xs mb-1 tracking-wide">
                      The grimoire holds the rest.
                    </p>
                    <p className="font-serif italic text-parchment/55 text-sm mb-5 leading-relaxed max-w-xs mx-auto">
                      "Seven were condemned. Seven became stars.<br/>
                      What watched them rise — and still watches now?"
                    </p>

                    <form onSubmit={handleRiddle} className="flex flex-col items-center gap-3">
                      <input
                        ref={inputRef}
                        value={riddle}
                        onChange={e => setRiddle(e.target.value)}
                        placeholder="speak your answer"
                        className="bg-transparent border-b border-gold/30 focus:border-gold/70 outline-none text-center font-serif italic text-parchment/70 text-sm py-2 px-4 w-52 placeholder:text-parchment/25 transition-colors duration-200"
                      />
                      {riddleError && (
                        <p className="font-serif italic text-crimson/70 text-xs tracking-wide">
                          The moon does not answer to that name.
                        </p>
                      )}
                      <button
                        type="submit"
                        className="font-serif text-[11px] tracking-[0.2em] uppercase text-gold/60 hover:text-gold transition-colors duration-200 mt-1"
                      >
                        Open →
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="page-unfurl">
                    <p className="font-gothic text-xl text-gold/70 mb-1 tracking-wide">The Grimoire Opens</p>
                    <p className="font-serif italic text-parchment/40 text-xs tracking-wider mb-6">all ten tracks await</p>
                  </div>
                )}
              </div>

              {/* Full Playlist */}
              {playlistOpen && (
                <div className="page-unfurl border border-gold/15" style={{ background: 'rgba(10,10,20,0.85)' }}>
                  {/* Header */}
                  <div className="px-5 pt-5 pb-3 border-b border-gold/10">
                    <div className="flex items-center gap-3">
                      <img src="/VIIXE SYMBOL.png" alt="" className="w-6 h-6 opacity-60" />
                      <div>
                        <p className="font-gothic text-gold/70 text-sm tracking-wide">(IM)MEMORIALIS</p>
                        <p className="font-serif text-parchment/30 text-[10px] tracking-[0.2em] uppercase">Full Album · 10 Tracks</p>
                      </div>
                    </div>
                  </div>

                  {/* Fate track pinned */}
                  <div className="px-5 py-3 border-b border-gold/10 bg-gold/5">
                    <p className="font-serif text-[9px] tracking-[0.25em] text-gold/50 uppercase mb-1 flex items-center gap-1.5">
                      <span>✦</span> Your fate track
                    </p>
                    <p className="font-serif text-parchment/80 text-sm font-medium">{tracks[fateTrack].title}</p>
                  </div>

                  {/* Track list */}
                  <div>
                    {tracks.map((track, idx) => (
                      <div key={track.id}>
                        <button
                          onClick={() => handleTrackClick(idx)}
                          className={`playlist-row w-full text-left px-5 py-3.5 ${activeTrack === idx ? 'active' : ''}`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="font-serif text-[11px] text-gold/40 min-w-[20px] pt-0.5">
                              {String(track.id).padStart(2, '0')}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className={`font-serif text-sm truncate ${activeTrack === idx ? 'text-parchment' : 'text-parchment/70'}`}>
                                {track.title}
                                {track.titleKo && (
                                  <span className="text-parchment/30 text-xs ml-2">{track.titleKo}</span>
                                )}
                              </p>
                              {/* Credits inline */}
                              <p className="font-serif text-[10px] text-parchment/25 mt-0.5">
                                {track.credits.composed.join(', ')}
                              </p>
                              {/* Flavor text only on active */}
                              {activeTrack === idx && (
                                <p className="font-serif italic text-parchment/40 text-[11px] mt-1 leading-relaxed">
                                  {track.flavor}
                                </p>
                              )}
                            </div>
                            {activeTrack === idx && (
                              <div className="flex-shrink-0 pt-1">
                                <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 fill-gold/60">
                                  <polygon points="1,0 11,6 1,12"/>
                                </svg>
                              </div>
                            )}
                          </div>
                        </button>

                        {/* Inline player for active track */}
                        {activeTrack === idx && (
                          <div className="px-5 pb-3 border-b border-gold/5">
                            <AudioPlayer src={playingSrc} autoPlay={playingSrc === getAudioSrc(track.filename)} minimal />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="px-5 py-4 border-t border-gold/10 text-center">
                    <p className="font-serif text-[10px] text-parchment/20 tracking-[0.2em]">
                      VIIXE · H-LABEL · HG LORE
                    </p>
                    <p className="font-serif text-[10px] text-parchment/15 tracking-[0.15em] mt-0.5">
                      DÉJÀ VU: LUNA CAERULEA ORIENS · MAY 31, 2026
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Try again */}
          {revealed && (
            <button
              onClick={handleStart}
              className="mt-8 fade-in-up delay-5 font-serif text-[11px] tracking-[0.2em] uppercase text-parchment/25 hover:text-parchment/60 transition-colors duration-200"
            >
              Let the moon choose again
            </button>
          )}
        </div>
      )}
    </main>
  )
}
