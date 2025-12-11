# TripMind — Demo Home Page

This is a small static demo of the TripMind home page (React via CDN + Babel).

What you get:
- A responsive hero with background image and gradient.
- Animated headline: "Plan Your Next Adventure with AI ✈️".
- Subtitle and CTA button "Plan My Trip".

How to run:
1. Open `index.html` in a modern browser (Chrome, Firefox, Edge). No server needed for the demo.

Optional (recommended):
- Serve with a static server for proper module/CSP behavior (e.g., `python -m http.server` in the folder) and open http://localhost:8000.

Notes:
- This demo uses React and ReactDOM UMD builds and Babel in the browser. For a production app, scaffold with a bundler (Vite/Create React App) and remove Babel-in-browser.
- The hero uses an Unsplash image via URL; replace `background-image` in `styles.css` for a local or licensed image.
