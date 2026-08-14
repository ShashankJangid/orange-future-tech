import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Radio, Cpu, ExternalLink, Play } from 'lucide-react';

export default function Hero({ onOpenAi, darkMode }) {
  return (
    <section class="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden z-10 font-apple">
      <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#FF6B00]/15 via-amber-500/10 to-transparent rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            class="lg:col-span-7 text-left"
          >
            <div class={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono-code font-semibold tracking-wider uppercase mb-8 border backdrop-blur-xl shadow-sm ${
              darkMode 
                ? 'bg-slate-900/60 border-slate-800 text-[#FF6B00]' 
                : 'bg-white/80 border-slate-200 text-[#FF6B00]'
            }`}>
              <Sparkles class="w-3.5 h-3.5 animate-spin [animation-duration:4s]" />
              <span>ENTERPRISE SOFTWARE • PCB ELECTRONICS • SMART AUTOMATION</span>
            </div>

            <h1 class={`apple-h1 tracking-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              ENGINEERING THE <br />
              <span class="text-apple-gradient-orange drop-shadow-sm">
                FUTURE OF TECH
              </span>
            </h1>

            <p class="mt-6 apple-subtitle max-w-xl font-normal leading-relaxed">
              High-concurrency enterprise web software, AI models, custom multi-layer PCB design, Smart Automation, and Industrial IoT solutions.
            </p>

            <div class="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="https://cardgen.orangefuturetech.com"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-apple-primary cursor-pointer group"
              >
                <Play class="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
                <span>Launch Live CardGen Demo</span>
                <ExternalLink class="w-4 h-4" />
              </a>

              <a
                href="#contact"
                class="btn-apple-secondary cursor-pointer"
              >
                <span>Consult Engineers</span>
                <ArrowRight class="w-4 h-4" />
              </a>
            </div>

            <div class="mt-14 pt-6 border-t border-slate-200/15 flex flex-wrap items-center gap-8 text-xs text-slate-500 font-mono-code">
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
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            class="lg:col-span-5 relative"
          >
            <div class="glass-apple-card p-6 relative">
              <img
                src="/assets/svg/coding.svg"
                alt="Orange Future Tech Coding Animation"
                class="w-full h-auto object-contain max-h-[360px] drop-shadow-lg transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
