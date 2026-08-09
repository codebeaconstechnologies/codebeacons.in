'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Printer, ArrowLeft } from 'lucide-react'
import PayslipPrintView from '@/components/admin/PayslipPrintView'
import {
  PAYSLIP_DRAFT_KEY,
  buildPayslipViewModel,
  type PayslipDraft,
} from '@/lib/payslip-calc'
import { isAdminAuthenticated } from '@/lib/employees'

export default function AdminPayslipPrintPage() {
  const [draft, setDraft] = useState<PayslipDraft | null>(null)
  const [ready, setReady] = useState(false)
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    setAuthed(isAdminAuthenticated())
    try {
      const raw = sessionStorage.getItem(PAYSLIP_DRAFT_KEY)
      if (raw) setDraft(JSON.parse(raw) as PayslipDraft)
    } catch {
      setDraft(null)
    }
    setReady(true)
  }, [])

  const model = useMemo(
    () => (draft ? buildPayslipViewModel(draft) : null),
    [draft],
  )

  useEffect(() => {
    if (!model) return
    // Chrome uses document.title as the default "Save as PDF" file name.
    document.title = model.fileTitle
  }, [model])

  function handlePrint() {
    if (model) {
      document.title = model.fileTitle
    }
    window.print()
  }

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-slate-500">
        Loading payslip…
      </div>
    )
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-slate-700 mb-3">Please log in to view this payslip.</p>
          <Link href="/admin" className="text-primary text-sm font-medium">
            Go to Admin Login
          </Link>
        </div>
      </div>
    )
  }

  if (!model) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-slate-700 mb-3">No payslip data found. Generate one from Admin.</p>
          <Link href="/admin" className="text-primary text-sm font-medium">
            Back to Admin
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-200">
      <div className="cb-print-toolbar sticky top-0 z-10 border-b border-slate-300 bg-white px-4 py-3 print:hidden">
        <div className="mx-auto flex max-w-[210mm] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-primary"
          >
            <ArrowLeft size={16} />
            Back to Admin
          </Link>

          <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-950 sm:max-w-xl">
            <p className="font-semibold mb-1">Save without Chrome date/URL footer:</p>
            <ol className="list-decimal pl-4 space-y-0.5">
              <li>
                Destination → <strong>Save as PDF</strong>
              </li>
              <li>
                More settings → Margins → <strong>None</strong>
              </li>
              <li>
                Turn on <strong>Background graphics</strong>
              </li>
              <li>
                Uncheck <strong>Headers and footers</strong>
              </li>
              <li>
                Save as{' '}
                <code className="rounded bg-white px-1">{model.fileTitle}.pdf</code>
              </li>
            </ol>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            <Printer size={16} />
            Print / Save as PDF
          </button>
        </div>
      </div>

      <div className="py-6 print:p-0">
        <PayslipPrintView model={model} />
      </div>

      <style>{`
        @page {
          size: A4 portrait;
          margin: 0;
        }
        @media print {
          html, body {
            margin: 0 !important;
            background: #fff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .cb-print-toolbar {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
