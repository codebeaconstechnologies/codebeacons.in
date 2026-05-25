'use client'

import { motion } from 'framer-motion'
import SectionTag from '@/components/ui/SectionTag'
import FadeUp from '@/components/ui/FadeUp'

const steps = [
  {
    number: '01',
    timing: 'Day 0',
    title: 'Scope It in 30 Minutes',
    description: 'A focused engineering call — no slide decks, no sales scripts. We map your tech stack, constraints, and what success actually looks like. Free, direct, and to the point.',
  },
  {
    number: '02',
    timing: 'Day 1',
    title: 'Technical Deep-Dive',
    description: 'We dig into the architecture, existing codebase (if any), dependencies, and risks. This shapes the right solution — not just the fast one.',
  },
  {
    number: '03',
    timing: 'Day 2–5',
    title: 'Proposal, Team & Sign-off',
    description: 'A crisp written proposal with scope, timeline, and team profiles — ready for your review. For placements, you interview the engineers before committing. Agreements signed digitally, access provisioned, tools connected. Zero friction.',
  },
  {
    number: '04',
    timing: 'Day 7–10',
    title: 'Sprint Kickoff',
    description: 'First standup scheduled. Sprint backlog groomed and prioritised. The team is aligned, access is confirmed, and momentum starts from day one.',
  },
  {
    number: '05',
    timing: 'Ongoing',
    title: 'Continuous Delivery',
    description: 'Weekly progress updates, every pull request reviewed by the technical lead, and meaningful output each sprint — no long silences before a big reveal.',
  },
  {
    number: '06',
    timing: 'Final Sprint',
    title: 'Pre-production & Go Live',
    description: 'Staging environment sign-off, end-to-end QA, performance checks, and infrastructure hardening. Then a controlled production release — monitored, documented, and handed over with confidence.',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function ProcessSection() {
  return (
    <section className="section bg-dark-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="mb-14">
          <SectionTag label="How We Work" className="mb-4" />
          <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl lg:text-5xl mb-4 leading-tight">
            From first conversation{' '}
            <span className="gradient-text">to live code — fast</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl">
            No lengthy procurement. No bloated proposals. Engineers who understand the
            domain move quickly and deliberately.
          </p>
        </FadeUp>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="relative p-6 rounded-2xl bg-dark border border-slate-100 hover:border-primary/20 transition-colors group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-heading font-bold text-dark text-sm flex-shrink-0">
                  {step.number}
                </div>
                <span className="text-xs text-slate-400 font-mono bg-dark-3 px-2.5 py-1 rounded-full">
                  {step.timing}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-slate-900 text-base mb-2 group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
