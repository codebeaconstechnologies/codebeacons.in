import type { Certificate } from '@/types/certificate'
import certificatesData from '@/data/certificates.json'

export function getCertificates(): Certificate[] {
  return certificatesData as Certificate[]
}

export function getCertificateById(id: string): Certificate | undefined {
  return getCertificates().find((cert) => cert.id.toLowerCase() === id.toLowerCase())
}

export function formatCertDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
