# Security Fixes Plan

## Overview
This plan outlines the remediation steps required to address critical, high, and medium security findings identified in the portfolio-website repository. The goal is to bring the application to a secure production state before the next deployment.

## Scope
- Dependency vulnerabilities (npm audit)
- External resource loading (SRI, CDN security)
- Build consistency and artifact hygiene
- Docker and Kubernetes hardening
- Runtime security headers
- Formspree anti‑spam considerations
- Code quality improvements in React components

## Action Items

| # | Area | Tasks | Owner | ETA |
|---|------|-------|-------|-----|
| 1 | **Dependencies** | - Vite migration implemented; verification tracked in [the migration plan](vite-migration.md). <br> - Run `npm audit fix` and address high/critical findings. <br> - Review the 2 remaining moderate React Router findings; a major v7 update needs compatibility testing. <br> - Keep `package-lock.json` committed. | Maintainer | 1 week |
| 2 | **Subresource Integrity (SRI)** | - Identify all external `<link>` and `<script>` tags in `public/index.html` and `build/index.html`. <br> - Generate SRI hashes for each external asset (fonts, FontAwesome kit, animate.css, devicons, bootstrap theme). <br> - Replace URLs with SRI‑protected versions or self‑host assets. | Frontend Engineer | 2 days |
| 3 | **Security Headers (Netlify)** | - Add `[[headers]]` block to `netlify.toml` with:<br>  • CSP covering Google Fonts, FontAwesome kit, self‑hosted CSS/JS.<br>  • `X-Content-Type-Options: nosniff`<br>  • `X-Frame-Options: DENY`<br>  • `Referrer-Policy: strict-origin-when-cross-origin`<br>  • `Content-Security-Policy-Report-Only` for monitoring before enforcing. | DevOps | 1 day |
| 4 | **Build Artifact Consistency** | - Remove stale `build/` folder from repo (git‑ignored). <br> - Ensure `npm run build` produces output that matches `public/index.html` (local CSS, no hackerthemes.com). <br> - Verify that deployed `build/` reflects source before each release. | Maintainer | 1 day |
| 5 | **Dockerfile Hardening** | - Change base image to a pinned digest (`nginx:<digest>-alpine`). <br> - Add `HEALTHCHECK` instruction. <br> - Run container as non‑root (`USER nginx`). <br> - Add `readOnlyRootFilesystem` and drop unnecessary Linux capabilities. <br> - Update `.dockerignore` to exclude `.git`. | DevOps | 2 days |
| 6 | **Kubernetes Manifest Updates** | - Upgrade Ingress API version to `networking.k8s.io/v1`. <br> - Pin `cert-manager.io` annotation to current version. <br> - Add `securityContext` (runAsNonRoot, readOnlyRootFilesystem, dropAllCapabilities). <br> - Define resource requests/limits and liveness/readiness probes. <br> - Replace mutable image tag with digest. | DevOps | 2 days |
| 7 | **Contact Form Spam Protection** | - Add hidden honeypot field (`<input type="text" name="bot-field" style="display:none">`). <br> - Enable Formspree spam protection (if not already active). <br> - Optionally integrate Turnstile reCAPTCHA for higher assurance. | Frontend Engineer | 1 day |
| 8 | **React Component Improvements** | - Add dependency array to `MatrixCodeRain` `useEffect`. <br> - Clear timeout in `NameCli` on component unmount. <br> - Ensure `react-router-dom` is listed in `dependencies` (not only `devDependencies`). | Frontend Engineer | 1 day |
| 9 | **Documentation & Review** | - Update `README.md` with security hardening notes. <br> - Add a `SECURITY.md` file summarizing audit findings and remediation status. <br> - Conduct a peer review of all PRs implementing these changes. | Maintainer | Ongoing |

## Migration status

The CRA-to-Vite migration is implemented and locally verified. The build and
Docker contracts are preserved; the remaining two moderate React Router audit
findings and the Netlify deploy-preview check are not closed. Browser support
now targets modern ES2020-capable browsers rather than CRA's broader
Browserslist set. See [the migration plan](vite-migration.md) for evidence and blockers.

## Acceptance Criteria
- `npm audit` reports **0 critical** and **0 high** vulnerabilities (or documented acceptable risk with mitigations).
- All external scripts/styles have valid SRI hashes or are self‑hosted.
- Security headers are present on both staging and production deployments (verified via `curl -I`).
- Docker image builds without `.git` leakage and runs as non‑root with read‑only filesystem.
- Kubernetes manifests pass `kubectl apply --dry-run=client` and show no removed‑API warnings.
- Contact form is resistant to automated spam (honeypot field present, Formspree spam protection enabled).
- All code changes are covered by at least one unit test or functional test.

## Timeline
- **Week 1**: Dependency upgrades, SRI implementation, Netlify headers.
- **Week 2**: Dockerfile/K8s hardening, build consistency verification, form spam protection, component fixes.
- **Week 3**: Documentation, final audit, peer review, merge to main.

## Risks & Mitigations
- **Dependency lock‑in**: Use semantic versioning; test upgrades in a separate branch before merging.
- **SRI generation**: Use online SRI generators or `openssl dgst -sha384 -binary` + base64 for each asset.
- **Docker/pod security**: Run a scan (e.g., `trivy`) on the built image before deployment.

---
