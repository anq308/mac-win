// Центр Mac — сайт: тема, параллакс бумажного пейзажа, появление блоков, пример исправления раскладки,
// вкладки настроек, сравнение Windows 10/11, обои по времени суток

(() => {
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- тема: как в системе; кнопка — переключить и запомнить ----------
  const root = document.documentElement;
  try { const t = localStorage.getItem("theme"); if (t) root.dataset.theme = t; } catch {}
  document.getElementById("theme")?.addEventListener("click", () => {
    const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch {}
  });

  // ---------- версия (assets/version.js пишет update-site.ps1) ----------
  const v = window.MAC_VERSION;
  if (v) {
    const meta = document.getElementById("version");
    if (meta) meta.textContent = `Один файл, ${v.exe} · версия от ${v.date} · Windows 10 (1809+) и 11`;
    const foot = document.getElementById("footver");
    if (foot) foot.textContent = `· ${v.date}`;
  }

  // ---------- шапка: прозрачная над пейзажем, плотная ниже ----------
  const nav = document.getElementById("nav");
  const hero = document.querySelector(".hero");

  // ---------- параллакс: слои бумаги едут с разной скоростью при прокрутке и за мышью ----------
  const layers = [...document.querySelectorAll("#paper .layer")].map(el => ({ el, d: parseFloat(el.dataset.depth) || 0 }));
  let mx = 0, my = 0, cx = 0, cy = 0, sy = scrollY;
  const frame = () => {
    cx += (mx - cx) * 0.06;
    cy += (my - cy) * 0.06;
    const limit = hero ? hero.offsetHeight : innerHeight;
    if (sy < limit + 100) {
      for (const { el, d } of layers) {
        el.style.transform = `translate3d(${(-cx * d * 60).toFixed(1)}px, ${(sy * d * 0.9 - cy * d * 20).toFixed(1)}px, 0)`;
      }
    }
    if (!calm) requestAnimationFrame(frame);
  };
  addEventListener("scroll", () => {
    sy = scrollY;
    nav?.classList.toggle("solid", scrollY > (hero ? hero.offsetHeight - 80 : 40));
  }, { passive: true });
  if (!calm) {
    addEventListener("pointermove", e => {
      mx = e.clientX / innerWidth - 0.5;
      my = e.clientY / innerHeight - 0.5;
    }, { passive: true });
    requestAnimationFrame(frame);
  }
  nav?.classList.toggle("solid", scrollY > (hero ? hero.offsetHeight - 80 : 40));

  // ---------- блоки появляются при прокрутке ----------
  const mark = (sel, step = 0) => document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add("reveal");
    if (step) el.style.setProperty("--d", (i % 6) * step + "s");
  });
  mark(".head");
  mark(".bento .card", 0.06);
  mark(".split-text, .compare, .desk, .frame, .scene, .segmented");
  mark(".keys div", 0.04);
  mark(".how > div", 0.1);
  if (calm || !("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -6% 0px", threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
  }

  // ---------- пример: печатаем «ghbdtn», нажимается Pause — получается «привет» ----------
  const typed = document.getElementById("typed");
  const key = document.getElementById("pausekey");
  if (typed && key && !calm) {
    const wait = ms => new Promise(r => setTimeout(r, ms));
    const type = async (word, speed) => {
      for (let i = 1; i <= word.length; i++) { typed.textContent = word.slice(0, i); await wait(speed + Math.random() * 60); }
    };
    (async () => {
      for (;;) {
        typed.textContent = "";
        await wait(700);
        await type("ghbdtn", 120);
        await wait(900);
        key.classList.add("down");
        await wait(160);
        key.classList.remove("down");
        typed.textContent = "";
        await type("привет", 28);
        await wait(2600);
      }
    })();
  } else if (typed) {
    typed.textContent = "привет";
  }

  // ---------- рамка iPhone: страница в ширину телефона, уменьшенная под рамку ----------
  const fitPhone = () => document.querySelectorAll(".phone").forEach(p => {
    const k = (p.clientWidth - 20) / 390;
    p.style.setProperty("--k", k.toFixed(3));
    const f = p.querySelector("iframe");
    if (f) f.style.height = Math.round((p.clientHeight - 20) / k) + "px";
  });
  addEventListener("resize", fitPhone);
  fitPhone();

  // ---------- вкладки настроек центра ----------
  const shot = document.getElementById("tabshot");
  const cap = document.getElementById("tabcap");
  const tabs = [...document.querySelectorAll(".segmented button")];
  tabs.forEach(b => {
    new Image().src = "assets/img/" + b.dataset.shot;
    b.addEventListener("click", () => {
      tabs.forEach(t => t.setAttribute("aria-selected", t === b));
      shot.style.opacity = 0;
      setTimeout(() => {
        shot.src = "assets/img/" + b.dataset.shot;
        shot.alt = b.dataset.cap;
        cap.textContent = b.dataset.cap;
        shot.style.opacity = 1;
      }, 160);
    });
  });

  // ---------- сравнение Windows 10 и 11 ----------
  const cmp = document.getElementById("compare");
  if (cmp) {
    const range = cmp.querySelector("input");
    const set = () => cmp.style.setProperty("--pos", range.value + "%");
    range.addEventListener("input", set);
    set();
  }

  // ---------- обои по времени суток ----------
  const scene = document.getElementById("scene");
  const time = document.getElementById("time");
  const clock = document.getElementById("clock");
  if (scene && time) {
    const imgs = [...scene.querySelectorAll("img")];
    // минуты суток → кадр (0 утро, 1 день, 2 вечер, 3 ночь)
    const keys = [[0, 3], [300, 3], [480, 0], [660, 1], [960, 1], [1050, 2], [1200, 3], [1440, 3]];
    const show = m => {
      let a = keys[0], b = keys[keys.length - 1];
      for (let i = 0; i < keys.length - 1; i++) {
        if (m >= keys[i][0] && m <= keys[i + 1][0]) { a = keys[i]; b = keys[i + 1]; break; }
      }
      const k = b[0] === a[0] ? 0 : (m - a[0]) / (b[0] - a[0]);
      imgs.forEach((img, i) => {
        let o = 0;
        if (i === a[1]) o += 1 - k;
        if (i === b[1]) o += k;
        img.style.opacity = Math.min(1, o);
      });
      clock.textContent = String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
    };
    time.addEventListener("input", () => show(+time.value));
    const now = new Date();
    time.value = now.getHours() * 60 + now.getMinutes();
    show(+time.value);
  }
})();
