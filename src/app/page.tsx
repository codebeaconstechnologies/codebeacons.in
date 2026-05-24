import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import ServicesPreview from '@/components/home/ServicesPreview'
import AboutPreview from '@/components/home/AboutPreview'
import ProcessSection from '@/components/home/ProcessSection'
import CTASection from '@/components/home/CTASection'

export const metadata: Metadata = {
  title: 'Code Beacons Technologies | Software Development Company Pune',
  description:
    'Code Beacons Technologies — expert software development, cloud solutions, and IT consulting in Pune. 10+ years delivering scalable enterprise technology. Get a free consultation.',
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
      <ProcessSection />
      <CTASection />
    </>
  )
}
