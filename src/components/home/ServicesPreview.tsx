'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionTag from '@/components/ui/SectionTag'
import FadeUp from '@/components/ui/FadeUp'

const services = [
  {
    num: '01',
    title: 'Dedicated Developer Placement',
    description: 'Bring in one or more assessed developers managed by our dedicated technical lead. They plug straight into your Jira, standups, and Git workflow. Scale up or down each month.',
    tags: ['.NET', 'React', 'Angular', 'Node', 'Azure'],
    href: '/services#staff',
  },
  {
    num: '02',
    title: 'Full-Stack Product Development',
    description: 'APIs, web platforms, admin portals, dashboards, and cloud apps — built and delivered by us end to end, from architecture review through to production handover.',
    tags: ['ASP.NET Core', 'React', 'Azure', 'SQL Server', 'CI/CD'],
    href: '/services#fullstack',
  },
  {
    num: '03',
    title: 'Legacy System Overhaul',
    description: 'Lift .NET MVC and Framework apps to .NET 8/9, shift on-prem workloads to Azure, and untangle SQL-heavy monoliths into clean, maintainable API layers — with zero downtime.',
    tags: ['MVC → .NET 9', 'On-prem → Azure', 'Monolith → API'],
    href: '/services#legacy',
  },
  {
    num: '04',
    title: 'Database Performance Audit',
    description: 'Slow queries, missing indexes, blocking chains, bloated stored procedures. You get a prioritised fix-list within 5 business days. Fixed price, transparent scope.',
    tags: ['Execution plans', 'Index tuning', 'Query rewrite', 'Deadlock analysis'],
    href: '/services#sql',
  },
  {
    num: '05',
    title: 'Auth & Third-Party Integration',
    description: 'OAuth 2.0, OIDC, SAML 2.0, Azure AD / Entra ID, Auth0, Okta, IdentityServer — we design and wire the right identity and integration layer for your enterprise context.',
    tags: ['OAuth2', 'SAML', 'Azure AD', 'Auth0'],
    href: '/services#auth',
  },
  {
    num: '06',
    title: 'UI/UX Design',
    description: 'Responsive, pixel-perfect designs in Figma and Adobe XD — from wireframes to production-ready design systems with complete developer handoff documentation.',
    tags: ['Figma', 'Adobe XD', 'Design Systems', 'Responsive'],
    href: '/services#design',
  },
  {
    num: '07',
    title: 'QA & Test Automation',
    description: 'Manual and automated UI and API testing with Playwright, Selenium, and Cypress. Load testing with k6. OWASP-based security scans. Full QA coverage, not just happy paths.',
    tags: ['Playwright', 'Selenium', 'k6', 'OWASP ZAP'],
    href: '/services#qa',
  },
  {
    num: '08',
    title: 'Architecture & Technical Review',
    description: 'Azure design walkthroughs, clean architecture assessments, CI/CD pipeline setup, API design, and payments integration strategy. Billed hourly or as a day rate engagement.',
    tags: ['Azure', 'Clean Arch', 'CI/CD', 'API Design'],
    href: '/services#advisory',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function ServicesPreview() {
  return (
    <section className="section bg-dark-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="mb-14">
          <SectionTag label="Services" className="mb-4" />
          <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl lg:text-5xl mb-4">
            Pick your engagement model
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl">
            Eight ways to work together — from a single dedicated developer to a complete
            product build with design, development, and QA rolled in.
          </p>
        </FadeUp>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {services.map((s) => (
            <motion.div key={s.num} variants={itemVariants}>
              <Link
                href={s.href}
                className="group flex flex-col h-full p-6 rounded-2xl bg-dark border border-slate-100 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="font-heading font-bold text-primary text-sm mb-3">{s.num}</div>
                <h3 className="font-heading font-semibold text-slate-900 text-base mb-3 leading-snug group-hover:text-primary transition-colors">
                  {s.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
                  {s.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {s.tags.map((tag) => (
                    <span key={tag} className="text-[11px] font-mono px-2 py-0.5 rounded bg-dark-3 border border-slate-100 text-slate-500">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-primary text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity mt-auto">
                  Learn more <ArrowRight size={12} />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <FadeUp className="mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-primary/30 text-primary font-semibold hover:bg-primary/10 transition-colors"
          >
            See all services <ArrowRight size={18} />
          </Link>
        </FadeUp>
      </div>
    </section>
  )
}
