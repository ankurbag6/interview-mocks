const { ApiClient } = require('./client');

describe('ApiClient', () => {
  test('makes a request and returns JSON', async () => {
    // fetch is mocked elsewhere to return { ok: true, json: () => ({ data: 1 }) }
    const client = new ApiClient();
    const result = await client.request('/users');
    expect(result).toEqual({ data: 1 });
  });

  test('respects maxConcurrent limit', async () => {
    const client = new ApiClient({ maxConcurrent: 2 });
    // ... test that no more than 2 in-flight at once
  });
});