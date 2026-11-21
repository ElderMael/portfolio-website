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
- **Code checks:** Pending. Run focused home tests, `npm test`, `npm run lint`,
  and `npm run build`; retain command output at the pinned cumulative story
  revision. Engineering reviewer judges code and test evidence.
- **Integration / end-to-end:** Pending. Check the home route at desktop and
  mobile widths, link destinations, keyboard access, semantic headings, and
  narrow-screen overflow. Record environment, widths, and visual evidence;
  caller judges the journey.
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
  description, OpenTelemetry contribution descriptions/PR links, and other
  already-present public work links only where context is supported; result is
  self-contained work context with inspectable destinations; check rendered
  home content and links in focused tests; status: proposed; ordered commits:
  Pending.
- S2 (J2): Improve the featured-work hierarchy and responsive and accessible
  presentation across desktop and mobile. T2 depends on T1 content structure.
  Write scope: `src/components/Home.css` and only necessary markup in
  `Home.tsx`. Acceptance: hierarchy is scannable, layout fits narrow screens,
  and semantic structure, keyboard focus, and link labels remain usable.
  T2: Style the featured-work area consistently with the existing visual
  system; result is legible responsive cards/sections without horizontal
  overflow; check desktop/mobile rendering, keyboard focus, and accessible
  names; status: proposed; ordered commits: Pending.
- S3 (J1, J2): Add meaningful regression coverage and verify the integrated
  result. T3 depends on T1 and T2.
  Write scope: `src/components/Home.test.tsx` and tests directly needed for the
  featured-work journey. Acceptance: tests assert supported content, existing
  evidence URLs, semantic access, and avoidance of unsupported claims; lint,
  build, and desktop/mobile checks are recorded.
  T3: Add/update tests and run focused tests, `npm test`, lint, build, and
  desktop/mobile checks; result is evidenced functional and responsive
  presentation; check command output, browser evidence, and focused test
  assertions; status: proposed; ordered commits: Pending.
- Checkpoint: Pending. Attach evidence for J1 and J2, the pinned trunk revision,
  ordered story commit SHAs, test/lint/build results, desktop/mobile evidence,
  keyboard/accessibility observations, applicable change review, and remaining
  risks. Caller decision: Pending.

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

- Status: plan prepared; implementation has not started.
- Base SHA: `11833aed72b95f8b8370a20b2c847ad4627150ad`.
- Task states: T1 proposed; T2 proposed; T3 proposed. Commits and acceptance
  evidence: Pending.
- No domain-language, scope, or approval question currently blocks planning.
