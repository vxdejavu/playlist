export interface Track {
  id: number
  title: string
  titleKo?: string
  filename: string
  flavor: string
  credits: {
    lyrics?: string[]
    composed: string[]
    produced: string[]
  }
}

export const tracks: Track[] = [
  {
    id: 1,
    title: 'Intro',
    filename: 'Intro (Intro).mp3',
    flavor: 'The silence before the spell is still part of the spell.',
    credits: {
      composed: ['August'],
      produced: ['August'],
    },
  },
  {
    id: 2,
    title: 'Déjà Vu',
    titleKo: '데자부',
    filename: 'Deja Vu (데자부 (Deja Vu)).mp3',
    flavor: 'You have stood here before. The moon made sure of it.',
    credits: {
      lyrics: ['Orpheus'],
      composed: ['Arle', '이오리', 'GIAN'],
      produced: ['Orpheus', 'Dojoan'],
    },
  },
  {
    id: 3,
    title: 'Chase Me',
    filename: 'Chase Me (Chase Me).mp3',
    flavor: 'Run if you want. The dark already knows your name.',
    credits: {
      lyrics: ['Annli', 'Yuu'],
      composed: ['Jass', 'ƧEN'],
      produced: ['PHANTOM', 'GIAN', 'Dojoan'],
    },
  },
  {
    id: 4,
    title: 'Silent Night',
    filename: 'Silent Night (Silent Night).mp3',
    flavor: 'Even the quietest night holds something that watches.',
    credits: {
      lyrics: ['Orpheus'],
      composed: ['Orpheus', 'Violet'],
      produced: ['August', 'Dojoan'],
    },
  },
  {
    id: 5,
    title: 'The Curse of the Spider',
    titleKo: '거미의 저주',
    filename: 'The curse of the Spider (거미의 저주 (The curse of the Spider)).mp3',
    flavor: 'Every web was once just a single thread of intent.',
    credits: {
      lyrics: ['Annli', 'PHANTOM'],
      composed: ['CI-EL'],
      produced: ['Orpheus', 'GIAN', 'Dojoan'],
    },
  },
  {
    id: 6,
    title: 'Full Moon',
    filename: 'Full Moon (Full Moon).mp3',
    flavor: 'She does not ask permission to illuminate what you have hidden.',
    credits: {
      lyrics: ['이오리', 'Orpheus'],
      composed: ['이오리', 'Arle'],
      produced: ['Ramen', 'Orpheus'],
    },
  },
  {
    id: 7,
    title: 'Tension',
    filename: 'Tension (Tension).mp3',
    flavor: 'The moment before breaking is the most honest moment.',
    credits: {
      lyrics: ['Violet', 'Yuu'],
      composed: ['Arle', 'ƧEN'],
      produced: ['Violet', 'CI-EL'],
    },
  },
  {
    id: 8,
    title: 'Daybreak',
    titleKo: '새벽',
    filename: 'Daybreak (새벽).mp3',
    flavor: 'Light does not erase what happened in the dark. It only names it.',
    credits: {
      lyrics: ['EVE'],
      composed: ['Jass'],
      produced: ['Björn'],
    },
  },
  {
    id: 9,
    title: 'In the Frozen',
    filename: 'In The Frozen (In The Frozen).mp3',
    flavor: 'Some things survive by learning not to move.',
    credits: {
      lyrics: ['Annli'],
      composed: ['PHANTOM'],
      produced: ['August'],
    },
  },
  {
    id: 10,
    title: 'Starlight',
    filename: 'Starlight.mp3',
    flavor: 'They became stars so you would never have to look for them.',
    credits: {
      lyrics: ['Orpheus'],
      composed: ['Arle', 'ƧEN'],
      produced: ['Orpheus', 'GIAN'],
    },
  },
]

// 27 pick combinations (moon x symbol x color) mapped to track indices (0-based)
// moon: 0=new, 1=crescent, 2=full
// symbol: 0=flame, 1=mirror, 2=root
// color: 0=red, 1=blue, 2=gold
// Déjà Vu (index 1) appears most as the title track
export const pickToTrack: Record<string, number> = {
  '0-0-0': 2, // Chase Me
  '0-0-1': 1, // Déjà Vu
  '0-0-2': 4, // Silent Night
  '0-1-0': 1, // Déjà Vu
  '0-1-1': 6, // Tension
  '0-1-2': 0, // Intro
  '0-2-0': 8, // In the Frozen
  '0-2-1': 3, // Silent Night
  '0-2-2': 1, // Déjà Vu
  '1-0-0': 5, // Full Moon
  '1-0-1': 1, // Déjà Vu
  '1-0-2': 7, // Daybreak
  '1-1-0': 4, // The Curse of the Spider
  '1-1-1': 1, // Déjà Vu
  '1-1-2': 9, // Starlight
  '1-2-0': 2, // Chase Me
  '1-2-1': 6, // Tension
  '1-2-2': 1, // Déjà Vu
  '2-0-0': 3, // Silent Night
  '2-0-1': 8, // In the Frozen
  '2-0-2': 1, // Déjà Vu
  '2-1-0': 0, // Intro
  '2-1-1': 5, // Full Moon
  '2-1-2': 7, // Daybreak
  '2-2-0': 1, // Déjà Vu
  '2-2-1': 9, // Starlight
  '2-2-2': 4, // The Curse of the Spider
}
