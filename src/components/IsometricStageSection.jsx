import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Radio, Code2, Sparkles, Activity, Layers, ArrowUpRight, Zap, ShieldCheck, Play } from 'lucide-react';

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
      color: '#00F0FF'
    },
    iot: {
      title: 'Industrial IoT Telemetry',
      badge: 'SMART AUTOMATION',
      description: 'Long-range LoRaWAN and 2.4GHz sensor networks monitoring industrial equipment and campus infrastructure.',
      metric: '10km+ Wireless Range',
      color: '#10B981'
    },
    access: {
      title: 'Smart ID Access Control',
      badge: 'CAMPUS AUTOMATION',
      description: 'Breach-free RFID and QR code access control platforms deployed at premier research institutes.',
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
            <span>Interactive Ecosystem Stage</span>
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
            class={`lg:col-span-8 rounded-3xl border p-6 sm:p-10 relative overflow-hidden shadow-2xl ${
              darkMode ? 'bg-[#0B0F17] border-slate-800' : 'bg-slate-900 border-slate-800 text-white'
            }`}
          >
            <div class="absolute -right-32 -top-32 w-80 h-80 bg-[#FF6B00]/15 rounded-full blur-3xl pointer-events-none"></div>

            <div class="relative w-full h-[360px] sm:h-[420px] flex items-center justify-center">
              <svg viewBox="0 0 700 500" class="w-full h-full drop-shadow-2xl">
                <defs>
                  <linearGradient id="stageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#1E293B" />
                    <stop offset="100%" stop-color="#0F172A" />
                  </linearGradient>
                  <linearGradient id="orangePulse" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#FF6B00" stop-opacity="0.8" />
                    <stop offset="100%" stop-color="#FF9E00" stop-opacity="0.2" />
                  </linearGradient>
                </defs>

                <g transform="translate(0, 40)">
                  <polygon points="350,120 620,240 350,360 80,240" fill="url(#stageGrad)" stroke="#334155" stroke-width="3" />
                  <polygon points="350,360 620,240 620,265 350,385" fill="#090D16" />
                  <polygon points="350,360 80,240 80,265 350,385" fill="#0B0F19" />

                  <path d="M 200 240 Q 350 170 500 240" fill="none" stroke="#FF6B00" stroke-width="3" stroke-dasharray="6,6" opacity="0.8" />
                  <path d="M 230 255 Q 350 300 470 255" fill="none" stroke="#00F0FF" stroke-width="2" stroke-dasharray="4,4" opacity="0.7" />

                  <g transform="translate(260, 60)" class="cursor-pointer" onClick={() => setActiveHotspot('cloud')}>
                    <rect x="0" y="0" width="180" height="110" rx="12" fill="#0B0F17" stroke={activeHotspot === 'cloud' ? '#FF6B00' : '#334155'} stroke-width="3" />
                    <rect x="10" y="10" width="160" height="20" rx="4" fill="#1E293B" />
                    <circle cx="25" cy="20" r="4" fill="#FF6B00" />
                    <circle cx="40" cy="20" r="4" fill="#38BDF8" />
                    <circle cx="55" cy="20" r="4" fill="#4ADE80" />
                    <path d="M 20 80 Q 60 40 100 70 T 160 50" fill="none" stroke="#FF6B00" stroke-width="3" />
                    <text x="90" y="100" font-family="sans-serif" font-size="10" fill="#94A3B8" text-anchor="middle" font-weight="bold">CLOUD API &amp; DASHBOARD</text>
                  </g>

                  <g transform="translate(130, 200)" class="cursor-pointer" onClick={() => setActiveHotspot('pcb')}>
                    <polygon points="90,0 180,45 90,90 0,45" fill="#064E3B" stroke={activeHotspot === 'pcb' ? '#00F0FF' : '#059669'} stroke-width="3" />
                    <rect x="70" y="30" width="40" height="30" rx="4" fill="#1E293B" stroke="#34D399" stroke-width="2" />
                    <text x="90" y="48" font-family="monospace" font-size="8" fill="#34D399" text-anchor="middle" font-weight="bold">ESP32</text>
                  </g>

                  <g transform="translate(410, 200)" class="cursor-pointer" onClick={() => setActiveHotspot('iot')}>
                    <polygon points="90,0 180,45 90,90 0,45" fill="#1E1B4B" stroke={activeHotspot === 'iot' ? '#10B981' : '#6366F1'} stroke-width="3" />
                    <circle cx="90" cy="45" r="18" fill="#4338CA" />
                    <path d="M 90 30 L 90 60 M 75 45 L 105 45" stroke="#A5B4FC" stroke-width="2" />
                    <text x="90" y="78" font-family="sans-serif" font-size="9" fill="#C7D2FE" text-anchor="middle" font-weight="bold">LORA GATEWAY</text>
                  </g>

                  <g transform="translate(270, 270)" class="cursor-pointer" onClick={() => setActiveHotspot('access')}>
                    <rect x="0" y="0" width="160" height="60" rx="10" fill="#311042" stroke={activeHotspot === 'access' ? '#C084FC' : '#9333EA'} stroke-width="3" />
                    <text x="80" y="35" font-family="sans-serif" font-size="10" fill="#F3E8FF" text-anchor="middle" font-weight="bold">SMART ID &amp; BELL AUTOMATION</text>
                  </g>

                  <motion.g
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    transform="translate(180, 110)"
                  >
                    <polygon points="20,0 40,10 20,20 0,10" fill="#FF6B00" opacity="0.9" />
                    <line x1="20" y1="20" x2="20" y2="40" stroke="#FF6B00" stroke-width="2" stroke-dasharray="2,2" />
                  </motion.g>
                </g>
              </svg>
            </div>

            <div class="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-800 text-xs font-mono-code">
              <span class="text-slate-400">Click Hotspot:</span>
              <button
                onClick={() => setActiveHotspot('cloud')}
                class={`px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                  activeHotspot === 'cloud' ? 'bg-[#FF6B00] text-white border-[#FF6B00]' : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                Cloud API
              </button>
              <button
                onClick={() => setActiveHotspot('pcb')}
                class={`px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                  activeHotspot === 'pcb' ? 'bg-[#00F0FF] text-slate-950 font-bold border-[#00F0FF]' : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                Custom PCB
              </button>
              <button
                onClick={() => setActiveHotspot('iot')}
                class={`px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                  activeHotspot === 'iot' ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-500' : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                IoT Gateway
              </button>
              <button
                onClick={() => setActiveHotspot('access')}
                class={`px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                  activeHotspot === 'access' ? 'bg-purple-500 text-white border-purple-500' : 'bg-slate-800 text-slate-300 border-slate-700'
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
                    class="w-full py-3 rounded-xl bg-[#FF6B00] text-white text-xs font-bold hover:bg-[#e05e00] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
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
