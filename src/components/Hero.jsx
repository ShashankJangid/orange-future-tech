import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';

export default function Hero({ onOpenAi }) {
  return (
    <section class="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div class="max-w-4xl mx-auto px-4 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-[10px] bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono-code mb-6">
            <span class="w-2 h-2 rounded-full bg-[#FF6B00]"></span>
            <span>Software Engineering &amp; Electronics</span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-['Orbitron',sans-serif] tracking-tight leading-[1.15] text-white mb-6">
            ORANGE <span class="text-[#FF6B00]">FUTURE</span> TECH
          </h1>

          <p class="text-slate-300 text-base sm:text-lg font-normal leading-relaxed mb-8 max-w-2xl mx-auto">
            High-concurrency enterprise web software, AI models, custom multi-layer PCB design, and industrial automation electronics. Deployed at IIT Jodhpur &amp; DPS Indirapuram.
          </p>

          <div class="flex flex-wrap items-center justify-center gap-3 mb-12">
            <a 
              href="#verticals"
              class="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#FF6B00] text-white font-semibold text-xs hover:bg-[#FF5500] transition-colors cursor-pointer"
            >
              <span>Explore Verticals</span>
              <ArrowRight class="w-3.5 h-3.5" />
            </a>

            <button 
              onClick={onOpenAi}
              class="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-semibold text-xs hover:border-slate-700 hover:text-white transition-colors cursor-pointer"
            >
              <Terminal class="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Talk to OrangeAI</span>
            </button>
          </div>

          <div class="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-400">
            <div>
              <span class="text-slate-500 font-mono-code">TRUSTED BY: </span>
              <strong class="text-white font-semibold">IIT Jodhpur</strong>
            </div>
            <div>
              <span class="text-slate-500 font-mono-code">DEPLOYED AT: </span>
              <strong class="text-white font-semibold">DPS Indirapuram</strong>
            </div>
            <div>
              <span class="text-slate-500 font-mono-code">RELIABILITY: </span>
              <strong class="text-[#FF6B00] font-semibold">100% Enterprise Grade</strong>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
