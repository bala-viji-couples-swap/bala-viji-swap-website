# bala-viji-swap-website

**GitHub:** https://github.com/bala-viji-couples-swap/bala-viji-swap-website.git  

Adult (18+) static landing page for **Vijayalakshmi (age 25)** — dusky mangalsutra wife / Chennai couple-swap character site. Dark red & black erotic UI, **16-chapter story**, and photo gallery.

> **For Grok CLI / any AI agent:** Read this file fully before editing. No build toolchain. Open `index.html` in a browser or serve the folder statically.  
> **No rates, no prices, no booking CTA** on this site — it is story + gallery only.

---

## Quick facts (do not invent conflicting canon)

| Field | Value |
|--------|--------|
| Character name | Vijayalakshmi (display: Vijayalakshmi / Viji) |
| Age | **25** (current) |
| Origin story | From Kovilpatti; came to Chennai ~2021 for UPSC (Kingmaker Academy, Anna Nagar) |
| Partner | Bala (husband / handler figure in story & some photos) |
| Location | Chennai, India |
| Content rating | **18+ only** — explicit erotic copy + adult photos |
| Site type | Static HTML/CSS/JS — **no npm, no bundler, no backend** |
| Hosting target | Cloudflare Pages (or any static host) |
| Booking / pricing UI | **None** — do not re-add rate cards, cost tables, or Telegram book buttons unless the user asks |

---

## Repository layout

```
bala-viji-swap-website/          # (local folder may be named viji-website)
├── index.html                   # Page content/sections (story previews + links)
├── stories/                     # Full long-form chapters (01–16 HTML pages)
│   ├── 01-the-first-glance.html
│   ├── …                        # one page per chapter
│   └── 16-the-mangalsutra-wife.html
├── css/
│   ├── style.css                # Theme, layout, gallery, accordion, lightbox, age gate
│   └── story.css                # Full story chapter page layout
├── js/
│   └── main.js                  # Age gate, nav, lightbox, reveal, story accordion
├── assets/
│   └── pictures/                # All gallery & hero images
├── .gitignore
└── readme.md                    # This file
```

### What each file owns

| File | Responsibility |
|------|----------------|
| `index.html` | Structure + copy: age gate, hero, about, 16-chapter story, gallery, footer, lightbox DOM |
| `css/style.css` | Visual design only. CSS variables at top (`:root`) control colors/fonts |
| `js/main.js` | Behavior only (age gate, nav, lightbox, chapters) |
| `assets/pictures/*` | Image binaries referenced by relative paths from `index.html` |

---

## Page sections (in order)

1. **Age gate** (`#age-gate`) — 18+ confirm (sessionStorage key `viji_age_ok`)
2. **Nav** — Gallery / Posters / Desire / Chats / Nights shared / Story / Her letter
3. **Hero** (`#top`) — CTAs: See her photos → Gallery; Read her ruin → Story
4. **Gallery** (`#gallery`) — photos first (look first, read later)
5. **Posters** (`#posters`) — texted banners + portrait posters (EN + Tamil), lightbox
6. **About / Desire** (`#about`) — body description + stats (Age **25**, Chennai, 18+)
7. **Chats** (`#chats`) — fake leaked phone threads (Origin / Training / After highway)
8. **Nights shared** (`#swap-record`) — past couple-swap nights (2022 → 2026)
9. **Story** (`#story`) — **16-chapter** arc (accordion previews). Full long stories: `stories/01-…` through `stories/16-…`
10. **Letter** (`letter.html`) — first-person confession from Viji
11. **Mood** — confession ticker under nav; hero Ken Burns motion
12. **Footer** — 18+ disclaimer

---

## Images

### Original photos — `assets/pictures/`

| File | Used for |
|------|----------|
| `vijayalskhmi1.png` | Afterglow couple selfie (gallery) |
| `vijayalskhmi2.png` | Wedding / mangalsutra (gallery) |
| `vijayalskhmi3.png` | Purple silk solo hotel (gallery) |
| `vijayalskhmi4.png` | Red top pose (about + gallery) |
| `vijayalskhmi5.png` | Hill station solo (gallery) |
| `vijayalskhmi6.png` | Purple silk close-up (gallery) |
| `vijayalskhmi7.png` | Hills couple (gallery) |
| `viji-hotel-night.png` | Gallery couple hotel |
| `viji-night-date.png` | Barefoot night out (gallery) |
| `viji-car-tease.png` | White dress in car (gallery) |
| `viji-after-use.jpg` | After multi-partner / wide gallery |
| `viji-saree-room.jpeg` | Maroon silk saree (gallery) |
| `viji-wedding.png` / `viji-red-pose.png` | Optional dups |
| `pre-wedding-*.jpg` | Before-marriage dating set (gallery subsection) |

### Texted posters / banners (EN + Tamil)

| Path | Notes |
|------|--------|
| `assets/pictures/banners/banner-hotel-night.jpg` | **Hero background** + posters section |
| `assets/pictures/banners/banner-*.jpg` | Wide banners in `#posters` |
| `assets/pictures/posters/poster-*.jpg` | Portrait posters in `#posters` |

**Add a new gallery photo:** put file in `assets/pictures/` (no spaces) → copy a `.gallery__item` in `index.html` under `#gallery`.  
**Add a poster:** drop JPEG under `posters/` or `banners/` → copy a gallery item under `#posters`.

---

## Local preview

```bash
cd /path/to/bala-viji-swap-website
python3 -m http.server 8080
# open http://localhost:8080
```

---

## Customization cheat sheet

| Want to change… | Edit… |
|-----------------|--------|
| Age (must stay **25** unless owner says otherwise) | `index.html` stats + story + this README |
| Colors / fonts | `css/style.css` → `:root` |
| Full erotic story (16 chapters) | `stories/NN-slug.html` (long form) + previews in `index.html` `#story` |
| Story accordion | `js/main.js` → `initChapters()` |
| Story page look | `css/story.css` |
| Hero image | `css/style.css` → `.hero` background `url(...)` |
| Age-gate copy | `index.html` → `#age-gate` |

---

## Deploy (Cloudflare Pages)

1. Connect this GitHub repo **or** upload the project folder.
2. **Build command:** none.
3. **Output directory:** project root.
4. Framework preset: None.

---

## Story canon (from `pasted-text.txt` → site chapters)

Full title on site: **Ruining Viji**.

| Ch | Title | Beats |
|----|--------|--------|
| 01 | The First Glance | Kingmaker Academy 2021, first eye contact |
| 02 | Late-Night Messages | Instagram, café, first kiss |
| 03 | Telegram Nights | Sext, audio, video, PG fingering |
| 04 | Birthday Beach to First Night | Besant Nagar, OYO, virginity |
| 05 | Bus Ride Corruption | 10h AC sleeper to Kovilpatti |
| 06 | Swollen Pussy & Money Seed | Oil, escort idea planted |
| 07 | The Fake Call | “Priya” training call |
| 08 | First Paid Customer | Raja40, highway bonnet |
| 09 | Tears to Shopping High | Fever, shame, Express Avenue |
| 10 | Sold for a Week | Politician beach house lie |
| 11 | Seven Days of Total Corruption | Driver, gang, DP week |
| 12 | Fear & Shame | Piss reflex, photo panic |
| 13 | Secret Money Machine | 1BHK, brothers Gopi/Raja/Kumar |
| 14 | Brother’s Close Call | Gopi visit cover story |
| 15 | Couple Swap Entry | Blackmail, fake marriage |
| 16 | The Mangalsutra Wife | Thali/kumkum/jasmine, first swap |

**Age rule:** In 2021 she is ~20 in the story; **current age on site stats = 25**.

Money / clients inside the **story chapters** are plot only — not a live rate menu.

---

## Agent instructions (Grok CLI)

1. **Read** this README + `index.html` before large rewrites.
2. Keep **age = 25** (current) unless the user explicitly changes it.
3. **Do not re-add** booking, rate cards, cost breakdown tables, or Telegram CTA unless the user asks.
4. Prefer editing existing files over adding frameworks.
5. New pictures → `assets/pictures/` + gallery markup; no spaces in filenames.
6. Do not remove the 18+ age gate.
7. Story edits: keep chapter IDs `ch-01`…`ch-16` and accordion classes; full pages live under `stories/` with matching `NN-slug.html`; update this README table if you add/remove parts.
8. Sanity-check: age gate → open a story chapter preview → **Read full chapter** → prev/next → lightbox gallery.

---

## License / content notice

18+ adult erotic content. All depicted models are presented as adults.  
Respect local laws and platform ToS when deploying.
