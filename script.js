const preloader = document.querySelector("[data-preloader]");
if (preloader) {
  preloader.innerHTML = `
    <section class="preloader-card" aria-label="VGR loading highlights">
      <div class="preloader-brand">
        <img src="assets/logo-vgr-DqorsC6P.png" alt="VGR">
        <span></span>
      </div>
      <div class="preloader-products" aria-hidden="true">
        <img src="assets/hero-1-BiMT0yIW.png" alt="">
        <img src="assets/v439-gallery-01.webp" alt="">
        <img src="assets/v219-pet-gallery-01.webp" alt="">
      </div>
      <div class="preloader-copy">
        <small>Loading VGR Store</small>
        <h2>Performance grooming, ready to ship.</h2>
        <ul>
          <li>Free Express Shipping ₹999+</li>
          <li>1+1 Year Warranty</li>
          <li>COD · Secure Checkout · Fast Dispatch</li>
        </ul>
      </div>
      <div class="preloader-progress" aria-hidden="true"><span></span></div>
    </section>
  `;
  const hidePreloader = () => {
    preloader.classList.add("is-hidden");
    window.setTimeout(() => preloader.remove(), 700);
  };
  const startedAt = Date.now();
  window.addEventListener("load", () => {
    window.setTimeout(hidePreloader, Math.max(0, 1400 - (Date.now() - startedAt)));
  }, { once: true });
  window.setTimeout(hidePreloader, 3200);
}

let images = [
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

const galleryData = document.querySelector("[data-gallery-images]");
if (galleryData) {
  try {
    const pageImages = JSON.parse(galleryData.textContent);
    if (Array.isArray(pageImages) && pageImages.length) images = pageImages;
  } catch (error) {
    console.warn("Unable to load page gallery images", error);
  }
}

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
  frame.classList.remove("is-zooming");
  window.setTimeout(() => {
    hero.src = images[index][0];
    hero.alt = `VL-786 ${images[index][1].toLowerCase()} view`;
    viewName.textContent = images[index][1];
    counter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;
    document.querySelectorAll(".thumbs button").forEach((button, buttonIndex) => {
      button.classList.toggle("active", buttonIndex === index);
    });
    document.querySelectorAll(".progress span").forEach((bar, barIndex) => {
      bar.classList.toggle("active", barIndex === index);
    });
    frame.classList.remove("is-changing");
    void hero.offsetWidth;
    frame.classList.add("is-zooming");
  }, 120);
}

document.querySelector(".gallery-frame").addEventListener("click", () => {
  setActive((active + 1) % images.length);
});

hero.addEventListener("animationend", (event) => {
  if (event.animationName === "pdpGalleryZoomIn") {
    frame.classList.remove("is-zooming");
  }
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

const heroCopy = document.querySelector(".store-hero-copy");
const heroKicker = document.querySelector("[data-hero-kicker]");
const heroTitle = document.querySelector("[data-hero-title]");
const heroText = document.querySelector("[data-hero-copy]");
const heroPrimary = document.querySelector("[data-hero-primary]");
const heroSecondary = document.querySelector("[data-hero-secondary]");
const heroMessages = [
  {
    kicker: "VGR",
    title: "Mr. SUPER POWER",
    copy: "Stepless Pro 4-in-1 Barber Series Combo Kit for Salon, Red",
    primary: ["Buy Now", "product.html"],
    secondary: ["Our Products", "collection.html"]
  },
  {
    kicker: "Hair Trimmer",
    title: "Rosso Trimmer",
    copy: "Professional Beard & Moustache Trimmer for Men. Save 36%.",
    primary: ["Shop Trimmers", "collection.html#trimmers"],
    secondary: ["View Shavers", "collection.html#shavers"]
  },
  {
    kicker: "Hair Clipper",
    title: "VL-786 Pro",
    copy: "Pro hair clipper with COD, 1+1 Year Warranty, and fast dispatch.",
    primary: ["View Product", "product.html"],
    secondary: ["Shop Clippers", "collection.html#clippers"]
  },
  {
    kicker: "Hair Dryer",
    title: "Hair Dryers",
    copy: "VGR high-speed hair dryers with professional motor performance.",
    primary: ["Shop Dryers", "collection.html#dryers"],
    secondary: ["Women’s Tools", "collection.html#women"]
  },
  {
    kicker: "Shaver",
    title: "Foil Shavers",
    copy: "Precision beard and bald-head shaving tools from the VGR catalog.",
    primary: ["Shop Shavers", "collection.html#shavers"],
    secondary: ["Limited Edition", "collection.html#limited"]
  },
  {
    kicker: "Fabric Care",
    title: "Lint Removers",
    copy: "Rechargeable lint removers and rollers for daily fabric care.",
    primary: ["Shop Fabric Care", "collection.html#fabric"],
    secondary: ["Pet Grooming", "collection.html#pet"]
  }
];

if (heroCopy && heroKicker && heroTitle && heroText && heroPrimary && heroSecondary) {
  let heroMessageIndex = 0;
  const setHeroMessage = (index) => {
    heroMessageIndex = index % heroMessages.length;
    const message = heroMessages[heroMessageIndex];
    heroCopy.classList.add("is-changing");
    window.setTimeout(() => {
      heroKicker.textContent = message.kicker;
      heroTitle.textContent = message.title;
      heroText.textContent = message.copy;
      heroPrimary.textContent = message.primary[0];
      heroPrimary.href = message.primary[1];
      heroSecondary.textContent = message.secondary[0];
      heroSecondary.href = message.secondary[1];
      heroCopy.classList.remove("is-changing");
    }, 220);
  };
  window.setInterval(() => setHeroMessage(heroMessageIndex + 1), 3200);
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
      const isInlineCard = card.classList.contains("ai-product-card");
      const y = (1 - local) * (isInlineCard ? 46 : 96);
      const x = isInlineCard ? 0 : (index - 1) * 18 * (1 - local);
      const scale = 0.92 + local * 0.08;
      card.style.opacity = String((isInlineCard ? 0.42 : 0.18) + local * (isInlineCard ? 0.58 : 0.82));
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

const shareProductButton = document.querySelector("[data-share-product]");
const productShareData = {
  title: "VGR VL-786 Pro Hair Clipper",
  text: "VGR VL-786 Pro Hair Clipper with titanium-coated blades, 200 minute runtime, and fast charging.",
  url: window.location.href
};
if (shareProductButton) {
  shareProductButton.addEventListener("click", async () => {
    if (navigator.share) {
      await navigator.share(productShareData).catch(() => {});
      return;
    }
    await navigator.clipboard?.writeText(productShareData.url).catch(() => {});
    shareProductButton.textContent = "Link Copied";
    window.setTimeout(() => {
      shareProductButton.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><path d="M8.7 10.7 15.3 6.3M8.7 13.3l6.6 4.4"></path></svg>Share`;
    }, 1600);
  });
}

const inlineShareButton = document.querySelector("[data-inline-share]");
if (inlineShareButton) {
  inlineShareButton.addEventListener("click", async () => {
    if (navigator.share) {
      await navigator.share(productShareData).catch(() => {});
      return;
    }
    await navigator.clipboard?.writeText(productShareData.url).catch(() => {});
    inlineShareButton.classList.add("is-copied");
    window.setTimeout(() => inlineShareButton.classList.remove("is-copied"), 1100);
  });
}

const copyLinkButton = document.querySelector("[data-copy-link]");
if (copyLinkButton) {
  copyLinkButton.addEventListener("click", async () => {
    await navigator.clipboard?.writeText(window.location.href).catch(() => {});
    const label = copyLinkButton.querySelector("span");
    if (label) label.textContent = "Copied";
    window.setTimeout(() => {
      if (label) label.textContent = "Copy";
    }, 1400);
  });
}

const pdpStickyBar = document.querySelector(".pdp-buy-bar");
if (pdpStickyBar) {
  const footerSections = Array.from(document.querySelectorAll(".pdp-v2 .payment-section, .pdp-v2 footer"));
  const updateStickyBuyBar = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    document.body.classList.toggle("pdp-sticky-ready", scrollTop > 24);
    const footerVisible = footerSections.some((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    });
    document.body.classList.toggle("pdp-footer-visible", footerVisible);
  };
  updateStickyBuyBar();
  window.addEventListener("scroll", updateStickyBuyBar, { passive: true });
  window.addEventListener("resize", updateStickyBuyBar, { passive: true });
  document.addEventListener("wheel", updateStickyBuyBar, { passive: true });
  document.addEventListener("touchmove", updateStickyBuyBar, { passive: true });
}

const qtyValue = document.querySelector("[data-qty-value]");
const qtyMinus = document.querySelector("[data-qty-minus]");
const qtyPlus = document.querySelector("[data-qty-plus]");
if (qtyValue && qtyMinus && qtyPlus) {
  let quantity = 1;
  const setQuantity = (next) => {
    quantity = Math.min(9, Math.max(1, next));
    qtyValue.textContent = String(quantity);
  };
  qtyMinus.addEventListener("click", () => setQuantity(quantity - 1));
  qtyPlus.addEventListener("click", () => setQuantity(quantity + 1));
}

const pincodeInput = document.querySelector("[data-pincode-input]");
const pincodeButton = document.querySelector("[data-pincode-check]");
const pincodeResult = document.querySelector("[data-pincode-result]");
if (pincodeInput && pincodeButton && pincodeResult) {
  const checkPincode = () => {
    const value = pincodeInput.value.trim();
    if (!/^[1-9][0-9]{5}$/.test(value)) {
      pincodeResult.textContent = "Enter a valid 6-digit pincode to check delivery.";
      return;
    }
    const fastZones = ["110", "122", "201", "400", "560", "700"];
    const isFast = fastZones.includes(value.slice(0, 3));
    pincodeResult.textContent = isFast
      ? "Available. Estimated delivery in 1-2 business days with prepaid priority."
      : "Available. Estimated delivery in 3-5 business days.";
  };
  pincodeButton.addEventListener("click", checkPincode);
  pincodeInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") checkPincode();
  });
}

const featureLab = document.querySelector("[data-feature-lab]");
if (featureLab) {
  const pins = [...featureLab.querySelectorAll("[data-feature-pin]")];
  const cards = [...featureLab.querySelectorAll("[data-feature-card]")];
  const productImage = featureLab.querySelector(".feature-product img");
  let manualFeatureUntil = 0;
  const setFeature = (index) => {
    pins.forEach((pin) => pin.classList.toggle("is-active", Number(pin.dataset.featurePin) === index));
    cards.forEach((card) => card.classList.toggle("is-active", Number(card.dataset.featureCard) === index));
    if (productImage) productImage.style.setProperty("--feature-lift", `${index * -3}px`);
  };

  pins.forEach((pin) => {
    pin.addEventListener("click", () => {
      const index = Number(pin.dataset.featurePin);
      manualFeatureUntil = Date.now() + 1100;
      setFeature(index);
      cards[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(() => setFeature(index), 650);
    });
  });

  const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const card = entry.target;
      card.classList.add("is-visible");
      if (Date.now() < manualFeatureUntil) return;
      setFeature(Number(card.dataset.featureCard));
    });
  }, { threshold: 0.58 });

  cards.forEach((card, index) => {
    card.style.transitionDelay = `${Math.min(index * 70, 210)}ms`;
    featureObserver.observe(card);
  });
}

const signupPopup = document.querySelector("[data-signup-popup]");
const signupClose = document.querySelector("[data-signup-close]");
if (signupPopup && !sessionStorage.getItem("vgrSignupClosed")) {
  window.setTimeout(() => {
    signupPopup.hidden = false;
  }, 900);
}
if (signupPopup && signupClose) {
  const closeSignup = () => {
    signupPopup.hidden = true;
    sessionStorage.setItem("vgrSignupClosed", "1");
  };
  signupClose.addEventListener("click", closeSignup);
  signupPopup.addEventListener("click", (event) => {
    if (event.target === signupPopup) closeSignup();
  });
  signupPopup.querySelector("form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    closeSignup();
  });
}

const homeSlider = document.querySelector("[data-home-slider]");
if (homeSlider) {
  const slides = [...homeSlider.querySelectorAll(".home-hero-slide")];
  const prev = homeSlider.querySelector("[data-home-slide-prev]");
  const next = homeSlider.querySelector("[data-home-slide-next]");
  const dotsWrap = homeSlider.querySelector("[data-home-slide-dots]");
  let index = 0;
  let startX = 0;
  const dots = slides.map((_, dotIndex) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Show slide ${dotIndex + 1}`);
    dot.addEventListener("click", () => setSlide(dotIndex));
    dotsWrap?.appendChild(dot);
    return dot;
  });
  const setSlide = (nextIndex) => {
    index = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle("is-active", slideIndex === index));
    dots.forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === index));
  };
  prev?.addEventListener("click", () => setSlide(index - 1));
  next?.addEventListener("click", () => setSlide(index + 1));
  homeSlider.addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX;
  }, { passive: true });
  homeSlider.addEventListener("touchend", (event) => {
    const delta = event.changedTouches[0].clientX - startX;
    if (Math.abs(delta) > 42) setSlide(index + (delta < 0 ? 1 : -1));
  }, { passive: true });
  setSlide(0);
  window.setInterval(() => setSlide(index + 1), 5200);
}

document.querySelectorAll(".bestseller-card button").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    button.textContent = "Added";
    window.setTimeout(() => {
      button.textContent = "Add to Cart";
    }, 1200);
  });
});

document.querySelectorAll(".signup-dialog form, .footer-newsletter form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });
});

const syncFooterAccordions = () => {
  const mobile = window.matchMedia("(max-width: 759px)").matches;
  document.querySelectorAll(".site-footer details").forEach((detail) => {
    detail.open = !mobile;
  });
};
if (document.querySelector(".site-footer details")) {
  syncFooterAccordions();
  window.addEventListener("resize", syncFooterAccordions);
}
