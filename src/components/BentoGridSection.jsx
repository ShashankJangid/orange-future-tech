import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Lock, Activity, Gauge } from 'lucide-react';

export default function BentoGridSection({ darkMode }) {
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
    hidden: { opacity: 0, y: 35, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section class="py-24 relative z-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div class="mb-14">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono-code text-[#FF6B00] bg-[#FF6B00]/10 border border-[#FF6B00]/30 font-bold uppercase mb-4">
            <span>Features</span>
          </div>
          <h2 class={`text-4xl sm:text-5xl font-extrabold font-['Orbitron',sans-serif] tracking-tight leading-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Where your ambition<br />meets velocity.
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          class="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div
            variants={itemVariants}
            class={`md:col-span-2 rounded-3xl p-8 sm:p-10 border flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-2xl group ${
              darkMode ? 'bg-[#0E131F] border-slate-800' : 'bg-slate-50 border-slate-200/80 shadow-sm'
            }`}
          >
            <div class="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div class="sm:col-span-7">
                <h3 class={`text-2xl font-bold font-['Orbitron',sans-serif] ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Every architecture, Turbo charged.
                </h3>
                <p class={`mt-3 text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Enterprise cloud software, neural AI models, custom multi-layer PCB hardware, and industrial IoT automation engineered from a single unified platform.
                </p>
              </div>

              <div class="sm:col-span-5 flex justify-center items-center">
                <img
                  src="/assets/svg/ai-brain-board.svg"
                  alt="AI Brain Vector Animation"
                  class="w-full h-auto max-h-44 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div class="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between border-t border-slate-200/20 gap-4">
              <div class="flex items-center gap-6 text-xs font-mono-code text-slate-400">
                <span class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>FIRMWARE C++</span>
                </span>
                <span class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-[#FF6B00]"></span>
                  <span>CLOUD API</span>
                </span>
                <span class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-[#00F0FF]"></span>
                  <span>REAL-TIME TELEMETRY</span>
                </span>
              </div>
              <div class="p-3 rounded-2xl bg-[#FF6B00]/10 text-[#FF6B00] group-hover:scale-110 transition-transform">
                <Zap class="w-6 h-6" />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            class={`md:col-span-1 rounded-3xl p-8 border flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-2xl group ${
              darkMode ? 'bg-[#0E131F] border-slate-800' : 'bg-slate-50 border-slate-200/80 shadow-sm'
            }`}
          >
            <div>
              <h3 class={`text-xl font-bold font-['Orbitron',sans-serif] ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Breach-free Security.
              </h3>
              <p class={`mt-3 text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Hardware-encrypted access control and institutional ID card platforms deployed at premier research institutes.
              </p>
            </div>

            <div class="mt-8 flex justify-center items-center py-6">
              <div class="w-24 h-24 rounded-full bg-gradient-to-tr from-[#FF6B00]/20 to-amber-500/10 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00] shadow-lg group-hover:rotate-12 transition-transform duration-500">
                <ShieldCheck class="w-12 h-12" />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            class={`rounded-3xl p-8 border flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-2xl group ${
              darkMode ? 'bg-[#0E131F] border-slate-800' : 'bg-slate-50 border-slate-200/80 shadow-sm'
            }`}
          >
            <div>
              <h3 class={`text-lg font-bold font-['Orbitron',sans-serif] ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Performance, on demand
              </h3>
              <p class={`mt-2 text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Sub-millisecond API response times and high-frequency database synchronization.
              </p>
            </div>

            <div class="mt-8 pt-4 border-t border-slate-200/20 flex items-center justify-between text-xs font-mono-code text-[#FF6B00]">
              <span class="font-bold">SUB-MS LATENCY</span>
              <Activity class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            class={`rounded-3xl p-8 border flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-2xl group ${
              darkMode ? 'bg-[#0E131F] border-slate-800' : 'bg-slate-50 border-slate-200/80 shadow-sm'
            }`}
          >
            <div>
              <h3 class={`text-lg font-bold font-['Orbitron',sans-serif] ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                100% Data Sovereignty
              </h3>
              <p class={`mt-2 text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                On-premise hardware deployment or private cloud. You're always in full control of your infrastructure.
              </p>
            </div>

            <div class="mt-8 pt-4 border-t border-slate-200/20 flex items-center justify-between text-xs font-mono-code text-emerald-500">
              <span class="font-bold">FULL CONTROL</span>
              <Lock class="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            class={`rounded-3xl p-8 border flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-2xl group ${
              darkMode ? 'bg-[#0E131F] border-slate-800' : 'bg-slate-50 border-slate-200/80 shadow-sm'
            }`}
          >
            <div>
              <h3 class={`text-lg font-bold font-['Orbitron',sans-serif] ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                CEX-level speed for IoT
              </h3>
              <p class={`mt-2 text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                ESP32 and LoRaWAN long-range sensor networks processing thousands of telemetry signals per second.
              </p>
            </div>

            <div class="mt-8 pt-4 border-t border-slate-200/20 flex items-center justify-between text-xs font-mono-code text-[#00F0FF]">
              <span class="font-bold">100,000+ MSG/SEC</span>
              <Gauge class="w-5 h-5 group-hover:rotate-45 transition-transform" />
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
