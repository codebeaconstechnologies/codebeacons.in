import QRCode from 'qrcode'
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const certId = process.argv[2]
if (!certId) {
  console.error('Usage: npm run gen:qr -- <CERT-ID>')
  console.error('Example: npm run gen:qr -- CBT-INT-2026-RHT4')
  process.exit(1)
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codebeacons.in'
const url = `${siteUrl}/${certId}`
// Darker teal shade (primary.dark) — the lighter brand teal (#0ABAB5) doesn't
// have enough luminance contrast against white to scan reliably in real-world tests
const brandTeal = '#089B97'
const size = 1024

const outDir = path.join(process.cwd(), 'public', 'certificates', 'qr')
const outFile = path.join(outDir, `${certId}.png`)
await mkdir(outDir, { recursive: true })

const qrBuffer = await QRCode.toBuffer(url, {
  errorCorrectionLevel: 'H', // high error correction so the center logo doesn't break scannability
  margin: 2,
  width: size,
  color: { dark: brandTeal, light: '#FFFFFF' },
})

// logo.png is the beacon icon + "CODE BEACONS" wordmark stacked vertically;
// crop to the icon-only region (top ~345px of the 500x500 source) for the QR center mark
const logoPath = path.join(process.cwd(), 'public', 'images', 'logo.png')
const iconSize = 190
const croppedBuffer = await sharp(logoPath)
  .extract({ left: 0, top: 0, width: 500, height: 345 })
  .toBuffer()
const iconBuffer = await sharp(croppedBuffer)
  .trim({ threshold: 10 })
  .resize(iconSize, iconSize, { fit: 'contain', background: '#FFFFFF' })
  .toBuffer()

const padSize = 232
const pad = Math.round((padSize - iconSize) / 2)
const backdrop = await sharp({
  create: { width: padSize, height: padSize, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
})
  .composite([
    {
      input: Buffer.from(
        `<svg width="${padSize}" height="${padSize}"><rect x="3" y="3" width="${padSize - 6}" height="${padSize - 6}" rx="28" fill="#FFFFFF" stroke="${brandTeal}" stroke-width="6"/></svg>`
      ),
      top: 0,
      left: 0,
    },
    { input: iconBuffer, top: pad, left: pad },
  ])
  .png()
  .toBuffer()

const offset = Math.round((size - padSize) / 2)

await sharp(qrBuffer)
  .composite([{ input: backdrop, top: offset, left: offset }])
  .png()
  .toFile(outFile)

console.log(`QR code generated for: ${url}`)
console.log(`Saved to: ${outFile}`)
