# Firebase Setup Guide (for beginners)

Firebase is a free online database from Google. Your website saves providers
and reviews there, so everyone who opens your site sees the same data.

**You need:** a Google account (your Gmail works). No installs and no card.

---

## Step 1 – Create a Firebase project
1. Open **https://console.firebase.google.com** and sign in with Google.
2. Click **"Create a project"** (or "Add project").
3. Name it, e.g. `localserve`, and click **Continue**.
4. Google Analytics is not needed. Turn it **off** and click **Create project**.
5. Wait about 30 seconds, then click **Continue**.

## Step 2 – Create the database (Firestore)
1. In the left menu, click **Build → Firestore Database**.
2. Click **Create database**.
3. Location: pick one near you, e.g. **asia-south1 (Mumbai)**. You can't change this later.
4. Choose **Start in production mode** and click **Create**.

## Step 3 – Add the security rules
1. Still in Firestore Database, open the **Rules** tab.
2. Delete everything in the box.
3. Open the file `firestore.rules` from this project, copy all of it, and paste it in.
4. Click **Publish**.

These rules let anyone view providers, register and post reviews, but stop
people from deleting or editing other people's data.

## Step 4 – Get your website keys
1. Click the **gear icon ⚙️** next to "Project Overview" → **Project settings**.
2. Scroll down to **"Your apps"** and click the **web icon `</>`**.
3. App nickname: `localserve-web`. Leave "Firebase Hosting" **unticked**. Click **Register app**.
4. You'll see code containing `const firebaseConfig = { apiKey: "...", ... }`.
5. Copy only the values between the `{ }`.

## Step 5 – Paste the keys into the project
1. Open `js/firebase-config.js` in VS Code.
2. Replace each `YOUR_...` value with the matching value from Firebase.
3. Save the file (Ctrl + S).

> These web keys are **not secret**. Every Firebase website has them in its code.
> Your data is protected by the rules from Step 3. It's safe to upload them to GitHub.

## Step 6 – Run the website
1. In VS Code, open the terminal (**Ctrl + `**).
2. Type:
   ```
   node server.js
   ```
3. Open **http://localhost:5500** in your browser.
4. The yellow "Demo mode" banner should be gone. Register a provider, then
   check **Firestore Database → Data** in Firebase: it should appear there.

To stop the server, click in the terminal and press **Ctrl + C**.

---

## What gets stored

| Collection  | Fields |
|-------------|--------|
| `providers` | name, category, phone, whatsapp, city, area, experience, price, description, ratingSum, ratingCount, createdAt |
| `reviews`   | providerId, name, rating (1–5), comment, createdAt |

## Free limits
The free "Spark" plan allows **50,000 reads and 20,000 writes per day**, which is
plenty for a project like this.

## Troubleshooting
- **"Could not load providers"**: check the keys in `firebase-config.js` and make sure you published the rules (Step 3).
- **Still in Demo mode**: the `apiKey` value still starts with `YOUR_`.
- **Page is blank**: open it through `http://localhost:5500`, not by double-clicking the HTML file.
