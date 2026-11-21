import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
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

  it('renders the home route and its navigation', () => {
    window.history.replaceState({}, '', '/');
    render(<App />);
    expect(screen.getByRole('heading', { name: 'About Me' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /social/i })).toHaveAttribute('href', '/social');
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

    const pauseButton = screen.getByRole('button', { name: 'Pause background animation' });
    fireEvent.click(pauseButton);
    expect(screen.getByRole('button', { name: 'Resume background animation' })).toBeInTheDocument();
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
    expect(screen.getByRole('heading', { name: 'About Me' })).toBeInTheDocument();
  });
});
