import { getProviders } from "./db.js";
import { CATEGORIES, fillCategorySelect, iconFor, esc, ratingText } from "./common.js";

const form = document.getElementById("search-form");
const qInput = document.getElementById("q");
const catSelect = document.getElementById("category");
const cityInput = document.getElementById("city");
const chips = document.getElementById("chips");
const results = document.getElementById("results");
const title = document.getElementById("results-title");

let allProviders = [];

fillCategorySelect(catSelect);

// Category chips
CATEGORIES.forEach(c => {
  const chip = document.createElement("button");
  chip.type = "button";
  chip.className = "chip";
  chip.textContent = `${c.icon} ${c.name}`;
  chip.onclick = () => {
    catSelect.value = catSelect.value === c.name ? "" : c.name;
    render();
  };
  chips.appendChild(chip);
});

form.addEventListener("submit", e => {
  e.preventDefault();
  render();
});
catSelect.addEventListener("change", render);

function render() {
  const q = qInput.value.trim().toLowerCase();
  const cat = catSelect.value;
  const city = cityInput.value.trim().toLowerCase();

  // Highlight active chip
  [...chips.children].forEach((chip, i) => {
    chip.classList.toggle("active", CATEGORIES[i].name === cat);
  });

  const list = allProviders.filter(p => {
    if (cat && p.category !== cat) return false;
    if (city && !(`${p.city} ${p.area}`.toLowerCase().includes(city))) return false;
    if (q && !(`${p.name} ${p.category} ${p.description}`.toLowerCase().includes(q))) return false;
    return true;
  });

  // Best rated first
  list.sort((a, b) => avg(b) - avg(a));

  title.textContent = (cat || q || city)
    ? `${list.length} result${list.length === 1 ? "" : "s"} found`
    : "All service providers";

  if (!list.length) {
    results.innerHTML = '<p class="muted">No providers match your search. Try a different category or area.</p>';
    return;
  }

  results.innerHTML = list.map(p => `
    <div class="card provider-card">
      <span class="badge">${iconFor(p.category)} ${esc(p.category)}</span>
      <a href="provider.html?id=${encodeURIComponent(p.id)}"><h3>${esc(p.name)}</h3></a>
      <div class="meta">📍 ${esc(p.area)}, ${esc(p.city)}</div>
      <div class="meta">${ratingText(p)}</div>
      <p class="desc">${esc(p.description)}</p>
      ${p.price ? `<div class="meta">From ₹${esc(p.price)}</div>` : ""}
      <div class="actions">
        <a class="btn" href="tel:${esc(p.phone)}">📞 Call</a>
        <a class="btn btn-outline" href="provider.html?id=${encodeURIComponent(p.id)}">View</a>
      </div>
    </div>
  `).join("");
}

function avg(p) {
  return p.ratingCount ? p.ratingSum / p.ratingCount : 0;
}

// Load data
try {
  allProviders = await getProviders();
  render();
} catch (err) {
  console.error(err);
  results.innerHTML = '<p class="msg err">Could not load providers. Check your Firebase setup.</p>';
}
