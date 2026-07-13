const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Reveal content only when JavaScript is available. */
const revealItems = document.querySelectorAll(".reveal");

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible", "reveal-now"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -36px 0px" }
  );

  revealItems.forEach((item) => {
    if (item.getBoundingClientRect().top < window.innerHeight * 0.96) {
      item.classList.add("is-visible", "reveal-now");
      return;
    }

    revealObserver.observe(item);
  });
}

/* Animate only the numeric evidence in the hero. */
const counters = document.querySelectorAll("[data-count]");

function runCounter(counter) {
  const target = Number(counter.dataset.count);
  const suffix = counter.dataset.suffix || "";

  if (!Number.isFinite(target)) return;
  if (prefersReducedMotion) {
    counter.textContent = `${target}${suffix}`;
    return;
  }

  const start = performance.now();
  const duration = 800;

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counter.textContent = `${Math.round(target * eased)}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

if ("IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        counterObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.7 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
} else {
  counters.forEach(runCounter);
}

/* Mobile navigation */
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

function closeNavigation({ restoreFocus = false } = {}) {
  if (!navToggle || !navLinks) return;
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open menu");
  navLinks.classList.remove("is-open");
  document.body.classList.remove("nav-open");
  if (restoreFocus) navToggle.focus();
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    navLinks.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("nav-open", !isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeNavigation());
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navLinks.classList.contains("is-open")) {
      closeNavigation({ restoreFocus: true });
    }
  });

  window.matchMedia("(min-width: 901px)").addEventListener("change", (event) => {
    if (event.matches) closeNavigation();
  });
}

/* Active navigation state */
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window && sections.length && navAnchors.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navAnchors.forEach((anchor) => {
          const active = anchor.getAttribute("href") === `#${id}`;
          anchor.classList.toggle("is-active", active);
          if (active) anchor.setAttribute("aria-current", "location");
          else anchor.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-38% 0px -56% 0px" }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

/* Header elevation */
const header = document.querySelector(".site-header");

if (header) {
  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

/* Reliable back-to-top behavior with the anchor kept as a no-JS fallback. */
const backToTop = document.querySelector("[data-back-to-top]");

if (backToTop) {
  backToTop.addEventListener("click", (event) => {
    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    window.history.replaceState(null, "", "#top");
  });
}
