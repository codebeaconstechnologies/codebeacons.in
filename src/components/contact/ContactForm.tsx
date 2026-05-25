'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const serviceOptions = [
  { value: '', label: 'Select a service' },
  { value: 'software', label: 'Custom Software Development' },
  { value: 'cloud', label: 'Cloud Solutions & Migration' },
  { value: 'consulting', label: 'IT Strategy & Consulting' },
  { value: 'security', label: 'Cybersecurity Services' },
  { value: 'mobile', label: 'Mobile App Development' },
  { value: 'ai', label: 'AI & Data Analytics' },
  { value: 'other', label: 'Other / Not Sure Yet' },
]

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [error, setError] = useState('')
  const [fields, setFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fields.firstName || !fields.email || !fields.message) {
      setError('Please fill in all required fields.')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(fields.email)) {
      setError('Please enter a valid email address.')
      return
    }

    setError('')
    setFormState('submitting')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      if (!res.ok) throw new Error('Submission failed')
      setFormState('success')
    } catch {
      setFormState('error')
      setError('Something went wrong. Please email us directly at hrteam@codebeacons.in')
    }
  }

  if (formState === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-10 rounded-2xl bg-dark-2 border border-primary/20 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={32} className="text-primary" />
        </div>
        <h3 className="font-heading font-semibold text-slate-900 text-2xl mb-3">Message Sent!</h3>
        <p className="text-slate-500">
          Thank you for reaching out. We'll review your enquiry and get back to you
          within 24 hours.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="p-8 rounded-2xl bg-dark-2 border border-slate-100">
      <h3 className="font-heading font-semibold text-slate-900 text-xl mb-1">Send Us a Message</h3>
      <p className="text-slate-500 text-sm mb-6">
        Fill out the form and we'll get back to you within one business day.
      </p>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-5"
          >
            <AlertCircle size={16} />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1.5 font-medium">
              First Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={fields.firstName}
              onChange={handleChange}
              placeholder="James"
              required
              className="w-full px-4 py-3 rounded-xl bg-dark border border-slate-200 text-slate-900 placeholder-gray-600 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1.5 font-medium">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={fields.lastName}
              onChange={handleChange}
              placeholder="Smith"
              className="w-full px-4 py-3 rounded-xl bg-dark border border-slate-200 text-slate-900 placeholder-gray-600 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1.5 font-medium">
              Email <span className="text-primary">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={fields.email}
              onChange={handleChange}
              placeholder="james@company.com"
              required
              className="w-full px-4 py-3 rounded-xl bg-dark border border-slate-200 text-slate-900 placeholder-gray-600 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1.5 font-medium">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={fields.phone}
              onChange={handleChange}
              placeholder="+44 7700 900123"
              className="w-full px-4 py-3 rounded-xl bg-dark border border-slate-200 text-slate-900 placeholder-gray-600 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-slate-600 mb-1.5 font-medium">
              Service Interested In
            </label>
            <select
              name="service"
              value={fields.service}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-dark border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors appearance-none"
            >
              {serviceOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-dark-2">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-slate-600 mb-1.5 font-medium">
              Message <span className="text-primary">*</span>
            </label>
            <textarea
              name="message"
              value={fields.message}
              onChange={handleChange}
              rows={5}
              placeholder="Tell us about your project, goals, or the problem you're looking to solve..."
              required
              className="w-full px-4 py-3 rounded-xl bg-dark border border-slate-200 text-slate-900 placeholder-gray-600 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={formState === 'submitting'}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-dark font-bold text-sm hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-lg shadow-primary/20"
        >
          {formState === 'submitting' ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send Message <Send size={16} />
            </>
          )}
        </button>
      </form>
    </div>
  )
}
