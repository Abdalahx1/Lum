/* =========================================================
   Advertorial interactions
   ========================================================= */

// 👉 Put your product / checkout link here — every CTA button uses it
const CTA_URL = "#offer";

(function () {
  /* ---------- CTA links ---------- */
  document.querySelectorAll(".js-cta").forEach((a) => (a.href = CTA_URL));

  /* ---------- Countdown (resets every day at midnight, evergreen) ---------- */
  const elH = document.querySelector('[data-cd="h"]');
  const elM = document.querySelector('[data-cd="m"]');
  const elS = document.querySelector('[data-cd="s"]');
  const pad = (n) => String(n).padStart(2, "0");
  function tick() {
    const now = new Date();
    const end = new Date(now);
    end.setHours(24, 0, 0, 0);
    let diff = Math.max(0, Math.floor((end - now) / 1000));
    const h = Math.floor(diff / 3600);
    diff -= h * 3600;
    const m = Math.floor(diff / 60);
    const s = diff - m * 60;
    elH.textContent = pad(h);
    elM.textContent = pad(m);
    elS.textContent = pad(s);
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- UGC marquee: duplicate track for a seamless loop ---------- */
  const track = document.querySelector(".marquee__track");
  if (track) {
    track.innerHTML += track.innerHTML;
  }

  /* ---------- FAQ accordion (200ms slide, like the original) ---------- */
  document.querySelectorAll(".acc").forEach((item) => {
    const btn = item.querySelector(".acc__q");
    const panel = item.querySelector(".acc__a");
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

  /* ---------- "87% Sold" bar fills when it scrolls into view ---------- */
  const bar = document.querySelector(".progress");
  if (bar && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            bar.querySelector(".progress__fill").style.width = bar.dataset.progress + "%";
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(bar);
  } else if (bar) {
    bar.querySelector(".progress__fill").style.width = bar.dataset.progress + "%";
  }

  /* ---------- Sticky CTA slides up after the visitor starts scrolling ---------- */
  const sticky = document.getElementById("stickyCta");
  const onScroll = () => {
    sticky.classList.toggle("is-visible", window.scrollY > 500);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
