import { NextRequest, NextResponse } from 'next/server'
import { isValidAdminToken } from '@/lib/admin-auth'
import { listEmployees } from '@/lib/employee-store'
import { buildPayslipPdf } from '@/lib/generate-payslip'
import type { Employee } from '@/types/employee'

type PayslipBody = {
  token?: string
  employeeId?: string
  month?: number | string
  year?: number | string
  amount?: number | string
  workDays?: number | string
  lop?: number | string
}

type PayslipKv = {
  put(
    key: string,
    value: ArrayBuffer | Uint8Array | string,
    options?: { expirationTtl?: number },
  ): Promise<void>
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

async function parseBody(req: NextRequest): Promise<PayslipBody> {
  const contentType = req.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    return (await req.json()) as PayslipBody
  }
  const form = await req.formData()
  return {
    token: String(form.get('token') || ''),
    employeeId: String(form.get('employeeId') || ''),
    month: String(form.get('month') || ''),
    year: String(form.get('year') || ''),
    amount: String(form.get('amount') || ''),
    workDays: String(form.get('workDays') || ''),
    lop: String(form.get('lop') || '0'),
  }
}

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

function isFormPost(req: NextRequest): boolean {
  const contentType = req.headers.get('content-type') || ''
  return (
    contentType.includes('application/x-www-form-urlencoded') ||
    contentType.includes('multipart/form-data')
  )
}

export async function POST(req: NextRequest) {
  try {
    const formPost = isFormPost(req)
    const body = await parseBody(req)
    const header = req.headers.get('authorization') || ''
    const bearer = header.startsWith('Bearer ') ? header.slice(7).trim() : ''
    const token = body.token || bearer

    if (!isValidAdminToken(token)) return unauthorized()

    const employeeId = body.employeeId?.trim()
    const month = Number(body.month)
    const year = Number(body.year)
    const amount = Number(body.amount)
    const workDays = Number(body.workDays)
    const lop = Number(body.lop ?? 0)

    if (!employeeId) {
      return NextResponse.json({ error: 'Employee is required' }, { status: 400 })
    }
    if (!Number.isInteger(month) || month < 1 || month > 12) {
      return NextResponse.json({ error: 'Invalid month' }, { status: 400 })
    }
    if (!Number.isInteger(year) || year < 2000) {
      return NextResponse.json({ error: 'Invalid year' }, { status: 400 })
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }
    if (!Number.isFinite(workDays) || workDays <= 0) {
      return NextResponse.json({ error: 'Invalid work days' }, { status: 400 })
    }
    if (!Number.isFinite(lop) || lop < 0) {
      return NextResponse.json({ error: 'Invalid LOP' }, { status: 400 })
    }

    const employees = await listEmployees()
    const employee = employees.find((item: Employee) => item.id === employeeId)
    if (!employee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 })
    }

    const { pdf, fileName } = await buildPayslipPdf({
      employee,
      month,
      year,
      amount,
      workDays,
      lop,
    })

    const bytes = Uint8Array.from(pdf)
    const kv = await getKv()
    const origin = new URL(req.url).origin

    if (kv) {
      const id = crypto.randomUUID()
      await kv.put(`payslip-file:${id}`, bytes, { expirationTtl: 300 })
      await kv.put(
        `payslip-meta:${id}`,
        JSON.stringify({ fileName, token }),
        { expirationTtl: 300 },
      )
      const downloadUrl = `${origin}/api/payslip/file?id=${encodeURIComponent(id)}`

      // Native browser form submit → 303 → PDF. No JS blob / scripted click.
      if (formPost) {
        return NextResponse.redirect(downloadUrl, 303)
      }

      return NextResponse.json({ downloadUrl, fileName })
    }

    // Local/dev fallback: return PDF bytes directly.
    return new NextResponse(bytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${fileName}"`,
        'Content-Length': String(bytes.byteLength),
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (error) {
    const detail = error instanceof Error ? error.message : 'Unknown error'
    console.error('Payslip generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate payslip', detail },
      { status: 500 },
    )
  }
}
