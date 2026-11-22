import { cleanup, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { Home } from './Home';

afterEach(cleanup);

describe('home experience panels', () => {
  it('presents selected employers and technologies once to assistive technology', () => {
    render(<MemoryRouter><Home /></MemoryRouter>);

    const employersSection = screen.getByRole('region', {
      name: 'Organizations I have worked for.',
    });
    const employerList = within(employersSection).getByRole('list', { name: 'Selected employers' });
    expect(within(employerList).getAllByRole('listitem')).toHaveLength(4);
    expect(within(employerList).getByText('Nextdata')).toBeInTheDocument();
    expect(within(employerList).getByText('Current employer')).toBeInTheDocument();
    expect(within(employerList).getByText('InDebted')).toBeInTheDocument();
    expect(within(employerList).getByText('greyshore')).toBeInTheDocument();
    expect(within(employerList).getByText('Thoughtworks')).toBeInTheDocument();
    expect(employersSection).toHaveTextContent('not client affiliations');
    expect(employersSection.querySelector('img')).toBeNull();
    expect(employersSection.querySelector('.home-marquee-items[aria-hidden="true"]'))
      .toBeInTheDocument();

    const technologiesSection = screen.getByRole('region', {
      name: 'Technologies represented in my experience.',
    });
    const technologyList = within(technologiesSection).getByRole('list', {
      name: 'Selected technologies',
    });
    expect(within(technologyList).getAllByRole('listitem')).toHaveLength(18);
    [
      'AWS', 'Microsoft Azure', 'Google Cloud (GCP)', 'Kubernetes', 'Terraform', 'Pulumi',
      'GitHub Actions', 'Grafana', 'Prometheus', 'OpenTelemetry', 'ClickHouse', 'Java',
      'JavaScript', 'Spring Boot', 'Go', 'Rust', 'React', 'Node.js',
    ].forEach((technology) => {
      expect(within(technologyList).getByText(technology)).toBeInTheDocument();
    });

    [
      ['Google Cloud (GCP)', 'resume: 4 years'],
      ['GitHub Actions', 'resume: 2 years'],
      ['Java', 'resume: 11 years'],
      ['JavaScript', 'resume: 9 years'],
      ['Spring Boot', 'resume: 7 years'],
      ['Go', 'resume: 3 years'],
      ['Rust', 'resume: 3 years'],
      ['Node.js', 'resume: 4 years'],
    ].forEach(([technology, duration]) => {
      const item = within(technologyList).getByText(technology).closest('li');
      expect(within(item!).getByText(duration)).toBeInTheDocument();
    });

    ['AWS', 'Microsoft Azure', 'Kubernetes', 'Terraform', 'Pulumi', 'Grafana', 'Prometheus',
      'OpenTelemetry', 'ClickHouse', 'React'].forEach((technology) => {
      const item = within(technologyList).getByText(technology).closest('li');
      expect(item?.querySelector('.home-marquee-item-detail')).toBeNull();
    });
  });

  it('presents the approved leadership section and its four cards', () => {
    render(<MemoryRouter><Home /></MemoryRouter>);

    const process = screen.getByRole('region', { name: 'Leading through the work.' });
    expect(within(process).getByText('How I lead')).toBeInTheDocument();
    expect(within(process).getByText(
      'I stay hands-on, guiding technical work through collaboration, practical engineering, and shared learning.',
    )).toBeInTheDocument();
    const cards = [
      ['Platforms & architecture',
        'I help shape and evolve platforms and architecture around product and developer needs.'],
      ['Integration & collaboration',
        'I work on systems integration alongside engineers, including customer engineers where relevant.'],
      ['Engineering & operations',
        'I bring observability, security, and CI/CD into technical conversations and engineering work.'],
      ['Mentoring & leadership',
        'I mentor engineers, support their growth, and help them develop the skills and confidence to lead.'],
    ];
    expect(within(process).getAllByRole('article')).toHaveLength(4);
    cards.forEach(([heading, description]) => {
      const card = within(process).getByRole('heading', { name: heading }).closest('article');
      expect(card).not.toBeNull();
      expect(within(card!).getByText(description)).toBeInTheDocument();
    });
  });

  it('presents three draft decision principles after the unchanged leadership cards', () => {
    render(<MemoryRouter><Home /></MemoryRouter>);

    const process = screen.getByRole('region', { name: 'Leading through the work.' });
    const principles = screen.getByRole('region', { name: 'Principles behind the practice.' });
    expect(process.compareDocumentPosition(principles) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(within(principles).getByText('Working principles · draft')).toBeInTheDocument();
    expect(within(principles).getByRole('heading', { level: 2 })).toBeInTheDocument();
    const orderedList = within(principles).getByRole('list');
    const items = within(orderedList).getAllByRole('listitem');
    expect(items).toHaveLength(3);
    [
      ['Start with product and developer needs.',
        'Shape platforms and architecture around the people building and using them.'],
      ['Bring operational concerns into the work.',
        'Consider observability, security, and CI/CD as part of engineering work.'],
      ['Make learning collaborative.',
        'Work alongside engineers and share knowledge through mentoring.'],
    ].forEach(([heading, description], index) => {
      expect(within(items[index]).getByRole('heading', { level: 3, name: heading })).toBeInTheDocument();
      expect(within(items[index]).getByText(description)).toBeInTheDocument();
    });
    expect(within(process).getAllByRole('article')).toHaveLength(4);
    expect(within(process).getByRole('heading', { name: 'Platforms & architecture' })).toBeInTheDocument();
  });

  it('keeps the approved experience copy and links accessible', () => {
    render(<MemoryRouter><Home /></MemoryRouter>);

    const experience = screen.getByRole('region', {
      name: 'Professional experience, and contributions in the open.',
    });
    expect(within(experience).getByRole('heading', {
      level: 2,
      name: 'Professional experience, and contributions in the open.',
    })).toBeInTheDocument();

    const nextdata = within(experience).getByRole('heading', {
      level: 3,
      name: 'Nextdata',
    }).closest('article');
    expect(nextdata).not.toBeNull();
    expect(within(nextdata!).getByText('Current experience')).toBeInTheDocument();
    expect(within(nextdata!).getByText(
      'Principal Software Engineer working across Nextdata OS, infrastructure and platform engineering, field engineering, and customer onboarding.',
    )).toBeInTheDocument();
    expect(within(nextdata!).getByRole('link', { name: 'Nextdata website' })).toHaveAttribute(
      'href', 'https://www.nextdata.com/',
    );
    expect(within(nextdata!).queryByRole('link', { name: /OpenTelemetry|PR/i }))
      .not.toBeInTheDocument();

    const openTelemetry = within(experience).getByRole('heading', {
      level: 3,
      name: 'Two project contributions',
    }).closest('article');
    expect(openTelemetry).not.toBeNull();
    expect(within(openTelemetry!).getByText('Open source · OpenTelemetry')).toBeInTheDocument();
    const contributions = [
      {
        linkName: 'Helm chart webhook fix',
        href: 'https://github.com/open-telemetry/opentelemetry-helm-charts/pull/1391',
        description: 'Webhook configuration fix for the Helm chart.',
      },
      {
        linkName: 'ClickHouse exporter DDL documentation',
        href: 'https://github.com/open-telemetry/opentelemetry-collector-contrib/pull/35903',
        description: 'Documentation for the ClickHouse exporter’s DDL.',
      },
    ];
    const contributionItems = within(openTelemetry!).getAllByRole('listitem');
    expect(contributionItems).toHaveLength(contributions.length);
    contributions.forEach(({ linkName, href, description }, index) => {
      const item = within(contributionItems[index]);
      expect(item.getByRole('link', { name: linkName })).toHaveAttribute('href', href);
      expect(item.getByText(description)).toBeInTheDocument();
    });

    const projectNote = within(experience).getByText(/my fork of/);
    expect(projectNote).toHaveTextContent('my fork of djdiptayan’s pi-pokepet');
    expect(projectNote).toHaveTextContent('terminal sprites by aryantuntune');
    expect(within(projectNote).getByRole('link', { name: 'neo-pokepet-pi' })).toHaveAttribute(
      'href', 'https://github.com/ElderMael/neo-pokepet-pi',
    );
    expect(within(projectNote).getByRole('link', { name: 'djdiptayan’s pi-pokepet' })).toHaveAttribute(
      'href', 'https://github.com/djdiptayan1/pi-pokepet',
    );
    expect(within(projectNote).getByRole('link', { name: 'aryantuntune' })).toHaveAttribute(
      'href', 'https://github.com/djdiptayan1/pi-pokepet/pull/15',
    );

    const earlier = within(experience).getByRole('complementary', { name: 'Earlier experience' });
    expect(earlier).toHaveTextContent(
      'Earlier experience includes platform and cloud work at ThoughtWorks and Greyshore, along with mentorship at ThoughtWorks.',
    );
    expect(experience.querySelectorAll('.home-card-index[aria-hidden="true"]')).toHaveLength(2);
  });
});
