import { afterEach, describe, expect, it, vi } from 'vitest';
import { unregister } from './serviceWorker';

describe('service worker cleanup', () => {
  afterEach(() => vi.restoreAllMocks());

  it('unregisters an existing service worker registration', async () => {
    const unregisterRegistration = vi.fn().mockResolvedValue(true);
    Object.defineProperty(navigator, 'serviceWorker', {
      configurable: true,
      value: { ready: Promise.resolve({ unregister: unregisterRegistration }) },
    });

    unregister();
    await Promise.resolve();
    expect(unregisterRegistration).toHaveBeenCalledOnce();
  });
});
