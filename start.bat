@echo off
rem Double-click this file to start LocalServe and open it in your browser.
cd /d "%~dp0"
start "" http://localhost:5500
node server.js
