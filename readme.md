# bala-viji-swap-website

**GitHub:** https://github.com/bala-viji-couples-swap/bala-viji-swap-website.git  

Adult (18+) **static multi-page site** for **Vijayalakshmi (age 25)** and **Bala** — Chennai couple-swap / mangalsutra-wife character world. Dark red & black erotic UI.

The site is built as a **house of rooms** (not one endless scroll): photos first, then explore hubs (Her / Us / Him / Nights / Looks), long story chapters, chats, and dated nights.

> **For Grok CLI / any AI agent:** Read this file fully before editing. No build toolchain. Open `index.html` in a browser or serve the folder statically.  
> **No rates / price tables** — story + gallery lore. **Telegram booking** OK: [@viji_lachu](https://t.me/viji_lachu) (service + video call).  
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
| Booking / pricing UI | **No rate cards** — Telegram [@viji_lachu](https://t.me/viji_lachu) for service + video-call booking (user-approved) |
| Social | Instagram [@pattu.vg69](https://www.instagram.com/pattu.vg69) · X [@BalaViji69](https://x.com/BalaViji69) · Pinterest [Vijayalakshmi_soothu](https://in.pinterest.com/Vijayalakshmi_soothu/) · [Facebook · 3k](https://www.facebook.com/share/1UAxdTLZSQ/) · Telegram [@viji_lachu](https://t.me/viji_lachu) (service + video-call booking) — `#contact` |
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
├── stories/                   # Full long-form dual-POV chapters 01–13
│   ├── 01-the-first-glance.html … 13-shared-bath-towel-return-karthik-dp.html
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
| Letter 02 | `letter-02.html` | First sex tape; shy; money & clients |
| Letter 03 | `letter-03.html` | **NEW** — first time she asked for raw |
| After the thali | `after.html` | **NEW** — Season 2 teasers beyond ch.16 |
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

## Story canon — **Ruining Viji** (13 dual-POV chapters)

| Ch | File slug | Title | Beats |
|----|-----------|--------|--------|
| 01 | `01-the-first-glance` | The First Glance | Academy corridor; IG |
| 02 | `02-late-night-messages` | Late-Night Messages | DMs; café; kiss |
| 03 | `03-telegram-nights` | Telegram Nights | Sext; audio; cam |
| 04 | `04-birthday-beach-to-first-night` | Birthday Beach to First Night | Besant; OYO virgin |
| 05 | `05-bus-ride-corruption` | Bus Ride Corruption | AC sleeper all night |
| 06 | `06-home-breaks-love-rebuilds-move-in` | Home Breaks · Love Rebuilds · Move In | Stop; park fail; leave PG |
| 07 | `07-fourth-floor-shared-bath-half-open-door` | Fourth Floor · Shared Bath · Half-Open Door | Peep-fuck; 5 boys |
| 08 | `08-cup-morning-door-thevidiya` | Cup · Morning Door · Thevidiya | Cup pee; public slut brand |
| 09 | `09-terrace-whiskey-group-call-door-floor` | Terrace Whiskey · Group Call · Door · Floor | Beam; TG record; floor anal |
| 10 | `10-morning-snore-porn-threat-long-night-pin` | Morning Snore · Porn Threat · Long Night Pin | Fake they-recorded; pin |
| 11 | `11-lifetime-slow-kisses-mouth-hour-first-take` | Lifetime Slow · Mouth Hour · First Take | Party night 1 |
| 12 | `12-pussy-feast-lube-ass-pee-left-with-them` | Pussy Feast · Lube · Ass · Pee · Left | Money seed; left next door |
| 13 | `13-shared-bath-towel-return-karthik-dp` | Shared Bath · Towel · Karthik DP | Morning bath; DP watched |

Source longform: `~/Desktop/workbench/bala-viji-affair/part-NN/`. Rebuild: `python3 scripts/rebuild-dual-stories-from-affair.py`.
