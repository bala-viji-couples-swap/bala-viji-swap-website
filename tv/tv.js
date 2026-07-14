/**
 * TV party screensaver
 * - Portrait images: 3 per slide
 * - Landscape / wide: 1 (or 2) per slide
 * - Unlisted page — not linked from main site
 */
(function () {
  "use strict";

  // Slow for private auction: time to look, discuss, fix price
  const INTERVAL_MS = 18000;
  const FADE_MS = 1200;

  const CAPTIONS = [
    "Private auction · thali on · nothing hidden from the room.",
    "Look carefully. This is what you are negotiating.",
    "Soft eyes. Shared nights. Still hungry for the highest claim.",
    "Mangalsutra wife energy — presented for serious interest only.",
    "Before the gold… and after she was already ruined properly.",
    "Chennai wife. Village face. Hotel body. One product.",
    "He owns the arrangement. She wears the gold. You bid the night.",
    "Don’t rush the reel — shy in stills, open when claimed.",
    "18+ · Closed room · Invitation only",
    "Three faces of her at once — choose the night you want.",
  ];

  const stage = document.getElementById("tv-stage");
  const slidesRoot = document.getElementById("slides");
  const progressBar = document.getElementById("progress-bar");
  const statusEl = document.getElementById("tv-status");
  const captionEl = document.getElementById("tv-caption");
  const gate = document.getElementById("start-gate");
  const btnStart = document.getElementById("btn-start");
  const btnPause = document.getElementById("btn-pause");
  const btnFs = document.getElementById("btn-fs");
  const btnShuffle = document.getElementById("btn-shuffle");
  const btnCaptions = document.getElementById("btn-captions");

  let slides = [];
  let index = 0;
  let timer = null;
  let paused = false;
  let shuffleOn = true;
  let captionsOn = true;
  let tickStart = 0;
  let rafId = 0;
  let wakeLock = null;
  let wakeVideo = null;

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function chunk(arr, size) {
    const out = [];
    for (let i = 0; i < arr.length; i += size) {
      out.push(arr.slice(i, i + size));
    }
    return out;
  }

  function buildSlidePlan(data) {
    let portraits = data.portraits || [];
    let landscapes = data.landscapes || [];
    if (shuffleOn) {
      portraits = shuffle(portraits);
      landscapes = shuffle(landscapes);
    }

    const plan = [];

    // 3 portraits per slide
    chunk(portraits, 3).forEach((group) => {
      // if last group has 1–2, still show them as triple/double layout
      const mode = group.length >= 3 ? "triple" : group.length === 2 ? "double" : "single";
      plan.push({ mode, images: group });
    });

    // landscapes: singles, optional pair if two consecutive wide
    let i = 0;
    while (i < landscapes.length) {
      const a = landscapes[i];
      const b = landscapes[i + 1];
      // pair two medium-wide if both not ultra-wide banners
      const canPair =
        b && a.w / a.h < 1.8 && b.w / b.h < 1.8;
      if (canPair) {
        plan.push({ mode: "double", images: [a, b] });
        i += 2;
      } else {
        plan.push({ mode: "single", images: [a] });
        i += 1;
      }
    }

    if (shuffleOn) return shuffle(plan);
    // interleave: after every 2 portrait slides, a landscape — if not shuffle
    return plan;
  }

  function renderSlides(plan) {
    slidesRoot.innerHTML = "";
    slides = plan.map((item, i) => {
      const el = document.createElement("div");
      el.className = "slide slide--" + item.mode;
      el.setAttribute("data-index", String(i));
      item.images.forEach((img) => {
        const frame = document.createElement("div");
        frame.className = "slide-frame";
        const image = document.createElement("img");
        image.src = img.src;
        image.alt = "Viji";
        image.loading = i < 2 ? "eager" : "lazy";
        image.draggable = false;
        frame.appendChild(image);
        el.appendChild(frame);
      });
      slidesRoot.appendChild(el);
      return el;
    });
  }

  function updateStatus() {
    if (!statusEl || !slides.length) return;
    const mode = slides[index].className.includes("triple")
      ? "3 portraits"
      : slides[index].className.includes("double")
        ? "pair"
        : "wide";
    statusEl.innerHTML =
      "<strong>" +
      (index + 1) +
      " / " +
      slides.length +
      "</strong><br>" +
      mode +
      (paused ? " · paused" : " · live");
  }

  function showCaption() {
    if (!captionEl) return;
    if (!captionsOn) {
      captionEl.classList.remove("is-on");
      return;
    }
    captionEl.textContent = CAPTIONS[index % CAPTIONS.length];
    captionEl.classList.add("is-on");
    clearTimeout(showCaption._t);
    showCaption._t = setTimeout(() => {
      captionEl.classList.remove("is-on");
    }, Math.min(INTERVAL_MS - 2000, 6000));
  }

  function goTo(next) {
    if (!slides.length) return;
    const prev = index;
    index = (next + slides.length) % slides.length;
    slides[prev].classList.remove("is-active");
    slides[prev].classList.add("is-leaving");
    setTimeout(() => slides[prev].classList.remove("is-leaving"), FADE_MS);
    slides[index].classList.add("is-active");
    // preload next
    const n = slides[(index + 1) % slides.length];
    n.querySelectorAll("img").forEach((img) => {
      if (!img.complete) {
        const warm = new Image();
        warm.src = img.src;
      }
    });
    updateStatus();
    showCaption();
    tickStart = performance.now();
  }

  function next() {
    goTo(index + 1);
  }

  function prev() {
    goTo(index - 1);
  }

  function stopTimer() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
  }

  function progressLoop(now) {
    if (paused || !slides.length) {
      rafId = requestAnimationFrame(progressLoop);
      return;
    }
    const elapsed = now - tickStart;
    const pct = Math.min(100, (elapsed / INTERVAL_MS) * 100);
    if (progressBar) progressBar.style.width = pct + "%";
    if (elapsed >= INTERVAL_MS) {
      next();
    }
    rafId = requestAnimationFrame(progressLoop);
  }

  function startTimer() {
    stopTimer();
    tickStart = performance.now();
    rafId = requestAnimationFrame(progressLoop);
  }

  function setPaused(p) {
    paused = p;
    if (btnPause) {
      btnPause.textContent = paused ? "Play" : "Pause";
      btnPause.classList.toggle("is-on", paused);
    }
    updateStatus();
    if (!paused) tickStart = performance.now();
  }

  function resolveSrc(src) {
    // Ensure paths work from /tv, /tv/, or file://.../tv/index.html
    if (!src) return src;
    if (/^https?:\/\//i.test(src) || src.startsWith("data:")) return src;
    // Already absolute from site root (/assets/... or /assets1/...)
    if (src.startsWith("/")) return src;
    // Normalize ../assets... → /assets... when served over http(s)
    if (src.startsWith("../assets")) {
      try {
        if (location.protocol === "http:" || location.protocol === "https:") {
          return "/" + src.replace(/^\.\.\//, "");
        }
      } catch (_) {}
    }
    return src;
  }

  function loadData() {
    // Prefer embedded catalog (works without fetch / trailing slash / file://)
    if (window.TV_IMAGES && (window.TV_IMAGES.portraits || window.TV_IMAGES.landscapes)) {
      return Promise.resolve(window.TV_IMAGES);
    }

    // Fallback: fetch next to this script
    const script = document.querySelector('script[src*="tv.js"]');
    let url = "images.json";
    if (script && script.src) {
      url = script.src.replace(/tv\.js(?:\?.*)?$/i, "images.json");
    } else {
      // /tv without slash → force /tv/images.json
      try {
        const base = location.href.replace(/\/tv\/?(\?.*)?$/i, "/tv/");
        url = new URL("images.json", base.endsWith("/") ? base : base + "/").href;
      } catch (_) {}
    }

    return fetch(url, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("bad status " + res.status);
        return res.json();
      })
      .catch((e) => {
        console.error("[tv] failed to load images", e);
        return { portraits: [], landscapes: [] };
      });
  }

  function rebuild() {
    loadData().then((data) => {
      const portraits = (data.portraits || []).map((img) => ({
        ...img,
        src: resolveSrc(img.src),
      }));
      const landscapes = (data.landscapes || []).map((img) => ({
        ...img,
        src: resolveSrc(img.src),
      }));
      const plan = buildSlidePlan({ portraits, landscapes });
      if (!plan.length) {
        if (statusEl) {
          statusEl.textContent =
            "No images found — open via http://…/tv/ (not file://) or check images-data.js";
        }
        console.error("[tv] empty plan", data);
        return;
      }
      renderSlides(plan);
      index = 0;
      slides.forEach((s) => s.classList.remove("is-active", "is-leaving"));
      slides[0].classList.add("is-active");
      updateStatus();
      showCaption();
      startTimer();
    });
  }

  function enterFullscreen() {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  }

  /**
   * Keep display awake while the auction reel runs.
   * 1) Screen Wake Lock API (Chrome / Edge / Android / many modern browsers)
   * 2) Fallback: silent looping video (older WebKit / some TVs)
   * Note: Smart TV *panel* sleep is still controlled by the TV OS settings.
   */
  async function requestWakeLock() {
    try {
      if (navigator.wakeLock && navigator.wakeLock.request) {
        wakeLock = await navigator.wakeLock.request("screen");
        wakeLock.addEventListener("release", () => {
          wakeLock = null;
        });
        console.info("[tv] screen wake lock active");
        return true;
      }
    } catch (e) {
      console.warn("[tv] wake lock failed", e);
    }
    return startSilentWakeVideo();
  }

  function startSilentWakeVideo() {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 2;
      canvas.height = 2;
      if (!canvas.captureStream) {
        console.warn("[tv] captureStream not available; set TV sleep timer to Off");
        return false;
      }
      const ctx = canvas.getContext("2d");
      function paint() {
        if (!wakeVideo) return;
        ctx.fillStyle = "#050203";
        ctx.fillRect(0, 0, 2, 2);
        ctx.fillStyle = "rgba(30,10,12," + (0.02 + Math.random() * 0.02) + ")";
        ctx.fillRect(0, 0, 1, 1);
        requestAnimationFrame(paint);
      }
      paint();

      if (!wakeVideo) {
        wakeVideo = document.createElement("video");
        wakeVideo.setAttribute("playsinline", "");
        wakeVideo.setAttribute("muted", "");
        wakeVideo.muted = true;
        wakeVideo.loop = true;
        wakeVideo.playsInline = true;
        wakeVideo.srcObject = canvas.captureStream(1);
        wakeVideo.style.cssText =
          "position:fixed;width:1px;height:1px;opacity:0.01;pointer-events:none;bottom:0;left:0;z-index:-1";
        document.body.appendChild(wakeVideo);
      }
      const p = wakeVideo.play();
      if (p && p.then) {
        p.then(() => console.info("[tv] silent wake video playing")).catch((e) =>
          console.warn("[tv] silent wake video failed", e)
        );
      }
      return true;
    } catch (e) {
      console.warn("[tv] wake video fallback failed", e);
      return false;
    }
  }

  async function releaseWakeLock() {
    try {
      if (wakeLock) {
        await wakeLock.release();
        wakeLock = null;
      }
    } catch (_) {}
    try {
      if (wakeVideo) {
        wakeVideo.pause();
      }
    } catch (_) {}
  }

  // Re-request wake lock when tab becomes visible again (browser may drop it)
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && stage && stage.classList.contains("active")) {
      requestWakeLock();
    }
  });

  function startShow() {
    if (gate) gate.classList.add("hidden");
    if (stage) {
      stage.classList.add("active");
      stage.classList.add("show-chrome");
      setTimeout(() => stage.classList.remove("show-chrome"), 3500);
    }
    rebuild();
    // try fullscreen on start (may require gesture — we have it)
    try {
      enterFullscreen();
    } catch (_) {}
    requestWakeLock();
  }

  if (btnStart) btnStart.addEventListener("click", startShow);

  if (btnPause) {
    btnPause.addEventListener("click", () => setPaused(!paused));
  }

  if (btnFs) {
    btnFs.addEventListener("click", enterFullscreen);
  }

  if (btnShuffle) {
    btnShuffle.addEventListener("click", () => {
      shuffleOn = !shuffleOn;
      btnShuffle.classList.toggle("is-on", shuffleOn);
      btnShuffle.textContent = shuffleOn ? "Shuffle on" : "Shuffle off";
      rebuild();
    });
    btnShuffle.classList.add("is-on");
  }

  if (btnCaptions) {
    btnCaptions.addEventListener("click", () => {
      captionsOn = !captionsOn;
      btnCaptions.classList.toggle("is-on", captionsOn);
      btnCaptions.textContent = captionsOn ? "Lines on" : "Lines off";
      if (!captionsOn && captionEl) captionEl.classList.remove("is-on");
      else showCaption();
    });
    btnCaptions.classList.add("is-on");
  }

  document.addEventListener("keydown", (e) => {
    if (gate && !gate.classList.contains("hidden")) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        startShow();
      }
      return;
    }
    if (e.key === "ArrowRight" || e.key === "PageDown") {
      e.preventDefault();
      next();
      if (!paused) tickStart = performance.now();
    } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      prev();
      if (!paused) tickStart = performance.now();
    } else if (e.key === " " || e.key === "k") {
      e.preventDefault();
      setPaused(!paused);
    } else if (e.key === "f" || e.key === "F") {
      enterFullscreen();
    } else if (e.key === "c" || e.key === "C") {
      if (btnCaptions) btnCaptions.click();
    }
  });

  // Wake chrome on move
  let chromeT;
  document.addEventListener("mousemove", () => {
    if (!stage || !stage.classList.contains("active")) return;
    stage.classList.add("show-chrome");
    clearTimeout(chromeT);
    chromeT = setTimeout(() => stage.classList.remove("show-chrome"), 2500);
  });
})();
