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

  it('presents work-process themes as provisional rather than a promised sequence', () => {
    render(<MemoryRouter><Home /></MemoryRouter>);

    const process = screen.getByRole('region', { name: 'Some themes that inform my work.' });
    expect(process).toHaveTextContent('Work process · provisional');
    expect(process).toHaveTextContent('not a fixed sequence or a promise about every engagement');
    expect(within(process).getByRole('heading', { name: 'Evolve platforms and architecture' }))
      .toBeInTheDocument();
    expect(within(process).getByRole('heading', { name: 'Integrate systems' })).toBeInTheDocument();
    expect(within(process).getByRole('heading', { name: 'Consider operational practices' }))
      .toBeInTheDocument();
    expect(within(process).getByRole('heading', { name: 'Share knowledge' })).toBeInTheDocument();
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
    expect(within(experience).getByRole('link', { name: /Nextdata/ })).toHaveAttribute(
      'href', 'https://www.nextdata.com/',
    );
    expect(within(experience).getByRole('link', { name: /Helm chart webhook fix/ })).toHaveAttribute(
      'href', 'https://github.com/open-telemetry/opentelemetry-helm-charts/pull/1391',
    );
    expect(within(experience).getByRole('link', { name: /ClickHouse exporter DDL documentation/ }))
      .toHaveAttribute('href', 'https://github.com/open-telemetry/opentelemetry-collector-contrib/pull/35903');

    const earlier = within(experience).getByRole('complementary', { name: 'Earlier experience' });
    expect(earlier).toHaveTextContent(
      'Earlier experience includes platform and cloud work at ThoughtWorks and Greyshore, along with mentorship at ThoughtWorks.',
    );
    expect(experience.querySelectorAll('.home-card-index[aria-hidden="true"]')).toHaveLength(2);
  });
});
