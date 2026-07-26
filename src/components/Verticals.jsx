import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code, CpuIcon, Wifi, ChevronRight, Zap, Radio, Building2 } from 'lucide-react';

export default function Verticals({ onOpenAi, darkMode }) {
  const verticalsList = [
    {
      id: 'software',
      icon: Code,
      title: 'Enterprise Software & AI',
      subtitle: 'High-Concurrency Cloud & Web Platforms',
      description: 'Scalable full-stack web applications, AI models, cloud microservices, and custom management software built for modern enterprises.',
      features: ['React & Node.js Architecture', 'AI & Machine Learning Models', 'High-Concurrency Database Systems', 'REST & GraphQL API Gateways'],
      gradient: 'from-[#FF6B00] to-amber-500'
    },
    {
      id: 'electronics',
      icon: Cpu,
      title: 'Electronics & PCB Design',
      subtitle: 'Multi-Layer CAD & Circuit Fabrication',
      description: 'Custom multi-layer PCB schematics, microcontrollers, embedded C/C++ firmware, power electronics, and hardware prototypes.',
      features: ['Multi-Layer PCB Schematics', 'Embedded C/C++ Firmware', 'Microcontroller Integration', 'Hardware Prototyping & Testing'],
      gradient: 'from-[#00F0FF] to-blue-600'
    },
    {
      id: 'iot-automation',
      icon: Radio,
      title: 'Smart Automation & Industrial IoT',
      subtitle: 'Wireless Telemetry & Smart Control',
      description: 'Industrial IoT sensor networks, ESP32/LoRa telemetry, smart building automation, and remote cloud monitoring dashboards.',
      features: ['Industrial IoT Telemetry', 'Smart Building & Campus Automation', 'ESP32 & LoRa Gateway Networks', 'Real-Time Remote Cloud Control'],
      gradient: 'from-emerald-500 to-teal-600'
    }
  ];

  return (
    <section id="verticals" class="py-20 relative z-10">
      <div class="max-w-5xl mx-auto px-4">
        <div class="text-center mb-16">
          <span class="text-xs font-mono-code uppercase tracking-wider text-[#FF6B00]">Core Engineering Capabilities</span>
          <h2 class={`text-2xl sm:text-3xl font-bold font-['Orbitron',sans-serif] mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            OUR CORE VERTICALS
          </h2>
          <p class={`mt-3 text-sm max-w-xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Delivering end-to-end synergy between Software Engineering, Custom PCB Electronics, and Smart Automation &amp; IoT Systems.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          {verticalsList.map((vert, idx) => {
            const IconComp = vert.icon;
            return (
              <motion.div
                key={vert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                class={`rounded-xl border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                  darkMode 
                    ? 'bg-[#0B0F17] border-slate-800 hover:border-slate-700 shadow-md' 
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-md'
                }`}
              >
                <div>
                  <div class={`w-12 h-12 rounded-lg bg-gradient-to-br ${vert.gradient} flex items-center justify-center text-white mb-5 shadow-sm`}>
                    <IconComp class="w-6 h-6" />
                  </div>

                  <span class="text-[11px] font-mono-code uppercase text-[#FF6B00] font-semibold">{vert.subtitle}</span>
                  <h3 class={`text-lg font-bold font-['Orbitron',sans-serif] mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {vert.title}
                  </h3>

                  <p class={`mt-3 text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {vert.description}
                  </p>

                  <ul class="mt-5 space-y-2">
                    {vert.features.map((feat, fIdx) => (
                      <li key={fIdx} class="flex items-center gap-2 text-xs font-mono-code">
                        <span class="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
                        <span class={darkMode ? 'text-slate-300' : 'text-slate-700'}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div class="mt-8 pt-4 border-t border-slate-200/20">
                  <button
                    onClick={onOpenAi}
                    class="w-full flex items-center justify-between text-xs font-semibold text-[#FF6B00] hover:underline cursor-pointer"
                  >
                    <span>Request Technical Proposal</span>
                    <ChevronRight class="w-4 h-4" />
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
