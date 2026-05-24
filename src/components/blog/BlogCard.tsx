import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight } from 'lucide-react'
import type { BlogPost } from '@/types/blog'
import { formatDate } from '@/lib/blogs'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-dark-2 border border-white/5 rounded-2xl overflow-hidden hover:border-primary/25 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-2/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
          <Calendar size={13} />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        <h2 className="font-heading font-semibold text-white text-lg leading-snug mb-3 group-hover:text-primary transition-colors">
          {post.title}
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-5 line-clamp-3">
          {post.description}
        </p>
        <span className="inline-flex items-center gap-1.5 text-primary text-sm font-medium">
          Read article <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  )
}
