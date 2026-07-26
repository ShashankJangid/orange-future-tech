import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, CircuitBoard, Bot, Layers, ArrowUpRight, Cpu, Cloud, Smartphone, Wrench, Sparkles, BookOpen } from 'lucide-react';

export default function Verticals({ onOpenAi }) {
  const [activeTab, setActiveTab] = useState(0);

  const verticals = [
    {
      id: 'software',
      num: '01',
      title: 'Enterprise Software & AI Solutions',
      icon: Code2,
      subtitle: 'Scalable web platforms, mobile apps, custom AI/ML integrations, and resilient cloud systems.',
      color: '#FF6B00',
      capabilities: [
        { icon: Code2, label: 'Full-Stack Web Applications', desc: 'React, Next.js, Node.js microservices' },
        { icon: Smartphone, label: 'Cross-Platform Mobile Apps', desc: 'iOS & Android native performance' },
        { icon: Bot, label: 'Custom AI & ML Models', desc: 'LLM agents, NLP, computer vision pipelines' },
        { icon: Cloud, label: 'Cloud Infrastructure & DevOps', desc: 'AWS, Azure, Docker, Kubernetes auto-scale' }
      ],
      deliverable: 'Institutional ID Card Software, Custom Enterprise Portals, ERP Systems & AI Bots'
    },
    {
      id: 'electronics',
      num: '02',
      title: 'Advanced Electronics & Robotics',
      icon: CircuitBoard,
      subtitle: 'Custom PCB design, embedded microcontrollers, industrial automation, and IoT hardware.',
      color: '#00F0FF',
      capabilities: [
        { icon: CircuitBoard, label: 'Custom Multi-Layer PCB Design', desc: 'High-density schematics & routing' },
        { icon: Cpu, label: 'Microcontroller Firmware', desc: 'ARM, ESP32, STM32, PIC, C/C++ embedded' },
        { icon: Wrench, label: 'Industrial Automation', desc: 'PLC programming, sensor arrays, motor control' },
        { icon: Layers, label: 'IoT & Smart Sensors', desc: 'LoRaWAN, Wi-Fi, BLE telemetry hardware' }
      ],
      deliverable: 'Production-ready PCBs, Industrial Robotic Controllers, Smart Access Hardware'
    },
    {
      id: 'stem',
      num: '03',
      title: 'Next-Gen STEM Robotics Kits',
      icon: Sparkles,
      subtitle: 'Hands-on interactive robotics kits, modular sensors, and plug-and-play learning for kids and schools.',
      color: '#8A2BE2',
      capabilities: [
        { icon: Sparkles, label: 'Plug-and-Play Kits', desc: 'Solderless magnetic & snap modules for ages 8+' },
        { icon: BookOpen, label: 'Curriculum & Labs', desc: 'Comprehensive school STEM laboratory setup' },
        { icon: Bot, label: 'Block & Python Coding', desc: 'Visual drag-and-drop to real Python code' },
        { icon: Wrench, label: 'Competition Ready', desc: 'National level robotics competition components' }
      ],
      deliverable: 'Educational Kits, DIY Micro-Robots, School STEM Lab Subscriptions'
    }
  ];

  const active = verticals[activeTab];
  const ActiveIcon = active.icon;

  return (
    <section id="verticals" class="py-24 relative z-10 bg-[#080B11]/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/30 text-xs font-semibold uppercase tracking-wider mb-4">
            <Layers class="w-3.5 h-3.5" />
            <span>Three Core Pillars</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold font-['Orbitron',sans-serif] text-white tracking-tight mb-4">
            OUR CORE <span class="text-gradient-orange">VERTICALS</span>
          </h2>
          <p class="text-slate-400 text-base sm:text-lg">
            Integrated excellence spanning digital software, industrial hardware, and futuristic education.
          </p>
        </div>

        <div class="flex flex-wrap justify-center gap-3 mb-12">
          {verticals.map((v, idx) => {
            const VIcon = v.icon;
            const isSelected = activeTab === idx;
            return (
              <button
                key={v.id}
                onClick={() => setActiveTab(idx)}
                class={`flex items-center gap-3 px-6 py-3.5 rounded-2xl transition-all cursor-pointer text-sm font-semibold border ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF5500] text-white border-[#FF6B00] shadow-lg shadow-[#FF6B00]/30 scale-105'
                    : 'bg-[#0F172A]/70 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                <VIcon class="w-4 h-4" />
                <span>{v.num}. {v.title.split('&')[0]}</span>
              </button>
            );
          })}
        </div>

        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          class="glass-card p-8 sm:p-12 rounded-3xl border border-white/10 relative overflow-hidden"
        >
          <div class="flex flex-col lg:flex-row items-start justify-between gap-10">
            <div class="flex-1">
              <div class="flex items-center gap-4 mb-4">
                <span class="text-3xl font-extrabold font-['Orbitron',sans-serif] text-[#FF6B00]">{active.num}</span>
                <span class="px-3 py-1 rounded-full text-xs font-bold font-mono-code bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/30 uppercase">
                  CORE VERTICAL
                </span>
              </div>

              <h3 class="text-2xl sm:text-4xl font-extrabold text-white mb-4">
                {active.title}
              </h3>

              <p class="text-slate-300 text-lg leading-relaxed mb-8">
                {active.subtitle}
              </p>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {active.capabilities.map((cap, i) => {
                  const CapIcon = cap.icon;
                  return (
                    <div key={i} class="p-4 rounded-2xl bg-[#080B11]/90 border border-slate-800/80 flex items-start gap-3.5">
                      <div class="p-2 rounded-xl bg-slate-900 text-[#FF6B00] border border-slate-700 flex-shrink-0">
                        <CapIcon class="w-5 h-5" />
                      </div>
                      <div>
                        <div class="text-sm font-bold text-white mb-0.5">{cap.label}</div>
                        <div class="text-xs text-slate-400 leading-snug">{cap.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div class="p-4 rounded-2xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div class="text-[11px] font-mono-code uppercase text-[#FF6B00]">KEY DELIVERABLE</div>
                  <div class="text-sm font-semibold text-white">{active.deliverable}</div>
                </div>
                <button
                  onClick={onOpenAi}
                  class="px-4 py-2 rounded-xl bg-[#FF6B00] text-white text-xs font-bold hover:bg-[#FF5500] transition-colors flex items-center gap-2"
                >
                  <span>Ask AI Details</span>
                  <ArrowUpRight class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
