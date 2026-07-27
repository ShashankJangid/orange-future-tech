import React from 'react';
import { motion } from 'framer-motion';
import { Building2, School, Award, CheckCircle2, ShieldCheck, Bell, Monitor, CreditCard } from 'lucide-react';

export default function Highlights({ darkMode }) {
  const deployments = [
    {
      id: 'iit-jodhpur',
      icon: School,
      tag: 'PREMIER TECHNICAL INSTITUTE',
      title: 'ID Card Generator Software at IIT Jodhpur',
      description: 'Personally customized, breach-free secure ID Card Generator Software engineered with end-to-end data protection & institutional database sync.',
      highlights: [
        'Customized ID Card Generator Software',
        'Data Breach Free & Encrypted Architecture',
        'Institutional Access Control Sync'
      ]
    },
    {
      id: 'dps-indirapuram',
      icon: Building2,
      tag: 'PREMIER EDUCATIONAL CAMPUS',
      title: 'Campus Automation & Tech at DPS Indirapuram',
      description: 'Integrated campus technology solutions including Smart ID Card management, Automated School Bell systems, and interactive kiosks.',
      highlights: [
        'Smart ID Card Management Software',
        'Automated Campus School Bell System',
        'Customized Kiosk "Know About India" Interactive App'
      ]
    }
  ];

  return (
    <section id="highlights" class="py-20 relative z-10">
      <div class="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          class="text-center mb-14"
        >
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono-code uppercase text-[#FF6B00] bg-[#FF6B00]/10 border border-[#FF6B00]/20 mb-3 font-semibold">
            <Award class="w-3.5 h-3.5" />
            <span>Proven Production Track Record</span>
          </div>
          <h2 class={`text-3xl sm:text-4xl font-bold font-['Orbitron',sans-serif] ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            INSTITUTIONAL DEPLOYMENTS
          </h2>
          <p class={`mt-2.5 text-sm max-w-lg mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Custom software engineering, automated bell hardware, and interactive kiosks deployed at leading national institutions.
          </p>
        </motion.div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deployments.map((dep, idx) => {
            const IconComp = dep.icon;
            return (
              <motion.div
                key={dep.id}
                initial={{ opacity: 0, y: 35, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                class={`p-7 rounded-2xl border relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between ${
                  darkMode ? 'bg-[#0B0F17] border-slate-800 hover:border-[#FF6B00]/40' : 'bg-white border-slate-200 shadow-md hover:border-slate-300'
                }`}
              >
                <div>
                  <div class="flex items-start gap-4 mb-4">
                    <div class="p-3.5 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/20 shrink-0 shadow-sm">
                      <IconComp class="w-6 h-6" />
                    </div>
                    <div>
                      <span class="text-[10px] font-mono-code text-[#FF6B00] font-bold tracking-wider uppercase">{dep.tag}</span>
                      <h3 class={`text-base font-bold font-['Orbitron',sans-serif] mt-0.5 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        {dep.title}
                      </h3>
                    </div>
                  </div>

                  <p class={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {dep.description}
                  </p>

                  <ul class="mt-4 space-y-2">
                    {dep.highlights.map((hItem, hIdx) => (
                      <li key={hIdx} class="flex items-center gap-2 text-xs font-mono-code">
                        <ShieldCheck class="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                        <span class={darkMode ? 'text-slate-300' : 'text-slate-700'}>{hItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div class="mt-6 pt-4 border-t border-slate-200/20 flex items-center justify-between text-[11px] font-mono-code">
                  <span class="flex items-center gap-1.5 text-emerald-500 font-semibold">
                    <CheckCircle2 class="w-3.5 h-3.5" />
                    <span>Verified Active Production</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
