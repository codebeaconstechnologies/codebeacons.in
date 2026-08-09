import { NextRequest, NextResponse } from 'next/server'
import { assertAdminRequest } from '@/lib/admin-auth'
import {
  createEmployeeId,
  listEmployees,
  removeEmployee,
  upsertEmployee,
} from '@/lib/employee-store'
import type { Employee } from '@/types/employee'

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

function isValidEmployeePayload(body: Partial<Employee>): body is Omit<Employee, 'id'> & { id?: string } {
  return Boolean(
    body.name?.trim() &&
      body.joiningDate?.trim() &&
      body.designation?.trim() &&
      body.bankName?.trim() &&
      body.accountNo?.trim() &&
      body.panNumber?.trim(),
  )
}

export async function GET(req: NextRequest) {
  if (!assertAdminRequest(req)) return unauthorized()

  try {
    const employees = await listEmployees()
    return NextResponse.json({ employees })
  } catch (error) {
    console.error('List employees error:', error)
    return NextResponse.json({ error: 'Failed to load employees' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!assertAdminRequest(req)) return unauthorized()

  try {
    const body = (await req.json()) as Partial<Employee>
    if (!isValidEmployeePayload(body)) {
      return NextResponse.json({ error: 'Missing required employee fields' }, { status: 400 })
    }

    const employee: Employee = {
      id: body.id?.trim() || createEmployeeId(),
      name: body.name.trim(),
      joiningDate: body.joiningDate.trim(),
      designation: body.designation.trim(),
      bankName: body.bankName.trim(),
      accountNo: body.accountNo.trim(),
      panNumber: body.panNumber.trim().toUpperCase(),
    }

    const employees = await upsertEmployee(employee)
    return NextResponse.json({ employees, employee })
  } catch (error) {
    console.error('Upsert employee error:', error)
    return NextResponse.json({ error: 'Failed to save employee' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  if (!assertAdminRequest(req)) return unauthorized()

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')?.trim()
    if (!id) {
      return NextResponse.json({ error: 'Employee id is required' }, { status: 400 })
    }

    const employees = await removeEmployee(id)
    return NextResponse.json({ employees })
  } catch (error) {
    console.error('Delete employee error:', error)
    return NextResponse.json({ error: 'Failed to delete employee' }, { status: 500 })
  }
}
