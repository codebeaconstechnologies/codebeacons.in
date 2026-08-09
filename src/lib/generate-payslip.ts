import type { PayslipInput } from '@/types/employee'
import { buildPayslipViewModel } from '@/lib/payslip-calc'
import { renderPayslipHtml } from '@/lib/payslip-html'

type BrowserBinding = {
  quickAction(action: 'pdf', options: Record<string, unknown>): Promise<Response>
}

async function getBrowserBinding(): Promise<BrowserBinding | null> {
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare')
    const { env } = await getCloudflareContext({ async: true })
    return (env as { BROWSER?: BrowserBinding } | undefined)?.BROWSER ?? null
  } catch {
    return null
  }
}

function looksLikePdf(bytes: Uint8Array): boolean {
  // Real PDFs start with "%PDF"
  return (
    bytes.byteLength > 4 &&
    bytes[0] === 0x25 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x44 &&
    bytes[3] === 0x46
  )
}

/**
 * Antivirus-safe path: Cloudflare Browser Run (Chromium) prints HTML → PDF.
 * These match browser "Save as PDF" and are not false-flagged like jsPDF/pdf-lib.
 */
export async function buildPayslipPdf(
  input: PayslipInput,
): Promise<{ pdf: Uint8Array; fileName: string }> {
  const model = buildPayslipViewModel(input)
  const fileName = `${model.fileTitle}.pdf`
  const html = renderPayslipHtml(model)

  const browser = await getBrowserBinding()
  if (!browser) {
    throw new Error(
      'Browser Rendering is not available. Deploy with Cloudflare Browser binding enabled.',
    )
  }

  const response = await browser.quickAction('pdf', {
    html,
    pdfOptions: {
      format: 'a4',
      landscape: false,
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm',
      },
    },
  })

  if (!response.ok) {
    const detail = (await response.text()).slice(0, 500)
    throw new Error(`Browser Rendering failed (${response.status}): ${detail}`)
  }

  const pdf = new Uint8Array(await response.arrayBuffer())
  if (!looksLikePdf(pdf)) {
    const preview = new TextDecoder().decode(pdf.slice(0, 200))
    throw new Error(`Browser Rendering returned non-PDF data: ${preview}`)
  }

  return { pdf, fileName }
}
