const DEV_FALLBACK = 'fallback-dev-secret';

export function getJwtSecret(env: NodeJS.ProcessEnv | Record<string, string | undefined> = process.env): string {
  if (env.JWT_SECRET) return env.JWT_SECRET;
  if (env.NODE_ENV === 'production' || env.VERCEL) {
    throw new Error('JWT_SECRET must be set in production; refusing to sign tokens with the dev fallback');
  }
  return DEV_FALLBACK;
}
