import type { MetadataRoute } from 'next'

const VERTICALS = [
  'plumbers',
  'hvac',
  'roofers',
  'electricians',
  'landscapers',
  'general-contractors',
] as const

const COMPETITORS = ['podium-alternative', 'hatch-alternative'] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    'https://replyr.com'
  ).replace(/\/$/, '')

  const now = new Date()

  const core: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/features`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/legal/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${base}/legal/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${base}/login`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/signup`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
  ]

  const verticals: MetadataRoute.Sitemap = VERTICALS.map((v) => ({
    url: `${base}/for/${v}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const compare: MetadataRoute.Sitemap = COMPETITORS.map((c) => ({
    url: `${base}/compare/${c}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Hook for future Supabase blog posts:
  // const supabase = createServiceClient()
  // const { data: posts } = await supabase
  //   .from('blog_posts')
  //   .select('slug, updated_at')
  //   .eq('published', true)
  // const blogPosts: MetadataRoute.Sitemap = (posts ?? []).map((p) => ({
  //   url: `${base}/blog/${p.slug}`,
  //   lastModified: new Date(p.updated_at),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.6,
  // }))

  return [...core, ...verticals, ...compare]
}
