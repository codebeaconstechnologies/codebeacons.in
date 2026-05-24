import { Mail, MapPin, Linkedin, Instagram } from 'lucide-react'

export default function ContactInfo() {
  return (
    <div className="space-y-4">
      {/* Email */}
      <div className="p-6 rounded-2xl bg-dark-2 border border-white/5 hover:border-primary/20 transition-colors">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
            <Mail size={20} className="text-primary" />
          </div>
          <div>
            <h4 className="text-white font-semibold mb-1">Email Us</h4>
            <a
              href="mailto:hrteam@codebeacons.in"
              className="text-primary hover:underline text-sm"
            >
              hrteam@codebeacons.in
            </a>
            <p className="text-gray-500 text-xs mt-1">We respond within 24 hours</p>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="p-6 rounded-2xl bg-dark-2 border border-white/5 hover:border-primary/20 transition-colors">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
            <MapPin size={20} className="text-primary" />
          </div>
          <div>
            <h4 className="text-white font-semibold mb-1">Visit Us</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              15/3 Pandhare Wasti,<br />
              Punawale, Pune, Maharashtra
            </p>
          </div>
        </div>
      </div>

      {/* Social */}
      <div className="p-6 rounded-2xl bg-dark-2 border border-white/5 hover:border-primary/20 transition-colors">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
            <Linkedin size={20} className="text-primary" />
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/company/code-beacons-technologies"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-primary transition-colors"
              >
                <Linkedin size={15} /> LinkedIn
              </a>
              <a
                href="https://www.instagram.com/codebeacons"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-primary transition-colors"
              >
                <Instagram size={15} /> Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
