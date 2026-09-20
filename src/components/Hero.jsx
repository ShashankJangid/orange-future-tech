import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Radio, Cpu, ExternalLink, Play, Activity, PhoneIncoming, MessageCircle, Database } from 'lucide-react';
import { GradientShimmer } from '@/components/ui/gradient-shimmer';

export default function Hero({ onOpenAi, darkMode }) {
  const liveLogs = [
    { time: '10:02', action: 'Inbound Voice', detail: 'answered in 1 ring', status: 'missed-call save', color: 'text-emerald-500' },
    { time: '10:04', action: 'Inbound Voice', detail: 'site visit booked', status: 'Sat 11:00 • Whitefield', color: 'text-[#FF6B00]' },
    { time: '10:05', action: 'WhatsApp Agent', detail: 'sent brochure + location pin', status: '3BHK • Hinglish', color: 'text-blue-500' },
    { time: '10:09', action: 'Deal Intel', detail: 'flagged hot buyer', status: 'payment plan inquiry', color: 'text-purple-500' },
  ];

  const marqueeItems = [
    { label: 'DPDP Compliant', icon: ShieldCheck },
    { label: 'AWS Mumbai Single-Tenant', icon: Database },
    { label: 'Official WhatsApp Cloud API', icon: MessageCircle },
    { label: 'Answers in 1 Ring • 24/7', icon: PhoneIncoming },
    { label: 'TRAI-Aware 140/160 Routing', icon: Activity },
    { label: 'Claude • GPT-4o • Gemini • Llama', icon: Cpu },
  ];

  return (
    <section class="relative pt-36 pb-16 md:pt-44 md:pb-24 overflow-hidden z-10 font-apple">
      <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#FF6B00]/15 via-amber-500/10 to-transparent rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            class="lg:col-span-7 text-left"
          >
            <div class={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono-code font-semibold tracking-wider uppercase mb-8 border backdrop-blur-xl shadow-sm ${
              darkMode 
                ? 'bg-slate-900/60 border-slate-800 text-[#FF6B00]' 
                : 'bg-white/80 border-slate-200 text-[#FF6B00]'
            }`}>
              <Sparkles class="w-3.5 h-3.5 animate-spin [animation-duration:4s]" />
              <span>ENTERPRISE SOFTWARE • PCB ELECTRONICS • SMART AUTOMATION</span>
            </div>

            <h1 class={`apple-h1 tracking-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              ENGINEERING THE <br />
              <GradientShimmer
                gradient="orange"
                easing="smooth"
                duration={1.5}
                spread={4}
                baseColor="#FF6B00"
                className="drop-shadow-sm font-extrabold"
              >
                FUTURE OF TECH
              </GradientShimmer>
            </h1>

            <p class="mt-6 apple-subtitle max-w-xl font-normal leading-relaxed">
              High-concurrency enterprise web software, AI models, custom multi-layer PCB design, Smart Automation, and Industrial IoT solutions.
            </p>

            <div class="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="https://cardgen.orangefuturetech.com"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-apple-primary cursor-pointer group"
              >
                <Play class="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
                <span>Launch Live CardGen Demo</span>
                <ExternalLink class="w-4 h-4" />
              </a>

              <a
                href="#contact"
                class="btn-apple-secondary cursor-pointer"
              >
                <span>Consult Engineers</span>
                <ArrowRight class="w-4 h-4" />
              </a>
            </div>

            <div class="mt-14 pt-6 border-t border-slate-200/15 flex flex-wrap items-center gap-8 text-xs text-slate-500 font-mono-code">
              <div class="flex items-center gap-2">
                <ShieldCheck class="w-4 h-4 text-[#FF6B00]" />
                <span>ENTERPRISE SOFTWARE</span>
              </div>
              <div class="flex items-center gap-2">
                <Cpu class="w-4 h-4 text-[#FF6B00]" />
                <span>PCB ELECTRONICS</span>
              </div>
              <div class="flex items-center gap-2">
                <Radio class="w-4 h-4 text-[#FF6B00]" />
                <span>SMART AUTOMATION</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            class="lg:col-span-5 relative space-y-4"
          >
            <div class="glass-apple-card p-6 relative">
              <img
                src="/assets/svg/coding.svg"
                alt="Orange Future Tech Coding Animation"
                class="w-full h-auto object-contain max-h-[280px] drop-shadow-lg transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>

            <div class={`p-4 rounded-2xl border text-xs font-mono-code shadow-xl ${
              darkMode ? 'bg-[#0B0F17] border-slate-800' : 'bg-slate-900 text-slate-200 border-slate-800'
            }`}>
              <div class="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-[11px] text-slate-400">
                <span class="flex items-center gap-1.5 font-bold text-[#FF6B00]">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  AGENTS • LIVE • INBOUND WATCH
                </span>
                <span>SINGLE-TENANT • AWS MUMBAI</span>
              </div>
              <div class="space-y-2">
                {liveLogs.map((log, lIdx) => (
                  <div key={lIdx} class="flex items-center justify-between gap-2 py-1 px-2 rounded bg-slate-950/60 border border-slate-800/80">
                    <div class="flex items-center gap-2 overflow-hidden truncate">
                      <span class="text-slate-500 shrink-0">{log.time}</span>
                      <span class={`font-bold shrink-0 ${log.color}`}>{log.action}</span>
                      <span class="text-slate-300 truncate">▸ {log.detail}</span>
                    </div>
                    <span class="text-[10px] text-slate-400 shrink-0">{log.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

        <div class="mt-16 pt-8 border-t border-slate-200/10 overflow-hidden">
          <div class="flex items-center justify-around flex-wrap gap-4 text-xs font-mono-code">
            {marqueeItems.map((item, mIdx) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={mIdx}
                  class={`flex items-center gap-2 px-3.5 py-1.5 rounded-[7px] border backdrop-blur-md transition-all ${
                    darkMode 
                      ? 'bg-slate-900/60 border-slate-800 text-slate-300' 
                      : 'bg-white/80 border-slate-200 text-slate-700 shadow-sm'
                  }`}
                >
                  <IconComponent class="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
