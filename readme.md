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
├── index.html                   # Page content/sections
├── css/
│   └── style.css                # Theme, layout, gallery, story chapters, lightbox, age gate
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
2. **Nav** — Desire / Story / Gallery
3. **Hero** (`#top`) — name, tagline, CTAs → Story & Gallery
4. **About / Desire** (`#about`) — body description + stats (Age **25**, Chennai, 18+)
5. **Story** (`#story`) — **16-chapter** full erotic arc (accordion). Source: `pasted-text.txt` (local optional; gitignored)
6. **Gallery** (`#gallery`) — photo grid + lightbox
7. **Footer** — 18+ disclaimer

---

## Images

Path: `assets/pictures/`

| File | Used for |
|------|----------|
| `vijayalskhmi1.png` | Afterglow couple selfie |
| `vijayalskhmi2.png` | Wedding / mangalsutra |
| `vijayalskhmi3.png` | Purple silk solo hotel |
| `vijayalskhmi4.png` | Red top pose (about + gallery) |
| `vijayalskhmi5.png` | Hill station solo |
| `vijayalskhmi6.png` | Purple silk close-up |
| `vijayalskhmi7.png` | Hills couple |
| `viji-hotel-night.png` | Hero background + gallery couple hotel |
| `viji-night-date.png` | Barefoot night out |
| `viji-car-tease.png` | White dress in car |
| `viji-after-use.jpg` | After multi-partner / wide gallery item |
| `viji-saree-room.jpeg` | Maroon silk saree |
| `viji-wedding.png` | Optional dup of wedding |
| `viji-red-pose.png` | Optional dup of red pose |

**Add a new gallery photo:** put file in `assets/pictures/` (no spaces) → copy a `.gallery__item` in `index.html`.

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
| Full erotic story (16 chapters) | `index.html` → `#story` `.chapters` |
| Story accordion | `js/main.js` → `initChapters()` |
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
7. Story edits: keep chapter IDs `ch-01`…`ch-16` and accordion classes; update this README table if you add/remove parts.
8. Sanity-check: age gate → open a story chapter → lightbox gallery.

---

## License / content notice

18+ adult erotic content. All depicted models are presented as adults.  
Fictional / fantasy presentation. Respect local laws and platform ToS when deploying.
