import type { CorsOptions } from 'cors';

const splitEnvList = (value?: string) =>
  (value || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

const normalizeOrigin = (origin: string) => {
  try {
    return new URL(origin).origin;
  } catch {
    return origin;
  }
};

const defaults = ['http://localhost:3000', 'https://metrepairs.com', 'https://www.metrepairs.com'];

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.FRONTEND_URL;
if (siteUrl) {
  defaults.push(siteUrl);
  if (siteUrl.includes('://www.')) {
    defaults.push(siteUrl.replace('://www.', '://'));
  } else if (siteUrl.includes('://')) {
    const [protocol, rest] = siteUrl.split('://');
    defaults.push(`${protocol}://www.${rest}`);
  }
}

const allowedOrigins = new Set(
  [...defaults, ...splitEnvList(process.env.ALLOWED_ORIGINS)].map(normalizeOrigin),
);

export const securityMiddleware = {
  corsOptions: {
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      const normalized = normalizeOrigin(origin);
      if (allowedOrigins.has(normalized)) return cb(null, true);
      cb(new Error('Not allowed by CORS'));
    },
    credentials: true,
  } as CorsOptions,
};

