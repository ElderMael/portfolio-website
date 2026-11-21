# Portfolio Redesign Plan

## Goal

Modernize Miguel Enriquez's portfolio for both prospective employers and
clients, while retaining his engineering identity and Matrix theme. Take
inspiration from [Eduardo Urias's site](https://www.eduardourias.com/): clear
positioning, strong editorial hierarchy, concise capabilities, and a thoughtful
progression from introduction to action. Do not copy its wording, branding, or
visual design.

This is a planning document; implementation has not begun. Deliver the whole
site incrementally, page by page, with a distinct phase for each page. Keep
existing routes working while the information architecture evolves.

## Agreed direction

- **Audience:** employers and clients, with clear paths for each. Welcome both
  engineering and architecture projects and advisory or mentorship inquiries.
  The initial site language is English.
- **Positioning:** lead with AI and systems engineering applied to DevOps,
  platform engineering, and data engineering. Use a direct, approachable
  voice. Miguel accepted “Building systems that help people build” as a draft
  opening headline.
- **Content:** balance experience and expertise with a mix of public projects
  and professional work. Give mentorship and PirateDevRadio a dedicated home
  section. Keep the less-active newsletter secondary; use verified details.
- **Visual identity:** Matrix character and a color system informed by Sanzo
  Wada's *A Dictionary of Color Combinations*. Offer two toggleable dark
  themes: the current green-black concept as the lighter theme and a new,
  near-black darker theme as the default. Miguel approved the mockup's two
  backgrounds as starting points. Remember the visitor's choice in their
  browser, with a usable fallback if storage is unavailable.
- **Motion:** replace the earlier short reveal with continuous, prominent
  code rain in the background layer and an old-CRT aesthetic. Use larger,
  opaque panels layered like material-design paper sheets, with rain behind
  rather than inside the panels. Miguel approved this direction and requested
  a later visual-polish pass. Content must remain readable and immediately
  available; provide a static reduced-motion alternative. Carry this treatment
  across home, contact, and social.
- **Scope:** streamline the whole site, redesigning it page by page. Put
  experience and selected-work highlights on home and link out for more detail.
- **Professional profile:** link to LinkedIn, accurately labeled. Keep the
  resume PDF available at its existing URL for direct recruiter sharing, but do
  not add a public navigation link to it.
- **Mentorship inquiries:** direct visitors to the site's contact form, which
  will be redesigned in its own later phase.

## Existing baseline

- `/` combines an animated Matrix canvas, navigation, a glitching name, and
  an about card. `/social` lists social links; `/contact-me` has a Formspree
  form and honeypot. Unknown routes currently fall back to the home page.
- Navigation links to GitHub, LinkedIn, the newsletter, the podcast, and social
  pages. The resume PDF in `public/` is shared directly with recruiters; the
  public site should link to LinkedIn instead.
- React, TypeScript, and Vite are already in place. Netlify and the nginx
  configuration copied into Docker specify SPA fallbacks. A subsequent
  network-isolated container check returned the app shell for all routes.
  Preserve service-worker unregister behavior.
- The existing site supplies capability descriptions, but not detailed project
  case studies or verified outcome metrics. Do not fabricate claims, client
  names, testimonials, results, or permissions.

## Approved information architecture

- **Home (`/`):** introduction, expertise, experience and selected-work
  highlights (Nextdata first, then OpenTelemetry), a brief earlier-experience
  summary, mentorship and PirateDevRadio, and a contact action.
- **Contact (`/contact-me`):** an improved form for professional and mentorship
  inquiries, retaining the existing form behavior unless separately approved.
- **Social (`/social`):** a curated directory prioritizing LinkedIn and GitHub,
  PirateDevRadio and YouTube, and Twitch, TikTok, and Instagram. Keep Patreon,
  Ko-fi, Substack, and X as secondary links. Do not retain Facebook or the
  current Anchor link or the inactive `piratedevradio.tech`. Use the
  [PirateDevRadio YouTube channel](https://www.youtube.com/@piratedevradio)
  as the podcast destination.
- Link to LinkedIn as the professional profile; keep the resume PDF available
  by direct URL without adding a public navigation link.

## Working design principles

- Lead with a distinctive, honest positioning statement and short introduction;
  offer both a professional profile/resume path and a contact path.
- Use generous spacing, clear typography, strong hierarchy, and concise sections
  rather than reproducing the inspiration site's layout or language.
- Make continuous Matrix rain a distinctive, non-blocking background without
  flashing or obstructing reading. Provide a keyboard-accessible pause control
  at the bottom of every page, a static reduced-motion alternative, and
  validate performance and contrast over the moving background.
- Use an ink-dark foundation, restrained greens, and complementary colors
  informed by an actual documented Wada combination. Neon green may remain a
  selective identity accent rather than the entire palette.
- Prioritize legibility, keyboard operation, responsive layouts, performance,
  and semantic HTML throughout.

## Color research and approval

The books contain many combinations, so the final palette is not yet chosen.
Explore actual combinations from both volumes, recording the source, combination
identifier or page, original color names, and digital values used. Digital
references are interpretations of printed colors, not guaranteed exact matches.
Compare shortlisted swatches in context before choosing; distinguish sourced
colors from any added or adjusted functional colors.

References for exploration:

- [Independent archive covering both volumes](https://github.com/arron21/dictionary-of-color-combinations)
- [Wada palette index](https://wadacolors.com/combinations)

Research shortlist, pending mockups and final approval. Miguel prefers Volume 1
combination 200 with a dark background; the dark background is an addition,
not one of that combination's sourced colors:

- [Volume 1, combination 200](https://wadacolors.com/combinations/200/):
  Chromium Green `#7A9C6F`, Olive Buff `#CED19B`, Carmine Red `#AD242F`.
- [Volume 2, October preview](https://wadacolors.com/vol-2/): Deep Indigo
  `#001231`, Light Glaucous Blue `#B0CFD7`, Vistoris Lake `#784244`.
- [Volume 2, Clothes, Accessories preview](https://wadacolors.com/vol-2/):
  Night Green `#88C122`, Antwerp Blue `#006E93`, Hermosa Pink `#F7C9D5`,
  Spectrum Red `#DF0716`, White `#FFFFFF`, and Black `#191110`.

A static, non-production [concept mockup](portfolio-concept.html) explores
combination 200 against an added dark background. Miguel likes the layout but
requested more cyberpunk custom typography. After an Oxanium trial, the mockup
now trials the more expressive Orbitron with IBM Plex Sans and Mono. Miguel
also requested Cyberpunk 2077-inspired edges and approved the concept's
stronger cut-corner direction. The final font implementation, accessibility,
and page details remain to be validated. Miguel chose Google Fonts for
production; provide system-font fallbacks. Its wording and color roles
are drafts, not approved copy or a final accessibility assessment.

The Volume 2 preview does not identify combination numbers. These screen
values are approximations, not verified print matches; any additional dark
surfaces or Matrix accents must be identified as additions. No contrast ratios
have yet been verified against the final implementation. A preliminary
calculation for the mockup's solid colors found Chromium Green at 5.14:1 or
higher and Olive Buff at 9.98:1 or higher against its two backgrounds and two
surfaces. Carmine Red is only 2.32:1–2.86:1 against them, so reserve it for
decoration, not text or meaningful indicators, unless adjusted and retested.
These checks do not cover transparency, gradients, or interaction states.

Define semantic tokens for background, surface, text, muted text, borders,
actions, focus, and Matrix effects. Validate all intended foreground/background
pairs against WCAG AA: at least 4.5:1 for normal text, 3:1 for large text, and
3:1 for meaningful UI components and focus indicators. Do not rely on color
alone. Get Miguel's approval of a palette presented in realistic page mockups
before rolling it across the site.

## Delivery and verification rules

Each task should leave the site deployable. After each task, record completed
checkboxes, decisions, and verification results here; commit the plan update
with the related changes in an atomic conventional commit. Obtain approval at
explicit design and content decision points. Do not invent content to unblock
implementation.

For code changes, run relevant tests, `npm run lint`, and `npm run build`. Add
meaningful behavior tests; cover routes, navigation, interactive controls,
contact form behavior, and reduced-motion handling as applicable. Check affected
pages on desktop and mobile, including keyboard focus, overflow, readability,
reduced motion, and direct route navigation. Record actual results and any
unavailable checks rather than claiming unperformed visual verification.

## Phase 1: Discovery and design foundation

### Task 1: Inventory and content preparation

- [x] Audit existing pages, links, assets, responsive behavior, and animation;
      record the baseline and remaining verification gaps below.
- [x] Gather Miguel's positioning, experience highlights, selected projects,
      and intended links. Specific outcomes and publication permissions remain
      subject to review before publishing.
- [x] Review approved social, LinkedIn, podcast, and contact destinations.
      Browser verification and form delivery are release checks, as noted
      below; do not treat the review as a successful delivery test.
- [x] Agree on the page map and high-level content outline above. Put selected
      work and experience highlights on home; avoid unsupported claims.

#### Discovery notes (in progress)

- Miguel identified [Nextdata](https://www.nextdata.com/) as a professional
  project and supplied his [resume](https://eldermael.io/resume-mael.pdf). The
  downloaded PDF matches `public/resume-mael.pdf` byte for byte. Miguel
  confirmed his current title as Principal Software Engineer at Nextdata. The
  resume describes work across Nextdata OS, pilot-client features, field
  engineering, and customer onboarding. Miguel also wants infrastructure and
  platform engineering included. Miguel approved the implemented summary:
  “Principal Software Engineer working across Nextdata OS, infrastructure and
  platform engineering, field engineering, and customer onboarding.” Company
  product claims are not personal achievements; confirm permissions before
  publishing any additional details.
- The resume also describes platform engineering and mentorship at ThoughtWorks,
  platform and cloud work at Greyshore, and PirateDevRadio. Treat its dates,
  metrics, and descriptions as leads for Miguel to review, not verified claims.
- Miguel selected [neo-pokepet-pi](https://github.com/ElderMael/neo-pokepet-pi)
  as a potential public-project highlight. He created the fork to make sprite
  functionality work; the sprite contribution itself came from another person.
  Credit the original pi-pokepet project and avoid attributing the sprite
  contribution to Miguel. Miguel approved the concise secondary-link wording
  crediting djdiptayan and aryantuntune. He also chose to highlight
  both merged OpenTelemetry contributions: a
  [Helm chart webhook fix](https://github.com/open-telemetry/opentelemetry-helm-charts/pull/1391)
  and [ClickHouse exporter DDL documentation](https://github.com/open-telemetry/opentelemetry-collector-contrib/pull/35903).
  Keep the highlight concise and describe the latter as documentation, not a
  runtime change.
- [Miguel's Linktree](https://linktr.ee/eldermael) describes software and
  leadership mentorship and links to Patreon, PirateDevRadio, LinkedIn, and
  social channels. It does not establish specific mentorship engagements or
  outcomes; ask Miguel before representing them as case studies.
- The site audit captured desktop home and contact and mobile home and social
  in headless Chrome. It found five-second delays on key content, no apparent
  reduced-motion support, and a clipped home heading at 390 pixels wide. The
  Matrix background did not appear in desktop captures; investigate stacking.
- The audit ran `npm test` (3 files, 5 tests), `npm run lint`, and
  `npm run build` successfully; Vite returned HTTP 200 for `/contact-me`.
  Keyboard, screen-reader, contrast, Formspree delivery, and production deep
  links remain unverified. The existing resume link actually goes to LinkedIn.
- Public link checks identified the intended LinkedIn, GitHub, YouTube,
  Instagram, Patreon, Ko-fi, Substack, and X pages. Patreon redirects to its
  canonical path. Miguel confirmed `twitch.tv/eldermael` and
  `tiktok.com/@eldermael`; extracted page content could not independently
  verify their profiles. Miguel later confirmed both links lead to his intended
  profiles; search results also show matching handles.
- The contact form's action and fields were inspected in source and the
  honeypot is covered by a test; actual Formspree delivery was not tested.
- The updated concept was captured in headless Chrome at 390 × 844; the top
  section rendered at that width. Full-page interaction and contrast audits
  remain outstanding.

### Task 2: Visual direction and shared foundation

- [x] Explore and document sourced Wada combinations from both volumes. Agree
      on combination 200 and record preliminary contrast findings.
- [x] Prototype typography, spacing, navigation, semantic color tokens, both
      toggleable themes, and continuous CRT-style rain. Miguel approved the
      direction; further desktop and mobile polish remains in the page tasks.
- [x] Implement the shared shell and tokens incrementally, preserving existing
      routes and behavior. Add a pause control and reduced-motion alternative.
      Full interaction, contrast, performance, and cross-page visual audits
      remain release requirements.

The initial shared shell was checked in headless Chrome at desktop and mobile
sizes; the existing page content remains until its individual redesign. Tests,
ESLint, and the production build were run. The canvas background is visible
in the desktop capture, though animation quality and actual mobile performance
still need a real-browser review.

## Phase 2: Home page (`/`)

### Task 3: Redesign the primary introduction

- [x] Create the approved introduction, audience-appropriate calls to action,
      and concise expertise sections; use Miguel's own positioning and voice.
- [x] Add experience and selected-work content based on the discovery review,
      without invented outcomes or empty case-study cards. Miguel approved the
      Nextdata summary and concise neo-pokepet-pi attribution.
- [x] Add original, Miguel-approved abstract circuitry artwork to the home
      hero, with clockwork-style motion and the motto “Build · Share · Learn ·
      Lead.” The illustration is decorative and responsive, with static
      reduced-motion and shared pause support; no third-party image is used.
- [x] Polish the layered-paper and cyberpunk treatment, including the revised
      experience panels. Miguel approved the home page; broader accessibility
      and device review remain release requirements.
- [x] Use the shared continuous background without delaying home content;
      check the desktop and mobile layouts and primary actions. Full browser,
      keyboard, motion, and contrast audits remain release requirements.

Miguel approved the home-page direction. Headless Chrome captures were taken
at desktop and mobile widths; broader device, font-loading, interaction, and
accessibility checks remain part of the release review.

## Phase 3: Contact page (`/contact-me`)

### Task 4: Redesign the contact experience

Miguel approved the responsive contact redesign and reports that he tested
real form delivery successfully.

- [x] Apply the shared visual language and clarify professional and mentorship
      inquiries without implying unconfirmed services or availability.
- [x] Preserve the existing Formspree endpoint, field names, validation, and
      honeypot.
- [x] Test labels, validation, keyboard focus, submission configuration, and
      local direct navigation. Miguel reports a successful delivery test;
      production direct routing remains a release check.

## Phase 4: Social and community page (`/social`)

### Task 5: Streamline community destinations

Miguel approved the responsive social redesign. Facebook and the old Anchor
link are omitted. Miguel supplied [his X profile](https://x.com/eldermael),
which was verified and added as a secondary link. He confirmed the Twitch and
TikTok links lead to his intended profiles; search results also match the
handles, although automated page extraction could not fully inspect them.

- [x] Reorganize links around the approved priorities for professional work,
      PirateDevRadio, and community.
- [x] Retain `/social` as a working route and apply Miguel's link decisions.
      Production direct navigation and remaining link checks are release tasks.
- [x] Check responsive layout, accessible link names, and external-link markup;
      broader real-browser accessibility review remains a release task.

## Phase 5: Additional approved pages, if needed

### Task 6: Deliver selected-work or other approved pages

- [ ] If discovery approves a separate page, create one phase per page, with
      its own content, implementation, and verification tasks before work
      begins. Use only approved, verifiable material and working destinations.
- [x] No additional page is currently approved or needed; close this task
      without creating a placeholder page. Selected work remains on home.

## Phase 6: Cross-site release review

### Task 7: Verify and hand off

Two read-only release reviews examined revision `58739e5`. Their accessibility
findings prompted a skip link, route-specific titles, and stronger social-link
cues. The integration review identified the stale unused podcast URL and an
outdated Docker README, both corrected afterward. Miguel supplied the X URL in
follow-up; it was verified and added. The reviews did not test a deployed site,
assistive technology, or physical-device performance. After the reviews,
Miguel reported a successful real contact-form delivery test. A
network-isolated Docker container returned the app shell for `/`, `/social`,
`/contact-me`, and `/unknown`; this does not verify browser rendering or a
public deployment. The latest release-fix verification passed 18 tests, lint,
the production build, and `git diff --check`. After pushing `5445b62`, public
routes `/`, `/social`, `/contact-me`, and `/unknown` returned the current app
bundle. Headless Chrome rendered the expected titles and headings on the three
main routes, and top-of-page desktop and mobile captures were inspected. This
was not a full-page or assistive-technology audit. Miguel subsequently
reported the live site looks and works well on a physical mobile device; the
device model and detailed test coverage were not recorded. A subsequent
full-page headless capture and keyboard traversal check covered all four pages
at desktop and mobile widths. Automated accessibility results and remaining
screen-reader limitations are recorded in `plans/portfolio-expansion.md`.

- [ ] Review journeys for employers and clients across all pages, including
      primary calls to action, external links, and the contact form.
- [ ] Check desktop and mobile layouts, keyboard navigation, contrast, reduced
      motion, animation performance, and visible focus across the site.
- [x] Verify direct navigation to `/`, `/social`, `/contact-me`, and the home
      fallback on the public site. A network-isolated Docker container also
      returned the app shell for each route; it was not browser-tested.
- [x] Run relevant tests, lint, and production build; record results and any
      outstanding content or verification gaps. Preserve service-worker cleanup.

## Open decisions

- Final positioning wording, evidence, case studies, and permitted claims.
- Final content outline and destinations for each page.
- Exact color roles and approved contrast-safe adjustments in both themes;
  the preferred source is Wada combination 200.
- Final near-black surface colors and contrast-validated theme tokens.
- Final visual-polish details, image choices, and contrast over the background.
