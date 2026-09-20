import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, CheckCircle2, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

export default function DeploymentRoadmapSection({ darkMode }) {
  const steps = [
    {
      step: '01',
      title: 'AI & Engineering Audit',
      time: 'Days 1 - 3',
      description: 'Mapping your enquiry flow, missed-call volume, and stack. We find where AI pays for itself fastest — and tell you if it doesn\'t.'
    },
    {
      step: '02',
      title: 'Architecture & Compliance',
      time: 'Days 4 - 7',
      description: 'Each agent gets a job, a channel, a script, a memory, and a trigger. Compliance mapping (DLT, number series, disclosures) happens here.'
    },
    {
      step: '03',
      title: 'Concierge Setup',
      time: 'Days 8 - 11',
      description: 'We sit with you and set up Meta Business Manager, WhatsApp Cloud API, telephony, and CRM sync on a screen-share. No onboarding cliff.'
    },
    {
      step: '04',
      title: 'Run & Improve',
      time: 'Days 12 - 14',
      description: 'We operate, monitor, and tune the agents under a managed retainer. Weekly reports. You watch booked visits and closed deals climb.'
    }
  ];

  return (
    <section id="roadmap" class="py-24 relative z-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          class="text-center mb-16"
        >
          <div 
            class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[7px] text-xs font-mono-code font-bold uppercase mb-3 border backdrop-blur-md shadow-sm"
            style={{
              borderColor: darkMode ? 'rgba(255, 107, 0, 0.4)' : 'rgba(255, 107, 0, 0.3)',
              backgroundColor: darkMode ? 'rgba(11, 15, 23, 0.6)' : 'rgba(255, 255, 255, 0.8)',
              color: '#FF6B00'
            }}
          >
            <Rocket class="w-3.5 h-3.5" />
            <span>Structured Deployment Protocol</span>
          </div>
          <h2 class={`text-3xl sm:text-5xl font-extrabold font-['Space_Grotesk',sans-serif] tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            FROM FIRST CALL TO LIVE AGENTS IN 14 DAYS
          </h2>
          <p class={`mt-3 text-sm sm:text-base max-w-xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Zero onboarding cliff. Deployed directly into single-tenant infrastructure you own and control.
          </p>
        </motion.div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              class={`p-7 rounded-3xl border relative overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${
                darkMode 
                  ? 'bg-[#0E131F] border-slate-800 hover:border-[#FF6B00]/40' 
                  : 'bg-white border-slate-200/90 shadow-md hover:border-[#FF6B00]/40'
              }`}
            >
              <div>
                <div class="flex items-center justify-between mb-5">
                  <span class="text-2xl font-extrabold font-['Space_Grotesk',sans-serif] text-[#FF6B00]">
                    {item.step}
                  </span>
                  <span class="px-2.5 py-0.5 rounded-[7px] text-[10px] font-mono-code font-bold text-slate-500 bg-slate-200/60 dark:bg-slate-800 dark:text-slate-400">
                    {item.time}
                  </span>
                </div>

                <h3 class={`text-lg font-extrabold font-['Space_Grotesk',sans-serif] ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {item.title}
                </h3>

                <p class={`mt-3 text-xs leading-relaxed font-normal ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {item.description}
                </p>
              </div>

              <div class="mt-6 pt-4 border-t border-slate-200/30 flex items-center justify-between text-[11px] font-mono-code">
                <span class="flex items-center gap-1.5 text-emerald-500 font-bold">
                  <CheckCircle2 class="w-3.5 h-3.5" />
                  <span>Phase Milestone</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
