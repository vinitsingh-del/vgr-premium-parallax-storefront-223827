const images = [
  ["assets/hero-1-BiMT0yIW.png", "Hero"],
  ["assets/hero-2-HwV2gwU-.png", "Blade"],
  ["assets/hero-3-DAnsO63z.png", "Grip"],
  ["assets/hero-4-CDCAReHX.png", "Profile"],
  ["assets/hero-5-DNWlwpQp.png", "Kit"],
  ["assets/hero-6-BXip686C.png", "Display"],
  ["assets/hero-7-ChczlvrI.png", "Guards"],
  ["assets/hero-8-CaE0tCyv.png", "Charge"],
  ["assets/hero-9-CTiJ3cka.png", "Box"],
  ["assets/hero-10-D6hOmdWa.png", "Details"]
];

const hero = document.querySelector("#hero-image");
const frame = document.querySelector(".gallery-frame");
const thumbs = document.querySelector(".thumbs");
const progress = document.querySelector(".progress");
const counter = document.querySelector("#gallery-count");
const viewName = document.querySelector("#view-name");
let active = 0;

if (hero && frame && thumbs && progress && counter && viewName) {
images.forEach(([src], index) => {
  const thumb = document.createElement("button");
  thumb.type = "button";
  thumb.setAttribute("aria-label", `View image ${index + 1}`);
  thumb.innerHTML = `<img src="${src}" alt=""><span>${String(index + 1).padStart(2, "0")}</span>`;
  thumb.addEventListener("click", () => setActive(index));
  thumbs.appendChild(thumb);

  const bar = document.createElement("span");
  progress.appendChild(bar);
});

function setActive(index) {
  active = index;
  frame.classList.add("is-changing");
  window.setTimeout(() => {
    hero.src = images[index][0];
    hero.alt = `VL-786 ${images[index][1].toLowerCase()} view`;
    viewName.textContent = images[index][1];
    counter.textContent = `${String(index + 1).padStart(2, "0")} / 10`;
    document.querySelectorAll(".thumbs button").forEach((button, buttonIndex) => {
      button.classList.toggle("active", buttonIndex === index);
    });
    document.querySelectorAll(".progress span").forEach((bar, barIndex) => {
      bar.classList.toggle("active", barIndex === index);
    });
    frame.classList.remove("is-changing");
  }, 120);
}

document.querySelector(".gallery-frame").addEventListener("click", () => {
  setActive((active + 1) % images.length);
});

setActive(0);
}

const parallaxItems = [...document.querySelectorAll("[data-parallax], .parallax-float")];
if (parallaxItems.length) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const updateParallax = () => {
    if (reducedMotion) return;
    const mid = window.innerHeight * 0.5;
    parallaxItems.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const speed = Number(item.dataset.parallax || (item.classList.contains("layer-fast") ? 0.18 : 0.09));
      const y = (rect.top + rect.height * 0.5 - mid) * speed * -1;
      item.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      item.style.setProperty("--parallax-index", index);
    });
  };
  updateParallax();
  window.addEventListener("scroll", () => requestAnimationFrame(updateParallax), { passive: true });
  window.addEventListener("resize", updateParallax);
}

const heroRotator = document.querySelector(".hero-rotator");
const heroRotatorBadge = document.querySelector(".hero-rotator-badge");
const heroRotatorName = document.querySelector(".hero-rotator-name");
const heroSlides = [
  ["assets/official-01.jpg", "Mr. SUPER POWER Kit", "Save 34%"],
  ["assets/hero-1-BiMT0yIW.png", "VL-786 Pro Clipper", "Save 54%"],
  ["assets/official-02.webp", "Rosso Trimmer", "Save 36%"],
  ["assets/official-04.jpg", "V-401 Hair Dryer", "Pro Dryer"],
  ["assets/official-11.webp", "V-353 Shaver", "Fast Ship"]
];

if (heroRotator) {
  let heroSlideIndex = 0;
  const setHeroSlide = (index) => {
    heroSlideIndex = index % heroSlides.length;
    const [src, name, badge] = heroSlides[heroSlideIndex];
    heroRotator.closest(".store-hero-media")?.classList.add("is-swapping");
    window.setTimeout(() => {
      heroRotator.src = src;
      heroRotator.alt = name;
      if (heroRotatorBadge) heroRotatorBadge.textContent = badge;
      if (heroRotatorName) heroRotatorName.textContent = name;
      heroRotator.closest(".store-hero-media")?.classList.remove("is-swapping");
    }, 180);
  };
  window.setInterval(() => setHeroSlide(heroSlideIndex + 1), 2400);
}

const sequenceCards = [...document.querySelectorAll("[data-sequence-card]")];
if (sequenceCards.length) {
  const updateSequenceCards = () => {
    const stage = document.querySelector(".kinetic-stage");
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
    sequenceCards.forEach((card, index) => {
      const local = Math.min(1, Math.max(0, (progress - index * 0.16) / 0.42));
      const y = (1 - local) * 96;
      const x = (index - 1) * 18 * (1 - local);
      const scale = 0.92 + local * 0.08;
      card.style.opacity = String(0.18 + local * 0.82);
      card.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
    });
  };
  updateSequenceCards();
  window.addEventListener("scroll", () => requestAnimationFrame(updateSequenceCards), { passive: true });
  window.addEventListener("resize", updateSequenceCards);
}

const croPhrases = [
  "COD",
  "Ships 24h",
  "2-Yr Warranty",
  "Best Seller",
  "Low Stock",
  "Easy Replace"
];

document.querySelectorAll(".product-tile").forEach((tile, index) => {
  if (tile.querySelector(".cro-badges")) return;
  const wrap = document.createElement("div");
  wrap.className = "cro-badges";
  wrap.innerHTML = `<em>${croPhrases[index % croPhrases.length]}</em><em>${croPhrases[(index + 2) % croPhrases.length]}</em>`;
  tile.appendChild(wrap);
});
