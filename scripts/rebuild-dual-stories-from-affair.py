#!/usr/bin/env python3
"""Rebuild stories/01-13 dual-POV HTML from bala-viji-affair part txts.
Also rewrite index.html #story chapter cards and purge old 06-16 arc files.
"""
from __future__ import annotations

import html
import re
from pathlib import Path

SITE = Path(__file__).resolve().parents[1]
AFFAIR = Path.home() / "Desktop/workbench/bala-viji-affair"
STORIES = SITE / "stories"
INDEX = SITE / "index.html"

# slug, short title, hero tag, hero lead
CHAPTERS: list[dict] = [
    {
        "n": 1,
        "slug": "01-the-first-glance",
        "title": "The First Glance",
        "tag": "Kingmaker · Anna Nagar · 2021 · dual voice",
        "lead": "Corridor stare. Village braid. Instagram seed. Bala decides; Viji feels the look land.",
        "preview_meta": "Village flower · Kingmaker Academy · 2021",
    },
    {
        "n": 2,
        "slug": "02-late-night-messages",
        "title": "Late-Night Messages",
        "tag": "DMs · café · first kiss · dual voice",
        "lead": "Soft texts turn thigh-heat. Rainy coffee. Gate kiss and the first boob squeeze.",
        "preview_meta": "Instagram · first kiss · firm virgin boobs",
    },
    {
        "n": 3,
        "slug": "03-telegram-nights",
        "title": "Telegram Nights",
        "tag": "Sext · audio · cam · dual voice",
        "lead": "PG blanket training. Tamil moans into a pillow. The studious girl learns to perform wet.",
        "preview_meta": "Sexting · audio · video · PG blanket",
    },
    {
        "n": 4,
        "slug": "04-birthday-beach-to-first-night",
        "title": "Birthday Beach to First Night",
        "tag": "Besant Nagar · OYO · virgin stretch · dual voice",
        "lead": "Beach heat to locked room. Blood and multi-round creampie. The once that ends once.",
        "preview_meta": "Besant Nagar · OYO · virginity claimed",
    },
    {
        "n": 5,
        "slug": "05-bus-ride-corruption",
        "title": "Bus Ride Corruption",
        "tag": "10 hours · AC sleeper · public training · dual voice",
        "lead": "No bra. No panties. Curtain closed. Highway vibration and a full night of secret cock.",
        "preview_meta": "10 hours · AC sleeper · public training",
    },
    {
        "n": 6,
        "slug": "06-home-breaks-love-rebuilds-move-in",
        "title": "Home Breaks Her · Love Rebuilds · Move In",
        "tag": "Kovilpatti guilt · stop · park · marriage talk · dual voice",
        "lead": "Family purity cracks. She texts stop. Park molest fails. Love and marriage rebuild — then she leaves PG for him.",
        "preview_meta": "Guilt · stop · I love you · leave PG",
    },
    {
        "n": 7,
        "slug": "07-fourth-floor-shared-bath-half-open-door",
        "title": "Fourth Floor · Shared Bath · Half-Open Door",
        "tag": "Bachelor cage · juice · peep-fuck · dual voice",
        "lead": "Box room on purpose. Shared bath stares. Watermelon juice. Door half open while five smokers learn her moans.",
        "preview_meta": "4F hall · 5 boys · half-open door",
    },
    {
        "n": 8,
        "slug": "08-cup-morning-door-thevidiya",
        "title": "Cup · Morning Door · Thevidiya",
        "tag": "Kitchen cup · naked gallery · public brand · dual voice",
        "lead": "Too tired for the bath — steel cup shame. Morning full-open door on her sleeping body. Corridor shout: thevidiya.",
        "preview_meta": "Cup pee · open door · slut shout",
    },
    {
        "n": 9,
        "slug": "09-terrace-whiskey-group-call-door-floor",
        "title": "Terrace Whiskey · Group Call · Door Open · Floor",
        "tag": "Jim Beam · TG record · doggy · floor anal · dual voice",
        "lead": "Terrace plan. Group video call. Door-open doggy for the landing. Slap. Ass on tile while they watch.",
        "preview_meta": "Beam · phones · open door · floor",
    },
    {
        "n": 10,
        "slug": "10-morning-snore-porn-threat-long-night-pin",
        "title": "Morning Snore · Porn Threat · Long Night Pin",
        "tag": "Five names · fake they-recorded · forest fire · dual voice",
        "lead": "She collapses asleep. Landing full-sound video wake. Porn-site blackmail script. Nice food. Pinned for a long night.",
        "preview_meta": "Surya crew · blackmail · pinned",
    },
    {
        "n": 11,
        "slug": "11-lifetime-slow-kisses-mouth-hour-first-take",
        "title": "Lifetime Slow · Kisses · Mouth Hour · First Take",
        "tag": "Slow plan · five mouths · dance · first multi-man · dual voice",
        "lead": "Lifetime, not panic-fuck. Kisses. Palm tour. One hour of mouth. Side-dish dance. Then Surya to Vignesh — Bala seals last.",
        "preview_meta": "Party night 1 · mouth hour · first take",
    },
    {
        "n": 12,
        "slug": "12-pussy-feast-lube-ass-pee-left-with-them",
        "title": "Pussy Feast · Lube · Ass · Pee · Left With Them",
        "tag": "Eat-out · money seed · pee laugh · their room · dual voice",
        "lead": "Tongues first. Ass waits on lube. Dirty talk while they stroke. Lubed ass. She pees. They laugh. Bala leaves her next door for the night.",
        "preview_meta": "Ass · pee · left in Surya room",
    },
    {
        "n": 13,
        "slug": "13-shared-bath-towel-return-karthik-dp",
        "title": "Shared Bath · Towel Return · Karthik DP",
        "tag": "Morning bath · swollen map · double penetration · dual voice",
        "lead": "Five wash her. Towel drop-off. What are we going to do? Silent nap. Karthik DP with the floor watching — she cooperates and comes.",
        "preview_meta": "Bath · DP · she enjoys",
    },
]

HIGHLIGHTS = [
    "Vijayalakshmi",
    "Kovilpatti",
    "Kingmaker",
    "Anna Nagar",
    "Besant Nagar",
    "Chennai",
    "Surya",
    "Karthik",
    "Dinesh",
    "Pradeep",
    "Vignesh",
    "Gopi",
    "Raja",
    "Kumar",
    "Jim Beam",
    "UPSC",
]

MOAN_RE = re.compile(
    r"(en pundai[^.\"\n]*|Ahhh[^.\n]*|ahhh[^.\n]*|podhum[^.\"\n]*|"
    r"en vaay[^.\"\n]*|thevidiya|THEVIDIYA|"
    r"Wanting— isn’t— touching—|"
    r"I’ll cooperate\.|"
    r"What are we going to do, Bala\?)",
    re.I,
)


def esc(s: str) -> str:
    return html.escape(s, quote=False)


def decorate(text: str) -> str:
    t = esc(text)
    for w in sorted(HIGHLIGHTS, key=len, reverse=True):
        t = re.sub(
            rf"\b({re.escape(w)})\b",
            r'<span class="highlight">\1</span>',
            t,
        )
    # simple moan wrap for lines that are clearly moan-heavy
    if MOAN_RE.search(text) and len(text) < 160:
        t = f'<span class="moan">{t}</span>'
    return t


def parse_part(path: Path) -> list[tuple[str, list[str]]]:
    raw = path.read_text(encoding="utf-8")
    # strip header / end
    lines = raw.splitlines()
    sections: list[tuple[str, list[str]]] = []
    cur_who: str | None = None
    buf: list[str] = []

    def flush():
        nonlocal buf, cur_who
        if cur_who and buf:
            # split into paragraphs on blank lines
            paras: list[str] = []
            acc: list[str] = []
            for line in buf:
                if not line.strip():
                    if acc:
                        paras.append(" ".join(acc).strip())
                        acc = []
                else:
                    acc.append(line.strip())
            if acc:
                paras.append(" ".join(acc).strip())
            # drop end markers
            paras = [p for p in paras if not p.startswith("— End") and not p.startswith("Next:")]
            sections.append((cur_who, paras))
        buf = []

    for line in lines:
        if line.strip() in ("—— BALA ——", "—— VIJI ——"):
            flush()
            cur_who = "bala" if "BALA" in line else "viji"
            continue
        if cur_who:
            buf.append(line)
    flush()
    return sections


def body_html(sections: list[tuple[str, list[str]]]) -> str:
    parts = [
        '<p class="story-dual-note">Expanded dual voice — <strong>Bala</strong> and <strong>Viji</strong> tell the same ruin from opposite sides of the bed and the braid.</p>',
        "",
    ]
    for who, paras in sections:
        label = "Bala" if who == "bala" else "Viji"
        cls = f"pov pov--{who}"
        parts.append(f'<section class="{cls}">')
        parts.append(f'  <div class="pov__label">{label}</div>')
        for p in paras:
            if not p.strip():
                continue
            parts.append(f"  <p>{decorate(p)}</p>")
        parts.append("</section>")
        parts.append("")
    return "\n".join(parts)


def toc_html(current_slug: str) -> str:
    items = []
    for c in CHAPTERS:
        cls = ' class="is-current"' if c["slug"] == current_slug else ""
        items.append(f'          <li><a href="{c["slug"]}.html"{cls}>{esc(c["title"])}</a></li>')
    return "\n".join(items)


def page_html(ch: dict, sections: list[tuple[str, list[str]]]) -> str:
    n = ch["n"]
    prev = CHAPTERS[n - 2] if n > 1 else None
    nxt = CHAPTERS[n] if n < len(CHAPTERS) else None
    prev_block = (
        f'''        <a class="story-nav--prev" href="{prev["slug"]}.html">
          <span class="story-nav__label">Previous</span>
          <span class="story-nav__title">{esc(prev["title"])}</span>
        </a>'''
        if prev
        else "        <span></span>"
    )
    next_block = (
        f'''        <a class="story-nav--next" href="{nxt["slug"]}.html">
          <span class="story-nav__label">Next</span>
          <span class="story-nav__title">{esc(nxt["title"])}</span>
        </a>'''
        if nxt
        else "        <span></span>"
    )
    nn = f"{n:02d}"
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Ruining Viji — Chapter {nn}: {esc(ch["title"])}. Expanded dual-POV explicit long-form erotic story.">
  <meta name="robots" content="noindex, nofollow">
  <title>Chapter {nn}: {esc(ch["title"])} — Ruining Viji</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="../css/story.css">
  <link rel="stylesheet" href="../css/explore.css">
</head>
<body data-track-room="story">
  <div class="age-gate" id="age-gate" role="dialog" aria-modal="true" aria-labelledby="age-title">
    <div class="age-gate__card">
      <h2 id="age-title">18+ Only</h2>
      <p>
        This chapter contains explicit adult sexual content — detailed erotic narrative.
        Enter only if you are 18 or older.
      </p>
      <div class="age-gate__actions">
        <button type="button" class="btn btn--primary" id="age-enter">I am 18+ — Enter</button>
        <button type="button" class="btn btn--ghost" id="age-leave">Leave</button>
      </div>
    </div>
  </div>

  <header class="nav" id="nav">
    <a href="../index.html#top" class="nav__logo">Viji<span>.</span></a>
            <ul class="nav__links" id="nav-links">
      <li><a href="../index.html#gallery">Gallery</a></li>
      <li><a href="../looks/index.html">Looks</a></li>
      <li><a href="../her.html">Her</a></li>
      <li><a href="../us.html">Us</a></li>
      <li><a href="../him.html">Him</a></li>
      <li><a href="../nights.html">Nights</a></li>
      <li><a href="../index.html#story">Story</a></li>
      <li><a href="../index.html#videos">Videos</a></li>
      <li><a href="../index.html#contact">Find us</a></li>
    </ul>
    <div class="nav__right">
      <button class="nav__toggle" id="nav-toggle" aria-label="Menu" aria-expanded="false">☰</button>
    </div>
  </header>

  <main class="story-page">
    <div class="story-page__wrap">
      <nav class="story-breadcrumb" aria-label="Breadcrumb">
        <a href="../index.html">Home</a>
        <span class="story-breadcrumb__sep">/</span>
        <a href="../index.html#story">Ruining Viji</a>
        <span class="story-breadcrumb__sep">/</span>
        <span>Chapter {nn}</span>
      </nav>

      <header class="story-hero">
        <span class="story-hero__num">Chapter {nn} of 13 · Expanded</span>
        <h1>{esc(ch["title"])}</h1>
        <p class="story-hero__tag">{esc(ch["tag"])}</p>
        <p class="story-hero__lead">{esc(ch["lead"])}</p>
      </header>

      <article class="story-body">
{body_html(sections)}
      </article>

      <nav class="story-nav" aria-label="Chapter navigation">
{prev_block}
{next_block}
      </nav>

      <aside class="story-toc">
        <h3>All chapters</h3>
        <ol>
{toc_html(ch["slug"])}
        </ol>
      </aside>

      <p class="story-footer-note">
        <a href="../index.html#story">← Back to story index</a>
        · 18+ · Ruining Viji · dual voice
      </p>
    </div>
  </main>

  <footer class="footer">
    <p><strong>18+ Only</strong> · Vijayalakshmi — professional Chennai mangalsutra slut wife</p>
    <p class="footer__social">
      <a href="https://www.instagram.com/pattu.vg69" target="_blank" rel="noopener noreferrer">Instagram @pattu.vg69</a>
      <span aria-hidden="true"> · </span>
      <a href="https://x.com/BalaViji69" target="_blank" rel="noopener noreferrer">X @BalaViji69</a>
      <span aria-hidden="true"> · </span>
      <a href="https://in.pinterest.com/Vijayalakshmi_soothu/" target="_blank" rel="noopener noreferrer">Pinterest</a>
      <span aria-hidden="true"> · </span>
      <a href="https://www.facebook.com/share/1UAxdTLZSQ/" target="_blank" rel="noopener noreferrer">Facebook · 3k</a>
      <span aria-hidden="true"> · </span>
      <a href="https://t.me/viji_lachu" target="_blank" rel="noopener noreferrer">Telegram @viji_lachu</a>
    </p>
    <p>All models depicted as adults</p>
  </footer>

  <script src="../js/main.js"></script>
</body>
</html>
"""


def first_paras_preview(sections: list[tuple[str, list[str]]], max_paras: int = 3) -> str:
    collected: list[str] = []
    for who, paras in sections:
        for p in paras:
            if len(p) < 40:
                continue
            collected.append(p)
            if len(collected) >= max_paras:
                break
        if len(collected) >= max_paras:
            break
    bits = []
    for p in collected[:3]:
        s = p if len(p) < 280 else p[:277] + "…"
        bits.append(f"            <p>{decorate(s)}</p>")
    return "\n".join(bits)


def build_index_chapters(parsed: dict[int, list]) -> str:
    cards = []
    for i, ch in enumerate(CHAPTERS):
        open_cls = " is-open" if i == 0 else ""
        exp = "true" if i == 0 else "false"
        body = first_paras_preview(parsed[ch["n"]])
        cards.append(
            f'''        <article class="chapter{open_cls}" id="ch-{ch["n"]:02d}">
          <button type="button" class="chapter__toggle" aria-expanded="{exp}">
            <span class="chapter__num">{ch["n"]:02d}</span>
            <span class="chapter__meta">
              <h3>{esc(ch["title"])}</h3>
              <span>{esc(ch["preview_meta"])}</span>
            </span>
            <span class="chapter__icon">▾</span>
          </button>
          <div class="chapter__body">
{body}
            <p class="chapter__full-link">
              <a class="btn btn--primary" href="stories/{ch["slug"]}.html">Read full chapter →</a>
            </p>
</div>
        </article>
'''
        )
    return "\n".join(cards)


def replace_index_story_block(parsed: dict[int, list]) -> None:
    text = INDEX.read_text(encoding="utf-8")
    # header labels
    text = text.replace("16 chapters", "13 chapters")
    text = text.replace("Full confession · 16 chapters", "Full confession · 13 chapters")
    text = re.sub(
        r'<p class="section__note reveal"[^>]*>Chapters 01–05 expanded[^<]*</p>',
        '<p class="section__note reveal" style="margin-top:0.5rem;color:var(--gold-soft);">Chapters 01–13 expanded · dual voice (Bala + Viji) · fourth-floor origin arc</p>',
        text,
        count=1,
    )
    text = text.replace(
        "from first glance to couple swap, told slow and filthy.",
        "from first glance through fourth-floor lifetime training — dual voice, told slow and filthy.",
    )

    start = text.find('<div class="chapters reveal" id="chapters">')
    end = text.find("</div>", text.find('id="ch-16"'))  # fragile
    # better: find section end after chapters
    m = re.search(
        r'(<div class="chapters reveal" id="chapters">)(.*?)(</div>\s*</div>\s*</section>)',
        text,
        re.S,
    )
    if not m:
        # try looser: from chapters to next section
        m2 = re.search(
            r'(<div class="chapters reveal" id="chapters">)(.*?)(\n      </div>\n\n    </div>\n  </section>)',
            text,
            re.S,
        )
        if not m2:
            raise SystemExit("Could not locate #chapters block in index.html")
        m = m2

    new_inner = "\n\n" + build_index_chapters(parsed) + "\n      "
    text = text[: m.start(2)] + new_inner + text[m.end(2) :]
    INDEX.write_text(text, encoding="utf-8")
    print("Updated index.html #story chapters")


def main() -> None:
    STORIES.mkdir(parents=True, exist_ok=True)
    parsed: dict[int, list] = {}
    keep_slugs = set()

    for ch in CHAPTERS:
        n = ch["n"]
        src = AFFAIR / f"part-{n:02d}" / f"part-{n:02d}.txt"
        if not src.is_file():
            raise SystemExit(f"Missing {src}")
        sections = parse_part(src)
        if not sections:
            raise SystemExit(f"No POV sections in {src}")
        parsed[n] = sections
        out = STORIES / f'{ch["slug"]}.html'
        out.write_text(page_html(ch, sections), encoding="utf-8")
        keep_slugs.add(out.name)
        print(f"Wrote {out.name} ({out.stat().st_size} bytes, {len(sections)} sections)")

    # delete old story files not in keep set
    for p in STORIES.glob("*.html"):
        if p.name not in keep_slugs:
            print(f"Removing old {p.name}")
            p.unlink()

    replace_index_story_block(parsed)

    # soft-fix main.js chapter links that point at deleted files
    main_js = SITE / "js" / "main.js"
    if main_js.is_file():
        js = main_js.read_text(encoding="utf-8")
        # map common old links to nearest new
        repl = {
            "stories/06-swollen-pussy-money-seed.html": "stories/06-home-breaks-love-rebuilds-move-in.html",
            "stories/07-the-fake-call.html": "stories/07-fourth-floor-shared-bath-half-open-door.html",
            "stories/08-first-paid-customer.html": "stories/08-cup-morning-door-thevidiya.html",
            "stories/09-tears-to-shopping-high.html": "stories/09-terrace-whiskey-group-call-door-floor.html",
            "stories/10-sold-for-a-week.html": "stories/10-morning-snore-porn-threat-long-night-pin.html",
            "stories/11-seven-days-of-total-corruption.html": "stories/11-lifetime-slow-kisses-mouth-hour-first-take.html",
            "stories/12-fear-and-shame.html": "stories/12-pussy-feast-lube-ass-pee-left-with-them.html",
            "stories/13-secret-money-machine.html": "stories/13-shared-bath-towel-return-karthik-dp.html",
            "stories/14-brothers-close-call.html": "stories/13-shared-bath-towel-return-karthik-dp.html",
            "stories/15-couple-swap-entry.html": "stories/13-shared-bath-towel-return-karthik-dp.html",
            "stories/16-the-mangalsutra-wife.html": "stories/13-shared-bath-towel-return-karthik-dp.html",
            "Ch.08 →": "Ch.08 →",
        }
        for a, b in repl.items():
            js = js.replace(a, b)
        main_js.write_text(js, encoding="utf-8")
        print("Patched js/main.js old chapter hrefs")

    print("DONE")


if __name__ == "__main__":
    main()
