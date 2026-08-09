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

/** Match displayed payslip money (2 decimal places). */
function money(value: number): number {
  return Math.round(value * 100) / 100
}

export function buildPayslipViewModel(input: PayslipInput): PayslipViewModel {
  const { employee, month, year, amount, workDays, lop } = input
  const monthName = MONTHS[month - 1]
  const days = daysInMonth(month, year)
  const safeWorkDays = workDays > 0 ? workDays : days

  // Master = full-month equivalent of the credited amount.
  // Amount / Net Pay stay tied to salary credited for the period.
  const creditedTotal = money(amount)
  const masterBase = money(creditedTotal * (days / safeWorkDays))

  const earningRows = EARNING_BREAKDOWN.map((item) => {
    const masterValue = money(masterBase * item.percent)
    const amountValue = money(creditedTotal * item.percent)
    return {
      label: item.label,
      masterValue,
      amountValue,
      master: formatINR(masterValue),
      amount: formatINR(amountValue),
    }
  })

  // Absorb 2-decimal rounding drift into the last component so row sums
  // match the source totals (do not derive totals from rounded rows).
  if (earningRows.length > 0) {
    const last = earningRows[earningRows.length - 1]
    const masterHead = money(
      earningRows.slice(0, -1).reduce((sum, row) => sum + row.masterValue, 0),
    )
    const amountHead = money(
      earningRows.slice(0, -1).reduce((sum, row) => sum + row.amountValue, 0),
    )
    last.masterValue = money(masterBase - masterHead)
    last.amountValue = money(creditedTotal - amountHead)
    last.master = formatINR(last.masterValue)
    last.amount = formatINR(last.amountValue)
  }

  const totalMaster = masterBase
  const totalAmount = creditedTotal
  const netPay = Math.round(totalAmount)

  return {
    monthName,
    year,
    daysInMonth: days,
    workDays,
    lop,
    employee,
    joinDateLabel: formatDate(employee.joiningDate),
    earnings: earningRows.map(({ label, master, amount: amt }) => ({
      label,
      master,
      amount: amt,
    })),
    totalMaster: formatINR(totalMaster),
    totalAmount: formatINR(totalAmount),
    netPay,
    netPayWords: amountInWords(netPay),
    fileTitle: `Payslip_${sanitizeFilePart(monthName)}_${year}_${sanitizeFilePart(employee.name)}`,
  }
}
