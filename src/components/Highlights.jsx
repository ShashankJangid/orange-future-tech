import React from 'react';
import { motion } from 'framer-motion';
import { Building2, School, ChevronRight, Award, CheckCircle2 } from 'lucide-react';

export default function Highlights({ darkMode }) {
  const deployments = [
    {
      id: 'iit-jodhpur',
      icon: School,
      tag: 'PREMIER TECHNICAL INSTITUTE',
      title: 'Software Solutions at IIT Jodhpur',
      description: 'Advanced technical software modules engineered for academic, research, and institutional administration workflows at IIT Jodhpur.'
    },
    {
      id: 'dps-indirapuram',
      icon: Building2,
      tag: 'PREMIER EDUCATIONAL CAMPUS',
      title: 'Tech Systems at DPS Indirapuram',
      description: 'Empowering DPS Indirapuram with specialized institutional software management systems and integrated campus technology.'
    }
  ];

  return (
    <section id="highlights" class="py-16 relative z-10">
      <div class="max-w-5xl mx-auto px-4">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-code uppercase text-[#FF6B00] bg-[#FF6B00]/10 border border-[#FF6B00]/20 mb-3">
            <Award class="w-3.5 h-3.5" />
            <span>Proven Track Record</span>
          </div>
          <h2 class={`text-2xl sm:text-3xl font-bold font-['Orbitron',sans-serif] ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            INSTITUTIONAL DEPLOYMENTS
          </h2>
          <p class={`mt-2 text-sm max-w-lg mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Our software engineering and technical platforms are deployed across leading national educational and research institutions.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deployments.map((dep, idx) => {
            const IconComp = dep.icon;
            return (
              <motion.div
                key={dep.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                class={`p-6 rounded-xl border relative overflow-hidden transition-all hover:border-[#FF6B00]/50 ${
                  darkMode ? 'bg-[#0B0F17] border-slate-800' : 'bg-white border-slate-200 shadow-md'
                }`}
              >
                <div class="flex items-start gap-4">
                  <div class="p-3 rounded-lg bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/20 shrink-0">
                    <IconComp class="w-6 h-6" />
                  </div>
                  <div>
                    <span class="text-[10px] font-mono-code text-[#FF6B00] font-bold tracking-wider">{dep.tag}</span>
                    <h3 class={`text-base font-bold font-['Orbitron',sans-serif] mt-0.5 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {dep.title}
                    </h3>
                    <p class={`mt-2 text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {dep.description}
                    </p>
                  </div>
                </div>

                <div class="mt-5 pt-3 border-t border-slate-200/20 flex items-center justify-between text-[11px] font-mono-code">
                  <span class="flex items-center gap-1.5 text-emerald-500 font-semibold">
                    <CheckCircle2 class="w-3.5 h-3.5" />
                    <span>Verified Production Deployment</span>
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
