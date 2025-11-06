import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://metrepairs.com';
  return [
    { url: base + '/', changeFrequency: 'weekly', priority: 1.0 },
    { url: base + '/services', changeFrequency: 'monthly', priority: 0.8 },
    { url: base + '/booking', changeFrequency: 'monthly', priority: 0.7 },
    { url: base + '/quote', changeFrequency: 'monthly', priority: 0.8 },
    { url: base + '/projects', changeFrequency: 'monthly', priority: 0.6 },
    { url: base + '/reviews', changeFrequency: 'monthly', priority: 0.6 },
    { url: base + '/resources', changeFrequency: 'monthly', priority: 0.5 },
    { url: base + '/about', changeFrequency: 'yearly', priority: 0.5 },
    { url: base + '/contact', changeFrequency: 'yearly', priority: 0.5 },
  ];
}


