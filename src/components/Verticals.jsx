import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, CircuitBoard, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function Verticals({ onOpenAi, darkMode }) {
  const [activeTab, setActiveTab] = useState(0);

  const verticals = [
    {
      id: 'software',
      num: '01',
      title: 'Enterprise Software & AI',
      icon: Code2,
      subtitle: 'Scalable web platforms, mobile apps, custom AI/ML integrations, and resilient cloud systems.',
      capabilities: ['Full-Stack Web Apps (React, Node, Next.js)', 'Cross-Platform Mobile Applications', 'Custom AI & Machine Learning Models', 'Cloud Infrastructure & Microservices'],
      deliverable: 'Smart ID Card Software, Custom Enterprise Portals, ERP & AI Bots'
    },
    {
      id: 'electronics',
      num: '02',
      title: 'Industrial Electronics & Hardware',
      icon: CircuitBoard,
      subtitle: 'Custom PCB design, embedded microcontrollers, industrial automation, and IoT hardware.',
      capabilities: ['Custom Multi-Layer PCB Design (Up to 8 layers)', 'Embedded Firmware (ARM, ESP32, STM32 C/C++)', 'Industrial Automation & PLC Modules', 'IoT Telemetry & Smart Sensor Networks'],
      deliverable: 'Production-ready PCBs, Industrial Robotics Controllers, Access Hardware'
    },
    {
      id: 'solutions',
      num: '03',
      title: 'Advanced Electronics Solutions',
      icon: Sparkles,
      subtitle: 'Custom electronics prototyping, smart hardware engineering, and sensor telemetry systems.',
      capabilities: ['Rapid Hardware Prototyping', 'Precision SMT & Through-Hole Assembly', 'Embedded System Integration & RTOS', 'Custom Commercial Hardware Nodes'],
      deliverable: 'End-to-End Electronics Systems, Custom Circuit Fabrication'
    }
  ];

  const active = verticals[activeTab];

  return (
    <section id="verticals" class={`py-16 relative z-10 ${darkMode ? 'bg-[#0B0F17]/80' : 'bg-slate-100/80'}`}>
      <div class="max-w-5xl mx-auto px-4">
        <div class="text-center mb-10">
          <span class="text-xs font-mono-code uppercase tracking-wider text-[#FF6B00]">Core Pillars</span>
          <h2 class={`text-2xl sm:text-3xl font-bold font-['Orbitron',sans-serif] mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            OUR CORE VERTICALS
          </h2>
        </div>

        <div class="flex flex-wrap justify-center gap-2 mb-8">
          {verticals.map((v, idx) => {
            const isSelected = activeTab === idx;
            return (
              <button
                key={v.id}
                onClick={() => setActiveTab(idx)}
                class={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#FF6B00] text-white border-[#FF6B00]'
                    : darkMode
                      ? 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      : 'bg-white text-slate-600 border-slate-300 hover:text-slate-900'
                }`}
              >
                {v.num}. {v.title}
              </button>
            );
          })}
        </div>

        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          class={`p-6 sm:p-8 rounded-xl ${darkMode ? 'glass-card-dark' : 'glass-card-light'}`}
        >
          <h3 class={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{active.title}</h3>
          <p class={`text-xs sm:text-sm mb-6 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{active.subtitle}</p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {active.capabilities.map((cap, i) => (
              <div key={i} class={`p-3 rounded-lg border flex items-center gap-2 text-xs ${
                darkMode ? 'bg-slate-950/70 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <Check class="w-4 h-4 text-[#FF6B00] flex-shrink-0" />
                <span>{cap}</span>
              </div>
            ))}
          </div>

          <div class={`p-3.5 rounded-lg border flex flex-wrap items-center justify-between gap-3 text-xs ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <span class="text-[10px] font-mono-code opacity-75 block">KEY DELIVERABLE</span>
              <span class={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{active.deliverable}</span>
            </div>
            <button
              onClick={onOpenAi}
              class="px-3 py-1.5 rounded bg-[#FF6B00] text-white font-semibold hover:bg-[#FF5500] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Ask AI Details</span>
              <ArrowRight class="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
