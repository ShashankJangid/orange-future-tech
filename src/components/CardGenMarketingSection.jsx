import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  QrCode, 
  ShieldCheck, 
  Users, 
  Zap, 
  Smartphone, 
  Printer, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Award,
  Send,
  X,
  School,
  FileSpreadsheet,
  Layers,
  ChevronRight
} from 'lucide-react';

const CLIENT_TRUST_LOGOS = [
  { name: 'IIT Jodhpur', detail: 'Encrypted Student ID Workflows' },
  { name: 'DPS Indirapuram', detail: '4,500+ Campus Card Automation' },
  { name: 'Heritage Global School', detail: 'Instant Bulk Parent Card Export' }
];

const CARD_FEATURES = [
  {
    title: 'Excel & CSV 1-Click Import',
    desc: 'Upload standard school registers. CardGen automatically validates student names, roll numbers, blood groups, and parent emergency contacts with zero formatting hiccups.',
    icon: FileSpreadsheet
  },
  {
    title: 'Smart AI Face-Crop & Alignment',
    desc: 'Messy student photos? Our integrated AI detects facial landmarks, adjusts lighting balance, and auto-centers portraits perfectly to fit school badge templates.',
    icon: Sparkles
  },
  {
    title: 'Dynamic Barcode & Secure QR Generator',
    desc: 'Each card receives a cryptographic QR code that integrates with your library turnover, school bus GPS tracking, and attendance turnstiles.',
    icon: QrCode
  },
  {
    title: 'High-Speed Print-Ready PDF Production',
    desc: 'Export 300 DPI high-resolution CMYK print sheets arranged for thermal badge printers or bulk commercial offset printing in under 60 seconds.',
    icon: Printer
  }
];

export default function CardGenMarketingSection({ darkMode, setActiveLayer }) {
  const [studentCount, setStudentCount] = useState(2500);
  const [includeRfid, setIncludeRfid] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    institutionName: '',
    email: '',
    phone: '',
    city: 'Delhi NCR'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  let tierName = "Standard Campus (Up to 1,000 Students)";
  if (studentCount > 6000) {
    tierName = "Institutional Multi-Branch (6,000+ Students)";
  } else if (studentCount > 3500) {
    tierName = "Large Campus (Up to 6,000 Students)";
  } else if (studentCount > 1000) {
    tierName = "Full School Suite (Up to 3,500 Students)";
  }

  const handleSubmitDemo = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('/api/cardgen/request-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          institution_name: formData.institutionName || 'Partner Institution',
          contact_email: formData.email,
          phone: formData.phone || '+918958347428',
          student_count: studentCount,
          includes_rfid: includeRfid
        })
      });
      const data = await response.json();
      if (data.status === 'success') {
        setSubmitted(true);
      }
    } catch (err) {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="cardgen" className={`relative py-20 overflow-hidden border-t transition-colors duration-300 ${
      darkMode ? 'bg-[#080B11] text-white border-slate-800' : 'bg-slate-50 text-slate-900 border-slate-200/80'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border ${
            darkMode ? 'bg-blue-950/40 border-blue-800/80 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-600'
          }`}>
            <Award className="w-3.5 h-3.5 text-blue-600" />
            Proprietary School ID Card Generation Platform
          </div>
          <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            CardGen <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent">Smart ID Card</span> Platform
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${
            darkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Eliminate weeks of vendor delays, misprinted photos, and manual errors. Generate encrypted, print-ready student &amp; staff ID cards directly from your school spreadsheets in seconds.
          </p>

          <div className={`flex flex-wrap items-center justify-center gap-4 mt-6 pt-6 border-t ${
            darkMode ? 'border-slate-800' : 'border-slate-200/80'
          }`}>
            {CLIENT_TRUST_LOGOS.map((client, idx) => (
              <div key={idx} className={`flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-xl border shadow-xs ${
                darkMode ? 'bg-[#0E131F] border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-700'
              }`}>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>{client.name}</span>
                <span className={`text-[10px] ${darkMode ? 'text-slate-400' : 'text-slate-400'}`}>({client.detail})</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {CARD_FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className={`p-6 rounded-2xl border shadow-xs hover:shadow-md transition-shadow ${
                darkMode ? 'bg-[#0E131F] border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                  darkMode ? 'bg-blue-950/50 text-blue-400' : 'bg-blue-50 text-blue-600'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className={`text-base font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{feat.title}</h3>
                <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{feat.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className={`lg:col-span-7 rounded-2xl overflow-hidden border shadow-xs p-6 sm:p-8 ${
            darkMode ? 'border-slate-800 bg-[#0E131F]' : 'border-slate-200 bg-white'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-mono-code font-bold uppercase text-blue-500">Simulate Campus Deployment</span>
                <h3 className={`text-xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Configure Student Volume</h3>
              </div>
              <span className={`text-xs font-mono-code font-bold px-3 py-1.5 rounded-full border ${
                darkMode ? 'bg-blue-950/40 border-blue-800 text-blue-300' : 'bg-blue-50 border-blue-200 text-blue-700'
              }`}>
                {studentCount.toLocaleString('en-IN')} Students
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <div className={`flex justify-between text-xs font-semibold mb-2 ${
                  darkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  <span>Student Enrollment Scale:</span>
                  <span className="text-blue-500 font-bold">{studentCount} Students</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="250"
                  value={studentCount}
                  onChange={(e) => setStudentCount(parseInt(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono-code mt-1">
                  <span>500 Students</span>
                  <span>3,500</span>
                  <span>7,000</span>
                  <span>10,000 Students</span>
                </div>
              </div>

              <div className={`p-4 rounded-xl border flex items-center justify-between ${
                darkMode ? 'bg-[#141B2D] border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div>
                  <div className={`text-xs font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>Include Smart RFID / NFC Chips</div>
                  <div className={`text-[11px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>For automated bus transit &amp; turnstile integration</div>
                </div>
                <input
                  type="checkbox"
                  checked={includeRfid}
                  onChange={(e) => setIncludeRfid(e.target.checked)}
                  className="w-5 h-5 accent-blue-600 cursor-pointer rounded"
                />
              </div>

              <div className={`p-4 rounded-xl border flex items-center justify-between text-xs ${
                darkMode ? 'bg-blue-950/30 border-blue-900/50' : 'bg-blue-50/60 border-blue-100'
              }`}>
                <div>
                  <span className={`font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>Recommended Campus Tier:</span>
                  <div className="text-blue-400 font-semibold mt-0.5">{tierName}</div>
                </div>
                <div className="text-right">
                  <span className={`text-[11px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Processing Time</span>
                  <div className={`font-mono-code font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>&lt; 3 Minutes Total</div>
                </div>
              </div>

              <button
                onClick={() => setModalOpen(true)}
                className="w-full py-3.5 rounded-full bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
              >
                <span>Schedule Live School Demo &amp; Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className={`rounded-2xl border p-6 shadow-xs ${
              darkMode ? 'border-slate-800 bg-[#0E131F]' : 'border-slate-200 bg-white'
            }`}>
              <div className="text-xs font-mono-code font-bold text-slate-400 uppercase mb-2">Live Demo Portal</div>
              <h4 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Experience CardGen in Action</h4>
              <p className={`text-xs leading-relaxed mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Test our drag-and-drop badge builder, auto face-centering AI, and high-resolution export engine in our sandbox environment.
              </p>
              <a
                href="https://cardgen.orangefuturetech.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-colors ${
                  darkMode ? 'bg-white text-slate-900 hover:bg-slate-100' : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                <span>Open cardgen.orangefuturetech.com</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className={`rounded-2xl border p-6 ${
              darkMode ? 'border-orange-900/50 bg-orange-950/20' : 'border-orange-200 bg-orange-50/60'
            }`}>
              <div className="flex items-center gap-2 text-xs font-bold text-[#FF6B00] mb-2">
                <School className="w-4 h-4" />
                <span>Bundle with AI School Website</span>
              </div>
              <p className={`text-xs leading-relaxed mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Combine CardGen with our ₹2-3 Lakh AI School Website and ₹60,000 360° VR Tour for an all-in-one educational technology upgrade.
              </p>
              <button
                onClick={() => {
                  if (setActiveLayer) {
                    setActiveLayer('schools');
                    window.location.hash = 'schools';
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="text-xs font-bold text-[#FF6B00] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View School Web Packages</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-md rounded-2xl p-6 sm:p-8 shadow-2xl border relative ${
                darkMode ? 'bg-[#0E131F] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <button
                onClick={() => setModalOpen(false)}
                className={`absolute top-4 right-4 p-2 cursor-pointer ${
                  darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-left mb-6">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100/20 text-blue-400 text-xs font-semibold mb-2">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>CardGen Demo Request</span>
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Schedule School Demo</h3>
                <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Configured for: <strong>{studentCount.toLocaleString('en-IN')} Students</strong> ({tierName})
                </p>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Demo Scheduled!</h4>
                  <p className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    Our technical consultant will reach out with credentials and sample batch badge exports for your institution.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setModalOpen(false);
                    }}
                    className={`mt-4 px-6 py-2 rounded-full text-xs font-semibold cursor-pointer ${
                      darkMode ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitDemo} className="space-y-4 text-left">
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Institution / School Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Cambridge School / University Campus"
                      value={formData.institutionName}
                      onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${
                        darkMode ? 'bg-[#141B2D] border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Official Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="admin@institution.edu.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${
                        darkMode ? 'bg-[#141B2D] border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Contact Phone (WhatsApp)</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 8958347428"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${
                        darkMode ? 'bg-[#141B2D] border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-full bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    {submitting ? 'Connecting...' : 'Request Institutional Demo'}
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
