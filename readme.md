# bala-viji-swap-website

**GitHub:** https://github.com/bala-viji-couples-swap/bala-viji-swap-website.git  

Adult (18+) **static multi-page site** for **Vijayalakshmi (age 25)** and **Bala** — Chennai couple-swap / mangalsutra-wife character world. Dark red & black erotic UI.

The site is built as a **house of rooms** (not one endless scroll): photos first, then explore hubs (Her / Us / Him / Nights / Looks), long story chapters, chats, and dated nights.

> **For Grok CLI / any AI agent:** Read this file fully before editing. No build toolchain. Open `index.html` in a browser or serve the folder statically.  
> **No rates, no prices, no booking CTA** — story, gallery, and couple lore only.  
> **No site audio** — sound features were removed by owner request.

---

## Quick facts (do not invent conflicting canon)

| Field | Value |
|--------|--------|
| Character name | Vijayalakshmi (display: Vijayalakshmi / Viji) |
| Age | **25** (current) |
| Origin story | From Kovilpatti; came to Chennai ~2021 for UPSC (Kingmaker Academy, Anna Nagar) |
| Partner | Bala (husband / handler figure in story & photos) |
| Brothers (story) | Gopi, Raja, Kumar — still believe she is the studious sister |
| Location | Chennai, India |
| Content rating | **18+ only** — explicit erotic copy + adult photos |
| Site type | Static HTML/CSS/JS — **no npm, no bundler, no backend** |
| Hosting target | Cloudflare Pages (or any static host) |
| Booking / pricing UI | **None** — do not re-add rate cards, cost tables, or Telegram book buttons unless the user asks |
| Social | Instagram [@pattu.vg69](https://www.instagram.com/pattu.vg69) · X [@BalaViji69](https://x.com/BalaViji69) · Pinterest [Vijayalakshmi_soothu](https://in.pinterest.com/Vijayalakshmi_soothu/) · [Facebook](https://www.facebook.com/profile.php?id=61591639572354) — `#contact` |
| Pinterest pin copy | `pinterest-pin-copy.txt` — titles/descriptions for multi-image SEO pins |

**Age rule:** In 2021 she is ~20 in the story; **current age on site = 25**.  
Money / clients inside **story chapters** are plot only — not a live rate menu.

---

## Repository layout

```
bala-viji-swap-website/
├── index.html                 # Home trailer: secret, rooms, gallery→story
├── her.html                   # Her hub (letter, looks, photos, chats, story)
├── us.html                    # Couple hub (how sharing works)
├── him.html                   # Bala handler notes
├── nights.html                # Open nights + sealed teasers + tonight’s secret
├── letter.html                # First-person letter from Viji
├── looks/
│   ├── index.html             # All costume looks
│   ├── pg-girl.html
│   ├── mall-pink.html
│   ├── silk-hotel.html
│   ├── open-invitation.html
│   ├── saree-wife.html
│   └── mangalsutra-slut.html
├── stories/                   # Full long-form chapters 01–16
│   ├── 01-the-first-glance.html
│   ├── …
│   └── 16-the-mangalsutra-wife.html
├── css/
│   ├── style.css              # Theme, home sections, gallery, chats, nights cards
│   ├── story.css              # Story chapter + letter page layout
│   └── explore.css            # Rooms, secret, sealed, looks, handler notes
├── js/
│   └── main.js                # Age gate, nav, lightbox, chapters, chats, ticker, secret
├── assets/
│   └── pictures/              # Gallery, banners, posters (no spaces in names)
├── pasted-text.txt            # Optional local story source (often gitignored)
├── .gitignore
└── readme.md                  # This file
```

### What major files own

| Path | Responsibility |
|------|----------------|
| `index.html` | Home: age gate, ticker, hero, tonight’s secret, explore doors, gallery, posters, desire, chats, nights diary, story previews |
| `her.html` / `us.html` / `him.html` / `nights.html` | Explore rooms (hubs + deep content) |
| `looks/*` | Costume/look pages with photos + short fantasy copy |
| `letter.html` | Long first-person confession from Viji |
| `stories/*.html` | Long-form erotic chapters (prev/next + TOC) |
| `css/style.css` | Global theme (`:root` colors/fonts), home UI |
| `css/story.css` | Long-read / letter layout |
| `css/explore.css` | Explore rooms, secret, sealed, looks, handler cards |
| `js/main.js` | Age gate, nav, smooth scroll, lightbox, accordion, chat tabs, ticker, **tonight’s secret** |

---

## Navigation (site-wide rooms)

Primary nav on most pages:

**Gallery · Looks · Her · Us · Him · Nights · Story**

| Room | Path | Purpose |
|------|------|---------|
| Home | `index.html` | Trailer: look first, then doors into the house |
| Gallery | `index.html#gallery` | Photos (before marriage + wife collection) |
| Looks | `looks/index.html` | PG / mall / silk / red / saree / mangalsutra costumes |
| Her | `her.html` | Hub into letter, looks, photos, chats, story, nights |
| Us | `us.html` | Couple dynamic, sharing, what they hide |
| Him | `him.html` | Bala’s handler notes (training, control, swap) |
| Nights | `nights.html` | Open nights + **sealed** teasers + daily secret |
| Story | `index.html#story` + `stories/` | 16-chapter arc previews + full pages |
| Letter 01 | `letter.html` | First confession |
| Letter 02 | `letter-02.html` | **NEW** — first sex tape; shy; money & clients |
| Handler notes | `him.html` | Includes **Note 07** (first tape) + **Note 08** (multi-night packages) |
| Chats | `index.html#chats` | Fake leaked phone threads (not live chat) |

---

## Home page flow (`index.html` — in order)

1. **Age gate** — 18+; `sessionStorage` key `viji_age_ok`
2. **Confession ticker** — rotating lines under nav
3. **Hero** (`#top`) — Ken Burns background; CTAs → photos / nights / her room
4. **Tonight’s secret** + **Explore us** room doors (`#explore`)
5. **Gallery** (`#gallery`) — photos first (“look first, read later”)
6. **Posters** (`#posters`) — EN + Tamil texted art, lightbox
7. **Desire** (`#about`) — who she is + stats (age **25**)
8. **Chats** (`#chats`) — Origin / Training / After highway phone UI
9. **Nights she was given** (`#swap-record`) — dated couple-swap diary 2022→2026
10. **Story** (`#story`) — accordion previews + “Read full chapter →”
11. **Sex video** (`#videos`) — **one** video feature; `assets/videos/*` are stills from that single clip; set `data-stream` on `#video-feature` when host URL ready
12. **Find us** (`#contact`) — Instagram + X + Pinterest (no booking rates)
13. **Footer** — 18+ notice + social links

---

## Explore features

### Tonight’s secret
- Element: `#tonight-secret-text` on home and `nights.html`
- Logic: `js/main.js` → `initTonightSecret()`
- One erotic line per **calendar day** (stable for that day, rotates over a list)

### Sealed nights
- On `nights.html` — dashed “locked” cards with blur/tease copy
- Not empty placeholders: unfinished hooks so visitors return
- Unlock by writing the real night and moving card to open list + home diary

### Looks (costumes)
| Page | Vibe |
|------|------|
| `looks/pg-girl.html` | Pre-thali, PG room soft |
| `looks/mall-pink.html` | Public tease, shopping high |
| `looks/silk-hotel.html` | Purple slip, hotel |
| `looks/open-invitation.html` | Red top, open pose |
| `looks/saree-wife.html` | Maroon silk traditional |
| `looks/mangalsutra-slut.html` | Wedding gold / shared wife |

### Fake chats (`#chats`)
Styled phone UI only — **not** live messaging. Tabs:
- **Origin** — Instagram / first kiss era  
- **Training** — Telegram PG nights  
- **After highway** — post first paid night  

### Nights diary tone
Use erotic language in UI labels (not tech jargon):
- Prefer “Nights she remembers” over “Session log”
- Prefer “Things her body learned” over “Badges / seals unlocked”

---

## Images

### Core photos — `assets/pictures/`

| File | Used for |
|------|----------|
| `vijayalskhmi1.png` | Afterglow couple selfie |
| `vijayalskhmi2.png` | Wedding / mangalsutra |
| `vijayalskhmi3.png` | Purple silk solo hotel |
| `vijayalskhmi4.png` | Red top pose (about + gallery + looks) |
| `vijayalskhmi5.png` | Hill station solo |
| `vijayalskhmi6.png` | Purple silk close-up |
| `vijayalskhmi7.png` | Hills couple |
| `viji-hotel-night.png` | Hotel couple |
| `viji-night-date.png` | Barefoot night out |
| `viji-car-tease.png` | White dress in car |
| `viji-after-use.jpg` | After multi-partner |
| `viji-saree-room.jpeg` | Maroon silk saree |
| `viji-wedding.png` / `viji-red-pose.png` | Optional dups |
| `pre-wedding-*.jpg` | Before-marriage set (gallery + looks) |

### Banners / posters

| Path | Notes |
|------|--------|
| `assets/pictures/banners/banner-hotel-night.jpg` | **Hero** background (via `.hero__bg`) |
| `assets/pictures/banners/banner-*.jpg` | Wide banners in `#posters` |
| `assets/pictures/posters/poster-*.jpg` | Portrait posters in `#posters` |

**Add a gallery photo:** file in `assets/pictures/` (no spaces) → copy a `.gallery__item` under `#gallery`.  
**Add a poster:** under `posters/` or `banners/` → copy item under `#posters`.  
**Add a look:** new page under `looks/` + card on `looks/index.html` + link from `her.html` if needed.

---

## Story canon — **Ruining Viji** (16 chapters)

| Ch | File slug | Title | Beats |
|----|-----------|--------|--------|
| 01 | `01-the-first-glance` | The First Glance | Kingmaker Academy 2021, first eye contact |
| 02 | `02-late-night-messages` | Late-Night Messages | Instagram, café, first kiss |
| 03 | `03-telegram-nights` | Telegram Nights | Sext, audio, video, PG fingering |
| 04 | `04-birthday-beach-to-first-night` | Birthday Beach to First Night | Besant Nagar, OYO, virginity |
| 05 | `05-bus-ride-corruption` | Bus Ride Corruption | 10h AC sleeper to Kovilpatti |
| 06 | `06-swollen-pussy-money-seed` | Swollen Pussy & The Money Seed | Oil, escort idea planted |
| 07 | `07-the-fake-call` | The Fake Call | “Priya” training call |
| 08 | `08-first-paid-customer` | First Paid Customer | Raja40, highway bonnet |
| 09 | `09-tears-to-shopping-high` | Tears to Shopping High | Fever, shame, Express Avenue |
| 10 | `10-sold-for-a-week` | Sold for a Week | Politician beach house lie |
| 11 | `11-seven-days-of-total-corruption` | Seven Days of Total Corruption | Driver, gang, DP week |
| 12 | `12-fear-and-shame` | Fear & Shame | Piss reflex, photo panic |
| 13 | `13-secret-money-machine` | The Secret Money Machine | 1BHK, brothers’ princess |
| 14 | `14-brothers-close-call` | Brother’s Close Call | Gopi visit cover story |
| 15 | `15-couple-swap-entry` | Couple Swap Entry | Blackmail, fake marriage |
| 16 | `16-the-mangalsutra-wife` | The Mangalsutra Wife | Thali/kumkum/jasmine, first swap |

Full pages: `stories/{slug}.html`  
Home previews: `index.html` → `#story` → `#ch-01` … `#ch-16`  
Optional source draft: `pasted-text.txt` (local; may be gitignored)

---

## JS behaviors (`js/main.js`)

| Function | Role |
|----------|------|
| `initAgeGate` | 18+ gate, `viji_age_ok` in sessionStorage |
| `initNav` | Mobile menu + scroll state |
| `initSmoothScroll` | `[data-scroll]` anchors |
| `initLightbox` | Gallery / look image viewer |
| `initReveal` | Scroll-in animations |
| `initChapters` | Story accordion + expand/collapse all |
| `initChats` | Fake phone thread tabs |
| `initTicker` | Rotating confession bar |
| `initTonightSecret` | Daily secret line |
| `initVideos` | Sex video cards + modal player (`data-stream` URL) |

### Sex video (`#videos`) — single clip

- **One video only.** Files in `assets/videos/` (`clip-01` …) are **stills/frames from that same video**, not separate clips.
- Feature card: `#video-feature` with `data-stream=""` (paste host/mp4 URL later)
- Clicking stills changes the hero poster frame
- Play opens `#video-modal` — stream if set, else still + “not linked yet”
- xHamster title/description options: `xhamster-titles-descriptions.txt` (written for **one** upload)

When the stream is ready:

```html
<!-- on #video-feature in index.html -->
data-stream="https://your-host.example/path/video.mp4"
```

---

## Local preview

```bash
cd /path/to/bala-viji-swap-website
python3 -m http.server 8080
# open http://localhost:8080
```

Prefer `http://` serve over `file://` so relative paths and lightbox behave consistently.

---

## Customization cheat sheet

| Want to change… | Edit… |
|-----------------|--------|
| Age (keep **25** unless owner says otherwise) | Stats on `index.html`, story copy, this README |
| Colors / fonts | `css/style.css` → `:root` |
| Home section order | `index.html` section blocks |
| Tonight’s secret lines | `js/main.js` → `initTonightSecret()` secrets array |
| Sealed / open nights | `nights.html` (+ full diary on `index.html` `#swap-record`) |
| Handler notes | `him.html` |
| Couple / her hubs | `us.html`, `her.html` |
| Looks | `looks/*.html` + `looks/index.html` |
| Full story chapter | `stories/NN-slug.html` + preview in `#story` |
| Story accordion | `js/main.js` → `initChapters()` |
| Fake chats | `index.html` → `#chats` |
| Hero image | `css/style.css` → `.hero__bg` background URL |
| Age-gate copy | each page’s `#age-gate` (or shared pattern) |
| Nav rooms | nav block on each HTML page (keep in sync) |

---

## Deploy (Cloudflare Pages)

Cloudflare Workers/Pages **asset files must be ≤ 25 MiB**.  
If the build fails on something like:

```text
.git/objects/pack/pack-….pack … 28.4 MiB
```

the deploy root is including **`.git`**. Do **not** publish the repo root as assets.

### Required Pages settings

| Setting | Value |
|---------|--------|
| Framework preset | **None** |
| **Build command** | `bash cloudflare-build.sh` |
| **Build output directory** | `dist` |
| Root directory | `/` (repo root) |

`cloudflare-build.sh` copies only site files (`*.html`, `assets/`, `css/`, `js/`, `looks/`, `stories/`, `tv/`) into `dist/` and **excludes `.git`**.

Also present:
- `.assetsignore` — extra ignore list for Workers static assets
- `.gitignore` — ignores `dist/`, `pasted-text.txt`, etc.

### Direct upload (no Git build)

Upload **only** the contents of `dist/` after running:

```bash
bash cloudflare-build.sh
```

Never zip/upload the folder that still contains `.git`.

---

## Agent instructions (Grok CLI)

1. **Read** this README + relevant HTML before large rewrites.  
2. Keep **age = 25** (current) unless the user explicitly changes it.  
3. **Do not re-add** booking, rate cards, cost tables, Telegram CTA, or site audio unless the user asks.  
4. Prefer editing existing files over adding frameworks/npm.  
5. New pictures → `assets/pictures/` + markup; **no spaces** in filenames.  
6. Do not remove the 18+ age gate.  
7. Story: keep `ch-01`…`ch-16` on home; full pages under `stories/`; update this README table if chapters change.  
8. Keep nav rooms consistent across `index.html`, hubs, `letter.html`, `looks/*`, `stories/*`.  
9. UI labels for nights/couple lore should stay **erotic/story-toned**, not tech jargon (“session log”, “badges”, etc.).  
10. Sanity-check: age gate → Explore doors → gallery lightbox → chats tabs → full story chapter prev/next → nights sealed cards → tonight’s secret text present.

---

## TV auction reel (unlisted)

**Path:** `/tv/` → `tv/index.html`  

**Not linked** from main nav or explore rooms (on purpose).

| File | Role |
|------|------|
| `tv/index.html` | Fullscreen auction reel start + stage |
| `tv/tv.css` | TV-optimized dark UI |
| `tv/tv.js` | Slide builder, autoplay, keyboard, shuffle, wake lock |
| `tv/images.json` | JSON catalog (optional fallback) |
| `tv/images-data.js` | **Embedded catalog** (`window.TV_IMAGES`) — preferred loader |
| `assets1/viji-auction/` | **Auction-only** image pack (not used in main site gallery markup) |
| `assets/pictures/` | Original site photos — also included in the TV reel |
| `assets/videos/` | Video still frames — also included in the TV reel |

**Image sources for `/tv` (all of these):**
1. `assets/pictures/**` (existing gallery / posters / banners / pre-wedding)
2. `assets1/viji-auction/**` (auction pack — TV secret route focus)
3. `assets/videos/**` (stills from the sex video)

Main site pages do **not** link into `assets1/`; only the TV reel catalog does.

**Behavior:**
- **Portrait** images → **3 per slide**
- **Landscape / wide** → full slide (or pair if two medium-wide)
- Auto-advance ~**18s** per slide (auction pace — look & fix price); shuffle; caption lines
- Keyboard: `←/→` slides, `Space` pause, `F` fullscreen, `C` captions
- Image list loads from `images-data.js` (no fetch required)

**Regenerate TV catalog after adding auction photos** (requires Pillow):

```bash
# from repo root — scans pictures + assets1/viji-auction + videos
python3 scripts/rebuild-tv-images.py
# or see cloudflare / agent notes; script may live as one-liner in history
```

Minimal one-liner if script missing: scan `assets/pictures`, `assets1/viji-auction`, `assets/videos` into `tv/images-data.js` with `src` like `/assets/...` and `/assets1/...`.

**Private auction tip:** `python3 -m http.server 8080` → `http://localhost:8080/tv/` → start reel → **F**. Unlisted. No blackout controls.

**Private claimed-nights ledger ( /tv only ):** shown on the start screen and toggle with **L** / **Ledger** during the reel. Records multi-night closes (e.g. 10 nights · ₹14,00,000). **Not** linked or shown on the public site.

**Keep screen awake:** Wake Lock + silent video fallback in `tv.js`. Still set Smart TV sleep timer to **Off**.

---

## Product intent (for future features)

- **Goal:** never-ending *exploration* (many rooms), not infinite scroll.  
- **Hooks:** photos early, secrets that change, sealed nights, couple triangle (her / him / us), long story depth.  
- **Avoid:** rate menus, generic porn that breaks Viji face continuity, dumping everything on one page.

---

## License / content notice

18+ adult erotic content. All depicted models are presented as adults.  
Respect local laws and platform ToS when deploying.
