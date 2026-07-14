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

  /* ---------- Tonight's secret (changes by calendar day) ---------- */
  function initTonightSecret() {
    const el = document.getElementById("tonight-secret-text");
    if (!el) return;

    const secrets = [
      "She still washes the thali after strangers finish on it — slowly, like prayer.",
      "Bala makes her say thank you in Tamil before she is allowed to sleep.",
      "On video calls home she sits with her knees together so Amma cannot see the marks.",
      "The first time she came with another wife’s tongue, she bit Bala’s wrist not to scream.",
      "He keeps one photo she begged him to delete. She knows. She stays.",
      "Sometimes she asks to wear the mangalsutra during morning sex with only him — to remember she is owned.",
      "Highway piss still happens when she is truly scared. He finds it honest.",
      "She has a salwar that smells like hotel soap. She will not throw it away.",
      "If you were the other husband, she would look at Bala first — then open anyway.",
      "Sealed night: she cried because she liked it. That file is not open yet.",
      "Jasmine in her hair is never for God on swap nights. It is for the men who pay to ruin a wife.",
      "She practices the moan in the bathroom mirror when he is not home.",
      "Brothers think she is weak in maths. She is strong at lying with soft eyes.",
      "After multi-day villas she walks like a newlywed and sits like a used toy.",
      "He told her good girls also get wet. She proved it for years.",
    ];

    const day = new Date();
    const key =
      day.getFullYear() * 10000 + (day.getMonth() + 1) * 100 + day.getDate();
    const idx = key % secrets.length;
    el.textContent = secrets[idx];
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
  });
})();
