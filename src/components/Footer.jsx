import React from 'react';
import { Phone, Mail, MapPin, Globe, ShieldCheck, ArrowUpRight, School, CreditCard, Code2, Cpu, CheckCircle2 } from 'lucide-react';

export default function Footer({ darkMode, setActiveLayer }) {
  const handleNav = (layerId) => {
    if (setActiveLayer) {
      setActiveLayer(layerId);
      window.location.hash = layerId;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className={`relative z-10 pt-16 pb-12 border-t transition-colors duration-300 font-apple ${
      darkMode ? 'bg-[#05080E] border-slate-800/80 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200/60 dark:border-slate-800/80">
          <div className="lg:col-span-2 space-y-4">
            <button 
              onClick={() => handleNav('overview')} 
              className="flex items-center gap-2.5 group cursor-pointer text-left"
            >
              <img 
                src={darkMode ? "/orange_future_tech_logo_dark.svg" : "/orange_future_tech_logo.svg"} 
                alt="Orange Future Tech Logo" 
                className="h-8 md:h-9 w-auto object-contain transition-transform group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </button>
            <p className={`text-xs leading-relaxed max-w-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Orange Future Tech is an institutional technology engineering firm. We build sub-second AI websites for top Delhi NCR schools (₹2-3 Lakh), immersive 360° Virtual Campus Tours (₹60,000 setup), CardGen automated ID software, and enterprise full-stack software.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono-code font-semibold border ${
                darkMode ? 'bg-[#0E131F] border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
              }`}>
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>CBSE &amp; IB Web Compliant</span>
              </span>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono-code font-semibold border ${
                darkMode ? 'bg-[#0E131F] border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
              }`}>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Sub-Second TTFB</span>
              </span>
            </div>
          </div>

          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 font-mono-code ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Educational Solutions
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleNav('schools')} className="hover:text-[#FF6B00] transition-colors cursor-pointer text-left">
                  AI Websites (₹2-3 Lakh)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('schools')} className="hover:text-[#FF6B00] transition-colors cursor-pointer text-left">
                  360° Virtual Tours (₹60,000)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('schools')} className="hover:text-[#FF6B00] transition-colors cursor-pointer text-left">
                  24/7 AI Admission Counselor
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('schools')} className="hover:text-[#FF6B00] transition-colors cursor-pointer text-left">
                  Parent WhatsApp Routing
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('schools')} className="hover:text-[#FF6B00] transition-colors cursor-pointer text-left">
                  CBSE / ICSE Compliance
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 font-mono-code ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Software &amp; Platforms
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleNav('cardgen')} className="hover:text-[#FF6B00] transition-colors cursor-pointer text-left">
                  CardGen ID Software
                </button>
              </li>
              <li>
                <a 
                  href="https://cardgen.orangefuturetech.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1 hover:text-[#FF6B00] transition-colors"
                >
                  <span>CardGen Live Demo</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <button onClick={() => handleNav('enterprise')} className="hover:text-[#FF6B00] transition-colors cursor-pointer text-left">
                  Enterprise Web Engineering
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('electronics')} className="hover:text-[#FF6B00] transition-colors cursor-pointer text-left">
                  Multi-Layer PCB Schematics
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('clients')} className="hover:text-[#FF6B00] transition-colors cursor-pointer text-left">
                  Verified Client Proof
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 font-mono-code ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Institutional Access
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#FF6B00] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Direct Telephony</div>
                  <a href="tel:+918958347428" className="hover:text-[#FF6B00] font-mono-code text-[11px] transition-colors">
                    +91 8958347428
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#FF6B00] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Corporate Communications</div>
                  <a href="mailto:teams@orangefuturetech.com" className="hover:text-[#FF6B00] font-mono-code text-[11px] transition-colors">
                    teams@orangefuturetech.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#FF6B00] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Engineering Office</div>
                  <span className="text-[11px] leading-tight block">
                    Delhi NCR, India
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className={`text-center sm:text-left text-[11px] ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
            &copy; {new Date().getFullYear()} Orange Future Tech. All rights reserved. High-concurrency educational and enterprise systems.
          </div>

          <div className="flex items-center gap-6 font-mono-code text-[11px]">
            <button onClick={() => handleNav('contact')} className="hover:text-[#FF6B00] transition-colors cursor-pointer">
              Instant Quote
            </button>
            <span>•</span>
            <button onClick={() => handleNav('schools')} className="hover:text-[#FF6B00] transition-colors cursor-pointer">
              Schools Portal
            </button>
            <span>•</span>
            <a href="https://cardgen.orangefuturetech.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6B00] transition-colors">
              CardGen
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
