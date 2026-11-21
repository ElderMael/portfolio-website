# Portfolio website

React and TypeScript portfolio site, built with Vite. Node 24 is required
(`.tool-versions` specifies 24.9.0); install dependencies with `npm ci`.

## Scripts

- `npm start`: run the Vite development server at `http://localhost:3000`.
- `npm test`: run Vitest once; the command fails if no tests are found.
- `npm run lint`: run ESLint checks on the application and Vite config.
- `npm run build`: run strict TypeScript checks, then create a production build.
- `npm run preview`: preview the production build locally.

The tests use Vitest, jsdom, and Testing Library. Current coverage includes the
home, social, contact, and fallback routes, plus service-worker cleanup.

## Build and deployment

Vite emits the production site to `build/`, preserving the existing deploy
contract. Netlify builds with Node 24, publishes `build/`, and applies the SPA
fallback in `netlify.toml`. Docker copies the prebuilt `build/` directory into
nginx; it does not build the app and has no SPA fallback for direct deep links.

The service worker remains unregistered. Startup only cleans up an existing
registration left by an older version. Production output targets modern browsers
(ES2020); it no longer targets CRA's broader Browserslist set.

See [the Vite migration plan](plans/security-fixes/vite-migration.md) for
verification details and open deployment checks. The separate
[security fixes plan](plans/security-fixes/security-fixes.md) tracks remaining
security work; this migration does not complete that plan.
