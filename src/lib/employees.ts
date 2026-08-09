const AUTH_KEY = 'cb_admin_auth'
const TOKEN_KEY = 'cb_admin_token'

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return Boolean(sessionStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(AUTH_KEY))
}

export function getAdminTokenClient(): string | null {
  if (typeof window === 'undefined') return null
  return sessionStorage.getItem(TOKEN_KEY)
}

export function setAdminSession(token: string): void {
  sessionStorage.setItem(TOKEN_KEY, token)
  sessionStorage.setItem(AUTH_KEY, '1')
}

export function logoutAdmin(): void {
  sessionStorage.removeItem(TOKEN_KEY)
  sessionStorage.removeItem(AUTH_KEY)
}

export async function loginAdmin(username: string, password: string): Promise<boolean> {
  const response = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) return false
  const data = (await response.json()) as { token?: string }
  if (!data.token) return false
  setAdminSession(data.token)
  return true
}

function authHeaders(): HeadersInit {
  const token = getAdminTokenClient()
  return token
    ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    : { 'Content-Type': 'application/json' }
}

export async function fetchEmployees() {
  const response = await fetch('/api/employees', {
    headers: authHeaders(),
    cache: 'no-store',
  })
  if (!response.ok) {
    throw new Error('Failed to load employees')
  }
  const data = (await response.json()) as { employees: import('@/types/employee').Employee[] }
  return data.employees
}

export async function saveEmployee(employee: import('@/types/employee').Employee) {
  const response = await fetch('/api/employees', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(employee),
  })
  if (!response.ok) {
    throw new Error('Failed to save employee')
  }
  const data = (await response.json()) as { employees: import('@/types/employee').Employee[] }
  return data.employees
}

export async function deleteEmployee(id: string) {
  const response = await fetch(`/api/employees?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  if (!response.ok) {
    throw new Error('Failed to delete employee')
  }
  const data = (await response.json()) as { employees: import('@/types/employee').Employee[] }
  return data.employees
}

export function createEmployeeId(): string {
  return `emp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}
