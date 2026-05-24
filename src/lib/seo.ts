import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codebeacons.in'

export function buildMetadata(overrides: Partial<Metadata> & { path?: string }): Metadata {
  const { path = '/', ...rest } = overrides
  return {
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      siteName: 'Code Beacons Technologies',
      images: [
        {
          url: '/images/og-default.png',
          width: 1200,
          height: 630,
          alt: 'Code Beacons Technologies',
        },
      ],
      ...(rest.openGraph ?? {}),
    },
    twitter: {
      card: 'summary_large_image',
      images: ['/images/og-default.png'],
      ...(rest.twitter ?? {}),
    },
    ...rest,
  }
}

export { siteUrl }
