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
fallback in `netlify.toml`. Docker copies the prebuilt `build/` directory and
`nginx.conf` into nginx; it does not build the app. The nginx configuration
includes an SPA fallback. A network-isolated container check returned the app
shell for `/`, `/social`, `/contact-me`, and an unknown path; deployed browser
behavior still needs verification.

The service worker remains unregistered. Startup only cleans up an existing
registration left by an older version. Production output targets modern browsers
(ES2020); it no longer targets CRA's broader Browserslist set.

## Security

The site loads the redesign fonts from Google Fonts, bundles icons locally,
and uses SRI for remaining CDN stylesheets. Netlify sends baseline security headers and a
report-only CSP. Docker runs nginx as a non-root user; the Kubernetes manifest
adds read-only root filesystem, dropped capabilities, probes, and resource
limits. The contact form includes a honeypot field.

See [SECURITY.md](SECURITY.md) for findings and outstanding deployment checks,
and the [security fixes plan](plans/security-fixes/security-fixes.md) for
implementation status. See the
[Vite migration plan](plans/security-fixes/vite-migration.md) for migration
verification.
