import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { firstName, lastName, email, phone, service, message } = body

    if (!firstName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json({ error: 'Email service not configured.' }, { status: 503 })
    }

    const resend = new Resend(apiKey)

    const serviceLabel = service
      ? service.charAt(0).toUpperCase() + service.slice(1)
      : 'General'

    const { error } = await resend.emails.send({
      from: 'Code Beacons Contact <noreply@codebeacons.in>',
      to: ['hrteam@codebeacons.in'],
      reply_to: email,
      subject: `New Enquiry: ${serviceLabel} — ${firstName} ${lastName || ''}`.trim(),
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0A0F1C;color:#e5e7eb;border-radius:12px;">
          <h2 style="color:#0ABAB5;margin-top:0;">New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#9ca3af;width:140px;">Name</td><td style="padding:8px 0;color:#fff;">${firstName} ${lastName || ''}</td></tr>
            <tr><td style="padding:8px 0;color:#9ca3af;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#0ABAB5;">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding:8px 0;color:#9ca3af;">Phone</td><td style="padding:8px 0;color:#fff;">${phone}</td></tr>` : ''}
            ${service ? `<tr><td style="padding:8px 0;color:#9ca3af;">Service</td><td style="padding:8px 0;color:#fff;">${service}</td></tr>` : ''}
          </table>
          <hr style="border:none;border-top:1px solid #1F2937;margin:16px 0;" />
          <h3 style="color:#d1d5db;margin-bottom:8px;">Message</h3>
          <p style="color:#d1d5db;line-height:1.6;white-space:pre-wrap;">${message}</p>
          <hr style="border:none;border-top:1px solid #1F2937;margin:16px 0;" />
          <p style="color:#6b7280;font-size:12px;">Sent via codebeacons.in contact form</p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
