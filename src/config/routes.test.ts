import { routes } from './routes';

describe('routes', () => {
  it('keeps the dashboard at the root path', () => {
    expect(routes.dashboard).toBe('/');
  });
});
