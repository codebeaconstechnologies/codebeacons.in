'use client'

import { motion } from 'framer-motion'
import { Search, Lightbulb, Rocket, HeartHandshake } from 'lucide-react'
import SectionTag from '@/components/ui/SectionTag'
import FadeUp from '@/components/ui/FadeUp'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery',
    description:
      'We start by deeply understanding your business, users, and technical landscape. No assumptions — just honest discovery that sets the project up for success.',
  },
  {
    number: '02',
    icon: Lightbulb,
    title: 'Strategy',
    description:
      "Our senior team designs a clear technical architecture and delivery roadmap. You know exactly what you're getting, when, and why.",
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Execution',
    description:
      'We build in agile sprints with transparent progress tracking. Regular demos keep you in the loop — no surprises at the finish line.',
  },
  {
    number: '04',
    icon: HeartHandshake,
    title: 'Support',
    description:
      'Launch is the beginning, not the end. We provide ongoing monitoring, optimisation, and support to keep your product performing at its best.',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function ProcessSection() {
  return (
    <section className="section bg-dark-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center mb-14">
          <SectionTag label="How We Work" className="mb-4" />
          <h2 className="font-heading font-bold text-white text-3xl sm:text-4xl lg:text-5xl mb-4">
            A Process Built for{' '}
            <span className="gradient-text">Confidence</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We've refined our delivery process across 50+ projects. Every step is designed
            to reduce risk and maximise the value you get.
          </p>
        </FadeUp>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="relative p-7 rounded-2xl bg-dark border border-white/5 hover:border-primary/20 transition-colors group"
              >
                <div className="font-heading font-bold text-5xl text-primary/10 group-hover:text-primary/20 transition-colors mb-4 select-none">
                  {step.number}
                </div>
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-white text-lg mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
