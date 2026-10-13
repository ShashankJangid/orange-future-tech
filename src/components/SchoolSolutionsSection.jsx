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
  X,
  School,
  Compass,
  Layers,
  Award
} from 'lucide-react';

const PRESET_SCHOOLS = [
  { name: 'DPS R.K. Puram / Vasant Kunj', city: 'Delhi', currentScore: 38, issues: 'Slow mobile load (4.8s), no 24/7 AI admission counselor, static PDF brochures' },
  { name: 'Modern School Barakhamba Road', city: 'Delhi', currentScore: 42, issues: 'Non-responsive legacy tables, missing interactive 360 tour, untracked parent queries' },
  { name: 'The Heritage School Gurgaon / Noida', city: 'NCR', currentScore: 45, issues: 'Heavy uncompressed assets, broken search index, delayed inquiry response' },
  { name: 'Lotus Valley International Noida', city: 'Noida', currentScore: 49, issues: 'Missing instant fee guidance bot, fragmented mobile layout on smartphones' },
  { name: 'GD Goenka World School Gurgaon', city: 'Gurgaon', currentScore: 40, issues: 'No virtual reality immersion for NRI parent admissions, slow TTFB' },
  { name: 'Shiv Nadar School Gurgaon / Noida', city: 'NCR', currentScore: 54, issues: 'CBSE syllabus updates buried under 4-click hierarchy, missing lead qualification' }
];

const CAMPUS_SPACES = [
  {
    name: 'Grand Campus Entrance & Quad',
    desc: '360° spherical high-resolution entry point welcoming prospective parents with directional hotspot audio.',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=900&auto=format&fit=crop&q=80'
  },
  {
    name: 'Next-Gen Robotics & STEM Lab',
    desc: 'Showcase your innovation culture, AI lab setups, and maker stations with clickable equipment overlays.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=900&auto=format&fit=crop&q=80'
  },
  {
    name: 'Smart Hybrid Classrooms',
    desc: 'Interactive 4K views of smart digital boards, student ergonomics, and collaborative seating pods.',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&auto=format&fit=crop&q=80'
  },
  {
    name: 'World-Class Library & Media Centre',
    desc: 'Quiet study bays, digital archives, and reading atriums rendered with accurate lighting and reflections.',
    image: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=900&auto=format&fit=crop&q=80'
  }
];

export default function SchoolSolutionsSection({ darkMode, setActiveLayer }) {
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
    <section id="schools" className="relative py-20 bg-white text-slate-900 overflow-hidden border-t border-slate-200/80">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-[#FF6B00] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
            Delhi NCR Premier School Web Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            AI School Websites &amp; <br />
            <span className="bg-gradient-to-r from-[#FF6B00] via-amber-500 to-orange-600 bg-clip-text text-transparent">
              360° Virtual Campus Tours
            </span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Engineered exclusively for elite schools across Delhi, Noida, Gurgaon &amp; NCR. Replace slow, legacy portals with sub-second AI admissions platforms that convert parent inquiries 24/7.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-5 py-2 rounded-full transition-all cursor-pointer ${
                activeTab === 'calculator' ? 'bg-[#FF6B00] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Interactive Price &amp; Add-On Estimator
            </button>
            <button
              onClick={() => setActiveTab('360tour')}
              className={`px-5 py-2 rounded-full transition-all cursor-pointer ${
                activeTab === '360tour' ? 'bg-[#FF6B00] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              360° VR Campus Views
            </button>
            <button
              onClick={() => setActiveTab('audits')}
              className={`px-5 py-2 rounded-full transition-all cursor-pointer ${
                activeTab === 'audits' ? 'bg-[#FF6B00] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Delhi NCR School Benchmark Audit
            </button>
          </div>
        </div>

        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-orange-100 text-[#FF6B00]">
                    <School className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Step 1: Choose Website Architecture</h3>
                    <p className="text-xs text-slate-500">Core responsive web application with integrated 24/7 AI Admission Counselor</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div 
                    onClick={() => setSelectedPackage('standard')}
                    className={`p-5 rounded-xl border-2 transition-all cursor-pointer ${
                      selectedPackage === 'standard' 
                        ? 'border-[#FF6B00] bg-white shadow-sm' 
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-slate-900">Standard AI School Portal</span>
                      <span className="text-xs font-mono-code font-bold text-[#FF6B00]">₹2,00,000</span>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1.5 mt-3">
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Sub-0.8s mobile load time</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>24/7 AI Admission Chat Counselor</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>CBSE/ICSE/IB compliance structure</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Parent WhatsApp lead routing</span>
                      </li>
                    </ul>
                  </div>

                  <div 
                    onClick={() => setSelectedPackage('premium')}
                    className={`p-5 rounded-xl border-2 transition-all cursor-pointer ${
                      selectedPackage === 'premium' 
                        ? 'border-[#FF6B00] bg-white shadow-sm' 
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-slate-900">Premium AI Ecosystem</span>
                      <span className="text-xs font-mono-code font-bold text-[#FF6B00]">₹3,00,000</span>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1.5 mt-3">
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Everything in Standard + Custom RAG AI</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Voice admission bot (Hindi &amp; English)</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Parent portal &amp; fee gateway sync</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Automated SEO for top Google rankings</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-orange-100 text-[#FF6B00]">
                      <Camera className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Step 2: 360° Virtual Tour Add-On</h3>
                      <p className="text-xs text-slate-500">₹60,000 includes 3 views · ₹5,000 per additional view</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono-code font-bold text-[#FF6B00] bg-orange-100/70 px-2.5 py-1 rounded-full">
                      {extraViewsCount} Views Configured
                    </span>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>Base Setup (3 Views Included)</span>
                    <span className="font-mono-code">₹60,000</span>
                  </div>

                  <input
                    type="range"
                    min="3"
                    max="15"
                    step="1"
                    value={extraViewsCount}
                    onChange={(e) => setExtraViewsCount(parseInt(e.target.value))}
                    className="w-full accent-[#FF6B00] cursor-pointer"
                  />

                  <div className="flex justify-between text-[11px] text-slate-400 font-mono-code">
                    <span>3 Views (Base)</span>
                    <span>6 Views</span>
                    <span>9 Views</span>
                    <span>12 Views</span>
                    <span>15 Views</span>
                  </div>

                  {additionalViews > 0 && (
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs">
                      <span className="text-slate-600">
                        {additionalViews} Additional View{additionalViews > 1 ? 's' : ''} (@ ₹5,000 / view):
                      </span>
                      <span className="font-mono-code font-bold text-slate-900">
                        + ₹{additionalViewsCost.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="sticky top-24 p-6 sm:p-8 rounded-2xl bg-slate-900 text-white shadow-xl border border-slate-800">
                <div className="flex items-center justify-between pb-5 border-b border-slate-800 mb-6">
                  <div>
                    <span className="text-xs font-mono-code uppercase text-[#FF6B00] font-semibold tracking-wider">Investment Summary</span>
                    <h4 className="text-xl font-extrabold text-white">Full School Digital Suite</h4>
                  </div>
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Website Platform:</span>
                    <span className="font-mono-code text-white font-semibold">₹{basePrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>360° VR Tour Setup (3 Views):</span>
                    <span className="font-mono-code text-white font-semibold">₹{vrBasePrice.toLocaleString('en-IN')}</span>
                  </div>
                  {additionalViews > 0 && (
                    <div className="flex justify-between items-center text-slate-300">
                      <span>{additionalViews} Additional VR View{additionalViews > 1 ? 's' : ''}:</span>
                      <span className="font-mono-code text-white font-semibold">₹{additionalViewsCost.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-800 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-white">Total Project Cost:</span>
                    <div className="text-right">
                      <div className="text-3xl font-extrabold text-[#FF6B00] font-mono-code">
                        ₹{grandTotal.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-slate-400">Excl. applicable taxes · 100% turnkey delivery</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-full py-3.5 rounded-full bg-[#FF6B00] text-white text-xs font-bold hover:bg-[#e05e00] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
                  >
                    <span>Receive Official School Proposal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="tel:+918958347428"
                    className="w-full py-3 rounded-full bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
                  >
                    <span>Call Engineering Team (+91 8958347428)</span>
                  </a>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Includes high-speed hosting &amp; SSL setup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Delivered in 14-21 business days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === '360tour' && (
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {CAMPUS_SPACES.map((space, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                  <div className="relative h-48 w-full overflow-hidden">
                    <img 
                      src={space.image} 
                      alt={space.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono-code font-semibold flex items-center gap-1.5">
                      <Camera className="w-3 h-3 text-[#FF6B00]" />
                      <span>360° Spherical View #{idx + 1}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-base font-bold text-slate-900 mb-1">{space.name}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{space.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-orange-50/70 border border-orange-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-bold text-slate-900">Want to add your Sports Complex, Auditorium or Hostels?</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Start with 3 views at ₹60,000, and add unlimited additional interactive views for just ₹5,000 per view.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('calculator')}
                className="px-5 py-2.5 rounded-full bg-[#FF6B00] text-white text-xs font-semibold hover:bg-[#e05e00] transition-colors shrink-0 cursor-pointer"
              >
                Configure in Calculator
              </button>
            </div>
          </div>
        )}

        {activeTab === 'audits' && (
          <div className="mb-16">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Real Delhi NCR School Website Speed &amp; AI Benchmark</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Most premier Delhi NCR school websites score below 50/100 on Google PageSpeed Insights, leading to lost parent inquiries and slow loading on 5G/4G smartphones. Here is how our architecture compares:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PRESET_SCHOOLS.map((school, idx) => (
                <div key={idx} className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900">{school.name}</span>
                    <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {school.city}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 my-3">
                    <div className="text-2xl font-extrabold text-red-500 font-mono-code">{school.currentScore}/100</div>
                    <div className="text-[11px] text-slate-500">Current Google Mobile Score</div>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-normal mb-3">
                    <strong className="text-slate-800">Critical Issues:</strong> {school.issues}
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-[#FF6B00] font-semibold">Orange Future Tech Solution:</span>
                    <span className="font-mono-code font-bold text-emerald-600">98/100 + AI Bot</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-8 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="max-w-xl">
            <h3 className="text-2xl font-extrabold tracking-tight">Need School ID Card Automation Too?</h3>
            <p className="text-xs sm:text-sm text-orange-100 mt-2 leading-relaxed">
              Pair your new AI website with our proprietary <strong>CardGen ID Card Software</strong> to generate thousands of student &amp; staff cards directly from Excel in minutes.
            </p>
          </div>
          <button
            onClick={() => {
              if (setActiveLayer) {
                setActiveLayer('cardgen');
                window.location.hash = 'cardgen';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="px-6 py-3.5 rounded-full bg-white text-[#FF6B00] text-xs font-bold hover:bg-orange-50 transition-all shadow-sm shrink-0 cursor-pointer"
          >
            Explore CardGen ID Software
          </button>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative text-slate-900"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-left mb-6">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-100 text-[#FF6B00] text-xs font-semibold mb-2">
                  <School className="w-3.5 h-3.5" />
                  <span>Delhi NCR School Proposal</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Request Official Quotation</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Total configured investment: <strong className="text-[#FF6B00] font-mono-code">₹{grandTotal.toLocaleString('en-IN')}</strong> ({extraViewsCount} 360° VR Views)
                </p>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Quotation Request Received!</h4>
                  <p className="text-xs text-slate-600">
                    Our educational engineering team will contact your school director within 2 hours with the complete architectural proposal.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setModalOpen(false);
                    }}
                    className="mt-4 px-6 py-2 rounded-full bg-slate-900 text-white text-xs font-semibold cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitQuote} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">School / Institution Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Modern School / DPS Delhi NCR"
                      value={formData.schoolName}
                      onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Official Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="principal@school.edu.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone (WhatsApp)</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-full bg-[#FF6B00] text-white text-xs font-bold hover:bg-[#e05e00] transition-colors flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    {submitting ? 'Generating Proposal...' : 'Send Proposal to School Management'}
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
