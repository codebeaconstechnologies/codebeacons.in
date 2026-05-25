'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionTag from '@/components/ui/SectionTag'
import FadeUp from '@/components/ui/FadeUp'

const profiles = [
  {
    initials: 'TL',
    title: 'Technical Lead',
    sub: '10+ yrs .NET & Azure',
    badge: null,
    badgeColor: '',
    topColor: 'border-t-primary',
    tags: ['.NET 3.1-10', 'Azure', 'SQL Server', 'Angular', 'OAuth2/SAML', 'Stripe'],
  },
  {
    initials: 'BE',
    title: 'Backend Engineer',
    sub: 'Backend Specialist · Assessed · 8+ yrs',
    badge: null,
    badgeColor: '',
    topColor: 'border-t-blue-400',
    tags: ['ASP.NET Core', 'C#', 'EF Core', 'SQL Server', 'Stripe', 'Twilio'],
  },
  {
    initials: 'FS',
    title: 'Full-Stack Engineer',
    sub: 'Full-Stack Specialist · Assessed · 7+ yrs',
    badge: null,
    badgeColor: '',
    topColor: 'border-t-purple-400',
    tags: ['React', 'Next.js', 'TypeScript', 'Angular', 'Azure AD', 'SignalR'],
  },
  {
    initials: 'UX',
    title: 'Product Designer',
    sub: 'UI/UX · Specialist network',
    badge: 'SPECIALIST',
    badgeColor: 'bg-yellow-400/15 text-yellow-400 border-yellow-400/30',
    topColor: 'border-t-yellow-400',
    tags: ['Figma', 'Adobe XD', 'Design Systems', 'Responsive', 'Handoff-ready'],
  },
  {
    initials: 'QA',
    title: 'QA Engineer',
    sub: 'Quality Assurance · Specialist network',
    badge: 'SPECIALIST',
    badgeColor: 'bg-orange-400/15 text-orange-400 border-orange-400/30',
    topColor: 'border-t-orange-400',
    tags: ['Playwright', 'Selenium', 'k6', 'OWASP ZAP', 'Performance', 'Security'],
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function AboutPreview() {
  return (
    <section className="section bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="mb-12">
          <SectionTag label="Our Team" className="mb-4" />
          <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl lg:text-5xl mb-4">
            Real engineers.{' '}
            <span className="gradient-text">Real production experience.</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl">
            Everyone in our team has been through a multi-stage technical review and has shipped
            production systems on real enterprise projects — not just personal side-work.
          </p>
        </FadeUp>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-10"
        >
          {profiles.map((p) => (
            <motion.div
              key={p.initials}
              variants={itemVariants}
              className={`bg-dark-2 border border-slate-100 rounded-2xl p-5 border-t-2 ${p.topColor} hover:border-slate-200 transition-colors`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-dark-3 border border-slate-200 flex items-center justify-center font-heading font-bold text-sm text-slate-900 flex-shrink-0">
                  {p.initials}
                </div>
                {p.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border tracking-wider ${p.badgeColor}`}>
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="font-heading font-semibold text-slate-900 text-sm mb-0.5">{p.title}</div>
              <div className="text-slate-400 text-xs mb-4 leading-relaxed">{p.sub}</div>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((tag) => (
                  <span key={tag} className="text-[11px] font-mono px-2 py-0.5 rounded bg-dark-3 border border-slate-100 text-slate-500">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <FadeUp>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 border border-primary/25 text-primary font-semibold hover:bg-primary/20 transition-colors"
          >
            Learn how we assess our team <ArrowRight size={16} />
          </Link>
        </FadeUp>
      </div>
    </section>
  )
}
