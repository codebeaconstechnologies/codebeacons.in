import type { Metadata } from 'next'
import Link from 'next/link'
import { getBlogPosts } from '@/lib/blogs'
import SectionTag from '@/components/ui/SectionTag'
import FadeUp from '@/components/ui/FadeUp'
import BlogCard from '@/components/blog/BlogCard'

export const metadata: Metadata = {
  title: 'Insights & Tech Updates | Code Beacons Blog',
  description:
    'Practical insights on software development, AI, cloud solutions, and technology strategy from the Code Beacons Technologies team. Written by engineers, for decision-makers.',
  alternates: { canonical: '/blog' },
}

export default function BlogListPage() {
  const posts = getBlogPosts()

  return (
    <>
      {/* Page header */}
      <section className="relative pt-36 pb-20 bg-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-dark to-dark pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <nav className="flex justify-center items-center gap-2 text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-gray-300">Blog</span>
            </nav>
            <SectionTag label="Insights" className="mb-5" />
            <h1 className="font-heading font-bold text-white text-4xl sm:text-5xl lg:text-6xl mb-5 leading-tight">
              Insights &{' '}
              <span className="gradient-text">Tech Updates</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Practical perspectives on software development, AI, cloud, and technology
              strategy — written by our team to help you make better technology decisions.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Blog grid */}
      <section className="section bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {posts.map((post, i) => (
              <FadeUp key={post.slug} delay={i * 0.06}>
                <BlogCard post={post} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
