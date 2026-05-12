import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { JsonLd, organizationSchema } from '@/components/seo/JsonLd'
import { Analytics } from '@/components/seo/Analytics'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.NEXT_PUBLIC_APP_URL ??
  'https://replyr.com'
).replace(/\/$/, '')

const title = 'Replyr — AI Lead Response for Home Services Contractors'
const description =
  'Stop losing leads to slow replies. Replyr responds to contractor inquiries in 30 seconds, qualifies them, and books appointments to Google Calendar. Built for HVAC, plumbing, roofing, and more.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: '%s | Replyr' },
  description,
  keywords: [
    'AI lead response software',
    'contractor chatbot',
    'lead capture widget for contractors',
    'AI receptionist for home services',
    'instant lead response for contractors',
    'appointment booking software for contractors',
    'home services AI',
    'HVAC chatbot',
    'plumbing lead response',
    'roofing chatbot',
    'missed call text back for contractors',
  ],
  authors: [{ name: 'Replyr' }],
  creator: 'Replyr',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Replyr',
    title,
    description,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@replyr',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: { icon: '/favicon.ico' },
  manifest: '/manifest.webmanifest',
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <JsonLd data={organizationSchema} />
        {children}
        <Toaster richColors position="top-right" />
        <Analytics />
      </body>
    </html>
  )
}
