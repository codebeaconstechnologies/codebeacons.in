import type { PayslipViewModel } from '@/lib/payslip-calc'
import { PAYSLIP_BG_PNG_BASE64 } from '@/lib/payslip-bg-base64'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Portrait A4 HTML used by Cloudflare Browser Rendering → Chromium PDF. */
export function renderPayslipHtml(model: PayslipViewModel): string {
  const { employee } = model
  const bg = `data:image/png;base64,${PAYSLIP_BG_PNG_BASE64}`

  const earningRows = model.earnings
    .map(
      (row) => `
      <tr>
        <td>${escapeHtml(row.label)}</td>
        <td class="num">${escapeHtml(row.master)}</td>
        <td class="num">${escapeHtml(row.amount)}</td>
        <td></td>
        <td class="num"></td>
      </tr>`,
    )
    .join('')

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(model.fileTitle)}</title>
  <style>
    @page { size: A4 portrait; margin: 0; }
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      width: 210mm;
      height: 297mm;
      font-family: Arial, Helvetica, sans-serif;
      color: #1a1a1a;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      background: #fff;
    }
    .sheet {
      position: relative;
      width: 210mm;
      height: 297mm;
      overflow: hidden;
      background: #fff;
    }
    /* Real <img> letterhead — cover keeps A4 ratio (no logo stretch) */
    .letterhead {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
      z-index: 0;
      pointer-events: none;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .content {
      position: relative;
      z-index: 1;
      padding: 46mm 14mm 14mm;
    }
    h1 {
      margin: 0 0 4mm;
      text-align: center;
      font-size: 13px;
      font-weight: 700;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 10px;
      margin-bottom: 4mm;
      border: 0.35mm solid #282828;
      background: transparent;
    }
    td, th {
      border: 0.12mm solid rgba(40, 40, 40, 0.45);
      padding: 2.1mm 2.2mm;
      vertical-align: middle;
      background: transparent;
    }
    .label { font-weight: 700; width: 18%; color: #2d2d2d; }
    .value { width: 32%; }
    thead th { font-weight: 700; text-align: left; }
    .num { text-align: right; white-space: nowrap; }
    .totals td { font-weight: 700; }
    .net {
      border: 0.3mm solid #282828;
      padding: 2.4mm 3mm;
      margin-bottom: 8mm;
      background: transparent;
    }
    .net-row {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      font-weight: 700;
    }
    .words {
      margin: 2mm 0 0;
      font-style: italic;
      font-size: 10px;
      color: #373737;
    }
    .footnote {
      text-align: center;
      font-size: 8px;
      color: #6e6e6e;
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="sheet">
    <img class="letterhead" src="${bg}" alt="" />
    <div class="content">
      <h1>Payslip for the month of ${escapeHtml(model.monthName)} ${model.year}</h1>
      <table>
        <tbody>
          <tr>
            <td class="label">Name</td>
            <td class="value">: ${escapeHtml(employee.name)}</td>
            <td class="label">Bank Name</td>
            <td class="value">: ${escapeHtml(employee.bankName || '-')}</td>
          </tr>
          <tr>
            <td class="label">Join Date</td>
            <td class="value">: ${escapeHtml(model.joinDateLabel)}</td>
            <td class="label">Bank Account No.</td>
            <td class="value">: ${escapeHtml(employee.accountNo || '-')}</td>
          </tr>
          <tr>
            <td class="label">Designation</td>
            <td class="value">: ${escapeHtml(employee.designation || '-')}</td>
            <td class="label">PAN No.</td>
            <td class="value">: ${escapeHtml(employee.panNumber || '-')}</td>
          </tr>
          <tr>
            <td class="label">Effective Work Days</td>
            <td class="value">: ${model.workDays}</td>
            <td class="label">LOP (Loss of Pay)</td>
            <td class="value">: ${model.lop}</td>
          </tr>
          <tr>
            <td class="label">Days In Month</td>
            <td class="value">: ${model.daysInMonth}</td>
            <td class="label"></td>
            <td class="value"></td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>Earnings</th>
            <th>Master</th>
            <th>Amount</th>
            <th>Deductions</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          ${earningRows}
          <tr class="totals">
            <td>Total Earnings</td>
            <td class="num">${escapeHtml(model.totalMaster)}</td>
            <td class="num">${escapeHtml(model.totalAmount)}</td>
            <td>Total Deductions</td>
            <td class="num">0.00</td>
          </tr>
        </tbody>
      </table>
      <div class="net">
        <div class="net-row">
          <span>Net Pay for the Month</span>
          <strong>${model.netPay}</strong>
        </div>
        <p class="words">(${escapeHtml(model.netPayWords)})</p>
      </div>
      <p class="footnote">This is a system generated payslip and does not require signature.</p>
    </div>
  </div>
</body>
</html>`
}
