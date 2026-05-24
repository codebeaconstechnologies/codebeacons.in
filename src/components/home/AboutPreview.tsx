'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import SectionTag from '@/components/ui/SectionTag'
import FadeUp from '@/components/ui/FadeUp'

const highlights = [
  '10+ years of combined software delivery experience',
  'Senior-led team — every project gets expert attention',
  'Transparent communication and agile delivery',
  'End-to-end ownership: design, build, deploy, support',
]

export default function AboutPreview() {
  return (
    <section className="section bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Text */}
          <FadeUp>
            <SectionTag label="About Us" className="mb-5" />
            <h2 className="font-heading font-bold text-white text-3xl sm:text-4xl lg:text-5xl mb-5 leading-tight">
              A Team You Can{' '}
              <span className="gradient-text">Build On</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Code Beacons Technologies is a Pune-based software development and IT consulting firm
              led by a Senior Technical Lead with a decade of enterprise engineering experience. We combine senior leadership with a sharp,
              execution-focused team to deliver technology that genuinely moves the needle.
            </p>
            <p className="text-gray-400 leading-relaxed mb-7">
              We work with startups, growth-stage companies, and enterprises — across healthcare,
              finance, retail, and manufacturing — to turn complex technical challenges into clean,
              scalable solutions.
            </p>
            <ul className="space-y-3 mb-8">
              {highlights.map((point) => (
                <li key={point} className="flex items-start gap-3 text-gray-300 text-sm">
                  <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 border border-primary/25 text-primary font-semibold hover:bg-primary/20 transition-colors"
            >
              Our Story <ArrowRight size={16} />
            </Link>
          </FadeUp>

          {/* Image + floating cards */}
          <FadeUp delay={0.15} className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Code Beacons team collaborating"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
            </div>

            {/* Floating stat card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-6 bg-dark-2 border border-white/10 rounded-2xl px-5 py-4 shadow-2xl shadow-black/40"
            >
              <div className="font-heading font-bold text-primary text-3xl">50+</div>
              <div className="text-gray-400 text-xs mt-1">Projects Delivered</div>
            </motion.div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
              className="absolute -top-5 -right-4 bg-primary rounded-xl px-4 py-3 shadow-xl shadow-primary/20"
            >
              <div className="font-heading font-bold text-dark text-2xl">10+</div>
              <div className="text-dark/70 text-xs">Years Exp.</div>
            </motion.div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
