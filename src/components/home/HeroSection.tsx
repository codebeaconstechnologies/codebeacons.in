'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 30, suffix: '+', label: 'Happy Clients' },
  { value: 10, suffix: '+', label: 'Years Experience' },
]

const profiles = [
  {
    initials: 'TL',
    title: 'Technical Lead',
    sub: '10+ yrs .NET & Azure',
    topColor: 'border-t-primary',
    tags: ['.NET 3.1-10', 'Azure', 'SQL Server'],
  },
  {
    initials: 'BE',
    title: 'Backend Engineer',
    sub: 'Assessed · 8+ yrs production',
    topColor: 'border-t-blue-400',
    tags: ['ASP.NET Core', 'C#', 'EF Core'],
  },
  {
    initials: 'FS',
    title: 'Full-Stack Engineer',
    sub: 'Assessed · 7+ yrs production',
    topColor: 'border-t-purple-400',
    tags: ['React', 'Next.js', 'TypeScript'],
  },
]

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)

  const { scrollY } = useScroll()
  const contentY = useTransform(scrollY, [0, 500], [0, 50])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

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

    interface Particle { x: number; y: number; vx: number; vy: number; radius: number; opacity: number }
    const particles: Particle[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.25 + 0.08,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy
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
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(10, 186, 181, ${0.07 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animFrameRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animFrameRef.current) }
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Light gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-primary/5" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(10,186,181,1) 1px, transparent 1px), linear-gradient(90deg, rgba(10,186,181,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Soft teal glow orbs */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-16 right-1/4 w-56 h-56 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />

      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-36 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left: Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Enterprise Engineering
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="font-heading font-bold text-slate-900 leading-[1.1] mb-5"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
            >
              We don&apos;t just build it —
              <br />
              <span className="gradient-text">we take ownership of it.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16 }}
              className="text-slate-600 text-lg leading-relaxed mb-3 max-w-xl"
            >
              Every developer, designer, and QA engineer in our network has been through a
              rigorous multi-stage assessment and has shipped real production systems on
              enterprise-scale projects.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22 }}
              className="text-slate-500 text-base mb-8 max-w-xl"
            >
              One accountable technical lead. From first call to production. Every time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-slate-900 font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
              >
                Let&apos;s talk about your project <ArrowRight size={18} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-300 transition-colors"
              >
                Explore services
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.42 }}
              className="flex flex-wrap gap-10"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-heading font-bold text-slate-900 text-4xl mb-0.5">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Engineer profile cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:flex flex-col gap-4"
          >
            {profiles.map((p, i) => (
              <motion.div
                key={p.initials}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                className={`bg-white border border-slate-200 rounded-2xl p-5 border-t-2 ${p.topColor} shadow-sm`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-heading font-bold text-sm text-slate-700">
                    {p.initials}
                  </div>
                  <div>
                    <div className="text-slate-900 font-semibold text-sm leading-tight">{p.title}</div>
                    <div className="text-slate-400 text-xs">{p.sub}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span key={tag} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.68 }}
              className="bg-white border border-slate-200 rounded-2xl p-5 border-t-2 border-t-pink-400 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-heading font-bold text-sm text-slate-700">
                  DQ
                </div>
                <div>
                  <div className="text-slate-900 font-semibold text-sm leading-tight">Design &amp; QA</div>
                  <div className="text-slate-400 text-xs">Specialist network · On demand</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['Figma', 'Adobe XD', 'Playwright', 'k6', 'OWASP ZAP'].map((tag) => (
                  <span key={tag} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-500">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 flex flex-col items-center gap-1"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} />
      </motion.div>
    </section>
  )
}
