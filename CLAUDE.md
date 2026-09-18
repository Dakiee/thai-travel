# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal Thailand trip planner for two adults flying from Ulaanbaatar (16 Jan–1 Feb 2027), built with Next.js 16 (App Router), React 19, and no other dependencies. Requires Node.js ≥ 20.9.

## Commands

```bash
npm run dev      # dev server at http://localhost:3000
npm run build    # production build + framework checks
npm start        # serve the production build
npm test         # node:test suite (tests/planner.test.js)
node --test --test-name-pattern="transfer dates" tests/planner.test.js   # single test
```

There is no linter or TypeScript config.

## Architecture

- **`planner.js`** (repo root) is the source of truth for all trip data and budget math: `sources`, `days`, `stops` (six stays with nights/offsets and hardcoded Booking/Agoda/Airbnb/Trip search URLs), `transfers` (2 flights + 3 ferries), `styles` (`value` / `comfort` price tables), `itinerary()`, `calculate()`, and `dateAt()`.
  - It is a UMD-style IIFE: exports via `module.exports` (so the CommonJS tests can `require` it) and otherwise sets `globalThis.TravelPlanner`. `app/page.js` default-imports it. Keep it in this form, not ESM `export`.
  - The file defines `days` in an object literal, then **patches and redefines many days further down** (after `transfers`). The later assignments win, so check the bottom of the file before editing a day's text.
  - `itinerary()` only accepts `duration === 17`; the day order is a fixed ID list. `calculate()` validates 1–8 adults and 1–2 adults per room, and throws `RangeError` otherwise.
  - Every amount is in **THB**. `calculate()` returns a `breakdown` array, then adds a 10% `buffer` (rounded up) to get `total`.
- **`app/page.js`** is a single `'use client'` component that renders everything: hero, day-by-day plan, stays, transfers, budget card, price notes, settings `<dialog>`, text export, and `window.print()`. Currency conversion (THB → USD/MNT) happens only in its `money()` helper, using user-editable rates (defaults USD 1 = THB 35, THB 1 = MNT 100).
- **Persistence**: settings are stored in `localStorage` under `little-thailand-v1`. `loadSavedState()` validates them and restores adults, rooms, and start date only when `routeVersion === 3`. Bump `routeVersion` in `defaults` when the route changes incompatibly.
- **Styles**: `styles.css` (main, responsive, print) and `prices.css` are plain global CSS imported in `app/layout.js`. Fonts come from Google Fonts and photos from Unsplash.

## Keeping things in sync

- The tests assert exact numbers (for example the default `total` of 135124 THB, hotels at 28800, and per-adult transport of 5650/8900). If you change any price in `planner.js`, update the tests.
- Route details are duplicated by hand in `README.md` (stay table), `ITINERARY.md`, `app/layout.js` metadata, and the price-notes text in `app/page.js`. Update them whenever `stops` or dates change.
- Accommodation and 12Go links hardcode 2027 dates. Changing the start date in the UI does not update them, and the UI says so.
- `Thailand-itinerary.pdf` is an outdated artifact. The app's print/PDF action produces the current plan.
- This directory is not a git repository.
