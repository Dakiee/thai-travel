# Our Thailand trip

A personal Thailand trip board for two adults from Ulaanbaatar, built with Next.js 16, React 19 and the App Router.

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site is split into Overview, Itinerary, Stays, Transport, and Budget pages.

The internal `/print` route combines those pages into one print-ready document and uses the saved trip settings from the browser.

```bash
npm test       # itinerary, date and budget tests
npm run build  # production build and framework checks
npm start      # serve the production build
```

Node.js 20.9 or newer is required by Next.js 16.

## The trip

The default plan runs **16 January–1 February 2027**, with 17 calendar days and 16 hotel nights:

| Stay | Nights | Dates |
|---|---:|---|
| Bangkok | 3 | Jan 16–19 |
| Ao Nang (Krabi) | 3 | Jan 19–22 |
| Koh Lanta | 2 | Jan 22–24 |
| Koh Phi Phi | 2 | Jan 24–26 |
| Phuket | 4 | Jan 26–30 |
| Bangkok | 2 | Jan 30–Feb 1 |

The app is split into five routes:

- `/` — trip overview and route
- `/itinerary` — the complete day-by-day
- `/stays` — accommodation searches and room estimates
- `/transport` — flights, ferries and 12Go searches
- `/budget` — the full estimate, currencies and trip settings

Trip state is shared across the routes, so currency, occupancy, room count and date settings remain consistent while navigating. The app also supports browser-local settings, text export and print/PDF styles.

## Project structure

- `app/layout.js` defines metadata and the shared App Router shell.
- `app/page.js` is the server-rendered overview page.
- `app/*/page.js` contains the focused itinerary, stays, transport and budget routes.
- `components/TripProvider.js` owns shared client state, persistence, settings and exports.
- `components/*Planner.js` contains each route’s interactive UI.
- `components/SiteHeader.js` and `components/SiteFooter.js` provide shared navigation and framing.
- `planner.js` is the tested source of truth for route data and budget calculations.
- `styles.css` and `prices.css` contain the responsive and print styles.
- `public/icon.svg` is the application icon.
- `tests/planner.test.js` verifies dates, stays, links and budget math.
- `ITINERARY.md` is the readable default plan.

The old static HTML entry point, browser script and custom Node server were removed during the Next.js migration. `Thailand-itinerary.pdf` is generated from the current six-stop plan.

Fonts and illustrative destination photos load from Google Fonts and Unsplash. Trip settings stay in the current browser’s local storage.
