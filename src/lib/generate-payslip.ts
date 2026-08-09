import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import type { PayslipInput } from '@/types/employee'
import { buildPayslipViewModel } from '@/lib/payslip-calc'
import { PAYSLIP_BG_JPEG_BASE64 } from '@/lib/payslip-bg-base64'

function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

export async function buildPayslipPdf(
  input: PayslipInput,
): Promise<{ pdf: Uint8Array; fileName: string }> {
  const model = buildPayslipViewModel(input)
  const fileName = `${model.fileTitle}.pdf`

  const pdfDoc = await PDFDocument.create()
  pdfDoc.setTitle(model.fileTitle)
  pdfDoc.setAuthor('Code Beacons Technologies')
  pdfDoc.setCreator('Code Beacons Payslip')
  pdfDoc.setProducer('Code Beacons Payslip')
  pdfDoc.setCreationDate(new Date())
  pdfDoc.setModificationDate(new Date())

  // Portrait A4 in points (1 pt = 1/72 in)
  const page = pdfDoc.addPage([595.28, 841.89])
  const { width, height } = page.getSize()

  const bgBytes = base64ToBytes(PAYSLIP_BG_JPEG_BASE64)
  const bgImage = await pdfDoc.embedJpg(bgBytes)
  page.drawImage(bgImage, { x: 0, y: 0, width, height })

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique)

  const black = rgb(0.1, 0.1, 0.1)
  const gray = rgb(0.35, 0.35, 0.35)
  const line = rgb(0.2, 0.2, 0.2)
  const soft = rgb(0.82, 0.82, 0.82)
  const band = rgb(0.97, 0.98, 0.99)

  const marginX = 36
  const contentW = width - marginX * 2
  const midX = marginX + contentW / 2
  let y = height - 120

  // Title
  const title = `Payslip for the month of ${model.monthName} ${model.year}`
  const titleSize = 12
  const titleWidth = fontBold.widthOfTextAtSize(title, titleSize)
  page.drawText(title, {
    x: (width - titleWidth) / 2,
    y,
    size: titleSize,
    font: fontBold,
    color: black,
  })
  y -= 18

  // Employee details box
  const detailRows = 5
  const detailRowH = 20
  const detailH = detailRows * detailRowH
  const detailTop = y

  page.drawRectangle({
    x: marginX,
    y: detailTop - detailH,
    width: contentW,
    height: detailH,
    borderColor: line,
    borderWidth: 1,
  })
  page.drawLine({
    start: { x: midX, y: detailTop },
    end: { x: midX, y: detailTop - detailH },
    thickness: 0.7,
    color: line,
  })

  for (let i = 1; i < detailRows; i += 1) {
    const ly = detailTop - i * detailRowH
    page.drawLine({
      start: { x: marginX, y: ly },
      end: { x: marginX + contentW, y: ly },
      thickness: 0.4,
      color: soft,
    })
  }

  const leftDetails: [string, string][] = [
    ['Name', model.employee.name],
    ['Join Date', model.joinDateLabel],
    ['Designation', model.employee.designation || '-'],
    ['Effective Work Days', String(model.workDays)],
    ['Days In Month', String(model.daysInMonth)],
  ]
  const rightDetails: [string, string][] = [
    ['Bank Name', model.employee.bankName || '-'],
    ['Bank Account No.', model.employee.accountNo || '-'],
    ['PAN No.', model.employee.panNumber || '-'],
    ['LOP (Loss of Pay)', String(model.lop)],
    ['', ''],
  ]

  const labelW = 110
  const textSize = 9

  leftDetails.forEach(([label, value], i) => {
    const rowY = detailTop - i * detailRowH - 13
    page.drawText(label, {
      x: marginX + 8,
      y: rowY,
      size: textSize,
      font: fontBold,
      color: gray,
    })
    page.drawText(`:  ${value}`, {
      x: marginX + 8 + labelW,
      y: rowY,
      size: textSize,
      font: i === 0 ? fontBold : font,
      color: black,
      maxWidth: midX - marginX - labelW - 20,
    })
  })

  rightDetails.forEach(([label, value], i) => {
    if (!label) return
    const rowY = detailTop - i * detailRowH - 13
    page.drawText(label, {
      x: midX + 8,
      y: rowY,
      size: textSize,
      font: fontBold,
      color: gray,
    })
    page.drawText(`:  ${value}`, {
      x: midX + 8 + labelW,
      y: rowY,
      size: textSize,
      font,
      color: black,
      maxWidth: marginX + contentW - (midX + labelW) - 20,
    })
  })

  y = detailTop - detailH - 14

  // Earnings table
  const earnW = contentW * 0.62
  const dedW = contentW - earnW
  const colEarn = marginX
  const colMaster = marginX + earnW * 0.46
  const colAmount = marginX + earnW * 0.73
  const colDed = marginX + earnW
  const colDedAmt = marginX + earnW + dedW * 0.58

  const headerH = 22
  const rowH = 18
  const dataRows = Math.max(model.earnings.length, 4)
  const tableH = headerH + dataRows * rowH + rowH
  const tableTop = y

  page.drawRectangle({
    x: marginX,
    y: tableTop - headerH,
    width: contentW,
    height: headerH,
    color: band,
  })
  page.drawRectangle({
    x: marginX,
    y: tableTop - tableH,
    width: contentW,
    height: rowH,
    color: band,
  })
  page.drawRectangle({
    x: marginX,
    y: tableTop - tableH,
    width: contentW,
    height: tableH,
    borderColor: line,
    borderWidth: 1,
  })

  const vLines = [colMaster, colAmount, colDed, colDedAmt]
  vLines.forEach((x) => {
    page.drawLine({
      start: { x, y: tableTop },
      end: { x, y: tableTop - tableH },
      thickness: 0.6,
      color: line,
    })
  })

  for (let i = 0; i <= dataRows; i += 1) {
    const ly = tableTop - headerH - i * rowH
    page.drawLine({
      start: { x: marginX, y: ly },
      end: { x: marginX + contentW, y: ly },
      thickness: i === 0 || i === dataRows ? 0.8 : 0.4,
      color: i === 0 || i === dataRows ? line : soft,
    })
  }

  const headerY = tableTop - 15
  page.drawText('Earnings', { x: colEarn + 6, y: headerY, size: 9, font: fontBold, color: black })
  page.drawText('Master', {
    x: colMaster + (colAmount - colMaster) / 2 - 14,
    y: headerY,
    size: 9,
    font: fontBold,
    color: black,
  })
  page.drawText('Amount', {
    x: colAmount + (colDed - colAmount) / 2 - 16,
    y: headerY,
    size: 9,
    font: fontBold,
    color: black,
  })
  page.drawText('Deductions', { x: colDed + 6, y: headerY, size: 9, font: fontBold, color: black })
  page.drawText('Amount', {
    x: colDedAmt + (marginX + contentW - colDedAmt) / 2 - 16,
    y: headerY,
    size: 9,
    font: fontBold,
    color: black,
  })

  const drawRight = (text: string, rightX: number, textY: number, bold = false) => {
    const f = bold ? fontBold : font
    const w = f.widthOfTextAtSize(text, 9)
    page.drawText(text, { x: rightX - 6 - w, y: textY, size: 9, font: f, color: black })
  }

  model.earnings.forEach((row, i) => {
    const textY = tableTop - headerH - i * rowH - 12
    page.drawText(row.label, { x: colEarn + 6, y: textY, size: 9, font, color: black })
    drawRight(row.master, colAmount, textY)
    drawRight(row.amount, colDed, textY)
  })

  const totalY = tableTop - headerH - dataRows * rowH - 12
  page.drawText('Total Earnings', { x: colEarn + 6, y: totalY, size: 9, font: fontBold, color: black })
  drawRight(model.totalMaster, colAmount, totalY, true)
  drawRight(model.totalAmount, colDed, totalY, true)
  page.drawText('Total Deductions', { x: colDed + 6, y: totalY, size: 9, font: fontBold, color: black })
  drawRight('0.00', marginX + contentW, totalY, true)

  // Net pay
  y = tableTop - tableH - 16
  const netH = 40
  page.drawRectangle({
    x: marginX,
    y: y - netH,
    width: contentW,
    height: netH,
    borderColor: line,
    borderWidth: 1,
  })
  page.drawLine({
    start: { x: marginX, y: y - 20 },
    end: { x: marginX + contentW, y: y - 20 },
    thickness: 0.5,
    color: soft,
  })

  page.drawText('Net Pay for the Month', {
    x: marginX + 8,
    y: y - 14,
    size: 10,
    font: fontBold,
    color: black,
  })
  drawRight(String(model.netPay), marginX + contentW, y - 14, true)
  page.drawText(`(${model.netPayWords})`, {
    x: marginX + 8,
    y: y - 34,
    size: 9,
    font: fontItalic,
    color: gray,
  })

  const footnote = 'This is a system generated payslip and does not require signature.'
  const footnoteW = font.widthOfTextAtSize(footnote, 8)
  page.drawText(footnote, {
    x: (width - footnoteW) / 2,
    y: 28,
    size: 8,
    font,
    color: rgb(0.45, 0.45, 0.45),
  })

  const pdf = await pdfDoc.save({ useObjectStreams: false })
  return { pdf, fileName }
}
