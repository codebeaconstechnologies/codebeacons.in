import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionTag from '@/components/ui/SectionTag'
import FadeUp from '@/components/ui/FadeUp'
import CTASection from '@/components/home/CTASection'

export const metadata: Metadata = {
  title: 'About Code Beacons | Built on Experience. Focused on Outcomes.',
  description:
    'Code Beacons Technologies is a Pune-based engineering team delivering enterprise .NET, Azure, and full-stack solutions. Every engagement is technically led by a 10+ year engineer.',
  alternates: { canonical: '/about' },
}

const standards = [
  {
    badge: 'PROVEN ENGINEERS',
    badgeColor: 'bg-primary/15 text-primary border-primary/30',
    dot: 'bg-primary',
    title: 'Production experience required',
    desc: 'Every engineer placed has passed a technical review, demonstrated real production output, and completed a paid trial engagement before joining any client project.',
  },
  {
    badge: 'DOMAIN DEPTH',
    badgeColor: 'bg-gray-500/15 text-slate-500 border-gray-500/30',
    dot: 'bg-gray-500',
    title: 'Deep domain understanding',
    desc: 'Our engineers have shipped systems across fintech, edtech, healthcare, and enterprise SaaS. The hard architectural problems have been encountered and solved before.',
  },
  {
    badge: 'AI-AUGMENTED',
    badgeColor: 'bg-blue-400/15 text-blue-400 border-blue-400/30',
    dot: 'bg-blue-400',
    title: 'AI tools, human judgement',
    desc: 'We use Claude, Cursor, and GitHub Copilot to move faster. Architecture decisions, security choices, and code review still come from 8–10 years of engineering experience.',
  },
  {
    badge: 'FULL ACCOUNTABILITY',
    badgeColor: 'bg-purple-400/15 text-purple-400 border-purple-400/30',
    dot: 'bg-purple-400',
    title: 'End-to-end technical ownership',
    desc: 'A single senior engineer owns the architecture, reviews every PR, and stays accountable from the first line of code to production — no handoffs, no gaps, no surprises.',
  },
  {
    badge: 'COST-SMART',
    badgeColor: 'bg-orange-400/15 text-orange-400 border-orange-400/30',
    dot: 'bg-orange-400',
    title: 'Efficient without cutting corners',
    desc: 'Our qualified delivery team means you get engineering quality at 35–50% of a local agency rate, without paying for overhead, bench time, or junior hours.',
  },
]

const vettingStages = [
  {
    num: 1,
    color: 'bg-primary',
    label: 'TECHNICAL DEPTH',
    labelColor: 'text-primary border-primary/30 bg-primary/10',
    desc: 'System design walkthrough, architecture pattern assessment, and problem-solving depth under realistic conditions',
  },
  {
    num: 2,
    color: 'bg-blue-500',
    label: 'PRODUCTION PROOF',
    labelColor: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
    desc: 'Live review of actual production codebases and delivery history from prior client engagements',
  },
  {
    num: 3,
    color: 'bg-yellow-500',
    label: 'PAID TRIAL',
    labelColor: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
    desc: 'Paid trial engagement completed before any engineer is placed on a client project',
  },
  {
    num: 4,
    color: 'bg-purple-500',
    label: 'COMMUNICATION',
    labelColor: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
    desc: 'Written and spoken English fluency assessed directly — not self-rated on a form',
  },
  {
    num: 5,
    color: 'bg-gray-500',
    label: 'CONTINUOUS REVIEW',
    labelColor: 'text-slate-500 border-gray-400/30 bg-gray-400/10',
    desc: 'Ongoing performance evaluation with structured client feedback collected every quarter',
  },
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
            <nav className="flex justify-center items-center gap-2 text-sm text-slate-400 mb-6">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-slate-600">About</span>
            </nav>
            <SectionTag label="About Us" className="mb-5" />
            <h1 className="font-heading font-bold text-slate-900 text-4xl sm:text-5xl lg:text-6xl mb-5 leading-tight">
              Built on experience.{' '}
              <br />
              <span className="gradient-text">Focused on outcomes.</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              An experienced engineering team led by a 10+ year engineer who takes personal
              ownership of every engagement — from the first discovery call through to
              production delivery.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Founder + delivery model */}
      <section className="section bg-dark-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="mb-12">
            <SectionTag label="Our Story" className="mb-4" />
            <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl mb-2">
              Why Code Beacons exists
            </h2>
          </FadeUp>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Founder card */}
            <FadeUp>
              <div className="bg-dark border border-slate-100 rounded-2xl border-t-2 border-t-primary overflow-hidden">
                <div className="p-7">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center font-heading font-bold text-xl text-primary flex-shrink-0">
                      TL
                    </div>
                    <div>
                      <div className="font-heading font-bold text-slate-900 text-lg">Technical Lead</div>
                      <div className="text-slate-500 text-sm">Founder & Principal Engineer</div>
                      <div className="text-slate-400 text-sm"></div>
                    </div>
                    <span className="ml-auto text-[11px] font-bold px-2.5 py-1 rounded-full border bg-primary/15 text-primary border-primary/30 tracking-wider whitespace-nowrap">
                      TECH LEAD
                    </span>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Code Beacons was built on a simple observation: most companies don't need
                    more developers — they need engineers who understand the business, care about
                    the outcome, and take real ownership of what they ship.
                  </p>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    With 10+ years building enterprise systems across fintech, edtech, healthcare,
                    and SaaS — and leading distributed teams through production delivery — our
                    founding engineer brings the same senior accountability to every client
                    engagement, regardless of size.
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {['.NET 3.1–10', 'Azure', 'SQL Server', 'Angular', 'Next.js', 'TypeScript', 'OAuth2', 'SAML 2.0', 'Azure AD', 'Stripe', 'PayPal', 'Twilio'].map((tag) => (
                      <span key={tag} className="text-[11px] font-mono px-2 py-0.5 rounded bg-dark-3 border border-slate-100 text-slate-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Delivery model */}
            <FadeUp delay={0.1}>
              <div className="bg-dark border border-slate-100 rounded-2xl p-7 h-full">
                <div className="text-primary font-bold text-xs tracking-widest mb-6">HOW DELIVERY WORKS</div>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-dark-3/50 border border-slate-100">
                    <div className="text-slate-900 font-semibold text-sm mb-1">Your business</div>
                    <div className="text-slate-400 text-xs">Requirements · Feedback · Business priorities</div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-px h-5 bg-primary/30" />
                  </div>
                  <div className="p-4 rounded-xl bg-primary/8 border border-primary/20">
                    <div className="text-primary font-semibold text-sm mb-1">Technical Lead</div>
                    <div className="text-slate-500 text-xs">Architecture · Code review · Client communication · QA oversight</div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-px h-5 bg-primary/30" />
                  </div>
                  <div className="p-4 rounded-xl bg-dark-3/50 border border-slate-100">
                    <div className="text-slate-900 font-semibold text-sm mb-1">Qualified Engineering Team</div>
                    <div className="text-slate-400 text-xs">Development · Design · QA · Delivery velocity</div>
                  </div>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mt-6">
                  You always communicate with an engineer who knows the codebase. The lead
                  reviews everything before it reaches you — nothing ships without that check.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {['C2C Contract', 'Weekly reporting', 'All deliverables reviewed'].map((item) => (
                    <span key={item} className="text-xs px-2.5 py-1 rounded-full bg-dark-3 border border-slate-100 text-slate-500">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Standards + Vetting */}
      <section className="section bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Standards */}
            <FadeUp>
              <div className="bg-dark-2 border border-slate-100 rounded-2xl p-7 h-full">
                <div className="text-primary font-bold text-xs tracking-widest mb-6">WHAT WE HOLD OURSELVES TO</div>
                <div className="grid grid-cols-2 gap-5">
                  {standards.map((s) => (
                    <div key={s.badge} className="border-b border-slate-100 pb-4 last:border-0 col-span-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} />
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${s.badgeColor} tracking-wider`}>
                          {s.badge}
                        </span>
                      </div>
                      <div className="text-slate-900 font-semibold text-sm mb-1">{s.title}</div>
                      <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Vetting process */}
            <FadeUp delay={0.1}>
              <div className="bg-dark-2 border border-slate-100 rounded-2xl p-7 h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-slate-900 font-heading font-semibold text-lg">How we assess our engineers</div>
                  <span className="text-xs px-3 py-1 rounded-full bg-dark-3 border border-slate-100 text-slate-500 font-medium">
                    5 STAGES
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-4 bottom-4 w-px bg-white/8" />
                  <div className="space-y-5">
                    {vettingStages.map((stage) => (
                      <div key={stage.num} className="flex gap-4 items-start">
                        <div className={`w-8 h-8 rounded-full ${stage.color} flex items-center justify-center font-heading font-bold text-slate-900 text-sm flex-shrink-0 relative z-10`}>
                          {stage.num}
                        </div>
                        <div className="flex-1 pt-0.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border tracking-wider ${stage.labelColor} inline-block mb-1.5`}>
                            {stage.label}
                          </span>
                          <p className="text-slate-500 text-sm leading-relaxed">{stage.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section bg-dark-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="mb-12">
            <SectionTag label="Why Us" className="mb-4" />
            <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl mb-4">
              What makes the difference
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: '🤖', title: 'AI-augmented engineering, human judgement', body: 'We use Claude, Cursor, and GitHub Copilot to ship faster — but every architecture decision, security call, and PR review still comes from 8–10 years of hands-on production experience. Speed without shortcuts.' },
              { icon: '🏅', title: 'Assessed engineers, every time', body: 'Every developer placed has cleared a technical assessment, delivered a trial engagement, and has real production history. You review their profile before they start.' },
              { icon: '🎨', title: 'Design and QA as part of the team', body: 'Pixel-accurate Figma and Adobe XD designs, plus end-to-end QA coverage — manual, automated, performance, and security — from our specialist network when you need it.' },
              { icon: '👤', title: 'The same engineer throughout', body: 'The technical lead who scoped the work is the same person who reviews every delivery. Not a rotating PM, not a handoff after discovery — continuity all the way through.' },
              { icon: '💰', title: 'Senior quality, efficient pricing', body: 'Our qualified team means 35–50% of a comparable local agency rate. You get experienced engineering without paying for overhead or hours you didn\'t ask for.' },
              { icon: '🔒', title: 'Security and compliance built in', body: 'Proper contracts, NDA available on request, GDPR-aware data handling. We understand what enterprise compliance means in practice — it\'s not an afterthought here.' },
            ].map((item) => (
              <FadeUp key={item.title}>
                <div className="bg-dark border border-slate-100 rounded-2xl p-6 hover:border-primary/20 transition-colors h-full">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="font-heading font-semibold text-slate-900 text-base mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="section bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <SectionTag label="Get started" className="mb-5" />
            <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl mb-5 leading-tight">
              Free 30-minute{' '}
              <span className="gradient-text">engineering consultation</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto mb-8">
              No slide deck, no sales pitch. Bring your problem and talk directly with a
              hands-on engineer who has likely solved something similar before.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-dark font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
              >
                Book a free consultation <ArrowRight size={18} />
              </Link>
              <div className="inline-flex items-center gap-3 px-5 py-3.5 text-slate-500 text-sm">
                <span className="text-primary">30-min call</span>
                <span>·</span>
                <span>No commitment</span>
                <span>·</span>
                <span>Engineer-led</span>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <CTASection />
    </>
  )
}
