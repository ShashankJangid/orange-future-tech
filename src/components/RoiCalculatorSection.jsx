import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, ShieldCheck, Mail, Phone, MessageSquare, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function RoiCalculatorSection({ darkMode }) {
  const [monthlyEnquiries, setMonthlyEnquiries] = useState(400);
  const [missedPercent, setMissedPercent] = useState(35);
  const [visitRate, setVisitRate] = useState(30);
  const [closeRate, setCloseRate] = useState(10);
  const [dealValue, setDealValue] = useState(300000);

  const missedCount = Math.round((monthlyEnquiries * missedPercent) / 100);
  const extraVisits = Math.round((missedCount * visitRate) / 100);
  const extraClosedDeals = Math.round(((extraVisits * closeRate) / 100) * 10) / 10;
  const recoveredRevenue = Math.round(extraClosedDeals * dealValue);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section id="roi-calculator" class="py-24 relative z-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          class="text-center mb-16"
        >
          <div 
            class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[7px] text-xs font-mono-code font-bold uppercase mb-3 border backdrop-blur-md shadow-sm"
            style={{
              borderColor: darkMode ? 'rgba(255, 107, 0, 0.4)' : 'rgba(255, 107, 0, 0.3)',
              backgroundColor: darkMode ? 'rgba(11, 15, 23, 0.6)' : 'rgba(255, 255, 255, 0.8)',
              color: '#FF6B00'
            }}
          >
            <Calculator class="w-3.5 h-3.5" />
            <span>Interactive Missed-Call ROI Calculator</span>
          </div>
          <h2 class={`text-3xl sm:text-5xl font-extrabold font-['Space_Grotesk',sans-serif] tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            WHAT ARE UNANSWERED CALLS COSTING YOU?
          </h2>
          <p class={`mt-3 text-sm sm:text-base max-w-xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Calculate how much revenue you lose to unanswered calls, weekend leads, and delayed follow-ups — and see how much an AI agent recovers automatically.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          class={`rounded-3xl border p-6 sm:p-10 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
            darkMode 
              ? 'bg-[#0E131F] border-slate-800' 
              : 'bg-white border-slate-200/90 shadow-xl'
          }`}
        >
          <div class="lg:col-span-6 space-y-6">
            <div>
              <span class="inline-block px-2.5 py-0.5 rounded-[7px] text-[10px] font-mono-code text-[#FF6B00] font-bold uppercase tracking-wider bg-[#FF6B00]/10 border border-[#FF6B00]/20 mb-2">
                Revenue Recovery Simulator
              </span>
              <h3 class={`text-2xl font-extrabold font-['Space_Grotesk',sans-serif] ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Calculate Your Recoverable Revenue
              </h3>
            </div>

            <div class="space-y-4 text-xs font-mono-code">
              <div>
                <div class="flex justify-between mb-1.5 font-semibold">
                  <label class={darkMode ? 'text-slate-300' : 'text-slate-700'}>Monthly Inbound Enquiries (Calls + WhatsApp)</label>
                  <span class="text-[#FF6B00] font-bold">{monthlyEnquiries}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  step="25"
                  value={monthlyEnquiries}
                  onChange={(e) => setMonthlyEnquiries(Number(e.target.value))}
                  class="w-full accent-[#FF6B00] cursor-pointer"
                />
              </div>

              <div>
                <div class="flex justify-between mb-1.5 font-semibold">
                  <label class={darkMode ? 'text-slate-300' : 'text-slate-700'}>% Currently Missed or Answered Late</label>
                  <span class="text-[#FF6B00] font-bold">{missedPercent}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="70"
                  step="5"
                  value={missedPercent}
                  onChange={(e) => setMissedPercent(Number(e.target.value))}
                  class="w-full accent-[#FF6B00] cursor-pointer"
                />
              </div>

              <div>
                <div class="flex justify-between mb-1.5 font-semibold">
                  <label class={darkMode ? 'text-slate-300' : 'text-slate-700'}>% Converting to Site Visit / Consult</label>
                  <span class="text-[#FF6B00] font-bold">{visitRate}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="5"
                  value={visitRate}
                  onChange={(e) => setVisitRate(Number(e.target.value))}
                  class="w-full accent-[#FF6B00] cursor-pointer"
                />
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class={`block mb-1.5 font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Close Rate %</label>
                  <input
                    type="number"
                    value={closeRate}
                    onChange={(e) => setCloseRate(Number(e.target.value))}
                    class={`w-full p-2.5 rounded-[7px] border text-xs font-mono-code ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label class={`block mb-1.5 font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Avg Deal Value (₹)</label>
                  <input
                    type="number"
                    value={dealValue}
                    onChange={(e) => setDealValue(Number(e.target.value))}
                    class={`w-full p-2.5 rounded-[7px] border text-xs font-mono-code ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>
            </div>

            <div class="pt-2 flex flex-wrap gap-4 text-xs">
              <a href="mailto:teams@orangefuturetech.com" class="flex items-center gap-2 text-slate-500 hover:text-[#FF6B00] transition-colors">
                <Mail class="w-4 h-4 text-[#FF6B00]" />
                <span>teams@orangefuturetech.com</span>
              </a>
              <a href="tel:+917483576808" class="flex items-center gap-2 text-slate-500 hover:text-[#FF6B00] transition-colors">
                <Phone class="w-4 h-4 text-[#FF6B00]" />
                <span>+91 7483 576 808</span>
              </a>
            </div>
          </div>

          <div class="lg:col-span-6">
            <div class={`p-7 rounded-2xl border relative overflow-hidden flex flex-col justify-between ${
              darkMode 
                ? 'bg-gradient-to-br from-[#0B0F17] to-slate-900 border-[#FF6B00]/40' 
                : 'bg-gradient-to-br from-slate-900 to-slate-800 text-white border-slate-800 shadow-2xl'
            }`}>
              <div class="flex items-center justify-between pb-4 border-b border-slate-700/60">
                <span class="text-xs font-mono-code uppercase text-slate-400 font-bold">Estimated Recovered Revenue</span>
                <TrendingUp class="w-5 h-5 text-[#FF6B00]" />
              </div>

              <div class="py-6">
                <div class="text-xs font-mono-code text-slate-400">REVENUE RECOVERED / MONTH</div>
                <div class="text-3xl sm:text-4xl font-extrabold font-['Space_Grotesk',sans-serif] text-[#FF6B00] mt-1 drop-shadow-md">
                  {formatCurrency(recoveredRevenue)}
                </div>
              </div>

              <div class="space-y-3 pt-4 border-t border-slate-700/60 text-xs font-mono-code">
                <div class="flex justify-between items-center">
                  <span class="text-slate-400">Missed enquiries saved:</span>
                  <span class="font-bold text-white">{missedCount} / mo</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-400">Extra visits/consults booked:</span>
                  <span class="font-bold text-white">{extraVisits} / mo</span>
                </div>
                <div class="flex justify-between items-center text-emerald-400 font-bold">
                  <span>Extra deals closed:</span>
                  <span>+{extraClosedDeals} / mo</span>
                </div>
              </div>

              <div class="mt-8 pt-4">
                <a
                  href="#contact"
                  class="w-full py-3.5 px-6 rounded-[7px] bg-[#FF6B00] text-white font-bold text-xs hover:bg-[#e05e00] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/30 cursor-pointer"
                >
                  <span>Recover This Revenue Now</span>
                  <ArrowRight class="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
