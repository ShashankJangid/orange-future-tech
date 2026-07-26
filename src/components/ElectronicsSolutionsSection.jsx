import React from 'react';
import { motion } from 'framer-motion';
import { CircuitBoard, Cpu, Zap, Check } from 'lucide-react';

export default function ElectronicsSolutionsSection({ onOpenAi }) {
  const solutions = [
    {
      id: 'custom-pcb',
      title: 'Multi-Layer Custom PCB Design',
      tag: 'PCB ENGINEERING',
      icon: CircuitBoard,
      description: 'High-density multi-layer printed circuit board layout, impedance matching, thermal simulation, and turn-key manufacturing assembly.',
      features: ['Up to 8-Layer Board Layouts', 'High-Speed Signal Integrity', 'DFM & DFA Optimized Schematics', 'Prototype to Batch Production']
    },
    {
      id: 'embedded-firmware',
      title: 'Microcontroller & Firmware Systems',
      tag: 'EMBEDDED C/C++',
      icon: Cpu,
      description: 'Custom bare-metal and FreeRTOS embedded firmware for ARM Cortex, ESP32, STM32, and PIC microcontrollers with Wi-Fi/BLE telemetry.',
      features: ['Real-Time Operating Systems', 'Wi-Fi / Bluetooth / LoRaWAN', 'Low-Power Sleep Architectures', 'OTA Firmware Updates']
    },
    {
      id: 'industrial-iot',
      title: 'Industrial Automation & IoT Hardware',
      tag: 'INDUSTRIAL HARDWARE',
      icon: Zap,
      description: 'Robust industrial sensor nodes, PLC controller interfaces, motor drivers, and smart hardware systems engineered for reliability.',
      features: ['Industrial Grade Enclosures', 'Sensor Telemetry Arrays', 'Relay & Motor Driver Modules', 'IIT Jodhpur & Campus Spec']
    }
  ];

  return (
    <section id="electronics" class="py-16 relative z-10">
      <div class="max-w-5xl mx-auto px-4">
        <div class="text-center mb-10">
          <span class="text-xs font-mono-code uppercase tracking-wider text-[#FF6B00]">Hardware Engineering</span>
          <h2 class="text-2xl sm:text-3xl font-bold font-['Orbitron',sans-serif] text-white mt-1">
            ELECTRONICS SOLUTIONS
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          {solutions.map((item, index) => {
            const SolutionIcon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                class="glass-card p-6 rounded-xl relative flex flex-col justify-between"
              >
                <div>
                  <div class="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-[#FF6B00] mb-4">
                    <SolutionIcon class="w-5 h-5" />
                  </div>

                  <h3 class="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p class="text-slate-300 text-xs leading-relaxed mb-4">{item.description}</p>

                  <div class="space-y-1.5 mb-6">
                    {item.features.map((feat, i) => (
                      <div key={i} class="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <Check class="w-3 h-3 text-[#FF6B00] flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={onOpenAi}
                  class="w-full py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold hover:border-[#FF6B00] hover:text-white transition-colors cursor-pointer"
                >
                  Inquire Specs
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
