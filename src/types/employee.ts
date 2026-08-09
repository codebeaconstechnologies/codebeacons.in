export interface Employee {
  id: string
  name: string
  joiningDate: string
  designation: string
  bankName: string
  accountNo: string
  panNumber: string
}

export interface PayslipInput {
  employee: Employee
  month: number
  year: number
  amount: number
  workDays: number
  lop: number
}

export const EARNING_BREAKDOWN = [
  { key: 'basic', label: 'BASIC', percent: 0.4 },
  { key: 'hra', label: 'HRA', percent: 0.2 },
  { key: 'lta', label: 'LTA', percent: 0.05 },
  { key: 'special', label: 'SPECIAL ALLOWANCE', percent: 0.28 },
  { key: 'travel', label: 'TRAVEL', percent: 0.07 },
] as const

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const
