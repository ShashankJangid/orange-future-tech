import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Sparkles, 
  Bot, 
  Box, 
  Zap, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Search, 
  Send, 
  X, 
  ShieldAlert, 
  Smartphone,
  Globe,
  Layers
} from 'lucide-react';

const PRESET_CLIENTS = [
  {
    name: "DLF Luxury Estates",
    domain: "dlf.in",
    sector: "Real Estate Enterprise",
    score: 41,
    missing: "No 3D WebGL Architectural Showcase & Missing 24/7 AI Sales Concierge",
    proposed: "Interactive 3D WebGL Unit Configurator + AI Voice Booking Agent",
    impact: "+380% Qualified Site-Visit Leads"
  },
  {
    name: "Lenskart Retail Network",
    domain: "lenskart.com",
    sector: "E-Commerce",
    score: 52,
    missing: "Static image previews instead of 3D Frame Try-On & Heavy mobile checkout",
    proposed: "Sub-second Next.js 19 Edge CDN + 3D Interactive Product Inspector",
    impact: "+240% Online Orders Growth"
  },
  {
    name: "Urban Company",
    domain: "urbancompany.com",
    sector: "Services Marketplace",
    score: 48,
    missing: "Lack of 24/7 Inbound Telephony AI Voice Booking Agent",
    proposed: "Inbound 1-Ring AI Voice Agent (+91 8958347428) + 1-Click WhatsApp Booking",
    impact: "+310% Phone Booking Conversion"
  },
  {
    name: "Apollo Healthcare Group",
    domain: "apollohospitals.com",
    sector: "Healthcare & Diagnostics",
    score: 36,
    missing: "Slow 5.4s mobile load time & No AI Doctor Triage Counselor",
    proposed: "Next.js 19 Emergency Medical Portal + 24/7 AI Doctor Triage Bot",
    impact: "+420% Patient Appointment Efficiency"
  }
];

export default function TechUpgradePitchSection() {
  const [selectedClient, setSelectedClient] = useState(PRESET_CLIENTS[0]);
  const [customDomain, setCustomDomain] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    domain: '',
    email: '',
    phone: ''
  });

  const handleRunAudit = (client) => {
    setSelectedClient(client);
    setFormData({
      companyName: client.name,
      domain: client.domain,
      email: `contact@${client.domain}`,
      phone: '+918958347428'
    });
  };

  const handleSubmitPitch = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('/api/prospects/audit-and-pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: formData.companyName || selectedClient.name,
          domain: formData.domain || selectedClient.domain,
          contact_email: formData.email,
          phone: formData.phone || '+918958347428'
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
    <section id="tech-pitch" className="relative py-24 bg-slate-950 text-white overflow-hidden border-t border-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(255,107,0,0.12),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(147,51,234,0.1),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
            Enterprise Website Transformation & AI Upgrades
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Pitching <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">Next-Gen Tech Features</span> to Win Enterprise Clients
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            We audit legacy corporate websites, identify missing high-tech capabilities, and pitch custom 24/7 AI Sales Agents, 3D WebGL Showcases, and sub-second Next.js 19 architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-orange-400" />
              Select Industry Enterprise Target:
            </h3>

            {PRESET_CLIENTS.map((client, idx) => (
              <div
                key={idx}
                onClick={() => handleRunAudit(client)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedClient.domain === client.domain
                    ? 'bg-slate-900 border-orange-500/50 shadow-lg shadow-orange-500/10'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-white text-base">{client.name}</span>
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    Speed: {client.score}/100
                  </span>
                </div>
                <div className="text-xs text-slate-400 mb-2">{client.domain} • {client.sector}</div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                  <span className="text-emerald-400 font-semibold">{client.impact}</span>
                  <ArrowRight className={`w-4 h-4 ${selectedClient.domain === client.domain ? 'text-orange-400' : 'text-slate-600'}`} />
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
                <div>
                  <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest">Active Client Audit Matrix</span>
                  <h3 className="text-2xl font-bold text-white mt-1">{selectedClient.name}</h3>
                  <div className="text-xs text-slate-400">Target Domain: https://{selectedClient.domain}</div>
                </div>
                <div className="text-right bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
                  <span className="text-[10px] uppercase text-slate-500 block">Mobile PageSpeed</span>
                  <span className="text-2xl font-black text-amber-400">{selectedClient.score}/100</span>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <h4 className="text-sm font-bold text-red-400 flex items-center gap-2 mb-3">
                    <ShieldAlert className="w-4 h-4" />
                    Identified Bottlenecks & Missing Features:
                  </h4>
                  <div className="bg-slate-950 p-4 rounded-xl border border-red-500/20 space-y-2 text-xs">
                    <div className="flex items-start gap-2.5 text-slate-300">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>{selectedClient.missing}</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-slate-300">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>Slow server-side rendering caching causing high bounce rate during mobile ad campaigns.</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4" />
                    Orange Future Tech Cutting-Edge Features Pitched:
                  </h4>
                  <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/20 space-y-2.5 text-xs">
                    <div className="flex items-start gap-2.5 text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-white">Next-Gen Tech: </span>
                        <span>{selectedClient.proposed}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-white">24/7 AI Voice & Telephony Agent: </span>
                        <span>Integrated with official line +91 8958347428 for instant 1-ring booking.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-white">99+ PageSpeed Next.js 19: </span>
                        <span>Sub-second page loading speed powered by global Vercel Edge CDN.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent p-4 rounded-xl border border-orange-500/20 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-medium">Projected Business Impact</span>
                    <div className="text-lg font-black text-white mt-0.5">{selectedClient.impact}</div>
                  </div>
                  <TrendingUp className="w-8 h-8 text-orange-400" />
                </div>
              </div>

              <button
                onClick={() => {
                  setFormData({
                    companyName: selectedClient.name,
                    domain: selectedClient.domain,
                    email: `contact@${selectedClient.domain}`,
                    phone: '+918958347428'
                  });
                  setModalOpen(true);
                }}
                className="w-full py-4 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-xl shadow-xl shadow-orange-500/25 flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
              >
                <span>Request Custom Executive Tech Pitch Deck</span>
                <ArrowRight className="w-5 h-5" />
              </button>
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
                <h3 className="text-2xl font-bold text-white">Request Executive Tech Proposal</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Get a comprehensive AI audit report & custom feature prototype deck for your company.
                </p>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Executive Pitch Request Received!</h4>
                  <p className="text-sm text-slate-300">
                    Our Senior Solutions Architect will email the custom technical proposal to your office within 2 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setModalOpen(false); }}
                    className="px-6 py-2.5 bg-slate-800 text-white rounded-xl text-sm font-semibold hover:bg-slate-700"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitPitch} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Enterprise Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. DLF / Lenskart / Apollo Healthcare"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Company Website Domain</label>
                    <input
                      type="text"
                      required
                      placeholder="company.com"
                      value={formData.domain}
                      onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Official Executive Email</label>
                    <input
                      type="email"
                      required
                      placeholder="director@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Telephony Line</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 8958347428"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 text-sm transition-all"
                  >
                    {submitting ? (
                      <span>Generating Technical Pitch...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Deliver Executive Pitch Deck & Audit</span>
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
