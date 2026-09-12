/**
 * Vijayalakshmi — site interactions
 * Age gate · nav · lightbox · reveal · story chapters · ticker
 */

(function () {
  "use strict";

  const AGE_KEY = "viji_age_ok";

  /* ---------- Age gate ---------- */
  function initAgeGate() {
    const gate = document.getElementById("age-gate");
    if (!gate) return;

    if (sessionStorage.getItem(AGE_KEY) === "1") {
      gate.classList.add("hidden");
      document.body.classList.remove("no-scroll");
      return;
    }

    document.body.classList.add("no-scroll");

    const enter = document.getElementById("age-enter");
    const leave = document.getElementById("age-leave");

    if (enter) {
      enter.addEventListener("click", () => {
        sessionStorage.setItem(AGE_KEY, "1");
        gate.classList.add("hidden");
        document.body.classList.remove("no-scroll");
      });
    }

    if (leave) {
      leave.addEventListener("click", () => {
        window.location.href = "https://www.google.com";
      });
    }
  }

  /* ---------- Nav ---------- */
  function initNav() {
    const nav = document.getElementById("nav");
    const toggle = document.getElementById("nav-toggle");
    const links = document.getElementById("nav-links");

    if (nav) {
      const onScroll = () => {
        nav.classList.toggle("scrolled", window.scrollY > 40);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    if (toggle && links) {
      toggle.addEventListener("click", () => {
        links.classList.toggle("open");
        toggle.setAttribute(
          "aria-expanded",
          links.classList.contains("open") ? "true" : "false"
        );
      });

      links.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => {
          links.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  /* ---------- Smooth scroll for data-scroll ---------- */
  function initSmoothScroll() {
    document.querySelectorAll("[data-scroll]").forEach((el) => {
      el.addEventListener("click", (e) => {
        const target = document.querySelector(el.getAttribute("data-scroll"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  /* ---------- Lightbox ---------- */
  function initLightbox() {
    const items = Array.from(document.querySelectorAll("[data-lightbox]"));
    if (!items.length) return;

    const lb = document.getElementById("lightbox");
    const lbImg = document.getElementById("lightbox-img");
    const lbCap = document.getElementById("lightbox-caption");
    const btnClose = document.getElementById("lightbox-close");
    const btnPrev = document.getElementById("lightbox-prev");
    const btnNext = document.getElementById("lightbox-next");

    if (!lb || !lbImg) return;

    let index = 0;

    const gallery = items.map((el) => ({
      src: el.getAttribute("data-src") || el.querySelector("img")?.src,
      caption:
        el.getAttribute("data-caption") ||
        el.querySelector(".gallery__caption h4")?.textContent ||
        "",
    }));

    function open(i) {
      index = (i + gallery.length) % gallery.length;
      const item = gallery[index];
      lbImg.src = item.src;
      lbImg.alt = item.caption;
      if (lbCap) lbCap.textContent = item.caption;
      lb.classList.add("open");
      document.body.classList.add("no-scroll");
    }

    function close() {
      lb.classList.remove("open");
      document.body.classList.remove("no-scroll");
      lbImg.removeAttribute("src");
    }

    function prev() {
      open(index - 1);
    }

    function next() {
      open(index + 1);
    }

    items.forEach((el, i) => {
      el.addEventListener("click", () => open(i));
      el.setAttribute("tabindex", "0");
      el.setAttribute("role", "button");
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open(i);
        }
      });
    });

    if (btnClose) btnClose.addEventListener("click", close);
    if (btnPrev) btnPrev.addEventListener("click", prev);
    if (btnNext) btnNext.addEventListener("click", next);

    lb.addEventListener("click", (e) => {
      if (e.target === lb) close();
    });

    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!els.length || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach((el) => io.observe(el));
  }

  /* ---------- Story chapters accordion ---------- */
  function initChapters() {
    const chapters = document.querySelectorAll(".chapter");
    if (!chapters.length) return;

    chapters.forEach((ch) => {
      const btn = ch.querySelector(".chapter__toggle");
      if (!btn) return;

      btn.addEventListener("click", () => {
        const opening = !ch.classList.contains("is-open");
        // close others for cleaner reading
        chapters.forEach((other) => {
          other.classList.remove("is-open");
          const b = other.querySelector(".chapter__toggle");
          if (b) b.setAttribute("aria-expanded", "false");
        });
        if (opening) {
          ch.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
          // gentle scroll so header stays visible
          setTimeout(() => {
            ch.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }, 50);
        }
      });
    });

    const expandAll = document.getElementById("story-expand-all");
    const collapseAll = document.getElementById("story-collapse-all");

    if (expandAll) {
      expandAll.addEventListener("click", () => {
        chapters.forEach((ch) => {
          ch.classList.add("is-open");
          const b = ch.querySelector(".chapter__toggle");
          if (b) b.setAttribute("aria-expanded", "true");
        });
      });
    }

    if (collapseAll) {
      collapseAll.addEventListener("click", () => {
        chapters.forEach((ch) => {
          ch.classList.remove("is-open");
          const b = ch.querySelector(".chapter__toggle");
          if (b) b.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  /* ---------- Fake chat threads ---------- */
  function initChats() {
    const phone = document.getElementById("chat-phone");
    if (!phone) return;

    const tabs = phone.querySelectorAll(".chat-tab");
    const threads = {
      origin: document.getElementById("chat-origin"),
      training: document.getElementById("chat-training"),
      highway: document.getElementById("chat-highway"),
      facebook: document.getElementById("chat-facebook"),
    };

    function show(key) {
      tabs.forEach((tab) => {
        const on = tab.getAttribute("data-chat") === key;
        tab.classList.toggle("is-active", on);
        tab.setAttribute("aria-selected", on ? "true" : "false");
      });
      Object.keys(threads).forEach((k) => {
        const el = threads[k];
        if (!el) return;
        const on = k === key;
        el.classList.toggle("is-active", on);
        if (on) el.removeAttribute("hidden");
        else el.setAttribute("hidden", "");
      });
      const active = threads[key];
      if (active) {
        const scroller = active.querySelector(".chat-thread__msgs");
        if (scroller) scroller.scrollTop = 0;
      }
    }

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        show(tab.getAttribute("data-chat"));
      });
    });
  }

  /* ---------- Tonight's secret (changes by calendar day; routes to rooms) ---------- */
  function initTonightSecret() {
    const el = document.getElementById("tonight-secret-text");
    if (!el) return;

    const secrets = [
      '267 new stills of her body — thali on, soft face, full drop live. <a href=\"gallery-drop.html\">Open the set →</a>',
      'Facebook Messenger leaks: Vinoth, Tamil, pundai talk, beach wife selfie in the thread. <a href=\"chats-facebook.html\">Read the screens →</a>',
      'Just unsealed: she asked for raw — not ordered. <a href="nights.html#night-asked-raw">Open the night →</a>',
      'Letter 03 is live — hunger with her name on it. <a href="letter-03.html">Read her throat →</a>',
      'Chapter 16 is not the end. <a href="after.html">After the thali →</a>',
      'She said yes to the camera for money and clients. <a href="letter-02.html">Letter 02 →</a>',
      'Bala’s notes: film her while ashamed; sell weeks not minutes. <a href="him.html">His room →</a>',
      'She still washes the thali after strangers finish on it — slowly, like prayer. <a href="us.html">Us →</a>',
      'Bala makes her say thank you in Tamil before she is allowed to sleep. <a href="him.html">Handler notes →</a>',
      'On video calls home she sits with knees together so Amma cannot see the marks. <a href="her.html">Her room →</a>',
      'The first time she came with another wife’s tongue, she bit Bala’s wrist not to scream. <a href="nights.html">Nights →</a>',
      'He keeps one photo she begged him to delete. She knows. She stays. <a href="index.html#gallery">Gallery →</a>',
      'Sometimes she asks to wear the mangalsutra during morning sex with only him. <a href="looks/mangalsutra-slut.html">That look →</a>',
      'Highway piss still happens when she is truly scared. He finds it honest. <a href="stories/08-first-paid-customer.html">Ch.08 →</a>',
      'Sealed night: she cried because she liked it. That file is not open yet. <a href="nights.html">Sealed grid →</a>',
      'Jasmine in her hair is never for God on swap nights. <a href="stories/16-the-mangalsutra-wife.html">Ch.16 →</a>',
      'She practices the moan in the bathroom mirror when he is not home. <a href="index.html#chats">Chats →</a>',
      'Brothers think she is weak in maths. She is strong at lying with soft eyes. <a href="stories/14-brothers-close-call.html">Ch.14 →</a>',
      'After multi-day villas she walks like a newlywed and sits like a used toy. <a href="index.html#swap-record">Diary →</a>',
      'First tape frames are stills from one reel. <a href="index.html#videos">Sex video →</a>',
      'Season 2 hooks are sealed on purpose. Leave and feel behind. <a href="after.html">Teasers →</a>',
      'He told her good girls also get wet. She proved it for years. <a href="letter.html">Letter 01 →</a>',
    ];

    const day = new Date();
    const key =
      day.getFullYear() * 10000 + (day.getMonth() + 1) * 100 + day.getDate();
    const idx = key % secrets.length;
    el.innerHTML = secrets[idx];
  }

  /* ---------- Path progress + continue reading (localStorage) ---------- */
  const TRACK_ROOMS_KEY = "viji_rooms_seen";
  const TRACK_CH_KEY = "viji_chapters_seen";
  const CONTINUE_KEY = "viji_continue";
  const ROOM_LABELS = {
    home: "Home",
    her: "Her",
    us: "Us",
    him: "Him",
    nights: "Nights",
    looks: "Looks",
    letter: "Letters",
    after: "After",
    story: "Story",
    gallery: "Gallery",
    drop: "New drop",
    video: "Video",
  };
  const ROOM_TOTAL = 8; // her us him nights looks letter after story
  const CHAPTER_TOTAL = 16;

  function readSet(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return new Set();
      const arr = JSON.parse(raw);
      return new Set(Array.isArray(arr) ? arr : []);
    } catch (e) {
      return new Set();
    }
  }

  function writeSet(key, set) {
    try {
      localStorage.setItem(key, JSON.stringify(Array.from(set)));
    } catch (e) {
      /* private mode */
    }
  }

  function detectRoom() {
    const forced = document.body && document.body.getAttribute("data-track-room");
    if (forced) return forced;
    const path = (location.pathname || "").replace(/\\/g, "/");
    if (/stories\/\d{2}-/.test(path)) return "story";
    if (path.includes("looks/")) return "looks";
    if (path.endsWith("her.html")) return "her";
    if (path.endsWith("us.html")) return "us";
    if (path.endsWith("him.html")) return "him";
    if (path.endsWith("nights.html")) return "nights";
    if (path.includes("letter")) return "letter";
    if (path.endsWith("after.html")) return "after";
    if (path.endsWith("index.html") || path.endsWith("/")) return "home";
    return null;
  }

  function detectChapter() {
    const path = (location.pathname || "") + (location.href || "");
    const m = path.match(/stories\/(\d{2})-([^/?#]+)/);
    if (!m) return null;
    return {
      num: m[1],
      slug: m[1] + "-" + m[2].replace(/\.html$/, ""),
      file: m[1] + "-" + m[2].replace(/\.html$/, "") + ".html",
      title: document.title.replace(/\s*[—|-].*$/, "").trim() || ("Chapter " + m[1]),
    };
  }

  function hrefPrefix() {
    const path = (location.pathname || "").replace(/\\/g, "/");
    if (path.includes("/stories/") || path.includes("/looks/") || path.includes("/tv/")) {
      return "../";
    }
    return "";
  }

  function initPathTracking() {
    const room = detectRoom();
    const rooms = readSet(TRACK_ROOMS_KEY);
    const chapters = readSet(TRACK_CH_KEY);
    const prefix = hrefPrefix();

    if (room && room !== "home") {
      // map home sections later; track named rooms
      if (ROOM_LABELS[room]) rooms.add(room);
    }
    // Home hash sections
    if (room === "home") {
      rooms.add("home");
      const markHash = () => {
        const h = (location.hash || "").replace("#", "");
        if (h === "gallery") rooms.add("gallery");
        if (h === "story") rooms.add("story");
        if (h === "videos") rooms.add("video");
        if (h === "chats") rooms.add("her");
        writeSet(TRACK_ROOMS_KEY, rooms);
        renderProgress(rooms, chapters, prefix);
      };
      markHash();
      window.addEventListener("hashchange", markHash);
    }

    const ch = detectChapter();
    if (ch) {
      chapters.add(ch.num);
      rooms.add("story");
      try {
        localStorage.setItem(
          CONTINUE_KEY,
          JSON.stringify({
            href: prefix + "stories/" + ch.file,
            title: ch.title,
            num: ch.num,
          })
        );
      } catch (e) {
        /* ignore */
      }
    }

    // Letter pages count as letter room
    if (room === "letter") rooms.add("letter");
    if (room === "after") rooms.add("after");

    writeSet(TRACK_ROOMS_KEY, rooms);
    writeSet(TRACK_CH_KEY, chapters);
    renderProgress(rooms, chapters, prefix);
    renderContinueBar(prefix);
  }

  function countCoreRooms(rooms) {
    const core = ["her", "us", "him", "nights", "looks", "letter", "after", "story"];
    return core.filter((r) => rooms.has(r)).length;
  }

  function renderProgress(rooms, chapters, prefix) {
    let bar = document.getElementById("path-progress");
    if (!bar) {
      bar = document.createElement("div");
      bar.id = "path-progress";
      bar.className = "path-progress";
      bar.setAttribute("role", "status");
      const ticker = document.getElementById("confession-ticker");
      if (ticker && ticker.parentNode) {
        ticker.parentNode.insertBefore(bar, ticker.nextSibling);
      } else {
        document.body.insertBefore(bar, document.body.firstChild);
      }
    }
    const r = countCoreRooms(rooms);
    const c = chapters.size;
    bar.innerHTML =
      '<span class="path-progress__label">Your path</span>' +
      '<span class="path-progress__stats">' +
      r +
      "/" +
      ROOM_TOTAL +
      " rooms · " +
      c +
      "/" +
      CHAPTER_TOTAL +
      " chapters" +
      "</span>" +
      '<a class="path-progress__link" href="' +
      prefix +
      'her.html">Explore deeper →</a>';
  }

  function renderContinueBar(prefix) {
    let data = null;
    try {
      data = JSON.parse(localStorage.getItem(CONTINUE_KEY) || "null");
    } catch (e) {
      data = null;
    }
    if (!data || !data.href) return;

    // Don't show on the same chapter
    const ch = detectChapter();
    if (ch && data.num === ch.num) return;

    let bar = document.getElementById("continue-bar");
    if (!bar) {
      bar = document.createElement("div");
      bar.id = "continue-bar";
      bar.className = "continue-bar";
      document.body.appendChild(bar);
    }

    // Fix href depth if stored from wrong folder
    let href = data.href;
    if (prefix === "" && href.startsWith("../")) href = href.replace(/^\.\.\//, "");
    if (prefix === "../" && !href.startsWith("../") && href.startsWith("stories/")) {
      href = "../" + href;
    }

    bar.innerHTML =
      '<div class="continue-bar__inner">' +
      '<span class="continue-bar__label">Continue</span>' +
      '<a class="continue-bar__link" href="' +
      href +
      '">' +
      (data.title || "Your chapter") +
      " →</a>" +
      '<button type="button" class="continue-bar__close" aria-label="Dismiss">×</button>' +
      "</div>";
    document.body.classList.add("has-continue-bar");
    bar.querySelector(".continue-bar__close").addEventListener("click", () => {
      document.body.classList.remove("has-continue-bar");
      bar.remove();
    });
  }

  /* ---------- Confession ticker ---------- */
  function initTicker() {
    const root = document.getElementById("confession-ticker");
    if (!root) return;

    document.body.classList.add("has-ticker");
    const lines = Array.from(root.querySelectorAll(".confession-ticker__line"));
    if (lines.length < 2) return;

    let i = 0;
    setInterval(() => {
      lines[i].classList.remove("is-active");
      i = (i + 1) % lines.length;
      lines[i].classList.add("is-active");
    }, 4200);
  }

  /* ---------- Single sex video + stills + modal ---------- */
  function initVideos() {
    const feature = document.getElementById("video-feature");
    const modal = document.getElementById("video-modal");
    if (!feature || !modal) return;

    const player = document.getElementById("video-modal-player");
    const titleEl = document.getElementById("video-modal-title");
    const pending = document.getElementById("video-modal-pending");
    const pendingImg = document.getElementById("video-modal-pending-img");
    const posterImg = document.getElementById("video-feature-poster");
    const playBtn = document.getElementById("video-feature-play");
    const streamNote = document.getElementById("video-stream-note");
    const stills = feature.querySelectorAll("[data-still-src]");

    function setPoster(src) {
      if (!src) return;
      feature.setAttribute("data-poster", src);
      if (posterImg) posterImg.src = src;
      stills.forEach((btn) => {
        btn.classList.toggle(
          "is-active",
          btn.getAttribute("data-still-src") === src
        );
      });
    }

    stills.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        setPoster(btn.getAttribute("data-still-src"));
      });
    });

    function close() {
      modal.hidden = true;
      document.body.classList.remove("no-scroll");
      if (player) {
        player.pause();
        player.removeAttribute("src");
        player.load();
        player.classList.add("is-hidden");
      }
      if (pending) pending.classList.remove("is-visible");
    }

    function open() {
      const stream = (feature.getAttribute("data-stream") || "").trim();
      const title =
        feature.getAttribute("data-title") || "Bala Viji — sex video";
      const poster =
        feature.getAttribute("data-poster") ||
        (posterImg && posterImg.src) ||
        "";

      if (titleEl) titleEl.textContent = title;
      modal.hidden = false;
      document.body.classList.add("no-scroll");

      if (stream) {
        if (pending) pending.classList.remove("is-visible");
        if (player) {
          player.classList.remove("is-hidden");
          player.poster = poster;
          // Direct .mp4/.webm URL. For xHamster embed iframe, extend later.
          player.src = stream;
          player.play().catch(() => {});
        }
      } else {
        if (player) {
          player.classList.add("is-hidden");
          player.removeAttribute("src");
        }
        if (pendingImg) pendingImg.src = poster;
        if (pending) pending.classList.add("is-visible");
      }
    }

    if ((feature.getAttribute("data-stream") || "").trim()) {
      feature.classList.add("is-ready");
      if (streamNote) {
        streamNote.innerHTML =
          "Stream linked — tap <strong>Play the night</strong> to watch.";
      }
    }

    if (playBtn) playBtn.addEventListener("click", open);

    modal.querySelectorAll("[data-video-close]").forEach((el) => {
      el.addEventListener("click", close);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.hidden) close();
    });
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    initAgeGate();
    initNav();
    initSmoothScroll();
    initLightbox();
    initReveal();
    initChapters();
    initChats();
    initTicker();
    initTonightSecret();
    initVideos();
    initPathTracking();
  });
})();
