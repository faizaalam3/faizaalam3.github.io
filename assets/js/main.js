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
  ".section, .case-card, .expertise-card, .tech-card, .trust-card, .hero-card, .hero-mini, .proof-item"
);

revealItems.forEach((item, index) => {
  item.classList.add("reveal");
  item.style.transitionDelay = `${Math.min(index * 60, 240)}ms`;
  observer.observe(item);
});

const caseGrid = document.querySelector("[data-cases]");
const caseToggle = document.querySelector("[data-case-toggle]");

if (caseGrid && caseToggle) {
  const caseCards = Array.from(caseGrid.querySelectorAll(".case-card"));
  const initialVisible = 3;

  const updateCases = (expanded) => {
    caseCards.forEach((card, index) => {
      if (expanded || index < initialVisible) {
        card.classList.remove("is-hidden");
      } else {
        card.classList.add("is-hidden");
      }
    });
    caseToggle.textContent = expanded ? "Show Less" : "View More Projects";
  };

  let expanded = false;
  updateCases(expanded);

  caseToggle.addEventListener("click", () => {
    expanded = !expanded;
    updateCases(expanded);
  });
}
