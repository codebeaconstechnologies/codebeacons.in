import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import SectionTag from '@/components/ui/SectionTag'
import FadeUp from '@/components/ui/FadeUp'
import ContactForm from '@/components/contact/ContactForm'
import ContactInfo from '@/components/contact/ContactInfo'

export const metadata: Metadata = {
  title: 'Contact Us | Get a Free Consultation — Code Beacons',
  description:
    'Contact Code Beacons Technologies for a free software development consultation. Reach us at hrteam@codebeacons.in or visit us in Punawale, Pune. Response within 24 hours.',
  alternates: { canonical: '/contact' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://codebeacons.in' },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://codebeacons.in/contact' },
  ],
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Code Beacons Technologies',
  url: 'https://codebeacons.in',
  email: 'hrteam@codebeacons.in',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '15/3 Pandhare Wasti, Punawale',
    addressLocality: 'Pune',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.linkedin.com/company/code-beacons-technologies',
    'https://www.instagram.com/codebeacons',
  ],
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Page header */}
      <section className="relative pt-36 pb-20 bg-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-dark to-dark pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <nav className="flex justify-center items-center gap-2 text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-gray-300">Contact</span>
            </nav>
            <SectionTag label="Contact Us" className="mb-5" />
            <h1 className="font-heading font-bold text-white text-4xl sm:text-5xl lg:text-6xl mb-5 leading-tight">
              Let's Start a{' '}
              <span className="gradient-text">Conversation</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Have a project in mind, or just want to explore what's possible? Reach out
              and we'll get back to you within one business day.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Contact grid */}
      <section className="section bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10">
            <FadeUp>
              <ContactInfo />
            </FadeUp>
            <FadeUp delay={0.1}>
              <ContactForm />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-24 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="rounded-2xl overflow-hidden border border-white/5 h-72">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.2!2d73.74!3d18.63!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPunawale%2C%20Pune!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.1)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Code Beacons Technologies Location — Punawale, Pune"
              />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Direct email CTA */}
      <section className="relative py-20 bg-dark-2 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <h2 className="font-heading font-bold text-white text-2xl sm:text-3xl mb-3">
              Prefer a Direct Conversation?
            </h2>
            <p className="text-gray-400 mb-6">
              Email us directly or drop by our office. We're always happy to meet.
            </p>
            <a
              href="mailto:hrteam@codebeacons.in"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-primary/30 text-primary font-semibold hover:bg-primary/10 transition-colors"
            >
              <Mail size={18} /> hrteam@codebeacons.in
            </a>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
