import {
  EARNING_BREAKDOWN,
  MONTHS,
  type Employee,
  type PayslipInput,
} from '@/types/employee'
import { amountInWords, formatINR } from '@/lib/number-to-words'

export const PAYSLIP_DRAFT_KEY = 'cb_payslip_draft'

export type PayslipDraft = {
  employee: Employee
  month: number
  year: number
  amount: number
  workDays: number
  lop: number
}

export type PayslipViewModel = {
  monthName: string
  year: number
  daysInMonth: number
  workDays: number
  lop: number
  employee: Employee
  joinDateLabel: string
  earnings: { label: string; master: string; amount: string }[]
  totalMaster: string
  totalAmount: string
  netPay: number
  netPayWords: string
  fileTitle: string
}

function daysInMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate()
}

function formatDate(isoDate: string): string {
  if (!isoDate) return '-'
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return isoDate
  const day = String(date.getUTCDate()).padStart(2, '0')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${day} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`
}

function sanitizeFilePart(value: string): string {
  return value.replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '')
}

export function buildPayslipViewModel(input: PayslipInput): PayslipViewModel {
  const { employee, month, year, amount, workDays, lop } = input
  const monthName = MONTHS[month - 1]
  const days = daysInMonth(month, year)
  const safeWorkDays = workDays > 0 ? workDays : days
  const masterTotal = amount * (days / safeWorkDays)

  const earnings = EARNING_BREAKDOWN.map((item) => ({
    label: item.label,
    master: formatINR(masterTotal * item.percent),
    amount: formatINR(amount * item.percent),
  }))

  const totalMaster = earnings.reduce(
    (sum, row, index) => sum + masterTotal * EARNING_BREAKDOWN[index].percent,
    0,
  )
  const totalAmount = amount
  const netPay = Math.round(totalAmount)

  return {
    monthName,
    year,
    daysInMonth: days,
    workDays,
    lop,
    employee,
    joinDateLabel: formatDate(employee.joiningDate),
    earnings,
    totalMaster: formatINR(totalMaster),
    totalAmount: formatINR(totalAmount),
    netPay,
    netPayWords: amountInWords(netPay),
    fileTitle: `Payslip_${sanitizeFilePart(monthName)}_${year}_${sanitizeFilePart(employee.name)}`,
  }
}
