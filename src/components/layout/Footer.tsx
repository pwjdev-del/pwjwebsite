import Link from "next/link";
import { Linkedin, Twitter, Mail, Phone } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white pt-12 pb-8 md:pt-20 md:pb-10 overflow-hidden">
      <FadeIn className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Brand Col */}
          <div className="col-span-1 sm:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 px-2 min-w-[32px] rounded bg-gradient-to-br from-electric-400 to-electric-600 flex items-center justify-center text-white font-heading font-bold text-sm tracking-wider">
                PWJ
              </div>
              <span className="font-heading font-bold text-xl sm:text-2xl tracking-tight text-white">
                Purewave<span className="text-electric-400">Josh</span>
              </span>
            </Link>
            <p className="text-navy-300 max-w-sm mt-4 text-sm leading-relaxed">
              Empowering healthcare and enterprise teams across Florida and beyond with secure AI infrastructure and workflow automation. Reclaim your time, securely.
            </p>
            <div className="flex flex-col gap-3 mt-8">
              <a href="mailto:pwjdev@gmail.com" className="flex items-center gap-3 text-navy-300 hover:text-white transition-colors">
                <Mail size={16} className="text-electric-400" />
                <span className="text-sm">pwjdev@gmail.com</span>
              </a>
              <a href="tel:+19415550199" className="flex items-center gap-3 text-navy-300 hover:text-white transition-colors">
                <Phone size={16} className="text-electric-400" />
                <span className="text-sm">(941) 555-0199</span>
              </a>
            </div>
            
            <div className="flex items-center gap-4 mt-8">
              <a href="https://linkedin.com/company/purewavejosh" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-electric-600 transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="https://twitter.com/purewavejosh" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-electric-600 transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Links Col */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services/meeting-bots" className="text-navy-300 hover:text-white text-sm transition-colors">AI Meeting Bots</Link>
              </li>
              <li>
                <Link href="/services/video-summarization" className="text-navy-300 hover:text-white text-sm transition-colors">Video Summarization</Link>
              </li>
              <li>
                <Link href="/services/crm-integrations" className="text-navy-300 hover:text-white text-sm transition-colors">CRM Integrations</Link>
              </li>
              <li>
                <Link href="/open-claw" className="text-navy-300 hover:text-electric-400 font-medium text-sm transition-colors">Open-Source AI Setup</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Industries</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/industries/healthcare" className="text-navy-300 hover:text-white text-sm transition-colors">Healthcare</Link>
              </li>
              <li>
                <Link href="/industries/real-estate" className="text-navy-300 hover:text-white text-sm transition-colors">Real Estate</Link>
              </li>
              <li>
                <Link href="/industries/enterprise" className="text-navy-300 hover:text-white text-sm transition-colors">Enterprise</Link>
              </li>
            </ul>
          </div>

          {/* Company Col */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-navy-300 hover:text-white text-sm transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/hipaa" className="text-navy-300 hover:text-white text-sm transition-colors">HIPAA Standards</Link>
              </li>
              <li>
                <Link href="/privacy" className="text-navy-300 hover:text-white text-sm transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="text-navy-300 hover:text-white text-sm transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-navy-400 text-xs">
            © {new Date().getFullYear()} Purewave Josh LLC. Proudly serving healthcare and enterprise teams across Florida.
          </p>
          <div className="flex items-center gap-2 text-xs text-navy-400">
            <span>Built with precision for B2B & Healthcare.</span>
          </div>
        </div>
      </FadeIn>
    </footer>
  );
}
