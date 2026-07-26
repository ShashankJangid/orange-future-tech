import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';

export default function Hero({ onOpenAi, darkMode }) {
  return (
    <section class="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div class="max-w-4xl mx-auto px-4 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div class={`inline-flex items-center gap-2 px-3 py-1 rounded-[10px] text-xs font-mono-code mb-6 border ${
            darkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-300 text-slate-700 shadow-sm'
          }`}>
            <span class="w-2 h-2 rounded-full bg-[#FF6B00]"></span>
            <span>Software Engineering &amp; Electronics</span>
          </div>

          <h1 class={`text-3xl sm:text-5xl lg:text-6xl font-extrabold font-['Orbitron',sans-serif] tracking-tight leading-[1.15] mb-6 ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            ORANGE <span class="text-[#FF6B00]">FUTURE</span> TECH
          </h1>

          <p class={`text-base sm:text-lg font-normal leading-relaxed mb-8 max-w-2xl mx-auto ${
            darkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            High-concurrency enterprise web software, AI models, custom multi-layer PCB design, and industrial automation electronics. Deployed at IIT Jodhpur &amp; DPS Indirapuram.
          </p>

          <div class="flex flex-wrap items-center justify-center gap-3 mb-12">
            <a 
              href="#verticals"
              class="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#FF6B00] text-white font-semibold text-xs hover:bg-[#FF5500] transition-colors cursor-pointer shadow-sm"
            >
              <span>Explore Verticals</span>
              <ArrowRight class="w-3.5 h-3.5" />
            </a>

            <button 
              onClick={onOpenAi}
              class={`flex items-center gap-2 px-6 py-2.5 rounded-lg border font-semibold text-xs transition-colors cursor-pointer ${
                darkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 shadow-sm'
              }`}
            >
              <Terminal class="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Talk to OrangeAI</span>
            </button>
          </div>

          <div class={`pt-6 border-t flex flex-wrap items-center justify-center gap-8 text-xs ${
            darkMode ? 'border-slate-800/80 text-slate-400' : 'border-slate-300 text-slate-600'
          }`}>
            <div>
              <span class="font-mono-code opacity-75">TRUSTED BY: </span>
              <strong class={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>IIT Jodhpur</strong>
            </div>
            <div>
              <span class="font-mono-code opacity-75">DEPLOYED AT: </span>
              <strong class={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>DPS Indirapuram</strong>
            </div>
            <div>
              <span class="font-mono-code opacity-75">RELIABILITY: </span>
              <strong class="text-[#FF6B00] font-semibold">100% Enterprise Grade</strong>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
