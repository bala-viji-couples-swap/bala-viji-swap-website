# Vijayalakshmi — Erotic static site

Adult (18+) personal landing page: dark red/black luxury design, full corruption story, photo gallery with lightbox, booking rates, Telegram CTA.

## Features

- Age gate (session-based)
- Erotic hero, story, rates, and booking sections
- Photo gallery with full-size lightbox (keyboard arrows / Esc)
- Mobile responsive nav
- Separate CSS and JS (no build step)
- Cloudflare Pages ready

## Project structure

```
viji-website/
├── index.html
├── css/style.css
├── js/main.js
├── assets/pictures/   # gallery images
└── readme.md
```

## Pictures

Images live in `assets/pictures/`. Clean names used for new uploads:

| File | Notes |
|------|--------|
| `vijayalskhmi1–7.png` | Original set |
| `viji-hotel-night.png` | Hotel couple |
| `viji-night-date.png` | Night out |
| `viji-car-tease.png` | Car / white dress |
| `viji-after-use.jpg` | After-session shot |
| `viji-saree-room.jpeg` | Maroon saree |
| `viji-wedding.png` | Wedding (dup of #2) |
| `viji-red-pose.png` | Red pose (dup of #4) |

## Deployment (Cloudflare Pages)

1. Upload the entire folder
2. Build command: *(none)* — static site
3. Output directory: `/` (or project root)
4. HTTPS is automatic

## Customization

- **Telegram:** change `TELEGRAM` in `js/main.js` and button labels in `index.html`
- **Images:** add files under `assets/pictures/` and a new `.gallery__item` in `index.html`
- **Story / rates:** edit the `#story` and `#rates` sections in `index.html`
- **Theme colors:** CSS variables at the top of `css/style.css`

## Tech stack

- HTML5
- CSS3 (`css/style.css`)
- Vanilla JS (`js/main.js`)
- Google Fonts: Cormorant Garamond + DM Sans

---

**18+ only.** Explicit adult content.
