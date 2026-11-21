# PORT-001 Goal

## Context and goal

The home page has short professional-work cards and public links, but little
self-contained context for a visitor to assess that work. This story will make
a featured-work area more informative by showing role, available problem or
work context, contribution, and evidence using only copy and links already in
the repository. Improve the area’s visual hierarchy and responsive presentation
for desktop and mobile.

The approved inspiration is Eduardo Urias's evidence-led work presentation.
Borrow only the general approach of clear context and inspectable work; do not
copy branding, wording, or layout. Do not invent client outcomes, metrics,
testimonials, client affiliations, or permissions. Do not add a resume link;
`public/resume-mael.pdf` must remain unlinked. Keep the approved work-process
wording unchanged and outside this story.

Success: visitors can identify what each featured example is, the role or
contribution supported by current site material, and follow its existing public
evidence link. The presentation remains usable and legible at desktop and
mobile widths. Rollout: direct, unflagged home-page presentation after human
acceptance; release is a separate decision.

Anchors: `src/components/Home.tsx`, `Home.css`, `Home.test.tsx`, `About.tsx`,
`index.html`; existing decisions and copy in `plans/portfolio-redesign.md` and
`plans/portfolio-expansion.md`. Research source:
[Eduardo Urias's site](https://www.eduardourias.com/). The read-only research
summary supports general inspiration only; it does not verify responsive
behavior or personal/client claims.

## Journeys

J1: A prospective collaborator visits the home page, scans featured work,
understands the supported role/context/contribution, and follows a public link
to inspect the evidence. If no repository-backed detail exists for a field,
the presentation omits it rather than implying a fact.

J2: A desktop or mobile visitor navigates the featured-work area by sight,
keyboard, and assistive technology and can identify headings and evidence links.

## Feature acceptance

- **Demo:** Pending. At feature-ready, demonstrate the home journey at desktop
  and mobile widths and show the evidence destinations. Environment, widths,
  and screenshots are Pending; caller judges the demo.
- **Code checks:** At pinned revision
  `68e985e882f0834884c913543fa68372c7d0c868`, focused home tests passed
  (1 file, 3 tests), full `npm test` passed (7 files, 23 tests), lint passed,
  and build passed (`tsc --noEmit` and Vite production build). Tests preserve
  neo-pokepet-pi as a small existing project note with explicit fork, upstream,
  and sprite credits; it is not promoted to a full case study without
  supported context. T2 review found focus overlap; final review was clear
  after the accepted focus fix in
  `99afc8f73186fba73675959212e739e9e123ad04`. Retain pinned review evidence
  with the final acceptance packet.
- **Integration / end-to-end:** Chrome 158.0.8127.36 headless browser checks
  passed on the local Vite app at 390px and 1440px at the pinned revision
  above. Evidence records semantic h2/h3 headings, no horizontal overflow,
  side-by-side desktop cards and stacked mobile cards, link names and exact
  hrefs for Nextdata and two OpenTelemetry PRs, and keyboard Tab navigation
  from the Nextdata link to the Helm chart PR link with `:focus-visible` and
  a solid 3px outline; screenshots were captured. GitHub destination rendering
  was not verified. Screen-reader testing and physical-device/mobile-browser
  testing were not performed.
- **Human pair/mob:** Pending; record actual participation and findings or
  state that it did not occur. Do not imply participation.
- **Specialist review:** Request `change_review` on all marked story commits at
  a pinned cumulative revision. No extension contract changes are planned;
  reassess if implementation changes one. No specialist review currently
  indicated beyond engineering review.
- **Security triage:** No trust-boundary change is planned: no access-control,
  sensitive-data, external-input/dependency, or exposure change. Security
  review is not applicable on this basis; reassess if scope changes.
- **Human product acceptance:** Pending. Caller reviews the pinned evidence and
  explicitly accepts or records findings. Feature acceptance and release are
  separate; fixes require new commits and rerunning impacted checks at a new
  pin.

## Phase dependencies

P1 is serial and contains the whole featured-work journey. T1 defines the
content presentation before T2 styles that same area; T2 depends on T1’s stable
markup/content shape. T3 tests the integrated result and depends on T1 and T2.
All tasks touch the home experience and may share `Home.tsx`, `Home.css`, and
`Home.test.tsx`; use serial trunk writes. No parallel work is planned.

## Phases

### P1: Make supported work inspectable and present it accessibly

- Entry: approved story scope and existing repository copy and links are
  available. Base revision: `11833aed72b95f8b8370a20b2c847ad4627150ad`.
- S1 (J1): Add an evidence-backed featured-work presentation for current
  professional work and public contributions. Show only role/context and
  contribution details already supported by repository copy; link existing
  public evidence. Omit unsupported problem statements or outcomes.
  Write scope: `src/components/Home.tsx` and associated home content only.
  Acceptance: visible examples clearly distinguish professional experience
  from open-source contributions and do not assert client affiliations or
  unverified results.
  T1: Add the evidence-backed presentation using the existing Nextdata
  description and OpenTelemetry contribution descriptions/PR links. Keep
  neo-pokepet-pi as a small existing project note, retaining its explicit
  attribution as a fork of djdiptayan's pi-pokepet and crediting aryantuntune
  for the terminal sprites; do not promote it to a full case study without
  supported context. Add other work links only when repository-backed context
  supports them. Result: self-contained work context with inspectable
  destinations; focused home tests check rendered content and links, including
  the project note and all three credits; status: complete; ordered commits:
  `f393c138c8c62aedf33f18675b8bf51a8a16b0f8`.
- S2 (J2): Improve the featured-work hierarchy and responsive and accessible
  presentation across desktop and mobile. T2 depends on T1 content structure.
  Write scope: `src/components/Home.css` and only necessary markup in
  `Home.tsx`. Acceptance: hierarchy is scannable, layout fits narrow screens,
  and semantic structure, keyboard focus, and link labels remain usable.
  T2: Style the featured-work area consistently with the existing visual
  system; result: legible responsive cards/sections without horizontal
  overflow. Focused tests, lint, build, and browser checks at 390px and 1440px
  passed; keyboard focus styling was fixed and verified. T2 review found
  focus overlap; final review was clear after the accepted focus fix at
  `99afc8f73186fba73675959212e739e9e123ad04`. Status: complete; ordered
  commits: `fa29e3a9232a20353486188eac68fd4963667073`,
  `99afc8f73186fba73675959212e739e9e123ad04`.
- S3 (J1, J2): Add meaningful regression coverage and verify the integrated
  result. T3 depends on T1 and T2.
  Write scope: `src/components/Home.test.tsx` and tests directly needed for the
  featured-work journey. Acceptance: tests assert supported content, existing
  evidence URLs, semantic access, and avoidance of unsupported claims; lint,
  build, and desktop/mobile checks are recorded.
  T3: Add/update regression tests for supported content, existing evidence
  URLs, semantic access, and avoidance of unsupported claims. Run focused tests,
  full `npm test`, lint, build, and desktop/mobile checks; result is an
  evidenced functional and responsive presentation. Focused tests (1 file,
  3 tests), full `npm test` (7 files, 23 tests), lint, build, and Chrome browser
  checks at 390px/1440px passed at
  `68e985e882f0834884c913543fa68372c7d0c868`. Screen-reader and
  physical-device/mobile-browser checks were not performed; external GitHub
  rendering was not verified. Status: complete; ordered commits:
  `68e985e882f0834884c913543fa68372c7d0c868`.
- Checkpoint: T1/T2 and their accepted fix are landed; T3 checks passed at
  pinned revision `68e985e882f0834884c913543fa68372c7d0c868`. Evidence includes
  the full test suite, lint, build, and Chrome checks at 390px and 1440px.
  T2's final review was clear after the accepted focus fix. Human pair/mob
  participation was not recorded; screen-reader, physical-device/mobile-browser,
  and external GitHub rendering checks were not performed. Human product
  acceptance and release remain Pending. The caller judges the cumulative J1/J2
  evidence, remaining risks, and acceptance decision.

## Glossary and decisions

- Vocabulary follows existing portfolio usage of “selected work,”
  “contribution,” and “evidence” in the home page and prior plans. No glossary
  artifact was added because this story's authorized write scope is the plan
  only.
- Relevant decisions and content constraints:
  [`plans/portfolio-redesign.md`](portfolio-redesign.md) and
  [`plans/portfolio-expansion.md`](portfolio-expansion.md).
- No ADR is proposed: this work is a reversible home-page presentation change
  and imposes no lasting public contract or cross-domain dependency.
- Inspiration source: [Eduardo Urias](https://www.eduardourias.com/); use only
  the general evidence-led presentation approach, not its identity or content.

## Progress and open questions

- Status: T1, T2, and T3 complete. Human feature acceptance and release are
  not complete.
- Base SHA: `11833aed72b95f8b8370a20b2c847ad4627150ad`.
- Pinned T3 evidence revision:
  `68e985e882f0834884c913543fa68372c7d0c868`.
- Task states: T1 complete (`f393c138c8c62aedf33f18675b8bf51a8a16b0f8`);
  T2 complete (`fa29e3a9232a20353486188eac68fd4963667073`,
  `99afc8f73186fba73675959212e739e9e123ad04`); T3 complete
  (`68e985e882f0834884c913543fa68372c7d0c868`).
- Focused tests (1 file, 3 tests), full `npm test` (7 files, 23 tests), lint,
  build, and Chrome checks at 390px/1440px passed at the pinned T3 evidence
  revision. T2 final review was clear after the accepted focus fix. No
  screen-reader or physical-device/mobile-browser testing was performed, and
  external GitHub rendering was not verified. Human pair/mob was not recorded;
  human feature acceptance and release remain Pending.
- No domain-language, scope, or approval question currently blocks planning.
