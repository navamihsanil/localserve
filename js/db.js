// Data layer: talks to Firebase Firestore, or to localStorage in demo mode.
// All pages use only the functions exported from this file.

import { firebaseConfig } from "./firebase-config.js";

export const DEMO_MODE = !firebaseConfig.apiKey || firebaseConfig.apiKey.startsWith("YOUR_");

const FIREBASE_VERSION = "10.12.2";
let fs = null;   // Firestore functions
let db = null;   // Firestore instance

async function firestore() {
  if (!db) {
    const base = `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}`;
    const { initializeApp } = await import(`${base}/firebase-app.js`);
    fs = await import(`${base}/firebase-firestore.js`);
    db = fs.getFirestore(initializeApp(firebaseConfig));
  }
  return { fs, db };
}

// ---------------- Demo mode (localStorage) ----------------
const LS_KEY = "localserve-demo";

function demoLoad() {
  try {
    const saved = JSON.parse(localStorage.getItem(LS_KEY));
    if (saved) return saved;
  } catch (e) { /* ignore */ }
  const now = Date.now();
  const data = {
    providers: [
      { id: "p1", name: "Ravi Plumbing Works", category: "Plumber", phone: "9876543210", whatsapp: "9876543210", city: "Mangalore", area: "Kankanady", experience: 8, price: 300, description: "Tap, pipe and bathroom fitting repairs. Available 8am–8pm, all days.", ratingSum: 9, ratingCount: 2, createdAt: now },
      { id: "p2", name: "Bright Electricals", category: "Electrician", phone: "9845012345", whatsapp: "9845012345", city: "Mangalore", area: "Hampankatta", experience: 5, price: 250, description: "House wiring, fan and light installation, inverter setup.", ratingSum: 5, ratingCount: 1, createdAt: now },
      { id: "p3", name: "Sneha Home Tuitions", category: "Tutor", phone: "9900112233", whatsapp: "", city: "Udupi", area: "Manipal", experience: 3, price: 500, description: "Maths and Science tuition for classes 6–10. Home visits available.", ratingSum: 0, ratingCount: 0, createdAt: now },
      { id: "p4", name: "CoolAir AC Service", category: "AC Repair", phone: "9123456780", whatsapp: "9123456780", city: "Udupi", area: "Kalsanka", experience: 6, price: 450, description: "AC servicing, gas refilling and installation for all brands.", ratingSum: 4, ratingCount: 1, createdAt: now }
    ],
    reviews: [
      { id: "r1", providerId: "p1", name: "Anil", rating: 5, comment: "Came on time and fixed the leak quickly.", createdAt: now },
      { id: "r2", providerId: "p1", name: "Divya", rating: 4, comment: "Good work, fair price.", createdAt: now },
      { id: "r3", providerId: "p2", name: "Kiran", rating: 5, comment: "Very professional.", createdAt: now },
      { id: "r4", providerId: "p4", name: "Suresh", rating: 4, comment: "AC is cooling well now.", createdAt: now }
    ]
  };
  demoSave(data);
  return data;
}

function demoSave(data) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch (e) { /* ignore */ }
}

const newId = () => Math.random().toString(36).slice(2, 10);

// ---------------- Public API ----------------

export async function getProviders() {
  if (DEMO_MODE) return demoLoad().providers;
  const { fs, db } = await firestore();
  const snap = await fs.getDocs(fs.collection(db, "providers"));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getProvider(id) {
  if (DEMO_MODE) return demoLoad().providers.find(p => p.id === id) || null;
  const { fs, db } = await firestore();
  const snap = await fs.getDoc(fs.doc(db, "providers", id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function addProvider(provider) {
  const data = { ...provider, ratingSum: 0, ratingCount: 0, createdAt: Date.now() };
  if (DEMO_MODE) {
    const all = demoLoad();
    data.id = newId();
    all.providers.push(data);
    demoSave(all);
    return data.id;
  }
  const { fs, db } = await firestore();
  const ref = await fs.addDoc(fs.collection(db, "providers"), data);
  return ref.id;
}

export async function getReviews(providerId) {
  let list;
  if (DEMO_MODE) {
    list = demoLoad().reviews.filter(r => r.providerId === providerId);
  } else {
    const { fs, db } = await firestore();
    const q = fs.query(fs.collection(db, "reviews"), fs.where("providerId", "==", providerId));
    const snap = await fs.getDocs(q);
    list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }
  return list.sort((a, b) => b.createdAt - a.createdAt);
}

export async function addReview(providerId, review) {
  const data = { ...review, providerId, createdAt: Date.now() };
  if (DEMO_MODE) {
    const all = demoLoad();
    all.reviews.push({ id: newId(), ...data });
    const p = all.providers.find(x => x.id === providerId);
    if (p) { p.ratingSum += review.rating; p.ratingCount += 1; }
    demoSave(all);
    return;
  }
  const { fs, db } = await firestore();
  await fs.addDoc(fs.collection(db, "reviews"), data);
  await fs.updateDoc(fs.doc(db, "providers", providerId), {
    ratingSum: fs.increment(review.rating),
    ratingCount: fs.increment(1)
  });
}
