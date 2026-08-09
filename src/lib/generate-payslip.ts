import { promises as fs } from 'fs'
import path from 'path'
import { jsPDF } from 'jspdf'
import {
  EARNING_BREAKDOWN,
  MONTHS,
  type PayslipInput,
} from '@/types/employee'
import { amountInWords, formatINR } from '@/lib/number-to-words'

function daysInMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate()
}

function formatDate(isoDate: string): string {
  if (!isoDate) return ''
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return isoDate
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function sanitizeFilePart(value: string): string {
  return value.replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '')
}

function bytesToDataUrl(bytes: Uint8Array, mime: 'image/jpeg' | 'image/png'): string {
  return `data:${mime};base64,${Buffer.from(bytes).toString('base64')}`
}

async function loadBackgroundDataUrl(origin?: string): Promise<string> {
  // Prefer JPEG — more standard in PDFs and less likely to trip AV heuristics.
  try {
    const jpgPath = path.join(process.cwd(), 'public', 'images', 'payslip-bg.jpg')
    const bytes = await fs.readFile(jpgPath)
    return bytesToDataUrl(bytes, 'image/jpeg')
  } catch {
    // Cloudflare Workers: public assets are not on disk — fetch from the site origin.
  }

  if (origin) {
    const response = await fetch(new URL('/images/payslip-bg.jpg', origin))
    if (response.ok) {
      return bytesToDataUrl(new Uint8Array(await response.arrayBuffer()), 'image/jpeg')
    }
    const pngResponse = await fetch(new URL('/images/payslip-bg.png', origin))
    if (pngResponse.ok) {
      return bytesToDataUrl(new Uint8Array(await pngResponse.arrayBuffer()), 'image/png')
    }
  }

  throw new Error('Failed to load payslip background')
}

/** Baseline for vertically centered text inside a row. */
function rowTextY(rowTop: number, rowHeight: number): number {
  return rowTop + rowHeight * 0.68
}

export function getPayslipFileName(input: Pick<PayslipInput, 'employee' | 'month' | 'year'>): string {
  const monthName = MONTHS[input.month - 1]
  return `Payslip_${sanitizeFilePart(monthName)}_${input.year}_${sanitizeFilePart(input.employee.name)}.pdf`
}

export async function buildPayslipPdf(
  input: PayslipInput,
  options?: { origin?: string },
): Promise<{ pdf: Uint8Array; fileName: string }> {
  const { employee, month, year, amount, workDays, lop } = input
  const monthName = MONTHS[month - 1]
  const days = daysInMonth(month, year)
  const safeWorkDays = workDays > 0 ? workDays : days
  const masterTotal = amount * (days / safeWorkDays)

  const earnings = EARNING_BREAKDOWN.map((item) => ({
    label: item.label,
    master: masterTotal * item.percent,
    amount: amount * item.percent,
  }))

  const totalMaster = earnings.reduce((sum, row) => sum + row.master, 0)
  const totalAmount = earnings.reduce((sum, row) => sum + row.amount, 0)
  const netPay = Math.round(totalAmount)

  const bg = await loadBackgroundDataUrl(options?.origin)
  const isJpeg = bg.startsWith('data:image/jpeg')
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
    compress: true,
  })
  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()

  doc.addImage(bg, isJpeg ? 'JPEG' : 'PNG', 0, 0, pageW, pageH)

  const marginX = 14
  const contentTop = 40
  const contentBottom = pageH - 12
  const contentW = pageW - marginX * 2
  const contentRight = marginX + contentW
  const midX = marginX + contentW / 2
  const padX = 3.5

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.setTextColor(25, 25, 25)
  doc.text(`Payslip for the month of ${monthName} ${year}`, pageW / 2, contentTop, {
    align: 'center',
  })

  const detailY = contentTop + 4
  const detailRows = 5
  const detailRowH = 7.2
  const detailH = detailRows * detailRowH
  const labelW = 44

  const leftDetails: [string, string][] = [
    ['Name', employee.name],
    ['Join Date', formatDate(employee.joiningDate)],
    ['Designation', employee.designation],
    ['Effective Work Days', String(workDays)],
    ['Days In Month', String(days)],
  ]

  const rightDetails: [string, string][] = [
    ['Bank Name', employee.bankName],
    ['Bank Account No.', employee.accountNo],
    ['PAN No.', employee.panNumber],
    ['LOP (Loss of Pay)', String(lop)],
    ['', ''],
  ]

  for (let i = 1; i < detailRows; i += 1) {
    const y = detailY + i * detailRowH
    doc.setDrawColor(210, 210, 210)
    doc.setLineWidth(0.12)
    doc.line(marginX, y, contentRight, y)
  }

  doc.setDrawColor(40, 40, 40)
  doc.setLineWidth(0.35)
  doc.rect(marginX, detailY, contentW, detailH)
  doc.setLineWidth(0.22)
  doc.line(midX, detailY, midX, detailY + detailH)

  leftDetails.forEach(([label, value], i) => {
    const y = rowTextY(detailY + i * detailRowH, detailRowH)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.5)
    doc.setTextColor(45, 45, 45)
    doc.text(label, marginX + padX, y)

    doc.setFont('helvetica', i === 0 ? 'bold' : 'normal')
    doc.setTextColor(20, 20, 20)
    doc.text(`:  ${value || '-'}`, marginX + padX + labelW, y)
  })

  rightDetails.forEach(([label, value], i) => {
    if (!label) return
    const y = rowTextY(detailY + i * detailRowH, detailRowH)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.5)
    doc.setTextColor(45, 45, 45)
    doc.text(label, midX + padX, y)

    doc.setFont('helvetica', 'normal')
    doc.setTextColor(20, 20, 20)
    doc.text(`:  ${value || '-'}`, midX + padX + labelW, y)
  })

  const tableY = detailY + detailH + 5
  const headerH = 7.5
  const dataRowCount = Math.max(earnings.length, 4)
  const dataRowH = 6.8
  const totalRowH = 7.2
  const tableH = headerH + dataRowCount * dataRowH + totalRowH

  const earnW = Math.round(contentW * 0.62 * 10) / 10
  const dedW = contentW - earnW
  const earnLeft = marginX
  const dedLeft = marginX + earnW

  const earnLabelW = Math.round(earnW * 0.46 * 10) / 10
  const earnMasterW = Math.round(earnW * 0.27 * 10) / 10
  const earnAmountW = earnW - earnLabelW - earnMasterW
  const dedLabelW = Math.round(dedW * 0.58 * 10) / 10
  const dedAmountW = dedW - dedLabelW

  const earnMasterX = earnLeft + earnLabelW
  const earnAmountX = earnMasterX + earnMasterW
  const dedAmountX = dedLeft + dedLabelW

  const drawTableGrid = () => {
    doc.setDrawColor(40, 40, 40)
    doc.setLineWidth(0.22)
    doc.line(dedLeft, tableY, dedLeft, tableY + tableH)
    doc.line(earnMasterX, tableY, earnMasterX, tableY + tableH)
    doc.line(earnAmountX, tableY, earnAmountX, tableY + tableH)
    doc.line(dedAmountX, tableY, dedAmountX, tableY + tableH)

    doc.setLineWidth(0.35)
    doc.rect(marginX, tableY, contentW, tableH)
  }

  doc.setFillColor(248, 250, 252)
  doc.rect(marginX, tableY, contentW, headerH, 'F')

  const totalTop = tableY + headerH + dataRowCount * dataRowH
  doc.setFillColor(248, 250, 252)
  doc.rect(marginX, totalTop, contentW, totalRowH, 'F')

  doc.setDrawColor(210, 210, 210)
  doc.setLineWidth(0.12)
  for (let i = 0; i < dataRowCount; i += 1) {
    const y = tableY + headerH + i * dataRowH
    doc.line(marginX, y, contentRight, y)
  }
  doc.setDrawColor(40, 40, 40)
  doc.setLineWidth(0.25)
  doc.line(marginX, tableY + headerH, contentRight, tableY + headerH)
  doc.line(marginX, totalTop, contentRight, totalTop)

  drawTableGrid()

  const headerTextY = rowTextY(tableY, headerH)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(25, 25, 25)
  doc.text('Earnings', earnLeft + padX, headerTextY)
  doc.text('Master', earnMasterX + earnMasterW / 2, headerTextY, { align: 'center' })
  doc.text('Amount', earnAmountX + earnAmountW / 2, headerTextY, { align: 'center' })
  doc.text('Deductions', dedLeft + padX, headerTextY)
  doc.text('Amount', dedAmountX + dedAmountW / 2, headerTextY, { align: 'center' })

  earnings.forEach((row, i) => {
    const rowTop = tableY + headerH + i * dataRowH
    const textY = rowTextY(rowTop, dataRowH)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(30, 30, 30)
    doc.text(row.label, earnLeft + padX, textY)
    doc.text(formatINR(row.master), earnAmountX - padX, textY, { align: 'right' })
    doc.text(formatINR(row.amount), dedLeft - padX, textY, { align: 'right' })
  })

  const totalTextY = rowTextY(totalTop, totalRowH)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(20, 20, 20)
  doc.text('Total Earnings', earnLeft + padX, totalTextY)
  doc.text(formatINR(totalMaster), earnAmountX - padX, totalTextY, { align: 'right' })
  doc.text(formatINR(totalAmount), dedLeft - padX, totalTextY, { align: 'right' })
  doc.text('Total Deductions', dedLeft + padX, totalTextY)
  doc.text('0.00', contentRight - padX, totalTextY, { align: 'right' })

  const netBlockTop = tableY + tableH + 5
  const netBlockH = 14

  doc.setDrawColor(40, 40, 40)
  doc.setLineWidth(0.3)
  doc.rect(marginX, netBlockTop, contentW, netBlockH)
  doc.setLineWidth(0.15)
  doc.line(marginX, netBlockTop + 7.5, contentRight, netBlockTop + 7.5)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(20, 20, 20)
  doc.text('Net Pay for the Month', marginX + padX, rowTextY(netBlockTop, 7.5))
  doc.text(String(netPay), contentRight - padX, rowTextY(netBlockTop, 7.5), { align: 'right' })

  doc.setFont('helvetica', 'italic')
  doc.setFontSize(8.5)
  doc.setTextColor(55, 55, 55)
  doc.text(`(${amountInWords(netPay)})`, marginX + padX, rowTextY(netBlockTop + 7.5, 6.5))

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(110, 110, 110)
  doc.text(
    'This is a system generated payslip and does not require signature.',
    pageW / 2,
    contentBottom,
    { align: 'center' },
  )

  const fileName = getPayslipFileName(input)
  const pdf = doc.output('arraybuffer')
  return { pdf: new Uint8Array(pdf), fileName }
}
