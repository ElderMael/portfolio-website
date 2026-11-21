import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('application routes', () => {
  beforeEach(() => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      fillStyle: '', font: '', fillRect: vi.fn(), fillText: vi.fn(), setTransform: vi.fn(), clearRect: vi.fn(),
    } as unknown as CanvasRenderingContext2D);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    Reflect.deleteProperty(window, 'matchMedia');
    window.history.replaceState({}, '', '/');
  });

  it('provides a first-focusable skip link that moves keyboard focus to main content', async () => {
    window.history.replaceState({}, '', '/');
    render(<App />);

    const skipLink = screen.getByRole('link', { name: 'Skip to main content' });
    const firstFocusable = document.querySelector(
      '.site-shell a, .site-shell button, .site-shell input, .site-shell select, .site-shell textarea, .site-shell [tabindex]:not([tabindex="-1"])',
    );
    expect(firstFocusable).toBe(skipLink);

    const user = userEvent.setup();
    await user.tab();
    expect(skipLink).toHaveFocus();
    await user.keyboard('{Enter}');

    expect(document.getElementById('main-content')).toHaveFocus();
    expect(window.location.hash).toBe('#main-content');
  });

  it('sets descriptive titles for direct routes and the home fallback', () => {
    const routeTitles = [
      ['/', 'Miguel Enriquez | AI & Systems Engineering'],
      ['/contact-me', 'Contact Miguel Enriquez | Portfolio'],
      ['/social', 'Social & Community | Miguel Enriquez'],
      ['/unknown', 'Miguel Enriquez | AI & Systems Engineering'],
    ];

    routeTitles.forEach(([path, title]) => {
      window.history.replaceState({}, '', path);
      const { unmount } = render(<App />);
      expect(document.title).toBe(title);
      expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
      expect(screen.getByRole('main')).toHaveAttribute('tabindex', '-1');
      unmount();
    });
  });

  it('updates the page title after client-side route navigation', async () => {
    window.history.replaceState({}, '', '/');
    render(<App />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('link', { name: 'Social' }));
    expect(window.location.pathname).toBe('/social');
    expect(document.title).toBe('Social & Community | Miguel Enriquez');

    await user.click(screen.getByRole('link', { name: 'Contact me' }));
    expect(window.location.pathname).toBe('/contact-me');
    expect(document.title).toBe('Contact Miguel Enriquez | Portfolio');

    await user.click(screen.getByRole('link', { name: 'Miguel Enriquez home' }));
    expect(window.location.pathname).toBe('/');
    expect(document.title).toBe('Miguel Enriquez | AI & Systems Engineering');
  });

  it('renders the home route and its navigation', () => {
    window.history.replaceState({}, '', '/');
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Building systems that help people build.' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /social/i })).toHaveAttribute('href', '/social');
    expect(screen.getByRole('heading', { name: 'Nextdata' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Helm chart webhook fix/i })).toHaveAttribute(
      'href', 'https://github.com/open-telemetry/opentelemetry-helm-charts/pull/1391');
    expect(screen.getByRole('link', { name: /ClickHouse exporter DDL documentation/i })).toHaveAttribute(
      'href', 'https://github.com/open-telemetry/opentelemetry-collector-contrib/pull/35903');
    expect(screen.getByRole('link', { name: /neo-pokepet-pi/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /PirateDevRadio on YouTube/i })).toHaveAttribute(
      'href', 'https://www.youtube.com/@piratedevradio');
    expect(screen.getByRole('link', { name: 'Get in touch' })).toHaveAttribute('href', '/contact-me');
    expect(screen.queryByRole('link', { name: /resume/i })).not.toBeInTheDocument();
  });

  it('renders social and contact routes', () => {
    window.history.replaceState({}, '', '/social');
    const { unmount } = render(<App />);
    expect(screen.getByRole('heading', { name: 'My Social Networks' })).toBeInTheDocument();
    unmount();

    window.history.replaceState({}, '', '/contact-me');
    render(<App />);
    expect(screen.getByRole('heading', { name: /contact me/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Message' })).toBeInTheDocument();

    const honeypot = screen.getByLabelText('Leave this field blank');
    expect(honeypot).toHaveAttribute('name', 'bot-field');
    fireEvent.change(honeypot, { target: { value: 'spam' } });
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    fireEvent(screen.getByRole('button', { name: 'Send Message' }).closest('form')!, submitEvent);
    expect(submitEvent.defaultPrevented).toBe(true);
  });

  it('defaults to the dark theme, persists theme changes, and provides a pause control', () => {
    window.localStorage.clear();
    window.history.replaceState({}, '', '/');
    render(<App />);
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    const themeButton = screen.getByRole('button', { name: /green-black theme/i });
    fireEvent.click(themeButton);
    expect(document.documentElement).toHaveAttribute('data-theme', 'lighter');
    expect(window.localStorage.getItem('portfolio-theme')).toBe('lighter');
    expect(themeButton).toHaveAttribute('aria-pressed', 'true');

    const pauseButton = screen.getByRole('button', { name: 'Pause or resume background animation' });
    const siteShell = document.querySelector('.site-shell');
    expect(siteShell).toHaveAttribute('data-motion-paused', 'false');
    expect(siteShell?.querySelectorAll('.home-marquee-track')).toHaveLength(2);
    expect(pauseButton).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(pauseButton);
    expect(screen.getByRole('button', { name: 'Pause or resume background animation' }))
      .toHaveAttribute('aria-pressed', 'true');
    expect(siteShell).toHaveAttribute('data-motion-paused', 'true');
    expect(siteShell?.querySelectorAll('.home-marquee-track')).toHaveLength(2);
    expect(screen.getByAltText('')).toHaveAttribute('src', '/circuitry.svg');
    expect(document.querySelector('.circuitry-stage')).toHaveAttribute('aria-hidden', 'true');
    expect(document.querySelectorAll('.circuitry-wheel')).toHaveLength(2);
    expect(screen.getByText('01 / BUILD · SHARE · LEARN · LEAD')).toBeInTheDocument();
    fireEvent.click(pauseButton);
    expect(pauseButton).toHaveAttribute('aria-pressed', 'false');
    expect(siteShell).toHaveAttribute('data-motion-paused', 'false');
  });

  it('keeps theme controls usable when browser storage throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked'); });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked'); });
    window.history.replaceState({}, '', '/');
    render(<App />);
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    fireEvent.click(screen.getByRole('button', { name: /green-black theme/i }));
    expect(document.documentElement).toHaveAttribute('data-theme', 'lighter');
  });

  it('uses a static canvas when reduced motion is requested', () => {
    const interval = vi.spyOn(window, 'setInterval');
    Object.defineProperty(window, 'matchMedia', { configurable: true, value: () => ({
      matches: true, media: '(prefers-reduced-motion: reduce)', onchange: null,
      addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(), removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as unknown as MediaQueryList) });
    window.history.replaceState({}, '', '/');
    render(<App />);
    expect(interval.mock.calls.some(([, delay]) => delay === 70)).toBe(false);
  });

  it('falls back to home for an unknown route', () => {
    window.history.replaceState({}, '', '/unknown');
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Building systems that help people build.' })).toBeInTheDocument();
  });
});
