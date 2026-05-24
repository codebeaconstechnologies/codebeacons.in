import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'
import FadeUp from '@/components/ui/FadeUp'

export default function CTASection() {
  return (
    <section className="section relative overflow-hidden bg-dark">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/40 via-dark to-dark pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeUp>
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
            Ready to Build Something Great?
          </p>
          <h2 className="font-heading font-bold text-white text-3xl sm:text-4xl lg:text-5xl mb-5 leading-tight">
            Let's Turn Your Vision Into{' '}
            <span className="gradient-text">Working Software</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
            Whether you're starting from scratch or scaling an existing system, our team is
            ready to help. Get a free consultation — no commitment, just clarity.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-dark font-bold text-base hover:bg-primary-dark transition-colors shadow-xl shadow-primary/20"
            >
              Start a Conversation <ArrowRight size={18} />
            </Link>
            <a
              href="mailto:hrteam@codebeacons.in"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/15 text-white font-semibold text-base hover:bg-white/5 hover:border-white/30 transition-colors"
            >
              <Mail size={18} /> Email Us Directly
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
