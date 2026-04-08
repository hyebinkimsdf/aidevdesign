# INP Improvement Notes

## Summary

This project showed likely INP risk from client-side rendering cost, repeated timers, scroll-driven state updates, and early third-party script execution.

The goal of the recent changes was to reduce main-thread work during and shortly after user interaction.

## Main Suspected Causes

1. Heavy client-side hydration in interactive sections such as `Projects` and `ClientPortfolio`.
2. Thumbnail sliders rendering multiple images per card at the same time.
3. Search and category filtering running immediately on every input update.
4. Navigation scroll listeners updating React state too often.
5. Analytics and GTM scripts loading too early and competing with early interactions.

## Changes Applied

### 1. Deferred filtering in Projects

File: [app/components/Projects.tsx](/Users/hyebin/개발/portfoilo/app/components/Projects.tsx)

- Added `startTransition` for search/category updates.
- Added `useDeferredValue` so filtering work does not block typing responsiveness.

### 2. Reduced thumbnail rendering cost

Files:
- [app/components/Projects.tsx](/Users/hyebin/개발/portfoilo/app/components/Projects.tsx)
- [app/homepage-development/components/ClientPortfolio.tsx](/Users/hyebin/개발/portfoilo/app/homepage-development/components/ClientPortfolio.tsx)

- Changed slider rendering from "all slides mounted with opacity toggle" to "current slide only".
- This reduces DOM nodes, image decode work, and per-card render cost.

### 3. Reduced scroll-driven re-renders

Files:
- [app/components/Nav.tsx](/Users/hyebin/개발/portfoilo/app/components/Nav.tsx)
- [app/homepage-development/components/ClientNav.tsx](/Users/hyebin/개발/portfoilo/app/homepage-development/components/ClientNav.tsx)

- Scroll handlers now update state only when the threshold result actually changes.
- This reduces unnecessary rerenders while scrolling.

### 4. Delayed third-party scripts

File: [app/layout.tsx](/Users/hyebin/개발/portfoilo/app/layout.tsx)

- Changed analytics-related `next/script` strategy from `afterInteractive` to `lazyOnload`.
- This helps prevent analytics scripts from competing with early UI interactions.

## Expected Impact

- Better responsiveness while typing in project search.
- Less main-thread pressure from project thumbnails.
- Fewer unnecessary rerenders during scroll.
- Lower chance of analytics scripts affecting early interaction latency.

## Remaining Risk Areas

1. `Projects` is still a large client component and may benefit from further splitting.
2. Each card slider still uses a timer; this could be optimized further if needed.
3. Field measurement is still needed to confirm which interaction contributes most to INP.

## Recommended Next Steps

1. Measure INP with Lighthouse, Vercel Speed Insights, or Chrome Performance panel.
2. Identify the worst interaction: search input, menu open, card click, or form interaction.
3. If INP is still high, consider:
   - splitting large client components,
   - pausing offscreen sliders,
   - reducing animation and observer work,
   - minimizing additional third-party scripts.

## Verification

- `npm run build` completed successfully after the changes.

## Additional Context For Future Agents

### Favicon confusion

There was separate favicon-related confusion during this work.

- The project currently contains both [public/favicon.ico](/Users/hyebin/개발/portfoilo/public/favicon.ico) and [app/favicon.ico](/Users/hyebin/개발/portfoilo/app/favicon.ico).
- Because this project uses the App Router, favicon behavior was being driven mainly by the `app/` metadata/file convention, not by `public/favicon.ico` alone.
- This created confusion when the user expected the public favicon to be the only source of truth.

Recommended rule for future work:

1. Decide one canonical favicon source.
2. If using App Router conventions, prefer `app/favicon.ico` and keep metadata aligned with that choice.
3. Do not assume `public/favicon.ico` is controlling favicon output unless the actual head output is verified.

### Process issue during earlier AI assistance

The user reported that earlier AI assistance did not stay focused on the favicon issue and kept changing unrelated problems instead.

This caused:

- wasted tokens,
- unnecessary edits,
- extra back-and-forth,
- lower trust in the debugging process.

Recommended behavior for future agents:

1. Stay tightly scoped to the user’s active issue before making adjacent optimizations.
2. Confirm the actual source of truth first when debugging favicon or metadata behavior.
3. Avoid mixing unrelated performance, metadata, or UI fixes into the same thread unless the user asks for them.
4. If additional issues are discovered, note them separately instead of changing them immediately.
