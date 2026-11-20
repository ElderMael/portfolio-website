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
        Docker (does not inherit Netlify's redirect). Docker IS available locally.
      - Netlify CLI unavailable locally; Netlify deploy-preview verification
        cannot be performed locally — record as blocker.
      - Browser support baseline from CRA browserslist: production >0.2%, not
        dead, not op_mini all.
- [x] Commit the baseline results in this plan.

### Task 2: Migrate the build and test toolchain

- [ ] In one deployable change, replace `react-scripts` with compatible,
      maintained Vite, React plugin, Vitest, and DOM environment versions. Check
      their Node 24 and TypeScript compatibility; upgrade TypeScript if needed.
      Update and commit `package-lock.json` and move `react-router-dom` to
      runtime dependencies.
- [ ] Move `public/index.html` to the project root, add the module entry for
      `src/index.tsx`, and replace `%PUBLIC_URL%` references with root-relative
      asset paths. Preserve existing metadata and external resources; leave SRI
      and external-resource hardening to the security plan.
- [ ] Configure the React plugin, root base path, port 3000, and `build/`
      output. Keep `npm start`; replace CRA build/test scripts, remove `eject`,
      and add a local production preview script. Ensure the build runs `tsc`
      as well as Vite. Select and document a browser target after comparing the
      baseline with Vite's defaults; address any required polyfills explicitly.
- [ ] Replace CRA type references with Vite client types and adjust TypeScript
      configuration as needed without relaxing strict checks. Migrate test
      setup to Vitest and Testing Library, and add meaningful route/component
      smoke tests. Make `npm test` fail if no tests are collected.
- [ ] Preserve service-worker unregistration on startup and avoid registering a
      new worker. Remove or adapt unused CRA registration code so it does not
      depend on `process.env`; test the cleanup behavior with a mock.
- [ ] Review CRA-specific Babel/macros, Jest, ESLint, and other dependencies and
      configuration. Remove only items confirmed unused; retain or replace any
      behavior the application actually needs. CRA's build-time linting does
      not carry over automatically: provide an explicit equivalent lint check
      or document any intentional gap and follow-up.
- [ ] Verify `npm ci`, the one-shot test suite, type checking, linting, and a
      clean production build. Confirm `build/` contains the expected assets and
      no unresolved CRA placeholders. Commit code, lockfile, tests, and results.

### Task 3: Verify deployment and regressions

- [ ] Run the development server and production preview. At desktop and mobile
      widths, verify all routes, navigation, home animation, contact form, and
      fallback behavior against the baseline. Check console and network errors.
- [ ] Verify the favicon, icons, manifest, `neon.css`, resume PDF, and other
      referenced resources load from the built site. Confirm no new service
      worker is registered and existing-registration cleanup still runs.
- [ ] Build the Docker image from the fresh `build/` and smoke-test it. Check
      direct route navigation separately; record any pre-existing nginx SPA
      fallback gap rather than implying Netlify's redirect applies to Docker.
- [ ] Verify a Netlify deploy preview, including direct navigation and refresh
      on each route and an unknown route. If deployment access is unavailable,
      record the blocker and leave this task open rather than claiming success.
- [ ] Repeat `npm audit`; compare with the baseline. Investigate remaining high
      and critical findings, and record fixes or accepted risks and mitigations
      in the security plan. Do not use `npm audit fix --force` blindly.
- [ ] Commit verification results and any focused fixes with this plan.

### Task 4: Update documentation and review

- [ ] Update `README.md` and `AGENTS.md` to describe Vite, Node 24, scripts,
      tests, explicit type/lint checks, `build/`, and deployment behavior.
      Remove obsolete CRA/eject instructions.
- [ ] Link this plan from the dependency item in the security plan and record
      its migration status without marking unrelated security work complete.
- [ ] Request peer review and record outstanding issues and any deployment
      blockers. Commit documentation and plan updates together.

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
