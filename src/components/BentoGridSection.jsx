import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Lock, Activity, Gauge } from 'lucide-react';

export default function BentoGridSection({ darkMode }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section class="py-24 relative z-10 font-apple">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div class="mb-14">
          <div class={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono-code uppercase font-semibold mb-4 border backdrop-blur-xl ${
            darkMode 
              ? 'bg-slate-900/60 border-slate-800 text-[#FF6B00]' 
              : 'bg-white/80 border-slate-200 text-[#FF6B00]'
          }`}>
            <span>Features &amp; Capabilities</span>
          </div>
          <h2 class={`apple-h2 tracking-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Where ambition meets velocity.
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
            class="md:col-span-2 glass-apple-card hover-apple-lift p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group"
          >
            <div class="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div class="sm:col-span-7">
                <h3 class={`text-2xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Every architecture, turbo-charged.
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

            <div class="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between border-t border-slate-200/15 gap-4">
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
            class="md:col-span-1 glass-apple-card hover-apple-lift p-8 flex flex-col justify-between relative overflow-hidden group"
          >
            <div>
              <h3 class={`text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Breach-free security.
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
            class="glass-apple-card hover-apple-lift p-8 flex flex-col justify-between relative overflow-hidden group"
          >
            <div>
              <h3 class={`text-lg font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Performance on demand
              </h3>
              <p class={`mt-2 text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Sub-millisecond API response times and high-frequency database synchronization.
              </p>
            </div>

            <div class="mt-8 pt-4 border-t border-slate-200/15 flex items-center justify-between text-xs font-mono-code text-[#FF6B00]">
              <span class="font-bold">SUB-MS LATENCY</span>
              <Activity class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            class="glass-apple-card hover-apple-lift p-8 flex flex-col justify-between relative overflow-hidden group"
          >
            <div>
              <h3 class={`text-lg font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                100% Data Sovereignty
              </h3>
              <p class={`mt-2 text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                On-premise hardware deployment or private cloud. You're always in full control of your infrastructure.
              </p>
            </div>

            <div class="mt-8 pt-4 border-t border-slate-200/15 flex items-center justify-between text-xs font-mono-code text-emerald-500">
              <span class="font-bold">FULL CONTROL</span>
              <Lock class="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            class="glass-apple-card hover-apple-lift p-8 flex flex-col justify-between relative overflow-hidden group"
          >
            <div>
              <h3 class={`text-lg font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Ultra-fast IoT telemetry
              </h3>
              <p class={`mt-2 text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                ESP32 and LoRaWAN long-range sensor networks processing thousands of telemetry signals per second.
              </p>
            </div>

            <div class="mt-8 pt-4 border-t border-slate-200/15 flex items-center justify-between text-xs font-mono-code text-[#00F0FF]">
              <span class="font-bold">100,000+ MSG/SEC</span>
              <Gauge class="w-5 h-5 group-hover:rotate-45 transition-transform" />
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
