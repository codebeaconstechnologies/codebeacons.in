'use client'

import type { PayslipViewModel } from '@/lib/payslip-calc'

export default function PayslipPrintView({ model }: { model: PayslipViewModel }) {
  const { employee } = model

  return (
    <>
      <div className="cb-payslip-sheet">
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
          width: 297mm;
          min-height: 210mm;
          margin: 0 auto;
          background: #fff url('/images/payslip-bg.jpg') center top / 100% 100% no-repeat;
          color: #1a1a1a;
          font-family: Arial, Helvetica, sans-serif;
        }
        .cb-payslip-inner { padding: 40mm 14mm 12mm; }
        .cb-payslip-title {
          text-align: center;
          font-size: 14px;
          font-weight: 700;
          margin: 0 0 4mm;
        }
        .cb-payslip-details,
        .cb-payslip-earnings {
          width: 100%;
          border-collapse: collapse;
          font-size: 11px;
          border: 0.35mm solid #282828;
          margin-bottom: 4mm;
        }
        .cb-payslip-details td,
        .cb-payslip-earnings th,
        .cb-payslip-earnings td {
          border: 0.12mm solid #d2d2d2;
          padding: 2.2mm 2.5mm;
          vertical-align: middle;
        }
        .cb-label { font-weight: 700; width: 18%; color: #2d2d2d; }
        .cb-value { width: 32%; }
        .cb-payslip-earnings thead th {
          background: #f8fafc;
          font-weight: 700;
          text-align: left;
        }
        .cb-num { text-align: right; white-space: nowrap; }
        .cb-totals td { font-weight: 700; background: #f8fafc; }
        .cb-payslip-net {
          border: 0.3mm solid #282828;
          padding: 2.5mm 3mm;
          margin-bottom: 6mm;
        }
        .cb-net-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          font-weight: 700;
        }
        .cb-words {
          margin: 2mm 0 0;
          font-style: italic;
          font-size: 11px;
          color: #373737;
        }
        .cb-payslip-footnote {
          text-align: center;
          font-size: 9px;
          color: #6e6e6e;
          margin: 0;
        }
        @media print {
          .cb-payslip-sheet {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </>
  )
}
