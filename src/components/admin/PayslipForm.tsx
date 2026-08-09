'use client'

import { FormEvent, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Printer } from 'lucide-react'
import type { Employee } from '@/types/employee'
import { MONTHS } from '@/types/employee'
import { PAYSLIP_DRAFT_KEY } from '@/lib/payslip-calc'

interface PayslipFormProps {
  employees: Employee[]
}

export default function PayslipForm({ employees }: PayslipFormProps) {
  const router = useRouter()
  const [employeeId, setEmployeeId] = useState('')
  const [month, setMonth] = useState(() => String(new Date().getMonth() + 1))
  const [year, setYear] = useState(() => String(new Date().getFullYear()))
  const [amount, setAmount] = useState('')
  const [workDays, setWorkDays] = useState('')
  const [lop, setLop] = useState('0')
  const [error, setError] = useState('')

  const years = useMemo(() => {
    const current = new Date().getFullYear()
    return Array.from({ length: 6 }, (_, i) => current - 2 + i)
  }, [])

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError('')

    const employee = employees.find((item) => item.id === employeeId)
    if (!employee) {
      setError('Please select an employee')
      return
    }

    const parsedAmount = Number(amount)
    const parsedWorkDays = Number(workDays)
    const parsedLop = Number(lop)

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setError('Enter a valid salary amount')
      return
    }
    if (!Number.isFinite(parsedWorkDays) || parsedWorkDays <= 0) {
      setError('Enter valid work days')
      return
    }
    if (!Number.isFinite(parsedLop) || parsedLop < 0) {
      setError('Enter valid LOP')
      return
    }

    sessionStorage.setItem(
      PAYSLIP_DRAFT_KEY,
      JSON.stringify({
        employee,
        month: Number(month),
        year: Number(year),
        amount: parsedAmount,
        workDays: parsedWorkDays,
        lop: parsedLop,
      }),
    )

    router.push('/admin/payslip')
  }

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Generate Salary Slip</h2>
        <p className="text-sm text-slate-500">
          Select employee, month/year, and credited amount. Earnings are split as Basic 40%, HRA 20%, LTA 5%,
          Special Allowance 28%, Travel 7%. Deductions stay empty.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="sm:col-span-2 lg:col-span-3">
          <label className="block text-xs font-medium text-slate-600 mb-1">Employee</label>
          <select
            required
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
          >
            <option value="">Select employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Month</label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
          >
            {MONTHS.map((name, index) => (
              <option key={name} value={index + 1}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Year</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
          >
            {years.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Salary Credited (Amount)</label>
          <input
            type="number"
            min="1"
            step="0.01"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
            placeholder="e.g. 62630"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Work Days</label>
          <input
            type="number"
            min="1"
            max="31"
            required
            value={workDays}
            onChange={(e) => setWorkDays(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
            placeholder="e.g. 30"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">LOP</label>
          <input
            type="number"
            min="0"
            max="31"
            required
            value={lop}
            onChange={(e) => setLop(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
          />
        </div>

        <div className="sm:col-span-2 lg:col-span-3 flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={employees.length === 0}
            className="inline-flex items-center gap-2 rounded-lg bg-primary text-white px-4 py-2.5 text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
          >
            <Printer size={16} />
            Create & Save as PDF
          </button>
          {employees.length === 0 ? (
            <span className="text-sm text-amber-700">Add at least one employee first.</span>
          ) : null}
          {error ? <span className="text-sm text-red-600">{error}</span> : null}
        </div>
      </form>
    </section>
  )
}
