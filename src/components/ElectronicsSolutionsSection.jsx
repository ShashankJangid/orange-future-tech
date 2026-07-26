import React from 'react';
import { motion } from 'framer-motion';
import { CircuitBoard, Cpu, Zap, Star, ArrowRight } from 'lucide-react';

export default function ElectronicsSolutionsSection({ onOpenAi }) {
  const solutions = [
    {
      id: 'custom-pcb',
      title: 'Multi-Layer Custom PCB Design',
      tag: 'PCB ENGINEERING',
      icon: CircuitBoard,
      description: 'High-density multi-layer printed circuit board layout, impedance matching, thermal simulation, and prototype to assembly manufacturing.',
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
    <section id="electronics" class="py-20 relative z-10 bg-[#0A0D14]/90">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-14">
          <span class="text-xs font-mono-code uppercase tracking-wider text-[#FF6B00]">Hardware Engineering</span>
          <h2 class="text-2xl sm:text-4xl font-extrabold font-['Orbitron',sans-serif] text-white tracking-tight mt-2 mb-3">
            ADVANCED <span class="text-gradient-orange">ELECTRONICS SOLUTIONS</span>
          </h2>
          <p class="text-slate-400 text-sm sm:text-base">
            End-to-end hardware prototyping, custom PCB manufacturing, and industrial embedded IoT engineering.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solutions.map((item, index) => {
            const SolutionIcon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                class="glass-card glass-card-hover p-7 rounded-2xl relative flex flex-col justify-between"
              >
                <div>
                  <div class="flex items-center justify-between mb-5">
                    <div class="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#FF6B00]">
                      <SolutionIcon class="w-6 h-6" />
                    </div>
                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono-code bg-slate-900 text-slate-300 border border-slate-800 uppercase">
                      {item.tag}
                    </span>
                  </div>

                  <h3 class="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p class="text-slate-400 text-xs leading-relaxed mb-5 font-normal">{item.description}</p>

                  <div class="space-y-2 mb-6">
                    {item.features.map((feat, i) => (
                      <div key={i} class="flex items-center gap-2 text-xs text-slate-300">
                        <Star class="w-3 h-3 text-[#FF6B00] flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div class="pt-5 border-t border-slate-800">
                  <button
                    onClick={onOpenAi}
                    class="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-semibold text-xs hover:bg-[#FF6B00] hover:text-white hover:border-[#FF6B00] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Inquire Solution Specs</span>
                    <ArrowRight class="w-3.5 h-3.5" />
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
