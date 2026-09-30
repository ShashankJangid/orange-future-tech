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
  Download, 
  Award,
  Send,
  X
} from 'lucide-react';

const CLIENT_TRUST_LOGOS = [
  { name: 'IIT Jodhpur', detail: 'Breach-Free Encrypted ID Systems' },
  { name: 'DPS Indirapuram', detail: '4,500+ Student Campus Automation' }
];

export default function CardGenMarketingSection() {
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

  let basePrice = 25000;
  let tierName = "Starter Campus (Up to 1,000 Students)";
  if (studentCount > 6000) {
    basePrice = 65000;
    tierName = "Institutional Unlimited (6,000+ Students)";
  } else if (studentCount > 3500) {
    basePrice = 45000;
    tierName = "Enterprise Campus (Up to 6,000 Students)";
  } else if (studentCount > 1000) {
    basePrice = 35000;
    tierName = "Standard School (Up to 3,500 Students)";
  }

  const rfidCost = includeRfid ? 15000 : 0;
  const grandTotal = basePrice + rfidCost;
  const costPerStudent = (grandTotal / Math.max(1, studentCount)).toFixed(2);

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
    <section id="cardgen" className="relative py-24 bg-slate-950 text-white overflow-hidden border-t border-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,107,0,0.1),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5 text-blue-400" />
            Proven Institutional ID Card Software
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            CardGen <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">Smart ID Card</span> Platform
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Eliminate vendor delays and manual errors. Generate breach-free, encrypted student & staff ID cards in under 60 seconds directly from Excel or CSV files.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-6 pt-6 border-t border-slate-800/80">
            {CLIENT_TRUST_LOGOS.map((client, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-300 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{client.name}</span>
                <span className="text-slate-500 text-[10px]">({client.detail})</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl hover:border-blue-500/40 transition-all">
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 w-fit mb-3">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">60-Second Batch Generator</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Upload student rosters via Excel or CSV. CardGen automatically aligns photos, formats data, and outputs print-ready layouts.
                </p>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl hover:border-orange-500/40 transition-all">
                <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 w-fit mb-3">
                  <QrCode className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">Encrypted QR & RFID Access</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Generate breach-free encrypted QR codes for campus entry gates, library access, and attendance verification.
                </p>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl hover:border-emerald-500/40 transition-all">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 w-fit mb-3">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">Mobile Admission Camera</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Capture student photos directly from any smartphone or tablet camera during admission desk registration.
                </p>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl hover:border-amber-500/40 transition-all">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 w-fit mb-3">
                  <Printer className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">Bulk Print Layout Engine</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Export high-resolution PDF sheet grids (10/20 cards per sheet) compatible with all standard PVC thermal printers.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
              <h3 className="text-xl font-bold text-white mb-4">Why Schools Upgrade to CardGen</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">Zero Vendor Delay:</span>
                    <span className="text-slate-400"> Print replacement or new admission ID cards instantly inside your school office.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">Parent Digital ID App:</span>
                    <span className="text-slate-400"> Parents receive a virtual ID card on smartphone for secure student pickup gate checks.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">Unlimited Staff Accounts:</span>
                    <span className="text-slate-400"> Provide admission desk clerks and IT staff individual login access.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-blue-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">CardGen Licensing Calculator</h3>
                  <p className="text-xs text-slate-400">Estimate annual software license cost</p>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300 font-semibold">Total Student Strength:</span>
                    <span className="text-blue-400 font-bold bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20">
                      {studentCount.toLocaleString('en-IN')} Students
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="10000"
                    step="250"
                    value={studentCount}
                    onChange={(e) => setStudentCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>500</span>
                    <span>3,500</span>
                    <span>6,000</span>
                    <span>10,000+</span>
                  </div>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold text-white">RFID / Smart Chip Integration</span>
                    <p className="text-xs text-slate-400">Gate access control & library attendance</p>
                  </div>
                  <button
                    onClick={() => setIncludeRfid(!includeRfid)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      includeRfid 
                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' 
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {includeRfid ? 'Added (+₹15k)' : '+ Add RFID'}
                  </button>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Recommended License Tier:</span>
                    <span className="text-white font-medium">{tierName}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Effective Cost Per Student:</span>
                    <span className="text-emerald-400 font-bold">₹{costPerStudent} / student / year</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between items-end">
                    <div>
                      <span className="text-xs uppercase text-blue-400 font-bold tracking-wider">Annual Campus License</span>
                      <div className="text-3xl font-black text-white mt-0.5">
                        ₹{grandTotal.toLocaleString('en-IN')}{' '}
                        <span className="text-xs font-normal text-slate-400">/ year</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setModalOpen(true)}
                className="w-full py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 hover:from-blue-600 hover:to-indigo-600 text-white font-bold rounded-xl shadow-xl shadow-blue-500/25 flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
              >
                <span>Request Free CardGen Software Trial</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="mt-4 text-center">
                <a href="tel:+918958347428" className="text-xs text-slate-400 hover:text-blue-400 transition-colors inline-flex items-center gap-1.5">
                  <span>Speak with CardGen Technical Director:</span>
                  <span className="font-bold text-white">+91 8958347428</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/50"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white">Schedule CardGen Demo</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Get a live 15-minute software demonstration & 30-day trial for your institution.
                </p>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">CardGen Demo Request Received!</h4>
                  <p className="text-sm text-slate-300">
                    Our Software Engineering Lead will contact your office within 2 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setModalOpen(false); }}
                    className="px-6 py-2.5 bg-slate-800 text-white rounded-xl text-sm font-semibold hover:bg-slate-700"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitDemo} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Institution / School Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. DPS Indirapuram / Amity International"
                      value={formData.institutionName}
                      onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Official Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="admin@school.edu.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 8958347428"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs space-y-1">
                    <div className="flex justify-between text-slate-400">
                      <span>Student Strength:</span>
                      <span className="text-white font-semibold">{studentCount.toLocaleString('en-IN')} Students</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>License Tier:</span>
                      <span className="text-blue-400 font-semibold">{tierName}</span>
                    </div>
                    <div className="flex justify-between text-slate-200 font-bold pt-2 border-t border-slate-800">
                      <span>Estimated License:</span>
                      <span className="text-emerald-400">₹{grandTotal.toLocaleString('en-IN')}/year</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 text-sm transition-all"
                  >
                    {submitting ? (
                      <span>Scheduling Demo...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Schedule CardGen Software Demo & Trial</span>
                      </>
                    )}
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
