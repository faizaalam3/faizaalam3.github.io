const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

const revealItems = document.querySelectorAll(
  ".section, .case-card, .expertise-card, .tech-card, .trust-card, .stat-card, .about-card"
);

revealItems.forEach((item, index) => {
  item.classList.add("reveal");
  item.style.transitionDelay = `${Math.min(index * 60, 240)}ms`;
  observer.observe(item);
});
