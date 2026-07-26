import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Radio, Cpu, ExternalLink, Play, ChevronDown } from 'lucide-react';

export default function Hero({ onOpenAi, darkMode }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section class="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden z-10">
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#FF6B00]/15 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        class="max-w-5xl mx-auto px-4 text-center relative"
      >
        <motion.div variants={itemVariants} class="inline-block">
          <div
            class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border backdrop-blur-md shadow-sm"
            style={{
              borderColor: darkMode ? 'rgba(255, 107, 0, 0.4)' : 'rgba(255, 107, 0, 0.25)',
              backgroundColor: darkMode ? 'rgba(255, 107, 0, 0.08)' : 'rgba(255, 107, 0, 0.06)',
              color: '#FF6B00'
            }}
          >
            <Sparkles class="w-3.5 h-3.5 animate-spin [animation-duration:4s]" />
            <span class="tracking-wide">ENTERPRISE SOFTWARE • PCB ELECTRONICS • SMART AUTOMATION &amp; IOT</span>
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          class={`text-4xl sm:text-6xl md:text-7xl font-extrabold font-['Orbitron',sans-serif] tracking-tight leading-[1.1] ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}
        >
          ENGINEERING THE <br />
          <span class="bg-gradient-to-r from-[#FF6B00] via-amber-400 to-[#FF6B00] bg-clip-text text-transparent drop-shadow-sm">
            FUTURE OF TECH
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          class={`mt-6 text-base sm:text-xl max-w-2xl mx-auto font-normal leading-relaxed ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          High-concurrency enterprise web software, AI models, custom multi-layer PCB design, Smart Automation, and Industrial IoT solutions.
        </motion.p>

        <motion.div
          variants={itemVariants}
          class="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="https://cardgen.orangefuturetech.com"
            target="_blank"
            rel="noopener noreferrer"
            class="px-8 py-4 rounded-xl bg-[#FF6B00] text-white font-bold text-sm hover:bg-[#e05e00] transition-all shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5 flex items-center gap-2.5 cursor-pointer group"
          >
            <Play class="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
            <span>Launch Live CardGen Demo</span>
            <ExternalLink class="w-4 h-4" />
          </a>

          <a
            href="#contact"
            class={`px-8 py-4 rounded-xl font-semibold text-sm border transition-all hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer ${
              darkMode 
                ? 'bg-slate-900/90 border-slate-700 text-slate-200 hover:border-slate-500 hover:bg-slate-800' 
                : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50 shadow-sm'
            }`}
          >
            <span>Consult Engineers</span>
            <ArrowRight class="w-4 h-4" />
          </a>
        </motion.div>

        <motion.div
          variants={itemVariants}
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

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
          class="mt-12 flex justify-center"
        >
          <a href="#verticals" class="text-slate-400 hover:text-[#FF6B00] transition-colors p-2 cursor-pointer">
            <ChevronDown class="w-6 h-6" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
