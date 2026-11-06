# LocalServe – Local Service Finder

A simple web app for finding local service providers (plumbers, electricians,
tutors and more), built with plain **HTML, CSS and JavaScript** and **Firebase Firestore**.

---

## How to run the project (step by step)

### What you need (one time)
- **VS Code**: https://code.visualstudio.com
- **Node.js** (LTS version): https://nodejs.org

To check that Node.js is installed, open a terminal and type `node -v`.
It should print a version number like `v22.x.x`.

### Step 1 – Open the project in VS Code
1. Open **VS Code**.
2. Click **File → Open Folder…**
3. Choose the project folder: `Desktop\project`
4. Click **Select Folder**.
5. If VS Code asks *"Do you trust the authors of the files in this folder?"*, click **Yes, I trust the authors**.

### Step 2 – Start the server
**Option A – automatic (easiest)**
- When the folder opens, VS Code starts the server for you.
- The first time, VS Code may ask *"Allow automatic tasks?"*. Click **Allow**.
- A terminal opens at the bottom, named **"Start LocalServe server"**.

**Option B – press a shortcut**
- Press **Ctrl + Shift + B**.

**Option C – type the command yourself**
1. Open the terminal: **Terminal → New Terminal** (or press **Ctrl + `**).
2. Type:
   ```
   node server.js
   ```
3. Press **Enter**.

Either way, the terminal shows:
```
LocalServe running at http://localhost:5500
```

### Step 3 – Open the website
- Hold **Ctrl** and **click** the link `http://localhost:5500` in the terminal, **or**
- Open any browser (Chrome, Edge…) and go to **http://localhost:5500**

🎉 The LocalServe home page opens.

### Step 4 – Stop the server (when you're done)
- Click inside the terminal and press **Ctrl + C**, **or**
- Click the 🗑️ (trash) icon on the terminal panel.

---

## Shortcut: run without VS Code
Double-click **`start.bat`** in the project folder. It starts the server and opens
the website in your browser. Keep the black window open while using the site;
close it to stop the server.

---

## Common problems

| Problem | Fix |
|---|---|
| `node` is not recognized | Install Node.js from https://nodejs.org, then restart VS Code. |
| `EADDRINUSE: address already in use :::5500` | The server is already running. Just open http://localhost:5500, or close the other terminal and try again. |
| Page says "This site can't be reached" | The server isn't running. Do Step 2 again. |
| Page is blank or broken | Open it through `http://localhost:5500`. Don't double-click the HTML files. |
| "Could not load providers" | Check your internet connection (data comes from Firebase). |
| Old design still showing | Press **Ctrl + F5** to refresh without cache. |

---

## Features
- Search providers by keyword, category and city/area
- Category buttons (Plumber, Electrician, Tutor…)
- Provider profiles with **Call** and **WhatsApp** buttons
- Register as a service provider
- Star ratings and reviews
- Data stored online in Firebase (everyone sees the same data)
- Works on mobile

## Save changes to GitHub
After you change something, run these in the VS Code terminal:
```
git add .
git commit -m "describe your change"
git push
```

## Database
The app uses Firebase project **localserve-255c7**.
To use your own Firebase project instead, follow [FIREBASE_SETUP.md](FIREBASE_SETUP.md).

## Project structure
```
index.html              Home page: search and results
provider.html           Provider profile and reviews
register.html           Provider registration form
css/style.css           All styles
js/firebase-config.js   Firebase keys
js/db.js                Database functions
js/common.js            Shared helpers and category list
js/home.js              Home page logic
js/provider.js          Profile page logic
js/register.js          Registration logic
firestore.rules         Database security rules
server.js               Small local web server
start.bat               Double-click to start the server and open the site
.vscode/tasks.json      Starts the server automatically in VS Code
```
