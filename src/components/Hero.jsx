import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Building2, Award, ShieldCheck, Terminal } from 'lucide-react';

export default function Hero({ onOpenAi }) {
  return (
    <section class="relative pt-32 pb-16 md:pt-40 md:pb-28 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            class="flex-1 text-center lg:text-left"
          >
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono-code mb-6">
              <span class="w-2 h-2 rounded-full bg-[#FF6B00]"></span>
              <span>Software Engineering &amp; Electronics</span>
            </div>

            <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-['Orbitron',sans-serif] tracking-tight leading-[1.15] text-white mb-6">
              ENGINEERING THE FUTURE OF <span class="text-gradient-orange">SOFTWARE &amp; ELECTRONICS</span>
            </h1>

            <p class="text-slate-400 text-base sm:text-lg max-w-2xl font-normal leading-relaxed mb-8 mx-auto lg:mx-0">
              Delivering high-concurrency enterprise web apps, AI systems, multi-layer PCB designs, and industrial automation electronics. Deployed at IIT Jodhpur &amp; DPS Indirapuram.
            </p>

            <div class="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-12">
              <a 
                href="#verticals"
                class="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#FF6B00] text-white font-semibold text-xs hover:bg-[#FF5500] transition-colors cursor-pointer"
              >
                <span>Explore Verticals</span>
                <ArrowRight class="w-4 h-4" />
              </a>

              <button 
                onClick={onOpenAi}
                class="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-semibold text-xs hover:border-slate-700 hover:text-white transition-colors cursor-pointer"
              >
                <Terminal class="w-4 h-4 text-[#FF6B00]" />
                <span>Talk to OrangeAI</span>
              </button>
            </div>

            <div class="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-8">
              <div class="flex items-center gap-3">
                <Building2 class="w-4 h-4 text-[#FF6B00]" />
                <div class="text-left">
                  <div class="text-[10px] text-slate-500 font-mono-code uppercase">Trusted By</div>
                  <div class="text-xs font-semibold text-slate-200">IIT Jodhpur</div>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <Award class="w-4 h-4 text-[#FF6B00]" />
                <div class="text-left">
                  <div class="text-[10px] text-slate-500 font-mono-code uppercase">Deployed At</div>
                  <div class="text-xs font-semibold text-slate-200">DPS Indirapuram</div>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <ShieldCheck class="w-4 h-4 text-[#FF6B00]" />
                <div class="text-left">
                  <div class="text-[10px] text-slate-500 font-mono-code uppercase">Reliability</div>
                  <div class="text-xs font-semibold text-slate-200">Enterprise Grade</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            class="flex-1 w-full max-w-lg lg:max-w-none"
          >
            <div class="glass-card p-6 sm:p-7 rounded-2xl border border-white/10 shadow-xl">
              <div class="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                </div>
                <span class="text-[11px] font-mono-code text-slate-400">orangefuturetech.com</span>
              </div>

              <div class="space-y-3.5">
                <div class="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <Cpu class="w-4 h-4 text-[#FF6B00]" />
                    <div>
                      <div class="text-xs font-semibold text-white">Smart ID Card Software</div>
                      <div class="text-[11px] text-slate-400">Automated RFID &amp; Campus Access</div>
                    </div>
                  </div>
                  <span class="text-[10px] font-mono-code text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">LIVE</span>
                </div>

                <div class="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <Terminal class="w-4 h-4 text-[#FF6B00]" />
                    <div>
                      <div class="text-xs font-semibold text-white">Enterprise Web Platforms</div>
                      <div class="text-[11px] text-slate-400">High-Concurrency Cloud Portals</div>
                    </div>
                  </div>
                  <span class="text-[10px] font-mono-code text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">ACTIVE</span>
                </div>

                <div class="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <Cpu class="w-4 h-4 text-[#FF6B00]" />
                    <div>
                      <div class="text-xs font-semibold text-white">Electronics &amp; PCB Design</div>
                      <div class="text-[11px] text-slate-400">Multi-Layer Board Prototyping</div>
                    </div>
                  </div>
                  <span class="text-[10px] font-mono-code text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">READY</span>
                </div>
              </div>

              <div class="mt-5 pt-5 border-t border-slate-800 grid grid-cols-2 gap-4 text-center">
                <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div class="text-xl font-bold font-['Orbitron',sans-serif] text-white">IIT Jodhpur</div>
                  <div class="text-[10px] text-slate-400">Software Module Deployment</div>
                </div>
                <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div class="text-xl font-bold font-['Orbitron',sans-serif] text-[#FF6B00]">DPS Indirapuram</div>
                  <div class="text-[10px] text-slate-400">Tech System Integration</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
