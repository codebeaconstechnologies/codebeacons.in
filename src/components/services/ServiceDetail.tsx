import Image from 'next/image'
import { CheckCircle2, type LucideIcon } from 'lucide-react'
import FadeUp from '@/components/ui/FadeUp'
import SectionTag from '@/components/ui/SectionTag'

interface ServiceDetailProps {
  id: string
  tag: string
  title: string
  description: string
  features: string[]
  imageUrl: string
  imageAlt: string
  reverse?: boolean
}

export default function ServiceDetail({
  id,
  tag,
  title,
  description,
  features,
  imageUrl,
  imageAlt,
  reverse = false,
}: ServiceDetailProps) {
  return (
    <div id={id} className="section border-b border-slate-100 last:border-0 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid lg:grid-cols-2 gap-14 items-center ${
            reverse ? 'lg:flex lg:flex-row-reverse' : ''
          }`}
        >
          {/* Text */}
          <FadeUp>
            <SectionTag label={tag} className="mb-5" />
            <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl mb-5 leading-tight">
              {title}
            </h2>
            <p className="text-slate-500 leading-relaxed mb-7">{description}</p>
            <ul className="space-y-3">
              {features.map((feat) => (
                <li key={feat} className="flex items-start gap-3 text-slate-600 text-sm">
                  <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  {feat}
                </li>
              ))}
            </ul>
          </FadeUp>

          {/* Image */}
          <FadeUp delay={0.15}>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  )
}
