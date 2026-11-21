# Portfolio expansion

## Goal

Expand the approved portfolio with separate organization and technology
marquees, a provisional work-process section, and an `/about` page that
presents Miguel's engineering summary and work history.

## Agreed direction

- Add separate “Worked with” groups for organizations and technologies. Avoid
  implying client relationships, partnerships, or endorsement that have not
  been confirmed.
- Miguel selected Nextdata, InDebted, greyshore, and Thoughtworks for the
  organization group. Present their relationship accurately. Use styled text
  when image permissions are unclear; Miguel approved this fallback.
- Curate a broader set of technologies from the existing resume. Show muted
  experience durations only where the resume explicitly gives a figure for
  that technology; label them as resume figures rather than current totals.
- Draft a work-process section using only themes supported by existing
  material. Mark the wording provisional and request Miguel's review.
- Add `/about` and a navigation link. Include an engineering summary and
  work history based on the existing resume, with details and publication
  permissions reviewed by Miguel. Keep `public/resume-mael.pdf` accessible
  by direct URL but do not link to the PDF publicly.
- Preserve existing routes, contact behavior, theme selection, and shared
  animation pause and reduced-motion support. Use the existing visual system.
- Marquees must remain readable and usable with keyboard and assistive
  technology, provide a visible pause mechanism, and become static under
  reduced motion. Avoid duplicate announcements from repeated logo tracks.

## Task 1: Content and asset discovery

- [x] Inventory the resume and existing site for work-history, process, and
      technology candidates. Do not publish private details, unverified metrics,
      or claims without Miguel's approval.
- [x] Research initial official logo guidance and record the safe fallback
      below. Further asset-specific approval is needed before adding images.
- [x] Prepare an About outline and process draft for Miguel's review; he liked
      the draft and provided corrected Nextdata, InDebted, and greyshore dates.
      Use the shorter Principal Software Engineer title on home.

### Initial logo guidance

- [Thoughtworks media resources](https://www.thoughtworks.com/about-us/news/media-resources)
  restrict its media assets to editorial use; a personal portfolio's use has
  not been cleared. Use text unless permission is established.
- [Microsoft brand guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks)
  require express licensing for logos; use the Azure name as text unless
  applicable permission is established.
- [Linux Foundation trademark policy](https://www.linuxfoundation.org/legal/trademark-usage)
  and [OpenTelemetry guidance](https://opentelemetry.io/community/marketing-guidelines/)
  apply to their marks. An open-source asset license alone does not establish
  trademark permission.
- No suitable portfolio-use authorization was verified for the selected
  company logos. The logo-research agent timed out; the sources above were
  checked directly afterward. Do not treat missing guidance as permission.

## Task 2: Home marquee and work process

- [x] Implement separate responsive organization and technology groups with
      approved labels. Use styled text until individual image permissions are
      established; make motion pausable and respect reduced motion.
- [x] Add provisional work-process themes based on existing material. Miguel
      approved this first version; future refinement remains welcome.
- [x] Add meaningful tests and check desktop and mobile captures. The static
      paused and reduced-motion layouts expose all items; broader physical
      device, keyboard, and assistive-technology checks remain for handoff.

## Task 3: About page

- [x] Implement `/about` with the reviewed summary and work history, corrected
      Nextdata, InDebted, and greyshore entries, and community links. Miguel
      approved this version. Education was left out; the PDF remains unlinked.
- [x] Add the route, navigation link, page title, skip-link target, and direct
      local navigation. Preserve the unknown-route fallback and other routes.
- [x] Add meaningful tests and review desktop/mobile captures. Full
      assistive-technology and deployed-route review remain handoff checks.

## Task 4: Review and handoff

- [x] Review claims, company associations, visual treatment, and motion
      controls with Miguel. He approved the first home and About versions;
      older history boundary months and eventual logo permissions remain for
      future review. Experience durations are explicitly labeled resume figures.
- [x] Run tests, lint, build, and relevant local direct-route checks. All 23
      tests passed, and a network-isolated Docker container returned the app
      shell for `/`, `/about`, `/social`, `/contact-me`, and `/unknown`.
      Chrome checks confirmed both marquees display a static wrapped list when
      paused or under reduced motion. After deployment, all routes served the
      current bundle; Chrome rendered their expected headings and titles, and
      the live marquees passed the same motion checks. The About top section
      was inspected at 390 and 1440 pixels. A later full-page headless Chrome
      capture review covered all four pages at both widths; automated keyboard
      traversal found visible focus outlines and tested the skip link and empty
      form validation. Axe found no confirmed WCAG A/AA violations, but flagged
      contrast cases for review; solid gradient endpoint pairs were checked.
      An actual screen-reader and physical-device accessibility audit remains
      outstanding.
