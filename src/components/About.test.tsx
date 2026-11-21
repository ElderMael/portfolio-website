import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import { About } from './About';

afterEach(cleanup);

describe('About page', () => {
  it('presents the approved summary and complete work history', () => {
    render(<About />);

    expect(screen.getByRole('heading', { name: 'Engineering across the stack.' })).toBeInTheDocument();
    expect(screen.getByText(/microservices and evolutionary architecture, observability, security, CI\/CD/)).toBeInTheDocument();

    const history = screen.getByRole('list', { name: 'Work history' });
    const entries = within(history).getAllByRole('listitem');
    expect(entries).toHaveLength(9);
    expect(within(entries[0]).getByText('Nextdata')).toBeInTheDocument();
    expect(within(entries[0]).getByRole('heading', { name: 'Founding Principal Software Engineer' })).toBeInTheDocument();
    expect(within(entries[0]).getByText('July 2023')).toHaveAttribute('datetime', '2023-07');
    expect(within(entries[0]).getByText(/Work across Nextdata OS/)).toBeInTheDocument();

    expect(screen.getByText('InDebted')).toBeInTheDocument();
    expect(screen.getByText('greyshore')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Senior Consultant' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Programmer' })).toBeInTheDocument();
  });

  it('includes approved community and contribution links without a resume link', () => {
    render(<About />);

    expect(screen.getByRole('link', { name: /PirateDevRadio on YouTube/ })).toHaveAttribute(
      'href', 'https://www.youtube.com/@piratedevradio',
    );
    expect(screen.getByRole('link', { name: /Helm chart webhook fix/ })).toHaveAttribute(
      'href', 'https://github.com/open-telemetry/opentelemetry-helm-charts/pull/1391',
    );
    expect(screen.getByRole('link', { name: /ClickHouse exporter DDL documentation/ })).toHaveAttribute(
      'href', 'https://github.com/open-telemetry/opentelemetry-collector-contrib/pull/35903',
    );
    expect(screen.queryByRole('link', { name: /resume/i })).not.toBeInTheDocument();
    expect(document.querySelector('a[href="/resume-mael.pdf"]')).toBeNull();
  });
});
