# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal Thailand group trip planner for friends flying from Ulaanbaatar (16 Jan to 1 Feb 2027): five people, growing to seven at Phi Phi. Built with Next.js 16 (App Router) and React 19, with Leaflet for the map. It deploys to Cloudflare Workers through `@opennextjs/cloudflare`. Requires Node.js ≥ 22.

## Commands

```bash
npm run dev      # dev server at http://localhost:3000
npm run build    # next build, then the OpenNext Cloudflare build
npm run preview  # build and preview the Worker locally
npm run deploy   # build and deploy to Cloudflare (wrangler.jsonc)
npm test         # node:test suite (tests/planner.test.js)
node --test --test-name-pattern="transfer dates" tests/planner.test.js   # single test
```

There is no linter or TypeScript config. In Git Bash on Windows the `npx` shim can fail to resolve `next`. If it does, run `node node_modules/next/dist/bin/next dev` instead.

## Architecture

- **`planner.js`** (repo root) is the source of truth for all trip data and budget math: `sources`, `stops` (six stays with hotel, area, photo, guests, nights/offset and search links), `places` and `legs` (map data), `transfers` (2 domestic flights + 3 ferries), `internationalFlights` (UBN to BKK and back), `styles` (`value` / `comfort` price tables), `itinerary()`, `calculate()` and `dateAt()`.
  - It is a UMD-style IIFE. It exports via `module.exports`, so the CommonJS tests can `require` it, and otherwise sets `globalThis.TravelPlanner`. Keep it in this form, not ESM `export`.
  - `days` is defined in an object literal and then **patched and redefined further down**. The later assignments win, so check the bottom of the file before editing a day's text.
  - `itinerary()` only accepts `duration === 17`. `calculate()` accepts 1 to 8 adults and 1 or 2 adults per room, and throws `RangeError` otherwise.
  - Every amount is in **THB**. `calculate()` returns a `breakdown` array, then adds a 10% `buffer` (rounded up) to get `total`.
- **Routes** (`app/`): `/` (overview), `/itinerary`, `/stays`, `/transport`, `/budget` and `/print`. The route files are thin server components. Each composes a `PageIntro` with a planner component from `components/`.
- **`components/TripProvider.js`** (client context, mounted in `app/layout.js`) owns the shared state:
  - adults, rooms, budget style, currency, start date and exchange rates;
  - `money()` (the only place THB is converted to USD/MNT; default rates USD 1 = THB 35, THB 1 = MNT 100), `dateLabel()` and `priceRange()`;
  - the settings `<dialog>`, the text-file export (`downloadTrip`) and the toast.
  - Components read all of this through `useTrip()`.
- **Persistence**: settings live in `localStorage` under `our-thailand-trip-v1`, migrated from the legacy `little-thailand-v1` key. `loadSavedState()` validates them, and restores adults, rooms and the start date only when `routeVersion === 4`. Bump `routeVersion` in `defaultTripState` when the route changes incompatibly.
- **Map** (`components/TripMap.js`): Leaflet is loaded with a dynamic import. Esri tiles are primary, with an OpenStreetMap fallback. Pin and line colours are read at runtime from the `--map-*` CSS tokens; don't hardcode hex values in JS.
- **`components/WaterLight.js`**: the theme's water-caustics canvas, drawn at low resolution from the colour tokens.
  - Animated in the footer, with a pause button; it stops when off screen and under reduced motion.
  - `still` mode draws one frame; used behind the "next stay" lane on the home route.

## Styles

The visual system comes from a Hallmark redesign (theme: Refract).

- **Files and load order:** `styles.css` imports `tokens.css` (colours, fonts, spacing, type scale, radii, motion) and `base.css` (element defaults), then holds every page and component rule, the responsive breakpoints and the print styles. `prices.css` is an empty placeholder kept so the import in `layout.js` still resolves.
- **The Hallmark stamp:** the first comment block in `styles.css` records the design decisions and every reworded or dropped item. Keep it at the top.
- **Tokens only:** every colour, font and spacing value goes through a token (`--color-*`, `--font-*`, `--space-*`, `--map-*`). No literal colours or `font-family` outside the token blocks, and spacing uses the `--space-*` scale.
- **Fonts:** Funnel Display (headings, figures) and Funnel Sans (body), loaded from Google Fonts in `app/layout.js`.
- **Labels:** sentence case and untracked. No small uppercase labels above headings.
- **Photo slots:** the hero, the Bangkok photo and the hotel photos sit in `data-slot` figures. The slot script in `layout.js` drops images that fail to load.

## Keeping things in sync

- The tests assert exact numbers (for example a `total` of 135124 THB, hotels at 28800, and per-adult transport of 5650/8900). If you change any price in `planner.js`, update the tests.
- Route details are duplicated by hand. Update all of these whenever `stops` or dates change:
  - `README.md` (stay table) and `ITINERARY.md`;
  - `app/layout.js` metadata;
  - the hero and footer text in `app/page.js` and `components/SiteFooter.js`;
  - the per-stop lines in `components/RouteOverview.js`.
- Accommodation search links hardcode 2027 dates. Changing the start date in the UI does not update them, and the settings dialog says so.
- `Thailand-itinerary.pdf` is an outdated artifact. `/print` produces the current plan.
- `.hallmark/` holds the redesign's before/after screenshots and log; it is tooling output, not app code.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
