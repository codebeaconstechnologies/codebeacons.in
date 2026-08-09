import { createHash } from 'node:crypto'
import { NextRequest } from 'next/server'

function getAdminUsername(): string {
  return process.env.ADMIN_USERNAME?.trim() || ''
}

function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || ''
}

export function getAdminToken(): string {
  const password = getAdminPassword()
  if (!password) return ''
  return createHash('sha256').update(`codebeacons-admin:${password}`).digest('hex')
}

export function verifyAdminCredentials(username: string, password: string): boolean {
  const expectedUser = getAdminUsername()
  const expectedPass = getAdminPassword()
  if (!expectedUser || !expectedPass) return false
  return username === expectedUser && password === expectedPass
}

export function assertAdminRequest(req: NextRequest): boolean {
  const expectedToken = getAdminToken()
  if (!expectedToken) return false
  const header = req.headers.get('authorization') || ''
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : ''
  return Boolean(token) && token === expectedToken
}
