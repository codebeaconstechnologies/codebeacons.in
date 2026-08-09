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

export async function POST(req: NextRequest) {
  try {
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

    const { pdf, fileName } = await buildPayslipPdf(
      {
        employee,
        month,
        year,
        amount,
        workDays,
        lop,
      },
      { origin: new URL(req.url).origin },
    )

    return new NextResponse(Buffer.from(pdf), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}"; filename*=UTF-8''${encodeURIComponent(fileName)}`,
        'Content-Length': String(pdf.byteLength),
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (error) {
    console.error('Payslip generation error:', error)
    return NextResponse.json({ error: 'Failed to generate payslip' }, { status: 500 })
  }
}
