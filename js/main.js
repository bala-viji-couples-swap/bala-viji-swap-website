/**
 * Vijayalakshmi — site interactions
 * Age gate · nav · lightbox · reveal · booking
 */

(function () {
  "use strict";

  const TELEGRAM = "https://t.me/vijayalskhmi69";
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

  /* ---------- Booking / Telegram ---------- */
  function initBooking() {
    const buttons = document.querySelectorAll("[data-telegram]");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        window.open(TELEGRAM, "_blank", "noopener,noreferrer");
        showToast("Opening Telegram — message @vijayalskhmi69");
      });
    });
  }

  function showToast(message) {
    let toast = document.getElementById("toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("show"), 3200);
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    initAgeGate();
    initNav();
    initSmoothScroll();
    initLightbox();
    initReveal();
    initBooking();
  });
})();
