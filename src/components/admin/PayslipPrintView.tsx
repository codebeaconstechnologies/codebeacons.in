'use client'

import type { PayslipViewModel } from '@/lib/payslip-calc'

export default function PayslipPrintView({ model }: { model: PayslipViewModel }) {
  const { employee } = model

  return (
    <>
      <div className="cb-payslip-sheet">
        {/* Real image layer — CSS backgrounds often disappear in print/PDF */}
        <img
          className="cb-payslip-letterhead"
          src="/images/payslip-bg.jpg"
          alt=""
          aria-hidden="true"
        />
        <div className="cb-payslip-inner">
          <h1 className="cb-payslip-title">
            Payslip for the month of {model.monthName} {model.year}
          </h1>

          <table className="cb-payslip-details">
            <tbody>
              <tr>
                <td className="cb-label">Name</td>
                <td className="cb-value">: {employee.name}</td>
                <td className="cb-label">Bank Name</td>
                <td className="cb-value">: {employee.bankName || '-'}</td>
              </tr>
              <tr>
                <td className="cb-label">Join Date</td>
                <td className="cb-value">: {model.joinDateLabel}</td>
                <td className="cb-label">Bank Account No.</td>
                <td className="cb-value">: {employee.accountNo || '-'}</td>
              </tr>
              <tr>
                <td className="cb-label">Designation</td>
                <td className="cb-value">: {employee.designation || '-'}</td>
                <td className="cb-label">PAN No.</td>
                <td className="cb-value">: {employee.panNumber || '-'}</td>
              </tr>
              <tr>
                <td className="cb-label">Effective Work Days</td>
                <td className="cb-value">: {model.workDays}</td>
                <td className="cb-label">LOP (Loss of Pay)</td>
                <td className="cb-value">: {model.lop}</td>
              </tr>
              <tr>
                <td className="cb-label">Days In Month</td>
                <td className="cb-value">: {model.daysInMonth}</td>
                <td className="cb-label" />
                <td className="cb-value" />
              </tr>
            </tbody>
          </table>

          <table className="cb-payslip-earnings">
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
              {model.earnings.map((row) => (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  <td className="cb-num">{row.master}</td>
                  <td className="cb-num">{row.amount}</td>
                  <td />
                  <td className="cb-num" />
                </tr>
              ))}
              <tr className="cb-totals">
                <td>Total Earnings</td>
                <td className="cb-num">{model.totalMaster}</td>
                <td className="cb-num">{model.totalAmount}</td>
                <td>Total Deductions</td>
                <td className="cb-num">0.00</td>
              </tr>
            </tbody>
          </table>

          <div className="cb-payslip-net">
            <div className="cb-net-row">
              <span>Net Pay for the Month</span>
              <strong>{model.netPay}</strong>
            </div>
            <p className="cb-words">({model.netPayWords})</p>
          </div>

          <p className="cb-payslip-footnote">
            This is a system generated payslip and does not require signature.
          </p>
        </div>
      </div>

      <style>{`
        .cb-payslip-sheet {
          position: relative;
          width: 210mm;
          height: 297mm;
          margin: 0 auto;
          overflow: hidden;
          background: #fff;
          color: #1a1a1a;
          font-family: Arial, Helvetica, sans-serif;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .cb-payslip-letterhead {
          position: absolute;
          inset: 0;
          width: 210mm;
          height: 297mm;
          object-fit: fill;
          z-index: 0;
          pointer-events: none;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .cb-payslip-inner {
          position: relative;
          z-index: 1;
          padding: 42mm 12mm 12mm;
        }
        .cb-payslip-title {
          text-align: center;
          font-size: 13px;
          font-weight: 700;
          margin: 0 0 4mm;
        }
        .cb-payslip-details,
        .cb-payslip-earnings {
          width: 100%;
          border-collapse: collapse;
          font-size: 10px;
          border: 0.35mm solid #282828;
          margin-bottom: 4mm;
          background: transparent;
        }
        .cb-payslip-details td,
        .cb-payslip-earnings th,
        .cb-payslip-earnings td {
          border: 0.12mm solid rgba(40, 40, 40, 0.45);
          padding: 2.1mm 2.2mm;
          vertical-align: middle;
          background: transparent;
        }
        .cb-label { font-weight: 700; width: 18%; color: #2d2d2d; }
        .cb-value { width: 32%; }
        .cb-payslip-earnings thead th {
          font-weight: 700;
          text-align: left;
          background: transparent;
        }
        .cb-num { text-align: right; white-space: nowrap; }
        .cb-totals td { font-weight: 700; background: transparent; }
        .cb-payslip-net {
          border: 0.3mm solid #282828;
          padding: 2.4mm 3mm;
          margin-bottom: 8mm;
          background: transparent;
        }
        .cb-net-row {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          font-weight: 700;
        }
        .cb-words {
          margin: 2mm 0 0;
          font-style: italic;
          font-size: 10px;
          color: #373737;
        }
        .cb-payslip-footnote {
          text-align: center;
          font-size: 8px;
          color: #6e6e6e;
          margin: 0;
        }
        @media print {
          .cb-payslip-sheet,
          .cb-payslip-letterhead {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </>
  )
}
