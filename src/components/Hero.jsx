import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Radio, Cpu, ExternalLink, Play } from 'lucide-react';

export default function Hero({ onOpenAi, darkMode }) {
  return (
    <section class="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden z-10">
      <div class="max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 border bg-opacity-50 backdrop-blur-md"
          style={{
            borderColor: darkMode ? 'rgba(255, 107, 0, 0.3)' : 'rgba(255, 107, 0, 0.2)',
            backgroundColor: darkMode ? 'rgba(255, 107, 0, 0.08)' : 'rgba(255, 107, 0, 0.05)',
            color: '#FF6B00'
          }}
        >
          <Sparkles class="w-3.5 h-3.5 animate-pulse" />
          <span>ENTERPRISE SOFTWARE • PCB ELECTRONICS • SMART AUTOMATION &amp; IOT</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          class={`text-4xl sm:text-5xl md:text-6xl font-extrabold font-['Orbitron',sans-serif] tracking-tight leading-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}
        >
          ENGINEERING THE <br class="hidden sm:inline" />
          <span class="bg-gradient-to-r from-[#FF6B00] via-amber-500 to-[#FF6B00] bg-clip-text text-transparent">
            FUTURE OF TECH
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          class={`mt-6 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          High-concurrency enterprise web software, AI models, custom multi-layer PCB design, Smart Automation, and Industrial IoT solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          class="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="https://cardgen.orangefuturetech.com"
            target="_blank"
            rel="noopener noreferrer"
            class="px-7 py-3.5 rounded-lg bg-[#FF6B00] text-white font-bold text-sm hover:bg-[#e05e00] transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer group"
          >
            <Play class="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
            <span>Launch Live CardGen Demo</span>
            <ExternalLink class="w-4 h-4" />
          </a>

          <a
            href="#contact"
            class={`px-7 py-3.5 rounded-lg font-semibold text-sm border transition-all flex items-center gap-2 cursor-pointer ${
              darkMode 
                ? 'bg-slate-900/80 border-slate-700 text-slate-200 hover:border-slate-500' 
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm'
            }`}
          >
            <span>Consult Engineers</span>
            <ArrowRight class="w-4 h-4" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          class="mt-16 pt-8 border-t border-slate-200/20 max-w-3xl mx-auto flex flex-wrap items-center justify-around gap-6 text-xs text-slate-500 font-mono-code"
        >
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
            <span>SMART AUTOMATION &amp; IOT</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
