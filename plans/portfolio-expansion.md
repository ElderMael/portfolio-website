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
- Curate a broader set of technologies from the existing resume. Confirm
  potentially ambiguous expertise or branding rather than inventing claims.
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

- [ ] Implement separate responsive organization and technology groups with
      approved labels and assets. Use restrained, pausable marquee motion;
      respect reduced motion and prevent content loss with images disabled.
- [ ] Add the reviewed provisional work-process content. Preserve approved
      home content, contact actions, and existing behavior.
- [ ] Add meaningful tests and check desktop, mobile, keyboard, contrast,
      motion preferences, and image loading.

## Task 3: About page

- [ ] Implement `/about` with a reviewed engineering summary, work-history
      entries, and other approved content. Do not expose personal resume details
      or link to the PDF unless separately approved.
- [ ] Add the route, navigation link, page title, and direct-route behavior.
      Preserve the unknown-route fallback and all current routes.
- [ ] Add meaningful tests, review desktop/mobile, and verify the build,
      accessibility, links, and direct navigation.

## Task 4: Review and handoff

- [ ] Review claims, company associations, visual treatment, motion controls,
      and accessibility with Miguel; resolve or explicitly record gaps.
- [ ] Run tests, lint, build, and relevant deployment/direct-route checks.
      Retain remaining assistive-technology and full-page review items from
      `plans/portfolio-redesign.md`.
