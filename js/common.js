// Shared helpers used by all pages.
import { DEMO_MODE } from "./db.js";

export const CATEGORIES = [
  { name: "Plumber", icon: "🚰" },
  { name: "Electrician", icon: "💡" },
  { name: "Carpenter", icon: "🪚" },
  { name: "Painter", icon: "🎨" },
  { name: "Cleaning", icon: "🧹" },
  { name: "AC Repair", icon: "❄️" },
  { name: "Mechanic", icon: "🔧" },
  { name: "Tutor", icon: "📚" },
  { name: "Beautician", icon: "💇" },
  { name: "Pest Control", icon: "🐜" }
];

export function iconFor(category) {
  const c = CATEGORIES.find(x => x.name === category);
  return c ? c.icon : "🛠️";
}

// Fill a <select> with the category list.
export function fillCategorySelect(select) {
  CATEGORIES.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.name;
    opt.textContent = `${c.icon} ${c.name}`;
    select.appendChild(opt);
  });
}

// Escape text before putting it into HTML (prevents script injection).
export function esc(text) {
  const div = document.createElement("div");
  div.textContent = text == null ? "" : String(text);
  return div.innerHTML;
}

export function stars(avg) {
  const full = Math.round(avg);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

export function ratingText(p) {
  if (!p.ratingCount) return '<span class="muted">No reviews yet</span>';
  const avg = p.ratingSum / p.ratingCount;
  return `<span class="stars">${stars(avg)}</span> ${avg.toFixed(1)} (${p.ratingCount})`;
}

// Turn "98765 43210" into a WhatsApp link (adds India code 91 for 10-digit numbers).
export function whatsappLink(number) {
  let digits = String(number).replace(/\D/g, "");
  if (digits.length === 10) digits = "91" + digits;
  return `https://wa.me/${digits}`;
}

if (DEMO_MODE) {
  document.getElementById("demo-banner")?.classList.remove("hidden");
}
