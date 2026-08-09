import { promises as fs } from 'fs'
import path from 'path'
import type { Employee } from '@/types/employee'
import seedEmployees from '@/data/employees.json'

const KV_KEY = 'employees'
const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'employees.json')

type EmployeesKv = {
  get(key: string, type: 'json'): Promise<unknown>
  put(key: string, value: string): Promise<void>
}

function normalizeEmployees(value: unknown): Employee[] {
  if (!Array.isArray(value)) return []
  return value.filter(
    (item): item is Employee =>
      Boolean(item) &&
      typeof item === 'object' &&
      typeof (item as Employee).id === 'string' &&
      typeof (item as Employee).name === 'string',
  )
}

async function getKvNamespace(): Promise<EmployeesKv | null> {
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare')
    const { env } = await getCloudflareContext({ async: true })
    const kv = (env as { EMPLOYEES?: EmployeesKv } | undefined)?.EMPLOYEES
    return kv ?? null
  } catch {
    return null
  }
}

async function readEmployeesFromFile(): Promise<Employee[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8')
    return normalizeEmployees(JSON.parse(raw))
  } catch {
    return normalizeEmployees(seedEmployees)
  }
}

async function writeEmployeesToFile(employees: Employee[]): Promise<void> {
  await fs.writeFile(DATA_FILE, `${JSON.stringify(employees, null, 2)}\n`, 'utf8')
}

export async function listEmployees(): Promise<Employee[]> {
  const kv = await getKvNamespace()
  if (kv) {
    const fromKv = await kv.get(KV_KEY, 'json')
    if (fromKv != null) {
      return normalizeEmployees(fromKv)
    }
    const seeded = await readEmployeesFromFile()
    await kv.put(KV_KEY, JSON.stringify(seeded))
    return seeded
  }

  return readEmployeesFromFile()
}

export async function saveEmployees(employees: Employee[]): Promise<Employee[]> {
  const normalized = normalizeEmployees(employees)

  const kv = await getKvNamespace()
  if (kv) {
    await kv.put(KV_KEY, JSON.stringify(normalized))
  }

  // Keep repo JSON in sync whenever the filesystem is writable (local/dev).
  try {
    await writeEmployeesToFile(normalized)
  } catch {
    // Cloudflare Workers filesystem is read-only; KV already persisted above.
  }

  return normalized
}

export async function upsertEmployee(employee: Employee): Promise<Employee[]> {
  const list = await listEmployees()
  const index = list.findIndex((item) => item.id === employee.id)
  if (index >= 0) {
    list[index] = employee
  } else {
    list.push(employee)
  }
  return saveEmployees(list)
}

export async function removeEmployee(id: string): Promise<Employee[]> {
  const list = (await listEmployees()).filter((item) => item.id !== id)
  return saveEmployees(list)
}

export function createEmployeeId(): string {
  return `emp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}
