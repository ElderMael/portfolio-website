# Security status

This file summarizes the security work tracked in
[the security fixes plan](plans/security-fixes/security-fixes.md).

## Findings and mitigations

- `npm audit` currently reports two moderate React Router advisories:
  [GHSA-wrjc-x8rr-h8h6](https://github.com/advisories/GHSA-wrjc-x8rr-h8h6)
  and
  [GHSA-337j-9hxr-rhxg](https://github.com/advisories/GHSA-337j-9hxr-rhxg).
  The available fix requires a major React Router upgrade. Compatibility
  testing is still needed; no high or critical findings were reported in the
  most recent local audit.
- External stylesheets are protected with SRI. Fonts and icons are self-hosted
  or bundled locally.
- Netlify configures baseline response headers and a report-only CSP.
  Production and deploy-preview headers still need verification.
- Docker is configured to run nginx as non-root with a health check. Kubernetes
  hardening is in place, but its published image digest must be supplied before
  deployment.
- The contact form has a honeypot. Formspree account-level spam settings cannot
  be verified from this repository and must be checked in the Formspree
  dashboard.

## Before release

1. Verify security headers on staging and production with `curl -I`.
2. Publish the container and replace the CI tag with its immutable digest.
3. Verify Formspree spam protection in the account dashboard.
4. Run `npm audit`, tests, lint, and build; review any new findings.
5. Request a peer review of the security changes.
