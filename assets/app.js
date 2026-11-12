// Центр Mac — сайт: тема, вкладки скриншотов, сравнение Windows 10/11, обои по времени суток

(() => {
  // ---------- тема: как в системе, кнопка — переключить и запомнить ----------
  const root = document.documentElement;
  const saved = (() => { try { return localStorage.getItem("theme"); } catch { return null; } })();
  if (saved) root.dataset.theme = saved;
  document.getElementById("theme")?.addEventListener("click", () => {
    const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch {}
  });

  // ---------- версия и размер файла (assets/version.js пишет update-site.ps1) ----------
  const v = window.MAC_VERSION;
  if (v) {
    const meta = document.getElementById("version");
    if (meta) meta.textContent = `Версия от ${v.date} · ${v.exe} · один файл, внутри всё`;
    const foot = document.getElementById("footver");
    if (foot) foot.textContent = `версия от ${v.date}`;
  }

  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- фон первого экрана начинается с нынешнего времени суток ----------
  const bg = [...document.querySelectorAll(".hero-bg img")];
  if (bg.length === 4) {
    const h = new Date().getHours();
    const start = h >= 21 || h < 5 ? 3 : h < 10 ? 0 : h < 17 ? 1 : 2;
    bg.forEach((img, i) => {
      const d = ((i - start + 4) % 4) * 8 - 1.9;
      img.style.animationDelay = `${d}s, ${d}s`;
    });
  }

  // ---------- появление блоков при прокрутке ----------
  const mark = (sel, cls = "", step = 0) => document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add("reveal");
    if (cls) el.classList.add(cls);
    if (step) el.style.setProperty("--d", (i % 8) * step + "s");
  });
  mark(".section h2");
  mark(".section .sub");
  mark(".app .app-text", "from-left");
  mark(".app.flip .app-text", "from-right");
  mark(".app .app-shots", "zoom");
  mark(".ticks li", "", 0.07);
  mark(".strip-in div", "", 0.1);
  mark(".tabs, .window.big, .compare, .scene, .snap");
  mark(".keys div", "", 0.05);
  mark(".steps li", "", 0.12);
  mark(".req div, details", "", 0.06);
  const show = el => el.classList.add("in");
  if (calm || !("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach(show);
  } else {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
  }

  // ---------- окно на первом экране выпрямляется при прокрутке ----------
  const stage = document.getElementById("stage");
  if (stage && !calm) {
    let ticking = false;
    const upd = () => {
      ticking = false;
      const r = stage.getBoundingClientRect();
      const k = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight * 0.9) - 0.15));
      stage.style.setProperty("--k", k.toFixed(3));
    };
    addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
  } else if (stage) {
    stage.style.setProperty("--k", 1);
  }

  // ---------- скриншоты чуть наклоняются за курсором ----------
  if (!calm && matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".app-shots, .window.big, .compare").forEach(el => {
      el.classList.add("tilt");
      el.addEventListener("mousemove", e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(1200px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  // ---------- вкладки скриншотов центра ----------
  const shot = document.getElementById("tabshot");
  const cap = document.getElementById("tabcap");
  const tabs = [...document.querySelectorAll(".tabs button")];
  tabs.forEach(b => {
    // заранее грузим картинки, чтобы переключение было мгновенным
    new Image().src = "assets/img/" + b.dataset.shot;
    b.addEventListener("click", () => {
      tabs.forEach(t => t.setAttribute("aria-selected", t === b));
      shot.style.opacity = 0;
      setTimeout(() => {
        shot.src = "assets/img/" + b.dataset.shot;
        shot.alt = b.dataset.cap;
        cap.textContent = b.dataset.cap;
        shot.style.opacity = 1;
      }, 150);
    });
  });

  // ---------- рамка iPhone: страницу масштабируем под ширину рамки ----------
  const fitPhone = () => document.querySelectorAll(".phone").forEach(p => {
    const k = (p.clientWidth - 20) / 390;
    p.style.setProperty("--k", k.toFixed(3));
    const f = p.querySelector("iframe");
    if (f) f.style.height = Math.round((p.clientHeight - 20) / k) + "px";
  });
  addEventListener("resize", fitPhone);
  fitPhone();

  // ---------- сравнение оформления ----------
  const cmp = document.getElementById("compare");
  if (cmp) {
    const range = cmp.querySelector("input");
    const set = () => cmp.style.setProperty("--pos", range.value + "%");
    range.addEventListener("input", set);
    set();
  }

  // ---------- обои по времени суток ----------
  // ключевые кадры: минуты суток → какой кадр виден (0 утро, 1 день, 2 вечер, 3 ночь)
  const scene = document.getElementById("scene");
  const time = document.getElementById("time");
  const clock = document.getElementById("clock");
  if (scene && time) {
    const imgs = [...scene.querySelectorAll("img")];
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
    // начинаем с текущего времени
    const now = new Date();
    time.value = now.getHours() * 60 + now.getMinutes();
    show(+time.value);
  }
})();
