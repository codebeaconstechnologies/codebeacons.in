import { createHash } from 'node:crypto'
import { NextRequest } from 'next/server'

export const ADMIN_USERNAME = 'admin'
export const ADMIN_PASSWORD = 'Arnika@250221'

export function getAdminToken(): string {
  return createHash('sha256').update(`codebeacons-admin:${ADMIN_PASSWORD}`).digest('hex')
}

export function verifyAdminCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}

export function assertAdminRequest(req: NextRequest): boolean {
  const header = req.headers.get('authorization') || ''
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : ''
  return Boolean(token) && token === getAdminToken()
}
