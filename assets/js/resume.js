const resumeVariants = {
  software: {
    title: "Software Engineer",
    file: "Faiz_Aalam_Software_Engineer_Resume.pdf",
    lead: "Software Engineer with 5+ years of experience",
    summary: "building complete products across mobile applications, backend integrations, cloud services, payments, admin portals, deployment, and production maintenance. Delivered 12+ products with 7+ public releases and increasing ownership across architecture, security, and product evolution.",
    skills: [
      ["Architecture & Product", "Clean Architecture, MVVM, SOLID, modular systems, feature ownership"],
      ["Mobile", "Flutter, Dart, BLoC, Cubit, Provider, GetX, Android, iOS"],
      ["Backend & Cloud", "Firebase, Supabase, Cloud Functions, Express.js, REST, WebSockets"],
      ["Delivery", "Testing, CI/CD, GitHub Actions, App Store, Play Store, production maintenance"]
    ],
    focus: [
      "Translate business requirements into maintainable product architecture and production-ready delivery plans.",
      "Own software from mobile interfaces through backend integrations, cloud workflows, releases, and maintenance.",
      "Improve engineering quality through clear boundaries, technical review, and mentoring junior developers."
    ]
  },
  mobile: {
    title: "Mobile Software Engineer",
    file: "Faiz_Aalam_Mobile_Software_Engineer_Resume.pdf",
    lead: "Mobile Software Engineer with 5+ years of experience",
    summary: "shipping production Flutter applications for logistics, fintech, health, fitness, AI, education, and social products. Strong in mobile architecture, platform integrations, payments, maps, real-time workflows, app-store delivery, and post-launch reliability.",
    skills: [
      ["Mobile Engineering", "Flutter, Dart, Android, iOS, reusable UI, platform integration"],
      ["Architecture & State", "Clean Architecture, MVVM, BLoC, Cubit, Provider, GetX"],
      ["Mobile Features", "Maps, geofencing, live tracking, FCM, APNs, OAuth, biometrics"],
      ["Release & Quality", "Unit, widget and integration testing, CI/CD, App Store, Play Store"]
    ],
    focus: [
      "Build maintainable cross-platform applications with predictable state and clear feature boundaries.",
      "Integrate payments, authentication, maps, notifications, AI, and real-time backend services.",
      "Own release preparation, store submissions, production support, and iterative mobile improvement."
    ]
  },
  flutter: {
    title: "Flutter Engineer",
    file: "Faiz_Aalam_Flutter_Engineer_Resume.pdf",
    lead: "Flutter Engineer with 5+ years of production experience",
    summary: "building cross-platform applications and complete product workflows with Dart, BLoC, Cubit, Provider, GetX, Firebase, Supabase, payments, maps, AI, and native platform services. Experienced from architecture through App Store and Google Play release.",
    skills: [
      ["Flutter & Dart", "Flutter, Dart, Android, iOS, reusable widgets, responsive interfaces"],
      ["State & Architecture", "BLoC, Cubit, Provider, GetX, Clean Architecture, MVVM, SOLID"],
      ["Integrations", "Firebase, Supabase, REST, WebSockets, Stripe, Maps, FCM, OAuth"],
      ["Flutter Delivery", "Testing, GitHub Actions, CI/CD, App Store, Google Play, maintenance"]
    ],
    focus: [
      "Create modular Flutter codebases that remain readable as products and teams grow.",
      "Build complex stateful workflows for payments, subscriptions, live tracking, AI, and multi-role products.",
      "Support the full Flutter lifecycle from implementation and testing through release and maintenance."
    ]
  },
  product: {
    title: "Product Engineer",
    file: "Faiz_Aalam_Product_Engineer_Resume.pdf",
    lead: "Product Engineer with 5+ years of end-to-end delivery experience",
    summary: "turning product requirements into reliable software across mobile applications, backend services, cloud functions, payments, operational portals, releases, and continuous improvement. Comfortable working directly with clients and owning difficult features through production.",
    skills: [
      ["Product Delivery", "Requirements, feature ownership, architecture, releases, maintenance"],
      ["Client Experience", "Flutter, mobile UX, authentication, payments, maps, notifications"],
      ["Product Infrastructure", "Firebase, Supabase, Cloud Functions, REST, WebSockets, admin portals"],
      ["Execution", "Testing, CI/CD, GitHub Actions, stakeholder communication, mentoring"]
    ],
    focus: [
      "Clarify business requirements, technical constraints, and user outcomes before choosing implementation details.",
      "Deliver small production-ready slices while protecting security, maintainability, and future product change.",
      "Stay accountable after launch through release ownership, maintenance, feedback, and product evolution."
    ]
  },
  fullstack: {
    title: "Full-Stack Flutter Engineer",
    file: "Faiz_Aalam_Full_Stack_Flutter_Engineer_Resume.pdf",
    lead: "Full-Stack Flutter Engineer with 5+ years of experience",
    summary: "building connected products across Flutter clients, backend APIs, Firebase, Supabase, Cloud Functions, Express.js, payments, portals, deployment, and production operations. Strongest where mobile and backend ownership must work as one system.",
    skills: [
      ["Client", "Flutter, Dart, BLoC, Cubit, Provider, GetX, Android, iOS"],
      ["Backend", "Firebase, Supabase, Express.js, Cloud Functions, REST, WebSockets"],
      ["Data & Services", "Firestore, PostgreSQL via Supabase, Stripe Connect, auth, maps, FCM"],
      ["Operations", "Security, testing, CI/CD, GitHub Actions, deployments, app-store releases"]
    ],
    focus: [
      "Design client and server responsibilities together so business rules remain consistent across product surfaces.",
      "Build secure API, payment, payout, notification, and real-time workflows behind Flutter experiences.",
      "Own deployments, releases, production maintenance, and the technical evolution of complete products."
    ]
  }
};

const params = new URLSearchParams(window.location.search);
const requestedTrack = params.get("track") || "software";
const track = resumeVariants[requestedTrack] ? requestedTrack : "software";
const variant = resumeVariants[track];

document.documentElement.dataset.track = track;
document.title = `Faiz Aalam | ${variant.title} - Resume`;
document.querySelector("#resume-title").textContent = variant.title;
document.querySelector("#summary-lead").textContent = variant.lead;
document.querySelector("#summary-text").textContent = variant.summary;

const skillRows = document.querySelectorAll("[data-skill-row]");
variant.skills.forEach(([label, value], index) => {
  const row = skillRows[index];
  row.querySelector("strong").textContent = `${label}:`;
  row.querySelector("span").textContent = value;
});

const focusItems = document.querySelectorAll("#focus-list li");
variant.focus.forEach((value, index) => {
  focusItems[index].textContent = value;
});

document.querySelector("#download-resume").href = variant.file;
document.querySelector("#download-resume").download = variant.file;

document.querySelectorAll("[data-track-link]").forEach((link) => {
  const active = link.dataset.trackLink === track;
  link.classList.toggle("is-active", active);
  if (active) link.setAttribute("aria-current", "page");
  else link.removeAttribute("aria-current");
});
