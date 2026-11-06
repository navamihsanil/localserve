# LocalServe – Local Service Finder

A simple web app for finding local service providers (plumbers, electricians,
tutors and more), built with plain **HTML, CSS and JavaScript** and **Firebase Firestore**.

## Features
- Search providers by keyword, category and city/area
- Provider profiles with Call and WhatsApp buttons
- Register as a service provider
- Star ratings and reviews
- Demo mode: works with sample data until Firebase is connected
- Mobile-friendly design

## Run locally
Requires [Node.js](https://nodejs.org).
```
node server.js
```
Then open http://localhost:5500

## Connect the database
Follow [FIREBASE_SETUP.md](FIREBASE_SETUP.md).

## Project structure
```
index.html          Home page: search and results
provider.html       Provider profile and reviews
register.html       Provider registration form
css/style.css       All styles
js/firebase-config.js   Your Firebase keys
js/db.js            Database functions (Firebase or demo)
js/common.js        Shared helpers and category list
js/home.js          Home page logic
js/provider.js      Profile page logic
js/register.js      Registration logic
firestore.rules     Database security rules
server.js           Tiny local web server
```
