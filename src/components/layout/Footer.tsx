import Link from 'next/link'
import Image from 'next/image'
import { Linkedin, Instagram, Mail, MapPin, ArrowUpRight } from 'lucide-react'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

const serviceLinks = [
  { href: '/services#software', label: 'Software Development' },
  { href: '/services#cloud', label: 'Cloud Solutions' },
  { href: '/services#consulting', label: 'IT Consulting' },
  { href: '/services#security', label: 'Cybersecurity' },
  { href: '/services#mobile', label: 'Mobile Apps' },
  { href: '/services#ai', label: 'AI & Analytics' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-2 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/images/logo.png"
              alt="Code Beacons Technologies"
              width={160}
              height={48}
              className="h-14 w-auto object-contain mb-4"
            />
            <p className="text-primary font-medium text-sm mb-2">Lighting the Future of Technology</p>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">
              Empowering businesses with innovative software solutions and strategic IT consulting.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/company/code-beacons-technologies"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary/30 transition-colors"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://www.instagram.com/codebeacons"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary/30 transition-colors"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-slate-900 font-semibold text-sm mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-500 text-sm hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 group-hover:opacity-100 transition-opacity -ml-1"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-slate-900 font-semibold text-sm mb-4 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-500 text-sm hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 group-hover:opacity-100 transition-opacity -ml-1"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-slate-900 font-semibold text-sm mb-4 uppercase tracking-wider">Contact Info</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:hrteam@codebeacons.in"
                  className="flex items-start gap-3 text-slate-500 text-sm hover:text-primary transition-colors group"
                >
                  <Mail size={16} className="mt-0.5 flex-shrink-0 text-primary" />
                  <span>hrteam@codebeacons.in</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-slate-500 text-sm">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0 text-primary" />
                  <span>Pimpri Chinchwad,<br />Pune, Maharashtra</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-100 pt-6 text-sm text-slate-400 text-center">
          <p>&copy; {currentYear} Code Beacons Technologies. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
