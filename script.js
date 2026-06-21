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
