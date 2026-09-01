const header = document.querySelector("#site-header");
const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");
const themeToggle = document.querySelector("#theme-toggle");
const preloader = document.querySelector(".preloader");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

window.addEventListener("load", () => {
  const hideLoader = () => {
    if (!preloader) return;
    preloader.classList.add("is-hidden");
    document.body.classList.add("site-ready");
  };

  if (reduceMotion.matches) {
    hideLoader();
    return;
  }

  window.setTimeout(hideLoader, 900);
});

const initCtaPointerFollow = () => {
  const buttons = document.querySelectorAll(".hero-cta, .header-cta");
  if (!buttons.length || reduceMotion.matches) return;

  buttons.forEach((button) => {
    const setPointerState = (event) => {
      const rect = button.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      button.style.setProperty("--pointer-x", `${x}%`);
      button.style.setProperty("--pointer-y", `${y}%`);
      button.style.setProperty("--offset-x", `${(nx * 7).toFixed(2)}px`);
      button.style.setProperty("--offset-y", `${(ny * 5).toFixed(2)}px`);
      button.style.setProperty("--tilt-y", `${(nx * -10).toFixed(2)}deg`);
      button.style.setProperty("--tilt-x", `${(ny * 8).toFixed(2)}deg`);
      button.style.setProperty("--scale-x", `${(1 - Math.abs(nx) * 0.08).toFixed(3)}`);
      button.style.setProperty("--scale-y", `${(1 - Math.abs(ny) * 0.05).toFixed(3)}`);
    };

    button.addEventListener("pointermove", setPointerState);
    button.addEventListener("pointerenter", setPointerState);
    button.addEventListener("pointerleave", () => {
      button.style.setProperty("--pointer-x", "50%");
      button.style.setProperty("--pointer-y", "50%");
      button.style.setProperty("--offset-x", "0px");
      button.style.setProperty("--offset-y", "0px");
      button.style.setProperty("--tilt-x", "0deg");
      button.style.setProperty("--tilt-y", "0deg");
      button.style.setProperty("--scale-x", "1");
      button.style.setProperty("--scale-y", "1");
    });
  });
};

const initSoftAurora = () => {
  const heroField = document.querySelector(".hero-field");
  if (!heroField || reduceMotion.matches) return;

  const speed = 0.00045;
  const phaseOffset = Math.PI * 0.85;
  const mouseInfluence = 0.12;
  const state = {
    x1: 0,
    y1: 0,
    scale1: 1,
    x2: 0,
    y2: 0,
    scale2: 1,
  };
  let startTime = 0;
  let pointerX = 0;
  let pointerY = 0;
  let hasPointer = false;

  window.addEventListener(
    "pointermove",
    (event) => {
      const bounds = heroField.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      pointerX = ((event.clientX - centerX) / bounds.width) * 60;
      pointerY = ((event.clientY - centerY) / bounds.height) * 36;
      hasPointer = true;
    },
    { passive: true }
  );

  const animate = (timestamp) => {
    if (!startTime) startTime = timestamp;

    const elapsed = timestamp - startTime;
    const driftA = elapsed * speed;
    const driftB = driftA * 1.08 + phaseOffset;

    const mx = hasPointer ? pointerX * mouseInfluence : 0;
    const my = hasPointer ? pointerY * mouseInfluence : 0;

    const next = {
      x1: Math.sin(driftA) * 26 + mx,
      y1: Math.cos(driftA * 0.35) * 18 + my,
      scale1: 1.08 + Math.sin(driftA * 0.9) * 0.08,
      x2: Math.sin(driftB) * 30 + mx * 0.8,
      y2: Math.cos(driftB * 0.4) * 20 + my * 0.8,
      scale2: 1.04 + Math.cos(driftB * 0.8) * 0.08,
    };

    const keys = [
      ["--aurora-x-1", next.x1, state.x1],
      ["--aurora-y-1", next.y1, state.y1],
      ["--aurora-scale-1", next.scale1, state.scale1],
      ["--aurora-x-2", next.x2, state.x2],
      ["--aurora-y-2", next.y2, state.y2],
      ["--aurora-scale-2", next.scale2, state.scale2],
    ];

    for (let i = 0; i < keys.length; i += 1) {
      const [key, value, current] = keys[i];
      if (Math.abs(value - current) > 0.001) {
        document.documentElement.style.setProperty(
          key,
          key.includes("scale") ? value.toFixed(4) : `${value}px`
        );
        state[key.replace("--aurora-", "").replace("-1", "1").replace("-2", "2")] = value;
      }
    }

    window.requestAnimationFrame(animate);
  };

  window.requestAnimationFrame(animate);
};

const setTheme = (theme) => {
  const next = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch (e) {
    /* private mode */
  }
  themeToggle?.setAttribute(
    "aria-label",
    next === "dark" ? "Switch to light mode" : "Switch to dark mode"
  );
};

setTheme(document.documentElement.dataset.theme);
initCtaPointerFollow();
initSoftAurora();

const initTypewriter = () => {
  const target = document.querySelector(".typewriter-text");
  if (!target) return;

  const roles = (target.dataset.roles || "").split(",").map((role) => role.trim());
  const typeDelay = 150;
  const eraseDelay = 100;
  const pauseDuration = 1200;

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const currentRole = roles[roleIndex] || "";

    if (!deleting && charIndex <= currentRole.length) {
      target.textContent = currentRole.slice(0, charIndex);
      charIndex += 1;

      if (charIndex > currentRole.length) {
        deleting = true;
        window.setTimeout(tick, pauseDuration);
        return;
      }

      window.setTimeout(tick, typeDelay);
      return;
    }

    if (deleting) {
      target.textContent = currentRole.slice(0, charIndex);
      charIndex -= 1;

      if (charIndex < 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        charIndex = 0;
        window.setTimeout(tick, 250);
        return;
      }

      window.setTimeout(tick, eraseDelay);
    }
  };

  if (roles.length) {
    window.setTimeout(tick, 350);
  }
};

initTypewriter();

themeToggle?.addEventListener("click", () => {
  const current = document.documentElement.dataset.theme;
  setTheme(current === "dark" ? "light" : "dark");
});

let lastScrollY = window.scrollY;
let isHeaderHidden = false;

const onScroll = () => {
  const currentScrollY = window.scrollY;
  const isScrollingDown = currentScrollY > lastScrollY;

  header?.classList.toggle("is-scrolled", currentScrollY > 12);

  if (currentScrollY <= 16) {
    header?.classList.remove("is-hidden");
    isHeaderHidden = false;
  } else if (isScrollingDown) {
    if (currentScrollY > 80) {
      header?.classList.add("is-hidden");
      isHeaderHidden = true;
    }
  } else if (isHeaderHidden || currentScrollY < lastScrollY) {
    header?.classList.remove("is-hidden");
    isHeaderHidden = false;
  }

  lastScrollY = currentScrollY;
};

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    nav?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");

    const offset = (header?.offsetHeight || 0) + 18;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top,
      behavior: reduceMotion.matches ? "auto" : "smooth",
    });

    if (history.pushState) {
      history.pushState(null, "", href);
    }
  });
});

const revealSections = () => {
  const sections = document.querySelectorAll("main .block");
  if (!sections.length) return;

  if (reduceMotion.matches) {
    sections.forEach((section) => section.classList.add("is-inview"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-inview");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
};

revealSections();

const initMouseTrail = () => {
  const canvas = document.querySelector("#mouse-trail");
  if (!canvas || reduceMotion.matches) return;
  if (!window.matchMedia("(pointer: fine)").matches) {
    canvas.remove();
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const points = [];
  const maxPoints = 18;
  let mouseX = 0;
  let mouseY = 0;
  let hasMoved = false;
  let raf = 0;

  const size = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const accent = () => {
    const theme = document.documentElement.dataset.theme || "light";
    if (theme === "dark") {
      return "#f1b077";
    }

    return getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "oklch(48% 0.145 148)";
  };

  const draw = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    if (!hasMoved) {
      raf = requestAnimationFrame(draw);
      return;
    }

    points.push({ x: mouseX, y: mouseY });
    if (points.length > maxPoints) points.shift();

    const color = accent();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    for (let i = 1; i < points.length; i += 1) {
      const prev = points[i - 1];
      const point = points[i];
      const t = i / points.length;
      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(point.x, point.y);
      ctx.strokeStyle = color;
      ctx.globalAlpha = t * 0.55;
      ctx.lineWidth = 1.2 + t * 7;
      ctx.stroke();
    }

    const tip = points[points.length - 1];
    if (tip) {
      ctx.beginPath();
      ctx.arc(tip.x, tip.y, 3.4, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.85;
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(draw);
  };

  window.addEventListener("resize", size);
  window.addEventListener(
    "pointermove",
    (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      hasMoved = true;
    },
    { passive: true }
  );
  window.addEventListener(
    "pointerleave",
    () => {
      points.length = 0;
      hasMoved = false;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    },
    { passive: true }
  );

  size();
  raf = requestAnimationFrame(draw);

  reduceMotion.addEventListener("change", (event) => {
    if (!event.matches) return;
    cancelAnimationFrame(raf);
    canvas.remove();
  });
};

initMouseTrail();
