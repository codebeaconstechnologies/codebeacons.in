'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Code2, Cloud, Lightbulb, Shield, Smartphone, BarChart3, ArrowRight } from 'lucide-react'
import SectionTag from '@/components/ui/SectionTag'
import FadeUp from '@/components/ui/FadeUp'

const services = [
  {
    icon: Code2,
    title: 'Custom Software Development',
    description:
      'Bespoke web and enterprise applications engineered to your exact requirements — built for scale, performance, and long-term maintainability.',
    href: '/services#software',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions & Migration',
    description:
      'Architect, migrate, and optimise your infrastructure on AWS, Azure, or GCP. Reduce costs, improve reliability, and unlock global scale.',
    href: '/services#cloud',
  },
  {
    icon: Lightbulb,
    title: 'IT Strategy & Consulting',
    description:
      'Align technology investments with your business goals. Our senior consultants help you build roadmaps that actually get executed.',
    href: '/services#consulting',
  },
  {
    icon: Shield,
    title: 'Cybersecurity Services',
    description:
      'Proactive security audits, compliance frameworks, and incident response. Protect your data and reputation before threats materialise.',
    href: '/services#security',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description:
      'Native and cross-platform mobile apps for iOS and Android. Polished UX, reliable performance, and seamless backend integration.',
    href: '/services#mobile',
  },
  {
    icon: BarChart3,
    title: 'AI & Data Analytics',
    description:
      'Turn raw data into strategic advantage. We build ML pipelines, dashboards, and AI-powered features that drive real decisions.',
    href: '/services#ai',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function ServicesPreview() {
  return (
    <section className="section bg-dark-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center mb-14">
          <SectionTag label="What We Do" className="mb-4" />
          <h2 className="font-heading font-bold text-white text-3xl sm:text-4xl lg:text-5xl mb-4">
            Services Built for{' '}
            <span className="gradient-text">Real Results</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Every engagement starts with a clear understanding of your business. We deliver
            technology that solves problems — not just technology for technology's sake.
          </p>
        </FadeUp>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div key={service.title} variants={itemVariants}>
                <Link
                  href={service.href}
                  className="group block h-full p-7 rounded-2xl bg-dark border border-white/5 hover:border-primary/30 hover:bg-dark-3/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-white text-lg mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        <FadeUp className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-primary/30 text-primary font-semibold hover:bg-primary/10 transition-colors"
          >
            View All Services <ArrowRight size={18} />
          </Link>
        </FadeUp>
      </div>
    </section>
  )
}
