type JsonLdObject = Record<string, unknown>

export function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

const SITE = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.NEXT_PUBLIC_APP_URL ??
  'https://replyr.com'
).replace(/\/$/, '')

export const organizationSchema: JsonLdObject = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Replyr',
  url: SITE,
  logo: `${SITE}/icon.png`,
  sameAs: ['https://twitter.com/replyr', 'https://www.linkedin.com/company/replyr'],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@replyr.app',
    contactType: 'customer support',
    availableLanguage: 'English',
  },
}

export const softwareAppSchema: JsonLdObject = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Replyr',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: SITE,
  offers: {
    '@type': 'Offer',
    price: '99.00',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  description:
    'AI lead-response agent for US home services contractors. Replies to leads in 30 seconds, qualifies them, and books appointments to Google Calendar.',
}

export function faqPageSchema(faqs: Array<{ q: string; a: string }>): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}

export function serviceSchema(opts: {
  name: string
  description: string
  url: string
}): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    serviceType: 'AI Lead Response Software',
    areaServed: { '@type': 'Country', name: 'United States' },
    provider: { '@type': 'Organization', name: 'Replyr', url: SITE },
  }
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export const pricingSchema: JsonLdObject = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Replyr Pro',
  description:
    'AI lead-response agent for home services contractors. Unlimited leads, calendar booking, web and email channels.',
  brand: { '@type': 'Brand', name: 'Replyr' },
  offers: {
    '@type': 'Offer',
    price: '99.00',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    priceValidUntil: '2027-01-01',
    url: `${SITE}/pricing`,
  },
}
