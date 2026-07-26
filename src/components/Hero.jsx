import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Cpu, Award, Sparkles, Building2, Terminal } from 'lucide-react';

export default function Hero({ onOpenAi }) {
  return (
    <section class="relative pt-36 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            class="flex-1 text-center lg:text-left"
          >
            <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm shadow-[#FF6B00]/20">
              <Sparkles class="w-4 h-4 animate-spin-slow" />
              <span>Next-Generation Technology Ecosystem</span>
            </div>

            <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-['Orbitron',sans-serif] tracking-tight leading-[1.1] text-white mb-6">
              BRIDGING <span class="text-gradient-orange">SOFTWARE</span>, ROBOTICS &amp; <span class="text-gradient-cyan">STEM</span>
            </h1>

            <p class="text-slate-300 text-lg sm:text-xl max-w-2xl font-light leading-relaxed mb-8 mx-auto lg:mx-0">
              Empowering enterprise clients with custom AI &amp; Software, designing cutting-edge Industrial Automation &amp; PCB Hardware, and training future innovators with plug-and-play STEM Robotics Kits.
            </p>

            <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-12">
              <a 
                href="#verticals"
                class="flex items-center gap-3 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FF5500] text-white font-semibold text-sm hover:shadow-xl hover:shadow-[#FF6B00]/40 hover:scale-105 transition-all cursor-pointer"
              >
                <span>Explore Solutions</span>
                <ArrowRight class="w-4 h-4" />
              </a>

              <button 
                onClick={onOpenAi}
                class="flex items-center gap-3 px-7 py-3.5 rounded-2xl bg-[#0F172A]/80 border border-[#00F0FF]/40 text-[#00F0FF] font-semibold text-sm hover:bg-[#00F0FF]/10 hover:border-[#00F0FF] transition-all cursor-pointer"
              >
                <Terminal class="w-4 h-4 text-[#00F0FF]" />
                <span>Talk with OrangeAI</span>
              </button>
            </div>

            <div class="pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-10">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#FF6B00]">
                  <Building2 class="w-5 h-5" />
                </div>
                <div class="text-left">
                  <div class="text-xs text-slate-400 uppercase font-mono-code">Trusted By</div>
                  <div class="text-sm font-bold text-white">IIT Jodhpur</div>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#00F0FF]">
                  <Award class="w-5 h-5" />
                </div>
                <div class="text-left">
                  <div class="text-xs text-slate-400 uppercase font-mono-code">Deployed At</div>
                  <div class="text-sm font-bold text-white">DPS Indirapuram</div>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#8A2BE2]">
                  <ShieldCheck class="w-5 h-5" />
                </div>
                <div class="text-left">
                  <div class="text-xs text-slate-400 uppercase font-mono-code">Industry Impact</div>
                  <div class="text-sm font-bold text-white">100% Reliable Systems</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            class="flex-1 w-full max-w-lg lg:max-w-none"
          >
            <div class="relative mx-auto">
              <div class="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#FF6B00] via-[#00F0FF] to-[#8A2BE2] opacity-30 blur-2xl animate-pulse-glow"></div>
              
              <div class="relative glass-card p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
                <div class="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
                  <div class="flex items-center gap-3">
                    <div class="w-3 h-3 rounded-full bg-[#FF5500]"></div>
                    <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div class="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span class="text-xs font-mono-code text-slate-400 uppercase">SYS.STATUS // OPERATIONAL</span>
                </div>

                <div class="space-y-4">
                  <div class="p-4 rounded-2xl bg-[#080B11]/80 border border-[#FF6B00]/20 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="p-2.5 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00]">
                        <Cpu class="w-5 h-5" />
                      </div>
                      <div>
                        <div class="text-xs text-slate-400 font-mono-code">CORE VERTICAL I</div>
                        <div class="text-sm font-semibold text-white">Enterprise Software &amp; AI</div>
                      </div>
                    </div>
                    <span class="px-2.5 py-1 rounded-full bg-[#FF6B00]/20 text-[#FF6B00] text-[10px] font-bold font-mono-code">ACTIVE</span>
                  </div>

                  <div class="p-4 rounded-2xl bg-[#080B11]/80 border border-[#00F0FF]/20 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="p-2.5 rounded-xl bg-[#00F0FF]/10 text-[#00F0FF]">
                        <Terminal class="w-5 h-5" />
                      </div>
                      <div>
                        <div class="text-xs text-slate-400 font-mono-code">CORE VERTICAL II</div>
                        <div class="text-sm font-semibold text-white">Industrial Robotics &amp; PCB</div>
                      </div>
                    </div>
                    <span class="px-2.5 py-1 rounded-full bg-[#00F0FF]/20 text-[#00F0FF] text-[10px] font-bold font-mono-code">ONLINE</span>
                  </div>

                  <div class="p-4 rounded-2xl bg-[#080B11]/80 border border-[#8A2BE2]/20 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="p-2.5 rounded-xl bg-[#8A2BE2]/10 text-[#8A2BE2]">
                        <Sparkles class="w-5 h-5" />
                      </div>
                      <div>
                        <div class="text-xs text-slate-400 font-mono-code">CORE VERTICAL III</div>
                        <div class="text-sm font-semibold text-white">STEM Robotics Kits for Kids</div>
                      </div>
                    </div>
                    <span class="px-2.5 py-1 rounded-full bg-[#8A2BE2]/20 text-[#8A2BE2] text-[10px] font-bold font-mono-code">READY</span>
                  </div>
                </div>

                <div class="mt-6 pt-6 border-t border-slate-800 grid grid-cols-2 gap-4 text-center">
                  <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div class="text-2xl font-bold font-['Orbitron',sans-serif] text-[#FF6B00]">50K+</div>
                    <div class="text-[11px] text-slate-400">Students Trained</div>
                  </div>
                  <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div class="text-2xl font-bold font-['Orbitron',sans-serif] text-[#00F0FF]">100+</div>
                    <div class="text-[11px] text-slate-400">Enterprise Deployments</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
