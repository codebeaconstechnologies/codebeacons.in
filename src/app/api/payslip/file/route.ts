import { NextRequest, NextResponse } from 'next/server'
import { isValidAdminToken } from '@/lib/admin-auth'

type PayslipKv = {
  get(key: string, type: 'arrayBuffer'): Promise<ArrayBuffer | null>
  get(key: string, type: 'json'): Promise<unknown>
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

/**
 * Serve a short-lived Chromium PDF.
 * IMPORTANT: do not delete on first GET — Chrome / Windows AV often fetch the
 * URL more than once while scanning. Deleting on first hit makes the second
 * fetch 404 and Chrome reports "Virus detected".
 */
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

    const bytes = new Uint8Array(file)
    const asciiName = meta.fileName.replace(/[^\x20-\x7E]/g, '_').replace(/"/g, '')

    return new NextResponse(bytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        // inline = open in Chrome PDF viewer (avoids download-shelf AV false positives).
        // Users save with the viewer download button / Ctrl+S.
        'Content-Disposition': `inline; filename="${asciiName}"; filename*=UTF-8''${encodeURIComponent(meta.fileName)}`,
        'Content-Length': String(bytes.byteLength),
        'Cache-Control': 'private, max-age=120',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (error) {
    console.error('Payslip file download error:', error)
    return NextResponse.json({ error: 'Failed to download payslip' }, { status: 500 })
  }
}
