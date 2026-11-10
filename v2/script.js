/* =========================================================
   THE AESTHETIC JOURNAL — Anti-Aging Advertorial Interactions (v2)
   ========================================================= */

(function () {
  /* ---------- 1. Reading Progress Bar & Mobile Sticky CTA ---------- */
  const readBar = document.getElementById("readBar");
  const mobSticky = document.getElementById("mobSticky");
  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (readBar && docHeight > 0) {
      readBar.style.width = Math.min(100, (scrollTop / docHeight) * 100) + "%";
    }
    if (mobSticky) {
      mobSticky.classList.toggle("is-visible", scrollTop > 520);
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 2. Evergreen Midnight Countdown ---------- */
  const timerEl = document.getElementById("annTimer");
  const pad = (n) => String(n).padStart(2, "0");
  function tick() {
    if (!timerEl) return;
    const now = new Date();
    const end = new Date(now);
    end.setHours(24, 0, 0, 0);
    let diff = Math.max(0, Math.floor((end - now) / 1000));
    const h = Math.floor(diff / 3600);
    diff -= h * 3600;
    const m = Math.floor(diff / 60);
    const s = diff - m * 60;
    timerEl.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- 3. Interactive 4-Mode Clinical Switcher ---------- */
  const tabs = document.querySelectorAll(".mode-tab");
  const panels = document.querySelectorAll(".mode-panel");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.mode;
      tabs.forEach((t) => t.classList.toggle("is-active", t === tab));
      panels.forEach((p) => p.classList.toggle("is-active", p.dataset.panel === target));
    });
  });

  /* ---------- 4. Interactive Before / After Comparison Slider ---------- */
  const baRange = document.getElementById("baRange");
  const baBeforeImg = document.getElementById("baBeforeImg");
  const baDivider = document.getElementById("baDivider");
  if (baRange && baBeforeImg && baDivider) {
    const updateBA = () => {
      const val = Number(baRange.value);
      baBeforeImg.style.clipPath = `inset(0 ${100 - val}% 0 0)`;
      baDivider.style.left = `${val}%`;
    };
    baRange.addEventListener("input", updateBA);
    updateBA();
  }

  /* ---------- 5. Scroll Reveal & Animated Clinical Stat Bars ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-inview");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));

    const statBars = document.getElementById("statBars");
    if (statBars) {
      const statIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              statBars.querySelectorAll(".stat-fill").forEach((bar) => {
                bar.style.width = bar.dataset.width + "%";
              });
              statIO.disconnect();
            }
          });
        },
        { threshold: 0.35 }
      );
      statIO.observe(statBars);
    }
  } else {
    reveals.forEach((el) => el.classList.add("is-inview"));
  }

  /* ---------- 6. Interactive Bundle Selector ---------- */
  const bundleCards = document.querySelectorAll(".v2-bundle");
  const ctaBtn = document.getElementById("v2CtaBtn");
  const ctaText = document.getElementById("v2CtaText");
  bundleCards.forEach((card) => {
    card.addEventListener("click", () => {
      bundleCards.forEach((c) => c.classList.remove("is-selected"));
      card.classList.add("is-selected");
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
      if (ctaText && card.dataset.cta) ctaText.textContent = card.dataset.cta;
      if (ctaBtn && card.dataset.url) ctaBtn.href = card.dataset.url;
    });
  });

  /* ---------- 7. Smooth FAQ Accordion ---------- */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const btn = item.querySelector(".faq-q");
    const panel = item.querySelector(".faq-a");
    btn.addEventListener("click", () => {
      const open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open);
      if (open) {
        panel.style.height = panel.scrollHeight + "px";
        panel.addEventListener("transitionend", function done() {
          if (item.classList.contains("is-open")) panel.style.height = "auto";
          panel.removeEventListener("transitionend", done);
        });
      } else {
        panel.style.height = panel.scrollHeight + "px";
        requestAnimationFrame(() => (panel.style.height = "0px"));
      }
    });
  });

  /* ---------- 8. Vercel Analytics + Google Tag CTA Event Tracking ---------- */
  document.querySelectorAll(".js-cta, .btn-editorial, .mob-sticky__btn").forEach((a) => {
    a.addEventListener("click", () => {
      if (typeof window.va === "function") {
        window.va("event", { name: "V2 Anti-Aging CTA Click", data: { text: a.textContent.trim() } });
      }
      if (typeof window.gtag === "function") {
        window.gtag("event", "buy_now_click", {
          angle: "angle-2-sagging-jowls",
          cta_text: a.textContent.trim()
        });
      }
    });
  });
})();
