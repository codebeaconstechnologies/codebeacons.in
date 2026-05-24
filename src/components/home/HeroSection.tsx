'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

const typingWords = [
  'Software Development',
  'Cloud Solutions',
  'IT Consulting',
  'Mobile Apps',
  'AI & Analytics',
  'Cybersecurity',
]

const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 30, suffix: '+', label: 'Happy Clients' },
  { value: 10, suffix: '+', label: 'Years Experience' },
]

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const typingRef = useRef<HTMLSpanElement>(null)
  const animFrameRef = useRef<number>(0)

  const { scrollY } = useScroll()
  const contentY = useTransform(scrollY, [0, 500], [0, 80])
  const bgY = useTransform(scrollY, [0, 500], [0, 140])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  // Typing animation
  useEffect(() => {
    const el = typingRef.current
    if (!el) return
    let wordIndex = 0
    let charIndex = 0
    let isDeleting = false
    let timeoutId: ReturnType<typeof setTimeout>

    const type = () => {
      const word = typingWords[wordIndex % typingWords.length]
      if (isDeleting) {
        charIndex--
        el.textContent = word.substring(0, charIndex)
        if (charIndex === 0) {
          isDeleting = false
          wordIndex++
          timeoutId = setTimeout(type, 400)
          return
        }
        timeoutId = setTimeout(type, 60)
      } else {
        charIndex++
        el.textContent = word.substring(0, charIndex)
        if (charIndex === word.length) {
          isDeleting = true
          timeoutId = setTimeout(type, 1800)
          return
        }
        timeoutId = setTimeout(type, 90)
      }
    }
    timeoutId = setTimeout(type, 600)
    return () => clearTimeout(timeoutId)
  }, [])

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = section.offsetWidth
      canvas.height = section.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    interface Particle {
      x: number; y: number; vx: number; vy: number; radius: number; opacity: number
    }
    const particles: Particle[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(10, 186, 181, ${p.opacity})`
        ctx.fill()
      })

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(10, 186, 181, ${0.12 * (1 - dist / 120)})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }
      animFrameRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-dark"
    >
      {/* Background image */}
      <motion.div
        style={{
          y: bgY,
          backgroundImage:
            "url('https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/85 to-accent/60" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(10,186,181,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(10,186,181,0.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float-medium pointer-events-none" />
      <div className="absolute top-2/3 left-1/3 w-64 h-64 bg-primary-light/5 rounded-full blur-3xl animate-float-fast pointer-events-none" />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-36"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold uppercase tracking-widest mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Trusted IT Partner in Pune
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading font-bold text-white leading-tight mb-4"
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)' }}
        >
          Lighting the Future{' '}
          <br className="hidden sm:block" />
          of{' '}
          <span className="gradient-text">Technology</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-300 mb-2"
        >
          Expert{' '}
          <span className="text-primary font-semibold">
            <span ref={typingRef} />
            <span className="animate-typing-blink text-primary">|</span>
          </span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-base text-gray-400 max-w-2xl mb-10"
        >
          We build scalable, enterprise-grade software that drives measurable business
          outcomes. From idea to deployment — and beyond.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap gap-4 mb-16"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-dark font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
          >
            Explore Services <ArrowRight size={18} />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/5 hover:border-white/40 transition-colors"
          >
            Get a Free Consultation
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-wrap gap-10"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-heading font-bold text-white text-4xl mb-1">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 flex flex-col items-center gap-1"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={18} />
      </motion.div>
    </section>
  )
}
