import { getProvider, getReviews, addReview } from "./db.js";
import { iconFor, esc, ratingText, stars, whatsappLink } from "./common.js";

const id = new URLSearchParams(location.search).get("id");
const profile = document.getElementById("profile");
const reviewsBox = document.getElementById("reviews");
const form = document.getElementById("review-form");
const msg = document.getElementById("r-msg");

async function loadProfile() {
  const p = id ? await getProvider(id) : null;
  if (!p) {
    profile.innerHTML = '<p class="msg err">Provider not found.</p>';
    form.classList.add("hidden");
    return;
  }
  document.title = `${p.name} – LocalServe`;
  const wa = p.whatsapp || p.phone;
  profile.innerHTML = `
    <span class="badge">${iconFor(p.category)} ${esc(p.category)}</span>
    <h1>${esc(p.name)}</h1>
    <div class="meta">${ratingText(p)}</div>
    <div class="info">
      <div><strong>Location</strong>📍 ${esc(p.area)}, ${esc(p.city)}</div>
      <div><strong>Experience</strong>${esc(p.experience || 0)} years</div>
      <div><strong>Starting price</strong>${p.price ? "₹" + esc(p.price) : "Ask provider"}</div>
      <div><strong>Phone</strong>${esc(p.phone)}</div>
    </div>
    <p>${esc(p.description)}</p>
    <br>
    <div class="actions">
      <a class="btn" href="tel:${esc(p.phone)}">📞 Call now</a>
      <a class="btn btn-green" href="${whatsappLink(wa)}" target="_blank" rel="noopener">💬 WhatsApp</a>
    </div>
  `;
}

async function loadReviews() {
  const list = await getReviews(id);
  if (!list.length) {
    reviewsBox.innerHTML = '<p class="muted">No reviews yet. Be the first!</p>';
    return;
  }
  reviewsBox.innerHTML = list.map(r => `
    <div class="review">
      <strong>${esc(r.name)}</strong> <span class="stars">${stars(r.rating)}</span>
      <div class="when">${new Date(r.createdAt).toLocaleDateString()}</div>
      <p>${esc(r.comment)}</p>
    </div>
  `).join("");
}

form.addEventListener("submit", async e => {
  e.preventDefault();
  const btn = form.querySelector("button");
  btn.disabled = true;
  msg.className = "msg";
  msg.textContent = "Saving…";
  try {
    await addReview(id, {
      name: document.getElementById("r-name").value.trim(),
      rating: Number(document.getElementById("r-rating").value),
      comment: document.getElementById("r-comment").value.trim()
    });
    form.reset();
    msg.className = "msg ok";
    msg.textContent = "Thanks! Your review was added.";
    await Promise.all([loadProfile(), loadReviews()]);
  } catch (err) {
    console.error(err);
    msg.className = "msg err";
    msg.textContent = "Could not save review. Please try again.";
  }
  btn.disabled = false;
});

try {
  await loadProfile();
  if (id) await loadReviews();
} catch (err) {
  console.error(err);
  profile.innerHTML = '<p class="msg err">Could not load provider. Check your Firebase setup.</p>';
}
