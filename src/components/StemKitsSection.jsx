import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, Zap, Star, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

export default function StemKitsSection({ onOpenAi }) {
  const kits = [
    {
      id: 'junior-bot',
      title: 'OrangeBot Explorer Junior',
      age: 'Ages 8 - 12',
      tag: 'BESTSELLER FOR KIDS',
      icon: Bot,
      color: '#FF6B00',
      description: 'Plug-and-play magnetic modular robotics kit. Kids build line-follower robots, obstacle dodgers, and smart home sensors in minutes.',
      features: ['20+ Plug & Play Modules', 'Solderless Magnetic Snap', 'Scratch Block Coding', 'Full Illustrated Storybook']
    },
    {
      id: 'pro-inventor',
      title: 'OrangeBot Pro Inventor Kit',
      age: 'Ages 12 - 16+',
      tag: 'ADVANCED STEM',
      icon: Zap,
      color: '#00F0FF',
      description: 'Custom ESP32 micro-controller board, WiFi/BLE telemetry, servo arms, ultrasonic radar, and real Python coding interface.',
      features: ['ESP32 Dual-Core Controller', 'Python & C++ Support', 'IoT Cloud Dashboard', 'School Lab Curriculum']
    },
    {
      id: 'ai-vision-rover',
      title: 'OrangeAI Vision Rover 3D',
      age: 'Ages 14+',
      tag: 'NEXT-GEN AI & ROBOTICS',
      icon: Sparkles,
      color: '#8A2BE2',
      description: 'Autonomous AI rover with camera module, face & object tracking, gesture control, and machine learning computer vision kits.',
      features: ['AI Camera Sensor', 'Neural Network Models', 'Omnidirectional Wheels', 'IIT Jodhpur Inspired']
    }
  ];

  return (
    <section id="stem-kits" class="py-24 relative z-10 bg-[#080B11]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/30 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles class="w-3.5 h-3.5" />
            <span>Next-Gen STEM Kits</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold font-['Orbitron',sans-serif] text-white tracking-tight mb-4">
            ROBOTICS KITS FOR <span class="text-gradient-orange">KIDS &amp; SCHOOLS</span>
          </h2>
          <p class="text-slate-400 text-base sm:text-lg">
            Inspiring the next generation of engineers, coders, and innovators with hands-on, high-quality STEM kits.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          {kits.map((kit, index) => {
            const KitIcon = kit.icon;
            return (
              <motion.div
                key={kit.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                class="glass-card glass-card-hover p-8 rounded-3xl relative flex flex-col justify-between"
              >
                <div>
                  <div class="flex items-center justify-between mb-6">
                    <div 
                      class="w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg"
                      style={{ 
                        backgroundColor: `${kit.color}15`, 
                        borderColor: `${kit.color}40`,
                        color: kit.color 
                      }}
                    >
                      <KitIcon class="w-7 h-7" />
                    </div>
                    <span 
                      class="px-3 py-1 rounded-full text-[10px] font-bold font-mono-code border uppercase"
                      style={{ 
                        backgroundColor: `${kit.color}10`,
                        borderColor: `${kit.color}30`,
                        color: kit.color
                      }}
                    >
                      {kit.tag}
                    </span>
                  </div>

                  <div class="text-xs font-bold font-mono-code text-slate-400 uppercase mb-1">{kit.age}</div>
                  <h3 class="text-xl font-bold text-white mb-3">{kit.title}</h3>
                  <p class="text-slate-300 text-sm leading-relaxed mb-6 font-light">{kit.description}</p>

                  <div class="space-y-2.5 mb-8">
                    {kit.features.map((feat, i) => (
                      <div key={i} class="flex items-center gap-2.5 text-xs text-slate-300">
                        <Star class="w-3.5 h-3.5 text-[#FF6B00] flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div class="pt-6 border-t border-slate-800">
                  <button
                    onClick={onOpenAi}
                    class="w-full py-3 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FF5500] text-white font-bold text-xs hover:shadow-lg hover:shadow-[#FF6B00]/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Inquire Kit Details</span>
                    <ArrowRight class="w-4 h-4" />
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
