import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'
import FadeUp from '@/components/ui/FadeUp'

const nextSteps = [
  { num: '01', title: 'Tell us about the problem', body: 'Fill the form or book a call — two minutes, no lengthy brief required.' },
  { num: '02', title: 'We review it personally', body: 'A hands-on engineer reads every submission the same day, no intake queue.' },
  { num: '03', title: 'Straight-talking technical call', body: '30 minutes. We tell you honestly whether we are the right fit and what a solution would look like.' },
]

export default function CTASection() {
  return (
    <section className="section relative overflow-hidden bg-dark-2">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-dark-2 to-dark-2 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/4 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left */}
          <FadeUp>
            <p className="text-primary font-bold text-xs uppercase tracking-widest mb-4">
              Let's solve something together
            </p>
            <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl lg:text-5xl mb-5 leading-tight">
              Describe the challenge.{' '}
              <span className="gradient-text">We'll give you a straight answer.</span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed mb-8 max-w-md">
              Tell us what you are trying to build or fix. We will ask the right engineering
              questions and be honest about whether we are the right team for it. No sales
              process, no pressure.
            </p>

            <div className="space-y-4 mb-8">
              {nextSteps.map((s) => (
                <div key={s.num} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center font-heading font-bold text-primary text-xs flex-shrink-0">
                    {s.num}
                  </div>
                  <div>
                    <div className="text-slate-900 font-semibold text-sm">{s.title}</div>
                    <div className="text-slate-400 text-sm">{s.body}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <a
                href="mailto:hrteam@codebeacons.in"
                className="flex items-center gap-3 text-slate-500 hover:text-primary transition-colors text-sm"
              >
                <Mail size={15} className="text-primary" />
                hrteam@codebeacons.in
              </a>
              <div className="text-slate-400 text-xs pl-6">Typically back to you within one business day</div>
            </div>
          </FadeUp>

          {/* Right: CTA card */}
          <FadeUp delay={0.12}>
            <div className="bg-dark border border-slate-100 rounded-2xl p-8">
              <h3 className="font-heading font-semibold text-slate-900 text-xl mb-2">
                Free 30-minute technical consultation
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                No commitment required. You speak directly with an engineer, not an account manager.
              </p>

              <div className="space-y-3 mb-6">
                {[
                  { label: 'Need developers on your team?', active: true },
                  { label: 'Got a project to ship?', active: false },
                  { label: 'Have a specific technical problem?', active: false },
                ].map((opt) => (
                  <div
                    key={opt.label}
                    className={`px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${opt.active ? 'border-primary/30 bg-primary/8 text-primary' : 'border-slate-100 text-slate-500'}`}
                  >
                    {opt.label}
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-primary text-dark font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 mb-4"
              >
                Book a free consultation <ArrowRight size={18} />
              </Link>

              <div className="flex flex-wrap gap-3 justify-center">
                {['30-min call', 'No commitment', 'Engineer-led'].map((badge) => (
                  <span key={badge} className="text-xs text-slate-400 px-3 py-1 rounded-full bg-dark-3 border border-slate-100">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
