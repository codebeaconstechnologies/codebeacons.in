'use client'

import { motion } from 'framer-motion'
import { Lightbulb, Shield, Star, Users } from 'lucide-react'

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'We constantly explore emerging technologies to deliver forward-thinking solutions that give our clients a competitive edge.',
  },
  {
    icon: Shield,
    title: 'Integrity',
    description:
      'Honest timelines, transparent pricing, and straightforward communication — always. No surprises, no excuses.',
  },
  {
    icon: Star,
    title: 'Excellence',
    description:
      'We hold ourselves to a high standard on every project. Senior-led delivery means quality is never an afterthought.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description:
      'We work as an extension of your team. Your success is our success, and we build relationships that last beyond delivery.',
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

export default function CoreValuesGrid() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {values.map((value) => {
        const Icon = value.icon
        return (
          <motion.div
            key={value.title}
            variants={itemVariants}
            className="p-7 rounded-2xl bg-dark border border-white/5 hover:border-primary/20 transition-colors text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5">
              <Icon size={22} className="text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-white text-lg mb-3">{value.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
