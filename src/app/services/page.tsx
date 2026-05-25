import type { Metadata } from 'next'
import Link from 'next/link'
import ServiceDetail from '@/components/services/ServiceDetail'
import SectionTag from '@/components/ui/SectionTag'
import FadeUp from '@/components/ui/FadeUp'
import ProcessSection from '@/components/home/ProcessSection'
import CTASection from '@/components/home/CTASection'

export const metadata: Metadata = {
  title: 'Software Development & IT Services | Code Beacons',
  description:
    'Explore Code Beacons Technologies\' full range of services: custom software development, cloud migration, IT consulting, cybersecurity, mobile apps, and AI analytics. Based in Pune, serving India.',
  alternates: { canonical: '/services' },
}

const services = [
  {
    id: 'software',
    tag: 'Custom Software',
    title: 'Enterprise Software Development That Scales',
    description:
      "We design and build web applications, APIs, and enterprise systems tailored exactly to your requirements. Our engineering team brings senior-level discipline to every codebase — clean architecture, thorough testing, and documentation that doesn't rot.",
    features: [
      'Full-stack web application development (React, Next.js, Node.js, .NET, Java)',
      'RESTful and GraphQL API design and development',
      'Legacy system modernisation and re-architecture',
      'Performance optimisation and scalability reviews',
      'Technical debt assessment and remediation',
      'DevOps setup: CI/CD pipelines, containerisation, deployment automation',
    ],
    imageUrl: 'https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Software development team working on custom solution',
  },
  {
    id: 'ai',
    tag: 'AI & Analytics',
    title: 'Turn Your Data Into Strategic Decisions',
    description:
      'Raw data is only valuable when you can act on it. We build machine learning models, analytics dashboards, and AI-powered features that give your team real-time insight and predictive capability — tied directly to business outcomes.',
    features: [
      'Machine learning model development and deployment',
      'Business intelligence dashboards (Power BI, Tableau, custom)',
      'Natural language processing and document intelligence',
      'Predictive analytics for sales, operations, and risk',
      'Data pipeline engineering (ETL/ELT, data lakes)',
      'LLM integration and Retrieval-Augmented Generation (RAG)',
    ],
    imageUrl: 'https://images.pexels.com/photos/669621/pexels-photo-669621.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'AI and data analytics dashboard',
    reverse: true,
  },
  {
    id: 'cloud',
    tag: 'Cloud Solutions',
    title: 'Cloud Infrastructure That Performs and Saves',
    description:
      "Whether you're migrating from on-premise or optimising an existing cloud setup, our certified cloud architects design infrastructure that is reliable, cost-efficient, and ready to scale. We work across AWS, Azure, and GCP.",
    features: [
      'Cloud readiness assessment and migration strategy',
      'AWS, Azure, and Google Cloud architecture design',
      'Lift-and-shift and re-architecture migrations',
      'Infrastructure as Code (Terraform, CloudFormation)',
      'Cloud cost optimisation and FinOps reviews',
      'Disaster recovery and business continuity planning',
    ],
    imageUrl: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Cloud infrastructure architecture planning',
  },
  {
    id: 'consulting',
    tag: 'IT Consulting',
    title: 'Strategy That Turns Technology Into Advantage',
    description:
      'Technology decisions made today shape your business for the next decade. Our senior consultants work alongside your leadership to define technology roadmaps, evaluate build-vs-buy decisions, and ensure your IT investments actually deliver the ROI they promise.',
    features: [
      'Technology roadmap development and prioritisation',
      'Build vs. buy analysis and vendor evaluation',
      'IT governance and operating model design',
      'Digital transformation strategy and change management',
      'CTO advisory and fractional technical leadership',
      'Technology due diligence for M&A and investment',
    ],
    imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'IT strategy consulting session',
    reverse: true,
  },
  {
    id: 'security',
    tag: 'Cybersecurity',
    title: 'Security Built In, Not Bolted On',
    description:
      "Cyber threats don't wait for a convenient time. Our security team identifies vulnerabilities before attackers do and helps you build a security posture that satisfies regulatory requirements and protects customer trust.",
    features: [
      'Vulnerability assessment and penetration testing',
      'Security architecture review and hardening',
      'OWASP Top 10 compliance for web applications',
      'ISO 27001, SOC 2, and GDPR readiness consulting',
      'Security awareness training for development teams',
      'Incident response planning and tabletop exercises',
    ],
    imageUrl: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Cybersecurity monitoring and protection',
  },
  {
    id: 'mobile',
    tag: 'Mobile Apps',
    title: 'Mobile Experiences Your Users Will Love',
    description:
      'A great mobile app feels effortless — but building one takes serious engineering. We deliver polished, performant mobile applications for iOS and Android with seamless backend integration and a UX that converts.',
    features: [
      'Native iOS (Swift) and Android (Kotlin) development',
      'Cross-platform development with React Native and Flutter',
      'UI/UX design and user testing',
      'Backend API integration and real-time data sync',
      'App Store and Google Play submission and optimisation',
      'Ongoing maintenance, updates, and crash monitoring',
    ],
    imageUrl: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Mobile app development on iOS and Android',
    reverse: true,
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://codebeacons.in' },
    { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://codebeacons.in/services' },
  ],
}

export default function ServicesPage() {
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
            <nav className="flex justify-center items-center gap-2 text-sm text-slate-400 mb-6">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-slate-600">Services</span>
            </nav>
            <SectionTag label="Our Services" className="mb-5" />
            <h1 className="font-heading font-bold text-slate-900 text-4xl sm:text-5xl lg:text-6xl mb-5 leading-tight">
              Technology Solutions{' '}
              <span className="gradient-text">That Deliver</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Every service we offer is built around one goal: making your business
              measurably better. No fluff. Just proven technology, delivered by experts.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Service details */}
      <div className="bg-dark">
        {services.map((service) => (
          <ServiceDetail key={service.id} {...service} />
        ))}
      </div>

      <ProcessSection />
      <CTASection />
    </>
  )
}
