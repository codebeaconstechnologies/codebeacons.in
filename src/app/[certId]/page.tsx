import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BadgeCheck, Calendar, Download, ShieldAlert, ArrowLeft } from 'lucide-react'
import { getCertificates, getCertificateById, formatCertDate } from '@/lib/certificates'

interface Props {
  params: Promise<{ certId: string }>
}

export async function generateStaticParams() {
  return getCertificates().map((cert) => ({ certId: cert.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { certId } = await params
  const cert = getCertificateById(certId)
  if (!cert) return { title: 'Certificate Not Found' }

  return {
    title: `Certificate Verification | ${cert.internName}`,
    description: `Verify the authenticity of the internship certificate issued to ${cert.internName} by Code Beacons Technologies.`,
    alternates: { canonical: `/${cert.id}` },
    robots: { index: false, follow: false },
  }
}

export default async function CertificatePage({ params }: Props) {
  const { certId } = await params
  const cert = getCertificateById(certId)
  if (!cert) notFound()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codebeacons.in'
  const isValid = cert.status === 'valid'

  const credentialSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalCredential',
    name: `Internship Certificate - ${cert.role}`,
    credentialCategory: 'Certificate',
    recognizedBy: {
      '@type': 'Organization',
      name: 'Code Beacons Technologies',
      url: siteUrl,
    },
    url: `${siteUrl}/${cert.id}`,
    dateCreated: cert.issueDate,
    about: {
      '@type': 'Person',
      name: cert.internName,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(credentialSchema) }}
      />

      <section className="relative pt-36 pb-20 bg-dark overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-dark to-dark pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-500">Certificate Verification</span>
          </nav>

          {isValid ? (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-6">
              <BadgeCheck size={14} /> Verified Certificate
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-widest mb-6">
              <ShieldAlert size={14} /> Revoked Certificate
            </div>
          )}

          <h1 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl leading-tight mb-2">
            {cert.internName}
          </h1>
          <p className="text-slate-500 mb-8">{cert.role}</p>

          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            <div className="rounded-xl border border-slate-100 bg-white p-4">
              <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">Certificate ID</div>
              <div className="font-heading font-semibold text-slate-900">{cert.id}</div>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white p-4">
              <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">Duration</div>
              <div className="font-heading font-semibold text-slate-900 text-sm">
                {formatCertDate(cert.startDate)} – {formatCertDate(cert.endDate)}
              </div>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white p-4">
              <div className="text-xs text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                <Calendar size={12} /> Issued On
              </div>
              <div className="font-heading font-semibold text-slate-900 text-sm">
                {formatCertDate(cert.issueDate)}
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-lg mb-6">
            {cert.fileType === 'pdf' ? (
              <object data={cert.fileUrl} type="application/pdf" className="w-full aspect-[1.414/1]">
                <div className="p-10 text-center text-slate-500">
                  Your browser can&apos;t preview PDFs inline.{' '}
                  <a href={cert.fileUrl} className="text-primary underline">Download the certificate</a> instead.
                </div>
              </object>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cert.fileUrl} alt={`Certificate issued to ${cert.internName}`} className="w-full h-auto" />
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={cert.fileUrl}
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-slate-900 font-semibold hover:bg-primary-dark transition-colors"
            >
              <Download size={16} /> Download Certificate
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:border-primary/25 hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
