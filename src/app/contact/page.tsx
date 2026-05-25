import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, MessageSquare, Clock, CheckCircle } from 'lucide-react'
import SectionTag from '@/components/ui/SectionTag'
import FadeUp from '@/components/ui/FadeUp'
import ContactForm from '@/components/contact/ContactForm'
import ContactInfo from '@/components/contact/ContactInfo'

export const metadata: Metadata = {
  title: 'Contact Us | Get a Free Consultation — Code Beacons',
  description:
    'Contact Code Beacons Technologies for a free software development consultation. Reach us at hrteam@codebeacons.in or visit us in Pimpri Chinchwad, Pune. Response within 24 hours.',
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

const promises = [
  { icon: Clock, label: 'Response within 24 hours', sub: 'Usually same business day' },
  { icon: MessageSquare, label: 'No sales pitch', sub: 'You speak with an engineer' },
  { icon: CheckCircle, label: 'Free consultation', sub: '30-min call, zero commitment' },
]

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

      {/* Hero header */}
      <section className="relative pt-36 pb-16 bg-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-dark to-dark pointer-events-none" />
        {/* Decorative teal circle */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/6 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-slate-600">Contact</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left — headline + promises */}
              <div>
                <SectionTag label="Get in Touch" className="mb-5" />
                <h1 className="font-heading font-bold text-slate-900 text-4xl sm:text-5xl lg:text-6xl mb-5 leading-tight">
                  Describe the challenge.{' '}
                  <span className="gradient-text">We&apos;ll give you a straight answer.</span>
                </h1>
                <p className="text-slate-500 text-lg mb-8 max-w-lg">
                  No vague estimates, no unnecessary meetings. Tell us what you&apos;re building or
                  what&apos;s broken — and get a real technical perspective back.
                </p>

                <div className="space-y-4">
                  {promises.map((p) => (
                    <div key={p.label} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                        <p.icon size={18} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-slate-900 font-semibold text-sm">{p.label}</div>
                        <div className="text-slate-400 text-xs">{p.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 rounded-xl bg-dark-2 border border-slate-100 flex items-center gap-3">
                  <Mail size={18} className="text-primary flex-shrink-0" />
                  <div>
                    <div className="text-slate-500 text-xs mb-0.5">Or email us directly</div>
                    <a
                      href="mailto:hrteam@codebeacons.in"
                      className="text-primary font-semibold text-sm hover:underline"
                    >
                      hrteam@codebeacons.in
                    </a>
                  </div>
                </div>
              </div>

              {/* Right — inline quick-start CTA card */}
              <div className="bg-dark-2 border border-primary/20 rounded-2xl p-8 shadow-xl shadow-primary/5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Free 30-min Consultation
                </div>
                <h2 className="font-heading font-bold text-slate-900 text-2xl mb-3 leading-tight">
                  Book a call with a senior engineer
                </h2>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                  Bring your problem, your codebase context, or just a half-formed idea. We&apos;ll
                  give you honest technical feedback — no obligation.
                </p>
                <ul className="space-y-2.5 mb-6">
                  {[
                    'Talk directly to the engineer who will work on your project',
                    'Get a realistic scope and timeline — not marketing fluff',
                    'Walk away with clarity, even if you don\'t sign up',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-slate-500 text-sm">
                      <CheckCircle size={15} className="text-primary mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="mailto:hrteam@codebeacons.in?subject=Free Consultation Request"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
                >
                  <Mail size={16} /> Book via Email
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Contact grid */}
      <section className="section bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="mb-10 text-center">
            <SectionTag label="Send a Message" className="mb-4" />
            <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl mb-3">
              Tell us what you need
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Fill in the form below — the more detail you share, the better the response
              you&apos;ll get. We read every submission personally.
            </p>
          </FadeUp>

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
            <div className="rounded-2xl overflow-hidden border border-slate-100 h-72">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121055.06548499293!2d73.72152865!3d18.6279156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9e760000001%3A0x2b56f7b1c42e8f0!2sPimpri-Chinchwad%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000001"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.1)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Code Beacons Technologies Location — Pimpri Chinchwad, Pune"
              />
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
