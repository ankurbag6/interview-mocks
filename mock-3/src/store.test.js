const { TTLStore } = require('../src/store');

describe('TTLStore', () => {
  test('stores and retrieves values', () => {
    const s = new TTLStore();
    s.set('a', 1);
    expect(s.get('a')).toBe(1);
  });

  test('returns null for missing keys', () => {
    const s = new TTLStore();
    expect(s.get('missing')).toBeNull();
  });
});