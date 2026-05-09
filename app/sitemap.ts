import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (
    process.env.NEXT_PUBLIC_APP_URL ?? 'https://replyr.app'
  ).replace(/\/$/, '')

  const lastModified = new Date()

  return [
    { url: `${base}/`, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/pricing`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/login`, lastModified, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${base}/signup`, lastModified, changeFrequency: 'yearly', priority: 0.6 },
    {
      url: `${base}/legal/terms`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${base}/legal/privacy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
