import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import ServicesPreview from '@/components/home/ServicesPreview'
import AboutPreview from '@/components/home/AboutPreview'
import TechStackSection from '@/components/home/TechStackSection'
import ProcessSection from '@/components/home/ProcessSection'
import CTASection from '@/components/home/CTASection'

export const metadata: Metadata = {
  title: 'Code Beacons Technologies | Senior-Led Software Engineering · Pune',
  description:
    'Code Beacons Technologies — senior-led software development, .NET & Azure engineering, and IT consulting in Pune. Every project is led by a 10+ year engineer. No juniors on client work.',
  alternates: {
    canonical: '/',
  },
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <AboutPreview />
      <TechStackSection />
      <ProcessSection />
      <CTASection />
    </>
  )
}
