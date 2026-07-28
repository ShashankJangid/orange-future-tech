import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Radio, Cpu, ExternalLink, Play } from 'lucide-react';
import SplineLogo from './SplineLogo';

export default function Hero({ onOpenAi, darkMode }) {
  return (
    <section class="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden z-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#FF6B00]/15 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            class="lg:col-span-7 text-left"
          >
            <div
              class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[7px] text-xs font-mono-code font-bold uppercase mb-6 border backdrop-blur-md shadow-sm"
              style={{
                borderColor: darkMode ? 'rgba(255, 107, 0, 0.4)' : 'rgba(255, 107, 0, 0.3)',
                backgroundColor: darkMode ? 'rgba(11, 15, 23, 0.6)' : 'rgba(255, 255, 255, 0.6)',
                color: '#FF6B00'
              }}
            >
              <Sparkles class="w-3.5 h-3.5 animate-spin [animation-duration:4s]" />
              <span class="tracking-wide">ENTERPRISE SOFTWARE • PCB ELECTRONICS • SMART AUTOMATION</span>
            </div>

            <h1 class={`text-4xl sm:text-5xl lg:text-6xl font-extrabold font-['Space_Grotesk',sans-serif] tracking-tight leading-[1.1] ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              ENGINEERING THE <br />
              <span class="bg-gradient-to-r from-[#FF6B00] via-amber-400 to-[#FF6B00] bg-clip-text text-transparent drop-shadow-sm">
                FUTURE OF TECH
              </span>
            </h1>

            <p class={`mt-6 text-base sm:text-lg max-w-xl font-normal leading-relaxed ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              High-concurrency enterprise web software, AI models, custom multi-layer PCB design, Smart Automation, and Industrial IoT solutions.
            </p>

            <div class="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="https://cardgen.orangefuturetech.com"
                target="_blank"
                rel="noopener noreferrer"
                class="px-7 py-3.5 rounded-[7px] bg-[#FF6B00] text-white font-bold text-xs hover:bg-[#e05e00] transition-all shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer group"
              >
                <Play class="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
                <span>Launch Live CardGen Demo</span>
                <ExternalLink class="w-4 h-4" />
              </a>

              <a
                href="#contact"
                class={`px-7 py-3.5 rounded-[7px] font-semibold text-xs border transition-all hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer backdrop-blur-md ${
                  darkMode 
                    ? 'bg-slate-900/80 border-slate-700 text-slate-200 hover:border-slate-500 hover:bg-slate-800' 
                    : 'bg-white/80 border-slate-300 text-slate-800 hover:bg-slate-50 shadow-sm'
                }`}
              >
                <span>Consult Engineers</span>
                <ArrowRight class="w-4 h-4" />
              </a>
            </div>

            <div class="mt-12 pt-6 border-t border-slate-200/20 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-mono-code">
              <div class="flex items-center gap-2">
                <ShieldCheck class="w-4 h-4 text-[#FF6B00]" />
                <span>ENTERPRISE SOFTWARE</span>
              </div>
              <div class="flex items-center gap-2">
                <Cpu class="w-4 h-4 text-[#FF6B00]" />
                <span>PCB ELECTRONICS</span>
              </div>
              <div class="flex items-center gap-2">
                <Radio class="w-4 h-4 text-[#FF6B00]" />
                <span>SMART AUTOMATION</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            class="lg:col-span-5 relative"
          >
            <div class={`rounded-3xl border p-2 sm:p-4 shadow-2xl relative backdrop-blur-xl overflow-hidden ${
              darkMode ? 'bg-[#0B0F17]/90 border-slate-800' : 'bg-white/90 border-slate-200'
            }`}>
              <SplineLogo className="w-full h-[380px] sm:h-[420px] rounded-2xl" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
