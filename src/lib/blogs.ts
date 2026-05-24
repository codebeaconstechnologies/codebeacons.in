import type { BlogPost } from '@/types/blog'
import blogsData from '@/data/blogs.json'

export function getBlogPosts(): BlogPost[] {
  return (blogsData as BlogPost[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return (blogsData as BlogPost[]).find((post) => post.slug === slug)
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
