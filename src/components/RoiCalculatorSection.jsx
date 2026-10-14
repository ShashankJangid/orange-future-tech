import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, Mail, Phone, TrendingUp, CheckCircle2 } from 'lucide-react';

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
    <section id="roi-calculator" className="py-24 relative z-10 font-apple">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div 
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono-code font-bold uppercase mb-3 border backdrop-blur-md shadow-2xs"
            style={{
              borderColor: darkMode ? 'rgba(255, 107, 0, 0.4)' : 'rgba(255, 107, 0, 0.3)',
              backgroundColor: darkMode ? 'rgba(11, 15, 23, 0.6)' : 'rgba(255, 255, 255, 0.8)',
              color: '#FF6B00'
            }}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Missed-Call ROI Calculator</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            What Are Unanswered Enquiries Costing You?
          </h2>
          <p className={`mt-3 text-sm sm:text-base max-w-xl mx-auto leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Calculate how much admission and client revenue is lost to unanswered calls, weekend queries, and delayed follow-ups — and see what 24/7 AI automation recovers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`rounded-3xl border p-6 sm:p-10 shadow-xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
            darkMode 
              ? 'bg-[#0E131F] border-slate-800' 
              : 'bg-white border-slate-200/90'
          }`}
        >
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-mono-code text-[#FF6B00] font-bold uppercase tracking-wider bg-[#FF6B00]/10 border border-[#FF6B00]/20 mb-2">
                Revenue Recovery Simulator
              </span>
              <h3 className={`text-2xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Calculate Recoverable Revenue
              </h3>
            </div>

            <div className="space-y-4 text-xs font-mono-code">
              <div>
                <div className="flex justify-between mb-1.5 font-semibold">
                  <label className={darkMode ? 'text-slate-300' : 'text-slate-700'}>Monthly Inbound Enquiries (Calls + WhatsApp)</label>
                  <span className="text-[#FF6B00] font-bold">{monthlyEnquiries}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  step="25"
                  value={monthlyEnquiries}
                  onChange={(e) => setMonthlyEnquiries(Number(e.target.value))}
                  className="w-full accent-[#FF6B00] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5 font-semibold">
                  <label className={darkMode ? 'text-slate-300' : 'text-slate-700'}>% Currently Missed or Answered Late</label>
                  <span className="text-[#FF6B00] font-bold">{missedPercent}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="70"
                  step="5"
                  value={missedPercent}
                  onChange={(e) => setMissedPercent(Number(e.target.value))}
                  className="w-full accent-[#FF6B00] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5 font-semibold">
                  <label className={darkMode ? 'text-slate-300' : 'text-slate-700'}>% Converting to Campus Visit / Consult</label>
                  <span className="text-[#FF6B00] font-bold">{visitRate}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="5"
                  value={visitRate}
                  onChange={(e) => setVisitRate(Number(e.target.value))}
                  className="w-full accent-[#FF6B00] cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block mb-1.5 font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Close Rate %</label>
                  <input
                    type="number"
                    value={closeRate}
                    onChange={(e) => setCloseRate(Number(e.target.value))}
                    className={`w-full p-2.5 rounded-xl border text-xs font-mono-code ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block mb-1.5 font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Avg Value (₹)</label>
                  <input
                    type="number"
                    value={dealValue}
                    onChange={(e) => setDealValue(Number(e.target.value))}
                    className={`w-full p-2.5 rounded-xl border text-xs font-mono-code ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 text-xs">
              <a href="mailto:teams@orangefuturetech.com" className="flex items-center gap-2 text-slate-500 hover:text-[#FF6B00] transition-colors">
                <Mail className="w-4 h-4 text-[#FF6B00]" />
                <span>teams@orangefuturetech.com</span>
              </a>
              <a href="tel:+918958347428" className="flex items-center gap-2 text-slate-500 hover:text-[#FF6B00] transition-colors">
                <Phone className="w-4 h-4 text-[#FF6B00]" />
                <span>+91 8958347428</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className={`p-7 rounded-2xl border relative overflow-hidden flex flex-col justify-between ${
              darkMode 
                ? 'bg-gradient-to-br from-[#0B0F17] to-slate-900 border-[#FF6B00]/40' 
                : 'bg-gradient-to-br from-slate-900 to-slate-800 text-white border-slate-800 shadow-xl'
            }`}>
              <div className="flex items-center justify-between pb-4 border-b border-slate-700/60">
                <span className="text-xs font-mono-code uppercase text-slate-400 font-bold">Estimated Recovered Revenue</span>
                <TrendingUp className="w-5 h-5 text-[#FF6B00]" />
              </div>

              <div className="py-6">
                <div className="text-xs font-mono-code text-slate-400">REVENUE RECOVERED / MONTH</div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#FF6B00] mt-1 drop-shadow-md">
                  {formatCurrency(recoveredRevenue)}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-700/60 text-xs font-mono-code">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Missed enquiries saved:</span>
                  <span className="font-bold text-white">{missedCount} / mo</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Extra visits/consults booked:</span>
                  <span className="font-bold text-white">{extraVisits} / mo</span>
                </div>
                <div className="flex justify-between items-center text-emerald-400 font-bold">
                  <span>Extra admissions / deals closed:</span>
                  <span>+{extraClosedDeals} / mo</span>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <a
                  href="#contact"
                  className="w-full py-3.5 px-6 rounded-full bg-[#FF6B00] text-white font-bold text-xs hover:bg-[#e05e00] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-orange-500/30 cursor-pointer"
                >
                  <span>Recover This Revenue Now</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
