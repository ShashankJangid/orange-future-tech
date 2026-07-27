import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowUpRight, ShieldCheck, Cpu, Radio, Code2, Zap } from 'lucide-react';

export default function IsometricStageSection({ darkMode }) {
  const [activeHotspot, setActiveHotspot] = useState('cloud');

  const hotspots = {
    cloud: {
      title: 'Cloud & AI Software Platform',
      badge: 'ENTERPRISE SOFTWARE',
      description: 'High-concurrency web applications, API gateways, and real-time database synchronization engines.',
      metric: '99.99% Uptime • <50ms Latency',
      color: '#FF6B00'
    },
    pcb: {
      title: 'Multi-Layer Custom PCB',
      badge: 'HARDWARE ENGINEERING',
      description: '2 to 8+ layer circuit schematics with controlled impedance, ESP32 microcontrollers, and embedded C/C++ firmware.',
      metric: 'Controlled Impedance & EMI Shielding',
      color: '#00F0FF'
    },
    iot: {
      title: 'Industrial IoT Telemetry',
      badge: 'SMART AUTOMATION',
      description: 'Long-range LoRaWAN and 2.4GHz sensor networks monitoring industrial equipment and campus infrastructure.',
      metric: '10km+ Wireless Telemetry Range',
      color: '#10B981'
    },
    access: {
      title: 'Smart ID Access Control',
      badge: 'CAMPUS AUTOMATION',
      description: 'Breach-free RFID and QR code access control platforms deployed at premier research institutes.',
      metric: 'Hardware Encrypted ID Gateways',
      color: '#8A2BE2'
    }
  };

  const activeInfo = hotspots[activeHotspot];

  return (
    <section class="py-24 relative z-10 font-['Plus_Jakarta_Sans',sans-serif] overflow-hidden">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          class="text-center mb-12"
        >
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono-code text-[#FF6B00] bg-[#FF6B00]/10 border border-[#FF6B00]/30 font-bold uppercase mb-3">
            <Sparkles class="w-3.5 h-3.5" />
            <span>High-End 3D Engineering Platform</span>
          </div>
          <h2 class={`text-3xl sm:text-5xl font-extrabold font-['Orbitron',sans-serif] tracking-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            THE HARDWARE &amp; SOFTWARE ENGINE
          </h2>
          <p class={`mt-3 text-sm sm:text-base max-w-xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Explore our end-to-end integrated ecosystem bridging Enterprise Software, Custom PCB Hardware, and Industrial IoT Automation.
          </p>
        </motion.div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            class={`lg:col-span-8 rounded-3xl border p-4 sm:p-6 relative overflow-hidden shadow-2xl ${
              darkMode ? 'bg-[#0B0F17] border-slate-800' : 'bg-slate-950 border-slate-800 text-white'
            }`}
          >
            <div class="relative w-full rounded-2xl overflow-hidden group">
              <img
                src="/tech-stage.jpg"
                alt="Orange Future Tech 3D Isometric Ecosystem Stage"
                class="w-full h-auto object-cover rounded-2xl transition-transform duration-700 group-hover:scale-[1.02]"
              />

              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>

              <div
                onClick={() => setActiveHotspot('cloud')}
                class="absolute top-[35%] left-[45%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group/node"
              >
                <span class="relative flex h-6 w-6 items-center justify-center">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B00] opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-4 w-4 bg-[#FF6B00] border-2 border-white shadow-lg"></span>
                </span>
                <span class="absolute top-7 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-slate-950/90 text-[10px] font-mono-code text-white border border-[#FF6B00] whitespace-nowrap shadow-xl">
                  Cloud &amp; AI Engine
                </span>
              </div>

              <div
                onClick={() => setActiveHotspot('pcb')}
                class="absolute top-[62%] left-[25%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group/node"
              >
                <span class="relative flex h-6 w-6 items-center justify-center">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-4 w-4 bg-[#00F0FF] border-2 border-white shadow-lg"></span>
                </span>
                <span class="absolute top-7 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-slate-950/90 text-[10px] font-mono-code text-white border border-[#00F0FF] whitespace-nowrap shadow-xl">
                  Custom PCB Layout
                </span>
              </div>

              <div
                onClick={() => setActiveHotspot('iot')}
                class="absolute top-[52%] left-[75%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group/node"
              >
                <span class="relative flex h-6 w-6 items-center justify-center">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border-2 border-white shadow-lg"></span>
                </span>
                <span class="absolute top-7 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-slate-950/90 text-[10px] font-mono-code text-white border border-emerald-400 whitespace-nowrap shadow-xl">
                  IoT Gateway
                </span>
              </div>

              <div
                onClick={() => setActiveHotspot('access')}
                class="absolute top-[22%] left-[72%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group/node"
              >
                <span class="relative flex h-6 w-6 items-center justify-center">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-4 w-4 bg-purple-400 border-2 border-white shadow-lg"></span>
                </span>
                <span class="absolute top-7 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-slate-950/90 text-[10px] font-mono-code text-white border border-purple-400 whitespace-nowrap shadow-xl">
                  Access Portal
                </span>
              </div>
            </div>

            <div class="flex flex-wrap items-center justify-center gap-3 pt-5 text-xs font-mono-code">
              <span class="text-slate-400">Interactive Hotspots:</span>
              <button
                onClick={() => setActiveHotspot('cloud')}
                class={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                  activeHotspot === 'cloud' ? 'bg-[#FF6B00] text-white border-[#FF6B00] shadow-md' : 'bg-slate-900 text-slate-300 border-slate-800'
                }`}
              >
                Cloud API
              </button>
              <button
                onClick={() => setActiveHotspot('pcb')}
                class={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                  activeHotspot === 'pcb' ? 'bg-[#00F0FF] text-slate-950 font-bold border-[#00F0FF] shadow-md' : 'bg-slate-900 text-slate-300 border-slate-800'
                }`}
              >
                Custom PCB
              </button>
              <button
                onClick={() => setActiveHotspot('iot')}
                class={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                  activeHotspot === 'iot' ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-500 shadow-md' : 'bg-slate-900 text-slate-300 border-slate-800'
                }`}
              >
                IoT Gateway
              </button>
              <button
                onClick={() => setActiveHotspot('access')}
                class={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                  activeHotspot === 'access' ? 'bg-purple-500 text-white border-purple-500 shadow-md' : 'bg-slate-900 text-slate-300 border-slate-800'
                }`}
              >
                Access Automation
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            class="lg:col-span-4"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHotspot}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                class={`p-8 rounded-3xl border shadow-xl relative overflow-hidden ${
                  darkMode ? 'bg-[#0B0F17] border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <span class="text-[10px] font-mono-code uppercase font-bold text-[#FF6B00] tracking-wider block mb-2">
                  {activeInfo.badge}
                </span>

                <h3 class={`text-xl font-bold font-['Orbitron',sans-serif] ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {activeInfo.title}
                </h3>

                <p class={`mt-3 text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {activeInfo.description}
                </p>

                {activeInfo.metric && (
                  <div class="mt-6 p-3.5 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-xs font-mono-code font-bold text-[#FF6B00]">
                    {activeInfo.metric}
                  </div>
                )}

                <div class="mt-8 pt-6 border-t border-slate-200/20">
                  <a
                    href="#contact"
                    class="w-full py-3.5 rounded-xl bg-[#FF6B00] text-white text-xs font-bold hover:bg-[#e05e00] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>Request Engineering Scope</span>
                    <ArrowUpRight class="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
