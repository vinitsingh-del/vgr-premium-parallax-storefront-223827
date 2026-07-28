const grid = document.querySelector("[data-product-grid]");
const filters = document.querySelectorAll("[data-filter]");
const sortBox = document.querySelector("[data-sort]");

const applyFilter = (filter) => {
  if (!grid) return;
  filters.forEach((button) => button.classList.toggle("is-active", button.dataset.filter === filter));
  grid.querySelectorAll(".collection-product").forEach((card) => {
    const categories = card.dataset.category || "";
    card.classList.toggle("is-hidden", filter !== "all" && !categories.includes(filter));
  });
};

filters.forEach((button) => {
  button.addEventListener("click", () => applyFilter(button.dataset.filter));
});

document.querySelectorAll("[data-filter-link]").forEach((link) => {
  link.addEventListener("click", (event) => {
    const filter = link.dataset.filterLink;
    if (!filter) return;
    event.preventDefault();
    applyFilter(filter);
    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

sortBox?.addEventListener("change", () => {
  if (!grid) return;
  const cards = [...grid.querySelectorAll(".collection-product")];
  const sorted = cards.sort((a, b) => {
    const priceA = Number(a.dataset.price || 0);
    const priceB = Number(b.dataset.price || 0);
    if (sortBox.value === "price-low") return priceA - priceB;
    if (sortBox.value === "price-high") return priceB - priceA;
    return 0;
  });
  sorted.forEach((card) => grid.append(card));
});

const urlFilter = new URLSearchParams(window.location.search).get("filter");
if (urlFilter) {
  applyFilter(urlFilter);
}
