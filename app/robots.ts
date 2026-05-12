import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    'https://replyr.com'
  ).replace(/\/$/, '')

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/pricing',
          '/features',
          '/for/',
          '/compare/',
          '/blog',
          '/legal/',
          '/login',
          '/signup',
        ],
        disallow: [
          '/api/',
          '/widget/',
          '/dashboard/',
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
