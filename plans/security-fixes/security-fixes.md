# Security Fixes Plan

## Overview
This plan outlines the remediation steps for critical, high, and medium security
findings identified in the portfolio-website repository. The goal is to bring
the application to a secure production state before the next deployment.

## Scope
- Dependency vulnerabilities (npm audit)
- External resource loading (SRI, CDN security)
- Build consistency and artifact hygiene
- Docker and Kubernetes hardening
- Runtime security headers
- Formspree anti‑spam considerations
- Code quality improvements in React components

## Action Items

| # | Area | Tasks | Completion |
|---|------|-------|------------|
| 1 | **Dependencies** | - Vite migration implemented; verification tracked in [the migration plan](vite-migration.md). <br> - Run `npm audit fix` and address high/critical findings. <br> - Review the 2 remaining moderate React Router findings; a major v7 update needs compatibility testing. <br> - Keep `package-lock.json` committed. | 🟡 Migration done; audit findings remain |
| 2 | **Subresource Integrity (SRI)** | - Identify all external `<link>` and `<script>` tags in `index.html` and `build/index.html`. <br> - Self-host Google Fonts; add SRI hashes to remaining external stylesheets. <br> - Remove the FontAwesome kit and use locally bundled icon packages. | ✅ Complete |
| 3 | **Security Headers (Netlify)** | - Add `[[headers]]` block to `netlify.toml` with:<br>  • Report-only CSP for local assets, CDN styles/fonts, and Formspree.<br>  • `X-Content-Type-Options: nosniff`<br>  • `X-Frame-Options: DENY`<br>  • `Referrer-Policy: strict-origin-when-cross-origin`<br>  • `Content-Security-Policy-Report-Only` for monitoring before enforcing. | 🟡 Configured; deployment verification pending |
| 4 | **Build Artifact Consistency** | - Remove stale `build/` folder from repo (git-ignored). <br> - Ensure `npm run build` produces output from the source `index.html` (local CSS, no hackerthemes.com). <br> - Verify that deployed `build/` reflects source before each release. | ✅ `build/` ignored and untracked; clean build regenerated and checked for stale external refs |
| 5 | **Dockerfile Hardening** | - Change base image to a pinned digest (`nginx:<digest>-alpine`). <br> - Add `HEALTHCHECK` instruction. <br> - Run container as non-root (`USER nginx`). <br> - Add `readOnlyRootFilesystem` and drop unnecessary Linux capabilities. <br> - Update `.dockerignore` to exclude `.git`. | ✅ Pinned base, healthcheck, non-root nginx, custom config, and `.git` exclusion; image built and served HTTP 200 |
| 6 | **Kubernetes Manifest Updates** | - Upgrade Ingress API version to `networking.k8s.io/v1`. <br> - Pin `cert-manager.io` annotation to current version. <br> - Add `securityContext` (runAsNonRoot, readOnlyRootFilesystem, dropAllCapabilities). <br> - Define resource requests/limits and liveness/readiness probes. <br> - Replace mutable image tag with digest. | 🟡 API/security/resources/probes updated and YAML parses; published image digest and cluster dry-run remain blocked |
| 7 | **Contact Form Spam Protection** | - Add hidden honeypot field (`<input type="text" name="bot-field" style="display:none">`). <br> - Enable Formspree spam protection (if not already active). <br> - Optionally integrate Turnstile reCAPTCHA for higher assurance. | 🟡 Honeypot and submit handling tested; verify Formspree account settings externally; Turnstile remains optional |
| 8 | **React Component Improvements** | - Add dependency array to `MatrixCodeRain` `useEffect`. <br> - Clear timeout in `NameCli` on component unmount. <br> - Ensure `react-router-dom` is listed in `dependencies` (not only `devDependencies`). | ✅ Fixed dependency array, timeout cleanup, and confirmed `react-router-dom` in dependencies |
| 9 | **Documentation & Review** | - Update `README.md` with security hardening notes. <br> - Add a `SECURITY.md` file summarizing audit findings and remediation status. <br> - Conduct a peer review of all PRs implementing these changes. | 🟡 README and SECURITY.md updated; peer review remains pending |

## Migration status

The CRA-to-Vite migration is implemented and locally verified. The build
contract is preserved; Docker is now hardened to listen on port 8080. The two
moderate React Router audit findings and Netlify deploy-preview check remain
open. Browser support targets modern ES2020-capable browsers rather than CRA's
broader Browserslist set. See [the migration plan](vite-migration.md) for
migration evidence and blockers.

## Acceptance Criteria
- `npm audit` reports **0 critical** and **0 high** vulnerabilities (or
  documented acceptable risk with mitigations).
- All external scripts/styles have valid SRI hashes or are self‑hosted.
- Security headers are present on staging and production (verified via
  `curl -I`).
- Docker image builds without `.git` leakage and runs as non-root with a
  read-only filesystem.
- Kubernetes manifests pass `kubectl apply --dry-run=client` and show no
  removed-API warnings.
- Contact form resists automated spam (honeypot present, Formspree spam
  protection enabled).
- All code changes are covered by at least one unit test or functional test.

## Risks & Mitigations
- **Dependency lock-in**: Use semantic versioning; test upgrades in a
  separate branch before merging.
- **SRI generation**: Use SRI generators or `openssl dgst -sha384 -binary` +
  base64 for each asset.
- **Docker/pod security**: Scan the built image (e.g. with `trivy`) before
  deployment.

---
