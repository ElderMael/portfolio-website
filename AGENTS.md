# Repository guide

## Project structure

- This personal portfolio uses React, TypeScript, and Vite. The entry point is
  `src/index.tsx`, loaded by the root `index.html`.
- `src/components/App.tsx` defines the client-side routes: `/`, `/social`,
  `/contact-me`, and a fallback to the home page. Pages and their styles live
  in `src/components/`; global styles are in `src/index.css`.
- `src/useWindowDimensions.ts` supplies viewport dimensions. The home page
  includes the animated canvas in `src/components/MatrixCodeRain.tsx`.
- `public/` contains static assets, including the manifest, icons, and resume
  PDF. `build/` is generated and ignored by Git; do not edit it directly.

## Development and verification

- Use Node 24 (`.tool-versions` specifies 24.9.0) and npm. Install locked
  dependencies with `npm ci`; commit the lockfile with dependency changes.
- `npm start` runs Vite on port 3000.
- `npm test` runs Vitest once. It fails if no tests are collected. Tests use
  jsdom and Testing Library; add meaningful coverage for behavior changes.
- `npm run lint` runs ESLint on `src/` and `vite.config.ts`.
- `npm run build` runs `tsc --noEmit` before Vite builds into `build/`.
  `npm run preview` serves that output locally.
- Run relevant tests, lint, and build for code changes. For visual, navigation,
  or animation changes, check affected pages at desktop and mobile widths.

## Implementation notes

- Follow existing component and colocated CSS patterns; clean up timers and
  event listeners introduced by effects.
- Preserve client-side route behavior and check direct navigation when changing
  routes. Netlify's SPA fallback is configured in `netlify.toml`.
- Netlify builds with Node 24 and publishes `build/`. The Dockerfile only copies
  an already-built `build/` directory into nginx. Its current nginx config has
  no SPA fallback, so direct deep links are not supported in Docker.
- The service worker is intentionally not registered. Preserve the cleanup of
  registrations left by previous app versions.
