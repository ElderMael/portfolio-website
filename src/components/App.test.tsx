import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('application routes', () => {
  beforeEach(() => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      fillStyle: '', font: '', fillRect: vi.fn(), fillText: vi.fn(),
    } as unknown as CanvasRenderingContext2D);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
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

  it('falls back to home for an unknown route', () => {
    window.history.replaceState({}, '', '/unknown');
    render(<App />);
    expect(screen.getByRole('heading', { name: 'About Me' })).toBeInTheDocument();
  });
});
