# Vite Migration Plan

## Objective

Replace Create React App (CRA) with Vite to address the dependency-toolchain
portion of the [security fixes plan](security-fixes.md), while preserving the
site's behavior, deployment contract, and existing service-worker cleanup.
This migration alone does not resolve all security findings.

## Current state and decisions

- The application uses React, TypeScript, `react-scripts` 5, and Node 24.
- `public/index.html` uses CRA's `%PUBLIC_URL%` placeholders; static assets
  include the manifest, icons, `neon.css`, and resume PDF.
- Netlify publishes `build/`, and the Dockerfile copies that directory. Keep
  Vite's output at `build/` to avoid changing those deployment contracts.
- Netlify already has an SPA fallback. The existing nginx image has no explicit
  SPA fallback; do not assume direct Docker route navigation works today.
- `src/index.tsx` calls `serviceWorker.unregister()`. Preserve that cleanup for
  previously registered workers; do not enable offline behavior.
- There are currently no test files. CRA's test command succeeds without tests,
  and its build also performs checks that Vite's transpiler does not replace.
- Keep `npm start` on port 3000 and `npm test` as a one-shot command. Use
  Vitest with a browser-like environment for React tests, and run TypeScript
  explicitly as part of the production build.

## Execution

Work in small, reviewable tasks. After each task, update its checkbox and
verification results in this plan, then commit the plan and related changes
together. Keep each commit deployable; do not merge a partial migration that
breaks the existing build or deployment.

### Task 1: Establish a baseline

- [x] On Node 24, run `npm ci`, `npm test`, `npm run build`, and `npm audit`.
      Record failures and audit counts, including the audit date and whether
      findings are direct or transitive. Do not treat an empty test run as
      coverage.
      Verification results (2026-11-20):
      - `npm ci`: success, installed 1630 packages (audited 1631).
      - `npm test`: success but exits 0 with "No tests found" — no test files
        exist; empty run is NOT coverage.
      - `npm run build`: success; CRA build produced `build/` with index.html,
        static/js/main.js, static/css/main.css, favicon.ico, manifest,
        neon.css, resume-mael.pdf, robots.txt, icons. No unresolved placeholders
        in the built output.
      - `npm audit` (2026-11-20): 77 vulnerabilities — 14 low, 20 moderate,
        38 high, 5 critical. Most findings are transitive (webpack, webpack-dev
        server, ws, websocket-driver, sockjs, source-map-js, shell-quote, uuid,
        etc.) pulled in by `react-scripts`/CRA toolchain; none are direct app
        runtime dependencies except via CRA. Critical/high findings include
        webpack XSS/SSRF (GHSA-hc6q-2mpp-qw7j etc.), websocket-driver
        resource-limit bypass (GHSA-mp7j-qc5w-4988), source-map-js DoS,
        webpack-dev-middleware path traversal.
- [x] Record the behavior of `/`, `/social`, `/contact-me`, and an unknown
      route, including navigation, contact form, animation, and public assets.
      Check desktop and mobile widths. Record existing console errors and
      network failures to distinguish pre-existing issues from regressions.
      Verification results:
      - `npm start` serves on port 3000.
      - `/`, `/social`, `/contact-me`, and unknown route (`/unknown`): all HTTP
        200 via CRA dev server's SPA fallback (returns index.html for any path).
      - No real browser or headless tooling available (no Playwright/Puppeteer
        installed); desktop/mobile width visual checks and console/network error
        inspection could not be performed. Recorded as baseline limitation,
        not pre-existing regression.
      - Contact form posts to Formspree (https://formspree.io/f/xknkjwpb);
        home page includes MatrixCodeRain animated canvas; neon.css loaded
        from /neon.css.
- [x] Inspect the actual Netlify and Docker deployment paths and capture any
      pre-existing deep-link limitations. Record the current browser-support
      expectations before selecting Vite's production target.
      Verification results:
      - Netlify (`netlify.toml`): publish = "build", command = "npm run build",
        NODE_VERSION = 24. SPA fallback redirect `/*` -> `/` status 200 exists;
        direct navigation/refresh on SPA routes works on Netlify.
      - Docker (`Dockerfile`): `FROM nginx:1.17.8-alpine`, copies `./build` into
        nginx html dir, exposes 80. No SPA fallback configured in nginx; direct
        route navigation / refresh on non-root paths is a pre-existing gap on
        Docker (does not inherit Netlify's redirect). Docker is available.
      - Netlify CLI unavailable locally; Netlify deploy-preview verification
        cannot be performed locally — record as blocker.
      - Browser support baseline from CRA browserslist: production >0.2%, not
        dead, not op_mini all.
- [x] Commit the baseline results in this plan.

### Task 2: Migrate the build and test toolchain

- [x] Replace `react-scripts` with Vite 6.4.6, React plugin 5.2, Vitest 4.1.12,
      and jsdom 26.1. These support Node 24.9. TypeScript upgraded to 5.9.3;
      `react-router-dom` moved to runtime dependencies. Lockfile regenerated.
- [x] Move `public/index.html` to root, add `/src/index.tsx` module entry, and
      replace CRA placeholders with root-relative asset paths. Metadata and
      third-party resources retained unchanged.
- [x] Configure React plugin, root base, port 3000, `build/` output. `npm start`
      runs Vite, `npm run build` runs `tsc --noEmit && vite build`, `npm test`
      is one-shot, `npm run preview` serves production output. Removed eject.
      Selected Vite's modern `es2020` target (matching current Vite browser
      baseline); this narrows CRA's `>0.2%, not dead, not op_mini all` support
      envelope. User approved this choice on 2026-11-20. No additional polyfills
      are configured.
- [x] Replaced CRA types with Vite client types; TypeScript strict remains on.
      Vitest + Testing Library tests cover home/social/contact/fallback routes
      and service-worker cleanup (4 tests across 2 files); `npm test` fails if
      no tests are collected (`vitest run`).
- [x] Preserved service-worker cleanup (`unregister` existing registrations)
      and removed unused CRA registration paths / all `process.env` references.
      Mocked cleanup test passes; no new registration code exists.
- [x] Removed unused CRA Babel/macros config and dependency. Added ESLint 9,
      TypeScript ESLint, React and hooks checks; `npm run lint` is explicit.
      Lint surfaced and corrected existing unused `Navigation` props/handler
      and `prefer-const` issues in MatrixCodeRain.
- [x] Verification (Node v24.9.0, 2026-11-20): `npm ci`, `npm test` (4 tests),
      `npm run build` (includes tsc), and `npm run lint` all pass. Output
      includes index, hashed JS/CSS, favicon, icons, manifest, neon.css,
      resume-mael.pdf and robots.txt. No `%PUBLIC_URL%` placeholders. `npm ls
      react-scripts --depth=0` shows empty.
      Audit after migration: 3 moderate, 0 high, 0 critical (all transitive or
      direct react-router packages; no runtime-critical findings). Full details
      and comparison with baseline are scheduled for Task 3. Browser visuals
      cannot yet be verified; see Task 3 blockers.

### Task 3: Verify deployment and regressions

- [x] Run development server and production preview. Vite development server
      on port 3000 returned HTTP 200 for `/`, `/social`, `/contact-me`, and
      `/unknown`. Headless Chrome confirmed those routes render expected content.
      Desktop (1365x900) and mobile (390x844) captures showed home/social/contact
      pages, home animation text, and contact form. A stale CRA server from the
      baseline initially occupied port 3000 and skewed one check; it was stopped
      before verifying Vite on the required port. No service worker is newly
      registered; cleanup test passes. Link-click flows and page-console
      diagnostics were not comprehensively instrumented.
- [x] Preview server returned HTTP 200 for favicon, logo icons, manifest,
      `neon.css`, resume PDF, and robots.txt. Built output has no CRA
      placeholders.
      External CDN resource/network diagnostics are not fully instrumented.
- [x] Built Docker image `portfolio-vite-migration:local` successfully. Initial
      bridge networking failed (`operation not supported`); host networking
      allowed smoke testing. `/` and public assets returned 200. `/social` and
      `/contact-me` returned 404, confirming the pre-existing nginx SPA fallback
      gap; Dockerfile/nginx routing was not changed.
- [ ] Netlify deploy preview remains BLOCKED: Netlify CLI is absent and no
      deployment credentials/access are available. Direct route navigation and
      refresh on deploy preview are unverified; the task remains open.
- [x] Repeated audit (2026-11-20): initially 3 moderate, 0 high, 0 critical.
      Ran non-forced `npm audit fix`, resolving the transitive `@babel/runtime`
      finding. Final count: 2 moderate, 0 high, 0 critical, both reported via
      direct `react-router-dom` and its transitive `react-router`. Baseline had
      38 high, 5 critical, and 34 low/moderate; migration plus the safe update
      removed all high and critical findings and all low findings. Remaining
      React Router advisories require a major upgrade to v7 per npm audit;
      deferred pending compatibility review rather than forcing a major update.
- [x] Committed verification results with this plan; Netlify verification stays
      open as explicitly required above.

### Task 4: Update documentation and review

- [x] Updated `README.md` and `AGENTS.md` for Vite, Node 24, scripts, tests,
      explicit type/lint checks, `build/`, and deployment behavior. Removed
      obsolete CRA/eject guidance. User authorized updating and committing the
      previously untracked `AGENTS.md` on 2026-11-20.
- [x] Linked this plan from the dependency item in `security-fixes.md` and
      recorded migration status without closing unrelated security findings.

## Acceptance criteria

- A clean Node 24 install, test, type check, lint check, and production build
  pass; tests actually run and cover migration-sensitive behavior.
- The site matches the baseline at desktop and mobile widths, including routes,
  static assets, form, animation, and service-worker unregistration.
- Netlify's deploy preview serves refreshed and directly requested SPA routes;
  Docker serves the fresh build, with any existing deep-link gap documented.
- The lockfile no longer requires `react-scripts`; audit results are recorded.
  The security plan's zero-high/critical target, or documented accepted risks,
  remains a separate release gate.
- README, repository guidance, and both plans reflect the final state.

## Rollback

If verification fails, revert the migration commits as a coordinated set,
including the lockfile and HTML entry point, then rebuild and redeploy the last
known-good CRA version. Keep the prior artifact available until the Netlify
preview and production checks succeed. Do not change service-worker behavior as
part of rollback.

## References

- [Vite getting started](https://vite.dev/guide/)
- [Vite environment variables and modes](https://vite.dev/guide/env-and-mode)
- [Vite static deployment](https://vite.dev/guide/static-deploy)
