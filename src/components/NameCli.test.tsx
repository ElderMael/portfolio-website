import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { NameCli } from './NameCli';

describe('NameCli', () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('clears the pending glitch timeout when unmounted', () => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random').mockReturnValue(0.99);
    const { unmount } = render(<NameCli />);

    vi.advanceTimersByTime(500);
    expect(vi.getTimerCount()).toBe(2);

    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
