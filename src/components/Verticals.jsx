import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code, Radio, ChevronRight, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';

export default function Verticals({ onOpenAi, darkMode }) {
  const verticalsList = [
    {
      id: 'software',
      icon: Code,
      title: 'Enterprise Software & AI',
      subtitle: 'HIGH-CONCURRENCY CLOUD & WEB PLATFORMS',
      description: 'Scalable full-stack web applications, AI models, cloud microservices, and custom management software built for modern enterprises.',
      features: ['React & Node.js Architecture', 'AI & Machine Learning Models', 'High-Concurrency Database Systems', 'REST & GraphQL API Gateways'],
      gradient: 'from-[#FF6B00] to-amber-500'
    },
    {
      id: 'electronics',
      icon: Cpu,
      title: 'Electronics & PCB Design',
      subtitle: 'MULTI-LAYER CAD & CIRCUIT FABRICATION',
      description: 'Custom multi-layer PCB schematics, microcontrollers, embedded C/C++ firmware, power electronics, and hardware prototypes.',
      features: ['Multi-Layer PCB Schematics', 'Embedded C/C++ Firmware', 'Microcontroller Integration', 'Hardware Prototyping & Testing'],
      gradient: 'from-[#00F0FF] to-blue-600'
    },
    {
      id: 'iot-automation',
      icon: Radio,
      title: 'Smart Automation & Industrial IoT',
      subtitle: 'WIRELESS TELEMETRY & SMART CONTROL',
      description: 'Industrial IoT sensor networks, ESP32/LoRa telemetry, smart building automation, and remote cloud monitoring dashboards.',
      features: ['Industrial IoT Telemetry', 'Smart Building & Campus Automation', 'ESP32 & LoRa Gateway Networks', 'Real-Time Remote Cloud Control'],
      gradient: 'from-emerald-500 to-teal-600'
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.97 },
    visible: (idx) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: idx * 0.15,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <section id="verticals" class="py-24 relative z-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          class="text-center mb-16"
        >
          <span class="text-xs font-mono-code uppercase tracking-wider text-[#FF6B00] font-semibold">Core Engineering Capabilities</span>
          <h2 class={`text-3xl sm:text-5xl font-extrabold font-['Orbitron',sans-serif] mt-2 tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            OUR CORE VERTICALS
          </h2>
          <p class={`mt-3 text-sm sm:text-base max-w-xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Delivering end-to-end synergy between Software Engineering, Custom PCB Electronics, and Smart Automation &amp; IoT Systems.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          class={`mb-14 rounded-3xl p-8 border relative overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 group ${
            darkMode ? 'bg-[#0E131F] border-[#FF6B00]/40' : 'bg-slate-50 border-slate-200/80 shadow-sm'
          }`}
        >
          <div class="space-y-3 flex-1 text-left relative z-10">
            <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono-code text-[#FF6B00] bg-[#FF6B00]/10 border border-[#FF6B00]/30 font-bold uppercase">
              <Sparkles class="w-3.5 h-3.5" />
              <span>LIVE SOFTWARE DEMO AVAILABLE</span>
            </div>
            <h3 class={`text-xl sm:text-2xl font-bold font-['Orbitron',sans-serif] ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              CardGen – Institutional Smart ID Software
            </h3>
            <p class={`text-xs sm:text-sm leading-relaxed max-w-xl ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Experience our live production software platform deployed for automated campus ID generation, RFID database syncing, and security access control.
            </p>
            <div class="flex flex-wrap gap-4 text-xs font-mono-code text-slate-500 pt-1">
              <span class="flex items-center gap-1.5"><ShieldCheck class="w-3.5 h-3.5 text-[#FF6B00]" /> Real-Time Database Sync</span>
              <span class="flex items-center gap-1.5"><ShieldCheck class="w-3.5 h-3.5 text-[#FF6B00]" /> High-Speed Card Rendering</span>
            </div>
          </div>

          <div class="shrink-0 w-full md:w-auto relative z-10">
            <a
              href="https://cardgen.orangefuturetech.com"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full md:w-auto px-7 py-4 rounded-2xl bg-[#FF6B00] text-white text-xs font-bold hover:bg-[#e05e00] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Launch Live CardGen Demo</span>
              <ExternalLink class="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          {verticalsList.map((vert, idx) => {
            const IconComp = vert.icon;
            return (
              <motion.div
                key={vert.id}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                class={`rounded-3xl border p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group ${
                  darkMode 
                    ? 'bg-[#0E131F] border-slate-800 hover:border-slate-700' 
                    : 'bg-slate-50 border-slate-200/80 shadow-sm hover:border-slate-300'
                }`}
              >
                <div>
                  <div class={`w-14 h-14 rounded-2xl bg-gradient-to-br ${vert.gradient} flex items-center justify-center text-white mb-6 shadow-md`}>
                    <IconComp class="w-7 h-7" />
                  </div>

                  <span class="text-[11px] font-mono-code uppercase text-[#FF6B00] font-bold tracking-wider">{vert.subtitle}</span>
                  <h3 class={`text-xl font-bold font-['Orbitron',sans-serif] mt-1.5 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {vert.title}
                  </h3>

                  <p class={`mt-3 text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {vert.description}
                  </p>

                  <ul class="mt-6 space-y-2.5">
                    {vert.features.map((feat, fIdx) => (
                      <li key={fIdx} class="flex items-center gap-2 text-xs font-mono-code">
                        <span class="w-2 h-2 rounded-full bg-[#FF6B00]"></span>
                        <span class={darkMode ? 'text-slate-300' : 'text-slate-700'}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div class="mt-8 pt-5 border-t border-slate-200/20">
                  <button
                    onClick={onOpenAi}
                    class="w-full flex items-center justify-between text-xs font-bold text-[#FF6B00] hover:underline cursor-pointer group/link"
                  >
                    <span>Request Technical Proposal</span>
                    <ChevronRight class="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
