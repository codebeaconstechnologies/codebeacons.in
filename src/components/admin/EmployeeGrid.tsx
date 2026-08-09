'use client'

import { FormEvent, useState } from 'react'
import { Pencil, Plus, Trash2, X } from 'lucide-react'
import type { Employee } from '@/types/employee'
import { createEmployeeId, deleteEmployee, saveEmployee } from '@/lib/employees'

const emptyForm = {
  name: '',
  joiningDate: '',
  designation: '',
  bankName: '',
  accountNo: '',
  panNumber: '',
}

interface EmployeeGridProps {
  employees: Employee[]
  onChange: (employees: Employee[]) => void
}

export default function EmployeeGrid({ employees, onChange }: EmployeeGridProps) {
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  function resetForm() {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
    setError('')
  }

  function startEdit(employee: Employee) {
    setEditingId(employee.id)
    setForm({
      name: employee.name,
      joiningDate: employee.joiningDate,
      designation: employee.designation,
      bankName: employee.bankName,
      accountNo: employee.accountNo,
      panNumber: employee.panNumber,
    })
    setShowForm(true)
    setError('')
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      const employee: Employee = {
        id: editingId ?? createEmployeeId(),
        ...form,
        name: form.name.trim(),
        designation: form.designation.trim(),
        bankName: form.bankName.trim(),
        accountNo: form.accountNo.trim(),
        panNumber: form.panNumber.trim().toUpperCase(),
      }
      const list = await saveEmployee(employee)
      onChange(list)
      resetForm()
    } catch {
      setError('Could not save employee. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this employee?')) return
    setBusy(true)
    setError('')
    try {
      const list = await deleteEmployee(id)
      onChange(list)
      if (editingId === id) resetForm()
    } catch {
      setError('Could not delete employee. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Employees</h2>
          <p className="text-sm text-slate-500">
            Employee records are saved permanently (JSON + cloud storage).
          </p>
        </div>
        <button
          type="button"
          disabled={busy}
          onClick={() => {
            setEditingId(null)
            setForm(emptyForm)
            setShowForm(true)
            setError('')
          }}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary text-white px-3 py-2 text-sm font-medium hover:bg-primary/90 disabled:opacity-60"
        >
          <Plus size={16} />
          Add Employee
        </button>
      </div>

      {error ? <p className="mb-3 text-sm text-red-600">{error}</p> : null}

      {showForm ? (
        <form onSubmit={handleSubmit} className="mb-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-800">
              {editingId ? 'Edit Employee' : 'New Employee'}
            </h3>
            <button type="button" onClick={resetForm} className="text-slate-500 hover:text-slate-800" aria-label="Close form">
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {(
              [
                ['name', 'Employee Name', 'text'],
                ['joiningDate', 'Joining Date', 'date'],
                ['designation', 'Designation', 'text'],
                ['bankName', 'Bank Name', 'text'],
                ['accountNo', 'Account No', 'text'],
                ['panNumber', 'PAN Number', 'text'],
              ] as const
            ).map(([key, label, type]) => (
              <div key={key}>
                <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
                <input
                  type={type}
                  required
                  value={form[key]}
                  onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                />
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              disabled={busy}
              className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary/90 disabled:opacity-60"
            >
              {busy ? 'Saving…' : editingId ? 'Update' : 'Save'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-white"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="py-2 pr-3 font-medium">Name</th>
              <th className="py-2 pr-3 font-medium">Joining Date</th>
              <th className="py-2 pr-3 font-medium">Designation</th>
              <th className="py-2 pr-3 font-medium">Bank</th>
              <th className="py-2 pr-3 font-medium">Account No</th>
              <th className="py-2 pr-3 font-medium">PAN</th>
              <th className="py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-500">
                  No employees yet. Click Add Employee to get started.
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr key={employee.id} className="border-b border-slate-100 text-slate-800">
                  <td className="py-2.5 pr-3 font-medium">{employee.name}</td>
                  <td className="py-2.5 pr-3">{employee.joiningDate}</td>
                  <td className="py-2.5 pr-3">{employee.designation}</td>
                  <td className="py-2.5 pr-3">{employee.bankName}</td>
                  <td className="py-2.5 pr-3">{employee.accountNo}</td>
                  <td className="py-2.5 pr-3">{employee.panNumber}</td>
                  <td className="py-2.5">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => startEdit(employee)}
                        className="rounded-md border border-slate-200 p-1.5 text-slate-600 hover:text-primary hover:border-primary/40 disabled:opacity-50"
                        aria-label={`Edit ${employee.name}`}
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void handleDelete(employee.id)}
                        className="rounded-md border border-slate-200 p-1.5 text-slate-600 hover:text-red-600 hover:border-red-200 disabled:opacity-50"
                        aria-label={`Delete ${employee.name}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
