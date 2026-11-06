import { addProvider } from "./db.js";
import { fillCategorySelect } from "./common.js";

const form = document.getElementById("register-form");
const msg = document.getElementById("msg");
const val = id => document.getElementById(id).value.trim();

fillCategorySelect(document.getElementById("category"));

form.addEventListener("submit", async e => {
  e.preventDefault();
  const btn = form.querySelector("button");
  btn.disabled = true;
  msg.className = "msg";
  msg.textContent = "Registering…";

  try {
    const id = await addProvider({
      name: val("name"),
      category: val("category"),
      phone: val("phone"),
      whatsapp: val("whatsapp"),
      city: val("city"),
      area: val("area"),
      experience: Number(val("experience")) || 0,
      price: Number(val("price")) || 0,
      description: val("description")
    });
    msg.className = "msg ok";
    msg.textContent = "Registered successfully! Opening your profile…";
    setTimeout(() => { location.href = `provider.html?id=${encodeURIComponent(id)}`; }, 800);
  } catch (err) {
    console.error(err);
    msg.className = "msg err";
    msg.textContent = "Could not register. Please try again.";
    btn.disabled = false;
  }
});
