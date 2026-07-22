const { RateLimiter } = require('../src/rateLimiter');

describe('RateLimiter', () => {
  test('allows requests within limit', () => {
    const limiter = new RateLimiter(2, 1000);
    expect(limiter.isAllowed('a')).toBe(true);
    expect(limiter.isAllowed('a')).toBe(true);
  });

  test('blocks requests over limit', () => {
    const limiter = new RateLimiter(2, 1000);
    limiter.isAllowed('a');
    limiter.isAllowed('a');
    expect(limiter.isAllowed('a')).toBe(false);
  });

  test('tracks clients independently', () => {
    const limiter = new RateLimiter(1, 1000);
    expect(limiter.isAllowed('a')).toBe(true);
    expect(limiter.isAllowed('b')).toBe(true);
  });
});