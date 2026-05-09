import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const base = (
    process.env.NEXT_PUBLIC_APP_URL ?? 'https://replyr.app'
  ).replace(/\/$/, '')

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/pricing', '/login', '/signup', '/legal/'],
        disallow: [
          '/api/',
          '/widget/',
          '/leads',
          '/appointments',
          '/settings',
          '/onboarding',
          '/logout',
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  }
}
