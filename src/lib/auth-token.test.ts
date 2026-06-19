import { authToken } from './auth-token';

describe('authToken', () => {
  it('stores and clears the token', () => {
    authToken.set('abc');
    expect(authToken.get()).toBe('abc');
    authToken.clear();
    expect(authToken.get()).toBeNull();
  });
});
