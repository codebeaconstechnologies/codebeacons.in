'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { LogOut } from 'lucide-react'
import type { Employee } from '@/types/employee'
import {
  fetchEmployees,
  isAdminAuthenticated,
  logoutAdmin,
} from '@/lib/employees'
import AdminLogin from '@/components/admin/AdminLogin'
import EmployeeGrid from '@/components/admin/EmployeeGrid'
import PayslipForm from '@/components/admin/PayslipForm'

export default function AdminPanel() {
  const [ready, setReady] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loadError, setLoadError] = useState('')
  const [loadingEmployees, setLoadingEmployees] = useState(false)

  const loadEmployees = useCallback(async () => {
    setLoadingEmployees(true)
    setLoadError('')
    try {
      const list = await fetchEmployees()
      setEmployees(list)
    } catch {
      setLoadError('Could not load employees from server.')
      setEmployees([])
    } finally {
      setLoadingEmployees(false)
    }
  }, [])

  useEffect(() => {
    const authed = isAdminAuthenticated()
    setAuthenticated(authed)
    setReady(true)
    if (authed) {
      void loadEmployees()
    }
  }, [loadEmployees])

  if (!ready) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 text-sm">
        Loading…
      </div>
    )
  }

  if (!authenticated) {
    return (
      <AdminLogin
        onSuccess={() => {
          setAuthenticated(true)
          void loadEmployees()
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-primary font-semibold">Code Beacons</p>
            <h1 className="text-xl font-semibold text-slate-900">Salary Slip Admin</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:text-primary"
            >
              Back to site
            </Link>
            <button
              type="button"
              onClick={() => {
                logoutAdmin()
                setAuthenticated(false)
                setEmployees([])
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:text-red-600"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {loadError ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {loadError}
          </p>
        ) : null}
        {loadingEmployees ? (
          <p className="text-sm text-slate-500">Loading employees…</p>
        ) : null}
        <EmployeeGrid employees={employees} onChange={setEmployees} />
        <PayslipForm employees={employees} />
      </main>
    </div>
  )
}
