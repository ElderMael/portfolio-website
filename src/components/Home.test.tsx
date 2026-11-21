import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Home } from './Home';

describe('home experience panels', () => {
  it('keeps the approved experience copy and links accessible', () => {
    render(<Home />);

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
