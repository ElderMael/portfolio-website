import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { NameCli } from './NameCli';

describe('NameCli', () => {
  afterEach(() => { cleanup(); vi.restoreAllMocks(); });

  it('shows the heading immediately without starting a glitch timer', () => {
    const interval = vi.spyOn(window, 'setInterval');
    render(<NameCli />);
    expect(screen.getByRole('heading', { name: 'Hi, I am Miguel' })).toBeInTheDocument();
    expect(interval).not.toHaveBeenCalled();
  });
});
