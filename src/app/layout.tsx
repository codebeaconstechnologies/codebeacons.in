import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codebeacons.in'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Code Beacons Technologies | Software Development Company Pune',
    template: '%s | Code Beacons Technologies',
  },
  description:
    'Code Beacons Technologies — expert software development, cloud solutions, and IT consulting in Pune. 10+ years of experience delivering scalable, enterprise-grade technology for growing businesses.',
  keywords: [
    'software development company Pune',
    'custom software development India',
    'IT consulting Pune',
    'web development Pune',
    'mobile app development Pune',
    'cloud solutions India',
    'Code Beacons Technologies',
    'IT services Pune',
  ],
  authors: [{ name: 'Code Beacons Technologies' }],
  creator: 'Code Beacons Technologies',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'Code Beacons Technologies',
    title: 'Code Beacons Technologies | Software Development Company Pune',
    description:
      'Expert software development, cloud solutions, and IT consulting in Pune. Proven team delivering scalable technology for enterprises and startups.',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Code Beacons Technologies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Code Beacons Technologies | Software Development Pune',
    description: 'Expert software development, cloud solutions, and IT consulting in Pune.',
    images: ['/images/og-default.png'],
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
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Code Beacons Technologies',
  url: siteUrl,
  logo: `${siteUrl}/images/logo.png`,
  description: 'Expert software development, cloud solutions, and IT consulting in Pune, India.',
  email: 'hrteam@codebeacons.in',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Pimpri Chinchwad',
    addressLocality: 'Pune',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.linkedin.com/company/code-beacons-technologies',
    'https://www.instagram.com/codebeacons',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Code Beacons Technologies',
  url: siteUrl,
  description: 'Expert software development, cloud solutions, and IT consulting.',
  publisher: {
    '@type': 'Organization',
    name: 'Code Beacons Technologies',
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/images/logo.png`,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
