import { NextRequest, NextResponse } from 'next/server'
import { isValidAdminToken } from '@/lib/admin-auth'

type PayslipKv = {
  get(key: string, type: 'arrayBuffer'): Promise<ArrayBuffer | null>
  get(key: string, type: 'json'): Promise<unknown>
  delete(key: string): Promise<void>
}

async function getKv(): Promise<PayslipKv | null> {
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare')
    const { env } = await getCloudflareContext({ async: true })
    return (env as { EMPLOYEES?: PayslipKv } | undefined)?.EMPLOYEES ?? null
  } catch {
    return null
  }
}

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id')?.trim()
    if (!id) {
      return NextResponse.json({ error: 'Missing file id' }, { status: 400 })
    }

    const kv = await getKv()
    if (!kv) {
      return NextResponse.json({ error: 'Download storage unavailable' }, { status: 503 })
    }

    const meta = (await kv.get(`payslip-meta:${id}`, 'json')) as
      | { fileName?: string; token?: string }
      | null

    if (!meta?.fileName || !isValidAdminToken(meta.token)) {
      return NextResponse.json({ error: 'File not found or expired' }, { status: 404 })
    }

    const file = await kv.get(`payslip-file:${id}`, 'arrayBuffer')
    if (!file) {
      return NextResponse.json({ error: 'File not found or expired' }, { status: 404 })
    }

    // One-time download
    await Promise.all([
      kv.delete(`payslip-file:${id}`),
      kv.delete(`payslip-meta:${id}`),
    ])

    const bytes = new Uint8Array(file)
    return new NextResponse(bytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${meta.fileName}"; filename*=UTF-8''${encodeURIComponent(meta.fileName)}`,
        'Content-Length': String(bytes.byteLength),
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (error) {
    console.error('Payslip file download error:', error)
    return NextResponse.json({ error: 'Failed to download payslip' }, { status: 500 })
  }
}
