# VIIXE — (IM)MEMORIALIS Playlist
### DÉJÀ VU: Luna Caerulea Oriens · 1st VIIXE Fanmeeting

---

## Setup

### 1. Add your audio files
Place all 10 MP3 files inside `/public/audio/`:

```
public/
  audio/
    Intro (Intro).mp3
    Deja Vu (데자부 (Deja Vu)).mp3
    Chase Me (Chase Me).mp3
    Silent Night (Silent Night).mp3
    The curse of the Spider (거미의 저주 (The curse of the Spider)).mp3
    Full Moon (Full Moon).mp3
    Tension (Tension).mp3
    Daybreak (새벽).mp3
    In The Frozen (In The Frozen).mp3
    Starlight.mp3
```

### 2. Add your logo files
Place both PNG files in `/public/`:

```
public/
  VIIXE LOGO.png
  VIIXE SYMBOL.png
```

### 3. Install and run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. No environment variables needed
4. Deploy

---

## The riddle answer

The locked grimoire accepts: `moon` / `the moon` / `blue moon` (case insensitive)

---

## Customizing pick-to-track logic

Edit `src/data/tracks.ts` — the `pickToTrack` object maps every combination of three picks to a track index (0–9).

Format: `'moon-symbol-color': trackIndex`
- Moon: 0 = New Moon, 1 = Crescent, 2 = Full Moon  
- Symbol: 0 = Flame, 1 = Mirror, 2 = Root  
- Color: 0 = Red, 1 = Blue, 2 = Gold  
- Track index: 0 = Intro, 1 = Déjà Vu, ..., 9 = Starlight
