import { getJwtSecret } from './jwtSecret.js';

describe('getJwtSecret', () => {
  it('returns JWT_SECRET when set', () => {
    expect(getJwtSecret({ JWT_SECRET: 's3cret-value' })).toBe('s3cret-value');
  });

  it('falls back to a dev secret outside production', () => {
    expect(getJwtSecret({ NODE_ENV: 'development' })).toBe('fallback-dev-secret');
  });

  it('throws in production when JWT_SECRET is missing', () => {
    expect(() => getJwtSecret({ NODE_ENV: 'production' })).toThrow(/JWT_SECRET/);
  });

  it('throws on Vercel when JWT_SECRET is missing', () => {
    expect(() => getJwtSecret({ VERCEL: '1' })).toThrow(/JWT_SECRET/);
  });
});
