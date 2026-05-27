import Link from 'next/link'
import SectionTag from '@/components/ui/SectionTag'
import FadeUp from '@/components/ui/FadeUp'

const faqs = [
  {
    q: 'How quickly can you start on a new project?',
    a: 'We typically begin within 1–2 weeks of the initial consultation. For urgent requirements we can often accelerate this. The first step is a free 30-minute call to understand your scope — we then provide a clear timeline and resource plan.',
  },
  {
    q: 'How is Code Beacons different from a typical software agency?',
    a: 'Every engagement is led by a 10+ year engineer who is personally accountable for the outcome. You speak directly with that engineer — not an account manager or coordinator. Our developers are assessed, have real production history, and junior engineers are never assigned to client work.',
  },
  {
    q: 'What types of businesses do you work with?',
    a: 'We work with growth-stage startups, mid-sized product companies, and enterprise teams across fintech, edtech, healthcare, and SaaS. Our sweet spot is companies with serious engineering challenges that need experienced ownership, not just execution.',
  },
  {
    q: 'Do you work on fixed-price projects or time and materials?',
    a: 'Both. Fixed-price works well for scoped deliverables — database audits, UI/UX design, or defined feature builds. Time-and-materials (monthly retainer) suits ongoing development, dedicated developer placement, and projects where scope evolves. We will recommend the right model after the first call.',
  },
  {
    q: 'Can I hire just one developer?',
    a: 'Yes. Our dedicated developer placement model lets you bring in one or more assessed engineers who are managed by our technical lead. They integrate directly into your team — your Jira, your Git workflow, your standups — and you can scale up or down each month.',
  },
  {
    q: 'Do you sign NDAs and formal contracts?',
    a: 'Yes. We sign NDAs on request before any technical discussion begins. All engagements are covered by a formal service agreement. We understand enterprise compliance — NDA, IP assignment, and GDPR-aware data handling terms are standard for us.',
  },
  {
    q: 'Will Google be able to index a site built with Next.js?',
    a: 'Yes. Every page we build with Next.js is server-rendered or statically generated at build time. Google receives full HTML on the first request — no JavaScript execution is needed to index the content. We also add structured data, canonical tags, sitemaps, and proper robots.txt to every project.',
  },
  {
    q: 'What is the minimum engagement size?',
    a: 'There is no strict minimum. Smaller engagements like database performance audits or security reviews are fixed-price and completed in a week. Larger product builds or developer placements run on a monthly retainer. We assess each project on its own merits and are honest if we are not the right fit.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function FAQSection() {
  return (
    <section className="section bg-white" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="mb-12 text-center">
          <SectionTag label="FAQ" className="mb-4" />
          <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Answers to the questions we hear most often — about how we work,
            who we work with, and what to expect.
          </p>
        </FadeUp>

        <FadeUp>
          <div className="divide-y divide-slate-100 border-t border-slate-100">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group py-5">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none select-none">
                  <h3 className="font-heading font-semibold text-slate-900 text-base leading-snug">
                    {q}
                  </h3>
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-lg leading-none transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-slate-500 text-sm leading-relaxed pr-10">{a}</p>
              </details>
            ))}
          </div>
        </FadeUp>

        <FadeUp className="mt-10 text-center">
          <p className="text-slate-500 text-sm">
            Still have questions?{' '}
            <Link href="/contact" className="text-primary font-semibold hover:underline">
              Book a free 30-minute consultation
            </Link>{' '}
            and speak directly with a senior engineer.{' '}
            <Link href="/services" className="text-primary font-semibold hover:underline">
              Explore our services
            </Link>{' '}
            to see the full range of what we offer.
          </p>
        </FadeUp>
      </div>
    </section>
  )
}
