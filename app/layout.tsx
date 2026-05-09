import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const APP_URL = (process.env.NEXT_PUBLIC_APP_URL ?? 'https://replyr.app').replace(/\/$/, '')

const title = 'Replyr - Never miss another lead'
const description =
  'AI lead-response agent for US home services contractors. Replies in 30 seconds, qualifies leads, books appointments straight to your Google Calendar.'

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: title,
    template: '%s · Replyr',
  },
  description,
  keywords: [
    'AI lead response',
    'home services',
    'contractor software',
    'plumbing',
    'HVAC',
    'roofing',
    'lead qualification',
    'AI chatbot for contractors',
    'appointment booking',
  ],
  authors: [{ name: 'Replyr' }],
  creator: 'Replyr',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_URL,
    siteName: 'Replyr',
    title,
    description,
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
  icons: {
    icon: '/favicon.ico',
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
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
