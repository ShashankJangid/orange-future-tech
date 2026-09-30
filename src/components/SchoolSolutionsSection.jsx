import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Camera, 
  Bot, 
  Smartphone, 
  CheckCircle2, 
  Zap, 
  Calculator, 
  Sparkles, 
  Globe, 
  ShieldCheck, 
  ArrowRight,
  Eye,
  ChevronRight,
  Send,
  X
} from 'lucide-react';

const PRESET_SCHOOLS = [
  { name: 'DPS R.K. Puram / Vasant Kunj', city: 'Delhi', pagespeed: 38, views: 8 },
  { name: 'Modern School Barakhamba Road', city: 'Delhi', pagespeed: 42, views: 6 },
  { name: 'The Heritage School Gurgaon / Noida', city: 'NCR', pagespeed: 45, views: 10 },
  { name: 'Lotus Valley International Noida', city: 'Noida', pagespeed: 49, views: 7 },
  { name: 'GD Goenka World School Gurgaon', city: 'Gurgaon', pagespeed: 40, views: 12 },
  { name: 'Shiv Nadar School Gurgaon / Noida', city: 'NCR', pagespeed: 54, views: 9 }
];

export default function SchoolSolutionsSection() {
  const [selectedPackage, setSelectedPackage] = useState('standard');
  const [extraViewsCount, setExtraViewsCount] = useState(3);
  const [activeTab, setActiveTab] = useState('calculator');
  const [modalOpen, setModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    schoolName: '',
    email: '',
    phone: '',
    city: 'Delhi NCR'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const basePrice = selectedPackage === 'premium' ? 300000 : 200000;
  const vrBasePrice = 60000;
  const vrBaseViews = 3;
  
  const additionalViews = Math.max(0, extraViewsCount - vrBaseViews);
  const additionalViewsCost = additionalViews * 5000;
  const totalVrCost = extraViewsCount > 0 ? vrBasePrice + additionalViewsCost : 0;
  const grandTotal = basePrice + totalVrCost;

  const handleSubmitQuote = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('/api/schools/calculate-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          school_name: formData.schoolName || 'Delhi NCR Partner School',
          contact_email: formData.email,
          phone: formData.phone || '+918958347428',
          base_package: selectedPackage === 'premium' ? 'Premium Autonomous School Ecosystem (₹3,00,000)' : 'Standard AI School Portal (₹2,00,000)',
          extra_vr_views: extraViewsCount
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
    <section id="schools" className="relative py-24 bg-slate-950 text-white overflow-hidden border-t border-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,107,0,0.12),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
            Delhi NCR Education Technology Leadership
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Next-Gen <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">AI School Websites</span> & 360° VR Tours
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Transform your school's digital presence with 24/7 AI Admissions Counselors, instant CBSE/IB inquiry bots, and immersive 360° Virtual Campus Walkthroughs tailored for top Delhi, Noida & Gurgaon institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
                <div>
                  <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest">Base Engineering Package</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">AI-Powered School Web Portal</h3>
                </div>
                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setSelectedPackage('standard')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                      selectedPackage === 'standard' 
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Standard (₹2 Lakh)
                  </button>
                  <button
                    onClick={() => setSelectedPackage('premium')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                      selectedPackage === 'premium' 
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Premium ERP (₹3 Lakh)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  <Bot className="w-6 h-6 text-orange-400 mb-2" />
                  <h4 className="text-sm font-semibold text-white">24/7 AI Admission Assistant</h4>
                  <p className="text-xs text-slate-400 mt-1">Answers parent queries on fees, eligibility, and curriculum automatically.</p>
                </div>
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  <Zap className="w-6 h-6 text-amber-400 mb-2" />
                  <h4 className="text-sm font-semibold text-white">99+ Google PageSpeed</h4>
                  <p className="text-xs text-slate-400 mt-1">Built on Next.js 19 for instant sub-second mobile page loads.</p>
                </div>
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  <Globe className="w-6 h-6 text-blue-400 mb-2" />
                  <h4 className="text-sm font-semibold text-white">Parents Portal & ERP</h4>
                  <p className="text-xs text-slate-400 mt-1">Online fee payment gateway, notice board & automated SMS alerts.</p>
                </div>
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  <ShieldCheck className="w-6 h-6 text-emerald-400 mb-2" />
                  <h4 className="text-sm font-semibold text-white">Enterprise Security</h4>
                  <p className="text-xs text-slate-400 mt-1">SSL encryption, CBSE/IB compliance, and zero-downtime hosting.</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent p-5 rounded-xl border border-orange-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-medium">Selected School Web Tier</span>
                    <div className="text-2xl font-black text-white mt-0.5">
                      ₹{basePrice.toLocaleString('en-IN')}{' '}
                      <span className="text-xs font-normal text-slate-400">/ One-time setup</span>
                    </div>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-orange-400" />
                </div>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">360° Virtual Campus Tour Addon</h3>
                    <p className="text-xs text-slate-400">Immersive panoramic WebGL tour of classrooms, labs & sports grounds</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-semibold border border-blue-500/20">
                  Addon Option
                </span>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Base VR Setup</span>
                    <div className="text-lg font-bold text-white mt-0.5">₹60,000 for 3 Views</div>
                    <p className="text-xs text-slate-400 mt-0.5">Includes Main Entrance, Science Lab, and Sports Complex.</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400">Additional Views Rate</span>
                    <div className="text-sm font-semibold text-amber-400">+₹5,000 / Extra View</div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-slate-300">
                      Select Total 360° VR Views Needed:
                    </label>
                    <span className="text-sm font-black text-orange-400 bg-orange-500/10 px-3 py-1 rounded-lg border border-orange-500/20">
                      {extraViewsCount} Views ({extraViewsCount >= 3 ? `3 Base + ${extraViewsCount - 3} Extra` : '0 Selected'})
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    step="1"
                    value={extraViewsCount}
                    onChange={(e) => setExtraViewsCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>0 Views</span>
                    <span>3 Base (₹60k)</span>
                    <span>6 Views (₹75k)</span>
                    <span>10 Views (₹95k)</span>
                    <span>15 Views (₹1.2L)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400">360° VR Tour Cost:</span>
                    <div className="text-lg font-bold text-blue-400">₹{totalVrCost.toLocaleString('en-IN')}</div>
                  </div>
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400">Extra Views Cost:</span>
                    <div className="text-lg font-bold text-amber-400">₹{additionalViewsCost.toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-orange-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20 text-orange-400">
                  <Calculator className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Investment Summary</h3>
                  <p className="text-xs text-slate-400">Tailored Delhi NCR School Package</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center pb-3 border-b border-slate-800 text-sm">
                  <span className="text-slate-300">Base AI School Website:</span>
                  <span className="font-semibold text-white">₹{basePrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-800 text-sm">
                  <span className="text-slate-300">360° VR Campus Setup ({extraViewsCount} views):</span>
                  <span className="font-semibold text-blue-400">₹{totalVrCost.toLocaleString('en-IN')}</span>
                </div>
                {additionalViews > 0 && (
                  <div className="flex justify-between items-center pb-3 border-b border-slate-800 text-xs text-slate-400">
                    <span>• {additionalViews} Extra Views (@ ₹5,000/view):</span>
                    <span>₹{additionalViewsCost.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="pt-2 flex justify-between items-end">
                  <div>
                    <span className="text-xs uppercase text-orange-400 font-bold tracking-wider">Total Investment Quote</span>
                    <div className="text-3xl font-black text-white mt-1">
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1.5 rounded-lg">
                    14-21 Days Delivery
                  </span>
                </div>
              </div>

              <button
                onClick={() => setModalOpen(true)}
                className="w-full py-4 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-xl shadow-xl shadow-orange-500/25 flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
              >
                <span>Get Official School Proposal & Audit</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="mt-4 text-center">
                <a href="tel:+918958347428" className="text-xs text-slate-400 hover:text-orange-400 transition-colors inline-flex items-center gap-1.5">
                  <span>Speak with Lead AI Consultant:</span>
                  <span className="font-bold text-white">+91 8958347428</span>
                </a>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-orange-400" />
                Targeting Top Delhi NCR Institutions
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {PRESET_SCHOOLS.map((school, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/60 text-xs">
                    <div>
                      <div className="font-medium text-slate-200">{school.name}</div>
                      <div className="text-slate-500 text-[10px]">{school.city} • Current Speed: {school.pagespeed}/100</div>
                    </div>
                    <span className="text-orange-400 font-semibold bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                      {school.views} VR Views
                    </span>
                  </div>
                ))}
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
                <h3 className="text-2xl font-bold text-white">Request School AI Proposal</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Get a free technical audit of your current school website & custom 360° VR Tour roadmap.
                </p>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Proposal Request Received!</h4>
                  <p className="text-sm text-slate-300">
                    Our Senior AI School Solutions Director will contact your office within 2 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setModalOpen(false); }}
                    className="px-6 py-2.5 bg-slate-800 text-white rounded-xl text-sm font-semibold hover:bg-slate-700"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitQuote} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">School / Institution Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. DPS R.K. Puram / Modern School"
                      value={formData.schoolName}
                      onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Official Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="principal@school.edu.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
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
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs space-y-1">
                    <div className="flex justify-between text-slate-400">
                      <span>Selected Package:</span>
                      <span className="text-white font-semibold">{selectedPackage === 'premium' ? 'Premium ERP (₹3L)' : 'Standard AI (₹2L)'}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>360° VR Campus Views:</span>
                      <span className="text-blue-400 font-semibold">{extraViewsCount} Views</span>
                    </div>
                    <div className="flex justify-between text-slate-200 font-bold pt-2 border-t border-slate-800">
                      <span>Total Estimated Investment:</span>
                      <span className="text-orange-400">₹{grandTotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 text-sm transition-all"
                  >
                    {submitting ? (
                      <span>Dispatching Proposal...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Dispatch Custom Proposal & AI Audit</span>
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
