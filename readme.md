# bala-viji-swap-website

**GitHub:** https://github.com/bala-viji-couples-swap/bala-viji-swap-website.git  

Adult (18+) static landing page for **Vijayalakshmi (age 25)** — dusky mangalsutra wife / Chennai couple-swap character site. Dark red & black erotic UI, story, gallery, realistic INR rate breakdown, Telegram booking CTA.

> **For Grok CLI / any AI agent:** Read this file fully before editing. All product facts, file map, edit points, and deploy steps are below. No build toolchain. Open `index.html` in a browser or serve the folder statically.

---

## Quick facts (do not invent conflicting canon)

| Field | Value |
|--------|--------|
| Character name | Vijayalakshmi (display: Vijayalakshmi / Viji) |
| Age | **25** (current) |
| Origin story | From Kovilpatti; came to Chennai ~2021 for UPSC (Kingmaker Academy, Anna Nagar) |
| Partner | Bala (husband / handler figure in story & some photos) |
| Location | Chennai, India |
| Contact | Telegram `@vijayalskhmi69` — set in `js/main.js` as `TELEGRAM` |
| Content rating | **18+ only** — explicit erotic copy + adult photos |
| Site type | Static HTML/CSS/JS — **no npm, no bundler, no backend** |
| Hosting target | Cloudflare Pages (or any static host) |

---

## Repository layout

```
bala-viji-swap-website/          # (local folder may be named viji-website)
├── index.html                   # ALL page content/sections live here
├── css/
│   └── style.css                # Theme, layout, gallery, rates, lightbox, age gate
├── js/
│   └── main.js                  # Age gate, nav, lightbox, reveal, Telegram CTA
├── assets/
│   └── pictures/                # All gallery & hero images
├── .gitignore
└── readme.md                    # This file
```

### What each file owns

| File | Responsibility |
|------|----------------|
| `index.html` | Structure + copy: age gate, hero, about, story, gallery markup, rates/packages, cost table, booking, footer, lightbox DOM |
| `css/style.css` | Visual design only. CSS variables at top (`:root`) control colors/fonts |
| `js/main.js` | Behavior only. Change Telegram URL, age-gate session key, toast text here |
| `assets/pictures/*` | Image binaries referenced by relative paths from `index.html` |

---

## Page sections (in order)

1. **Age gate** (`#age-gate`) — blocks content until user confirms 18+ (sessionStorage key `viji_age_ok`)
2. **Nav** — Desire / Story / Gallery / Rates / Book
3. **Hero** (`#top`) — name, tagline, CTAs
4. **About / Desire** (`#about`) — body description + stats (Age **25**, Chennai, 18+)
5. **Story** (`#story`) — **16-chapter** full erotic arc (accordion). Source material: `pasted-text.txt` (raw Grok chat dump; do not deploy required). Polished site prose lives only in `index.html`
6. **Gallery** (`#gallery`) — photo grid + lightbox (`data-lightbox`, `data-src`, `data-caption`)
7. **Rates** (`#rates`) — packages + **realistic cost breakdown** table + example totals
8. **Booking** (`#booking`) — Telegram button (`data-telegram`)
9. **Footer** — 18+ disclaimer

---

## Pricing canon (keep consistent if you edit rates)

Packages are **service fees only** (INR). Hotel, cabs, and supplies are extra (see cost table on site).

| Package | Service fee | Duration / notes |
|---------|-------------|------------------|
| Short session | ₹18,000 – ₹28,000 | 2–3 hours, one client |
| Full night (private) | ₹40,000 – ₹60,000 | ~8–10 hours overnight |
| Couple swap | ₹55,000 – ₹85,000 | Full night; Bala optional |
| Group / gangbang | ₹90,000 – ₹1,50,000 | 3–6 men; +₹12,000 per man over 4 |
| Monthly exclusive | ₹2,50,000 – ₹4,50,000 | ~8–10 priority nights / month |
| Extra hour | ₹6,000 – ₹8,000 / hr | If agreed same night |
| Outstation add-on | +₹15,000 – ₹25,000 | Plus room, food, transport |
| Deposit | 20–30% of service fee | Serious bookings |

**Typical total examples (service + venue + logistics):**

- Solo full night ≈ **₹57,100**
- Couple swap night ≈ **₹81,500**
- 4-man group ≈ **₹1,25,000** (~₹31k per man)

When changing prices, update **both** the rate cards **and** the cost table / examples in `index.html` so they stay consistent.

---

## Images

Path: `assets/pictures/`

| File | Used for |
|------|----------|
| `vijayalskhmi1.png` | Afterglow couple selfie |
| `vijayalskhmi2.png` | Wedding / mangalsutra |
| `vijayalskhmi3.png` | Purple silk solo hotel (also booking section bg) |
| `vijayalskhmi4.png` | Red top pose (about section + gallery) |
| `vijayalskhmi5.png` | Hill station solo |
| `vijayalskhmi6.png` | Purple silk close-up |
| `vijayalskhmi7.png` | Hills couple |
| `viji-hotel-night.png` | Hero background + gallery couple hotel |
| `viji-night-date.png` | Barefoot night out |
| `viji-car-tease.png` | White dress in car |
| `viji-after-use.jpg` | After multi-partner / wide gallery item |
| `viji-saree-room.jpeg` | Maroon silk saree |
| `viji-wedding.png` | Duplicate of wedding shot (optional; gallery uses `vijayalskhmi2.png`) |
| `viji-red-pose.png` | Duplicate of red pose (optional; gallery uses `vijayalskhmi4.png`) |

**Add a new gallery photo:**

1. Put file in `assets/pictures/` (no spaces in filename).
2. Copy a `.gallery__item` block in `index.html`.
3. Set `data-src`, `data-caption`, `<img src>`, caption text.
4. Lightbox picks up `[data-lightbox]` automatically — no JS change needed.

---

## Local preview

```bash
cd /path/to/bala-viji-swap-website   # or viji-website
python3 -m http.server 8080
# open http://localhost:8080
```

Or open `index.html` directly (age gate + Telegram still work; some browsers restrict modules less relevant here since JS is plain script).

---

## Customization cheat sheet

| Want to change… | Edit… |
|-----------------|--------|
| Age (must stay **25** unless product owner says otherwise) | `index.html` stats + story copy + this README |
| Telegram handle | `js/main.js` → `const TELEGRAM = "https://t.me/..."` and button label in `index.html` |
| Colors / fonts | `css/style.css` → `:root` variables |
| Full erotic story (16 chapters) | `index.html` → `#story` `.chapters` / `.chapter` blocks |
| Story accordion behavior | `js/main.js` → `initChapters()` |
| Raw source notes for the arc | `pasted-text.txt` (optional local only; gitignored) |
| Rates / cost table | `index.html` → `#rates` (cards + `.cost-breakdown`) |
| Hero image | `css/style.css` → `.hero` background `url(...)` |
| Age-gate copy | `index.html` → `#age-gate` |

---

## Deploy (Cloudflare Pages)

1. Connect this GitHub repo **or** upload the project folder.
2. **Build command:** leave empty / none.
3. **Output directory:** `/` (project root).
4. Framework preset: None.
5. Deploy. HTTPS is automatic.

Any static host works (Netlify, GitHub Pages, S3, nginx). Root must serve `index.html`.

---

## Git workflow notes

- Remote: `https://github.com/bala-viji-couples-swap/bala-viji-swap-website.git`
- Default branch on GitHub may be `main`.
- Feature work for age-25 + realistic rates was done on branch:  
  `feature/age-25-realistic-rates`
- Push requires GitHub auth on the machine (`gh auth login`, SSH key, or HTTPS PAT).

```bash
git checkout -b feature/your-change
# edit files
git add -A
git commit -m "Describe why, not only what"
git push -u origin HEAD
```

---

## Tech stack

- HTML5
- CSS3 (single file, no preprocessor)
- Vanilla JS (IIFE, no dependencies)
- Google Fonts: **Cormorant Garamond** (display) + **DM Sans** (body)

---

## Story canon (from `pasted-text.txt` → site chapters)

Full title on site: **Ruining Viji**. Narrated in polished third person on the page; source chat is Bala-POV part-by-part.

| Ch | Title | Beats |
|----|--------|--------|
| 01 | The First Glance | Kingmaker Academy 2021, first eye contact |
| 02 | Late-Night Messages | Instagram, café, first kiss |
| 03 | Telegram Nights | Sext, audio, video, PG fingering |
| 04 | Birthday Beach to First Night | Besant Nagar, OYO, virginity |
| 05 | Bus Ride Corruption | 10h AC sleeper to Kovilpatti |
| 06 | Swollen Pussy & Money Seed | Oil, escort idea planted |
| 07 | The Fake Call | “Priya” training call |
| 08 | First Paid Customer | Raja40, highway bonnet, 20k |
| 09 | Tears to Shopping High | Fever, shame, Express Avenue |
| 10 | Sold for a Week | Politician beach house lie |
| 11 | Seven Days of Total Corruption | Driver, gang, DP, ~10L week |
| 12 | Fear & Shame | Piss reflex, photo panic |
| 13 | Secret Money Machine | 1BHK, brothers Gopi/Raja/Kumar |
| 14 | Brother’s Close Call | Gopi visit cover story |
| 15 | Couple Swap Entry | Blackmail, fake marriage |
| 16 | The Mangalsutra Wife | Thali/kumkum/jasmine, first swap |

**Age rule:** In 2021 she is ~20 in the story; **current age on site stats = 25**.

## Agent instructions (Grok CLI)

1. **Read** this README + `index.html` before large rewrites.
2. Keep **age = 25** (current) unless the user explicitly changes it.
3. Keep rates **realistic** (tens of thousands INR per night, not multi-lakh package cards unless user asks). Beach-house week money in the *story* may stay high as plot; **booking rates section** stays realistic.
4. Prefer editing existing files over adding frameworks.
5. New pictures → `assets/pictures/` + gallery markup; rename files to remove spaces.
6. Do not remove the 18+ age gate.
7. Do not commit secrets; Telegram username is public by design.
8. Story edits: keep chapter IDs `ch-01`…`ch-16` and accordion classes; update this README table if you add/remove parts.
9. After UI changes, sanity-check: age gate → open a story chapter → lightbox → Telegram button.

---

## License / content notice

18+ adult erotic content. All depicted models are presented as adults.  
Fictional / fantasy presentation for private adult marketing. Respect local laws and platform ToS when deploying.
