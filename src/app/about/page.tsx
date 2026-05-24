import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Lightbulb, Eye, ArrowRight } from 'lucide-react'
import SectionTag from '@/components/ui/SectionTag'
import FadeUp from '@/components/ui/FadeUp'
import CTASection from '@/components/home/CTASection'
import CoreValuesGrid from '@/components/about/CoreValuesGrid'

export const metadata: Metadata = {
  title: 'About Us | Experienced IT & Software Development Team',
  description:
    'Meet the team behind Code Beacons Technologies. Led by Bhikaji Patil, Senior Technical Lead with 10+ years of experience delivering enterprise software in Pune, India.',
  alternates: { canonical: '/about' },
}

const milestones = [
  { year: '2018', title: 'Founded in Pune', desc: 'Established to bridge the gap between technology and business value for Indian enterprises.' },
  { year: '2020', title: 'Cloud Practice Launch', desc: 'Expanded into cloud consulting and migration as enterprises accelerated digital transformation.' },
  { year: '2022', title: '30+ Clients Milestone', desc: 'Grew to serve clients across healthcare, finance, retail, and manufacturing sectors.' },
  { year: '2024', title: 'AI & Analytics Division', desc: 'Launched a dedicated AI practice to help clients harness machine learning at scale.' },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://codebeacons.in' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://codebeacons.in/about' },
  ],
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Page header */}
      <section className="relative pt-36 pb-20 bg-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-dark to-dark pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <nav className="flex justify-center items-center gap-2 text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-gray-300">About</span>
            </nav>
            <SectionTag label="Our Story" className="mb-5" />
            <h1 className="font-heading font-bold text-white text-4xl sm:text-5xl lg:text-6xl mb-5 leading-tight">
              We Build Technology{' '}
              <span className="gradient-text">That Matters</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A Pune-based team of engineers and consultants committed to delivering
              software that creates measurable business impact.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-dark-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <FadeUp>
              <div className="h-full p-8 rounded-2xl bg-dark border-l-4 border-l-primary border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <Lightbulb size={22} className="text-primary" />
                </div>
                <h2 className="font-heading font-semibold text-white text-2xl mb-3">Our Mission</h2>
                <p className="text-gray-400 leading-relaxed">
                  To empower businesses with innovative technology that solves real problems and
                  creates lasting competitive advantage — delivered with the discipline and
                  transparency of a partner, not a vendor.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="h-full p-8 rounded-2xl bg-dark border-l-4 border-l-primary-light border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-primary-light/10 flex items-center justify-center mb-5">
                  <Eye size={22} className="text-primary-light" />
                </div>
                <h2 className="font-heading font-semibold text-white text-2xl mb-3">Our Vision</h2>
                <p className="text-gray-400 leading-relaxed">
                  To be the trusted long-term technology partner for ambitious companies across
                  India — known for quality, reliability, and a deep understanding of how
                  technology drives business value.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <FadeUp>
              <SectionTag label="Our Journey" className="mb-5" />
              <h2 className="font-heading font-bold text-white text-3xl sm:text-4xl mb-5 leading-tight">
                Built on Experience,{' '}
                <span className="gradient-text">Driven by Results</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Code Beacons Technologies was founded with a clear conviction: most businesses
                deserve better technology partners. Not just coders who ship features, but
                engineers who understand business and take ownership of outcomes.
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                Led by <strong className="text-white">Bhikaji Patil</strong> — Senior Technical
                Lead with a decade of enterprise engineering and leadership experience — our team
                has grown into a full-service software development and consulting firm serving
                clients across healthcare, finance, retail, and manufacturing.
              </p>
              <div className="space-y-3">
                {milestones.map((m) => (
                  <div key={m.year} className="flex gap-4 items-start">
                    <span className="flex-shrink-0 font-heading font-bold text-primary text-sm bg-primary/10 rounded-lg px-3 py-1 mt-0.5">
                      {m.year}
                    </span>
                    <div>
                      <div className="text-white font-medium text-sm">{m.title}</div>
                      <div className="text-gray-500 text-sm">{m.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.15} className="relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <Image
                  src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Code Beacons Technologies team collaboration"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent" />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section bg-dark-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <SectionTag label="What We Stand For" className="mb-4" />
            <h2 className="font-heading font-bold text-white text-3xl sm:text-4xl lg:text-5xl mb-4">
              Our Core <span className="gradient-text">Values</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              These aren't framed words on a wall. They're the principles that guide every
              decision we make and every line of code we write.
            </p>
          </FadeUp>
          <CoreValuesGrid />
        </div>
      </section>

      {/* Team CTA */}
      <section className="section bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <SectionTag label="Our Team" className="mb-5" />
            <h2 className="font-heading font-bold text-white text-3xl sm:text-4xl mb-5">
              Built by Passionate Engineers
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Our team combines deep technical expertise with a genuine care for client
              outcomes. We hire people who take ownership — and it shows in the work.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-dark font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
            >
              Work With Our Team <ArrowRight size={18} />
            </Link>
          </FadeUp>
        </div>
      </section>

      <CTASection />
    </>
  )
}
