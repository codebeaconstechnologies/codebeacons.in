import { headers } from 'next/headers'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default async function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = (await headers()).get('x-pathname') || ''
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
