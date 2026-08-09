import { NextRequest, NextResponse } from 'next/server'
import { getAdminToken, verifyAdminCredentials } from '@/lib/admin-auth'

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { username?: string; password?: string }
    const username = body.username?.trim() || ''
    const password = body.password || ''

    if (!verifyAdminCredentials(username, password)) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
    }

    return NextResponse.json({ token: getAdminToken() })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
