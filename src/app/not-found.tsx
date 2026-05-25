import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-dark px-4">
      <div className="text-center">
        <div className="font-heading font-bold text-primary/20 text-[8rem] leading-none mb-4 select-none">
          404
        </div>
        <h1 className="font-heading font-bold text-slate-900 text-3xl mb-3">Page Not Found</h1>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-dark font-semibold hover:bg-primary-dark transition-colors"
        >
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </div>
    </section>
  )
}
