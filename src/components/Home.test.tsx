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

  it('keeps the approved experience copy and links accessible', () => {
    render(<MemoryRouter><Home /></MemoryRouter>);

    const experience = screen.getByRole('region', {
      name: 'Professional experience, and contributions in the open.',
    });
    expect(within(experience).getByRole('heading', { name: 'Nextdata' })).toBeInTheDocument();
    expect(within(experience).getByText(
      'Principal Software Engineer working across Nextdata OS, infrastructure and platform engineering, field engineering, and customer onboarding.',
    )).toBeInTheDocument();
    expect(within(experience).getByRole('link', { name: 'Nextdata website' })).toHaveAttribute(
      'href', 'https://www.nextdata.com/',
    );
    expect(within(experience).getByRole('link', { name: /Helm chart webhook fix/ })).toHaveAttribute(
      'href', 'https://github.com/open-telemetry/opentelemetry-helm-charts/pull/1391',
    );
    expect(within(experience).getByRole('link', { name: /ClickHouse exporter DDL documentation/ }))
      .toHaveAttribute('href', 'https://github.com/open-telemetry/opentelemetry-collector-contrib/pull/35903');
    expect(within(experience).getByText('Webhook configuration fix for the Helm chart.'))
      .toBeInTheDocument();
    expect(within(experience).getByText('Documentation for the ClickHouse exporter’s DDL.'))
      .toBeInTheDocument();

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
