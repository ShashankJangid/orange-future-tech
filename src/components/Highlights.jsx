import React from 'react';
import { motion } from 'framer-motion';
import { Building2, School, Award, CheckCircle2, ShieldCheck } from 'lucide-react';

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
    <section id="highlights" class="py-20 relative z-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <div class="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          class="text-center mb-14"
        >
          <div 
            class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[7px] text-xs font-mono-code uppercase font-bold mb-3 border backdrop-blur-md shadow-sm"
            style={{
              borderColor: darkMode ? 'rgba(255, 107, 0, 0.4)' : 'rgba(255, 107, 0, 0.3)',
              backgroundColor: darkMode ? 'rgba(11, 15, 23, 0.6)' : 'rgba(255, 255, 255, 0.8)',
              color: '#FF6B00'
            }}
          >
            <Award class="w-3.5 h-3.5" />
            <span>Proven Production Track Record</span>
          </div>
          <h2 class={`text-3xl sm:text-4xl font-extrabold font-['Space_Grotesk',sans-serif] tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
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
                class={`p-8 rounded-3xl border relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between ${
                  darkMode 
                    ? 'bg-[#0E131F] border-slate-800 hover:border-[#FF6B00]/50' 
                    : 'bg-white border-slate-200/90 shadow-md hover:border-[#FF6B00]/40'
                }`}
              >
                <div>
                  <div class="flex items-start gap-4 mb-5">
                    <div class="p-3.5 rounded-2xl bg-gradient-to-br from-[#FF6B00] to-amber-500 text-white shadow-md shrink-0">
                      <IconComp class="w-6 h-6" />
                    </div>
                    <div>
                      <span class="inline-block px-2.5 py-0.5 rounded-[7px] text-[10px] font-mono-code text-[#FF6B00] font-bold tracking-wider uppercase bg-[#FF6B00]/10 border border-[#FF6B00]/20 mb-1">
                        {dep.tag}
                      </span>
                      <h3 class={`text-lg font-extrabold font-['Space_Grotesk',sans-serif] leading-snug ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        {dep.title}
                      </h3>
                    </div>
                  </div>

                  <p class={`text-xs leading-relaxed font-normal ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {dep.description}
                  </p>

                  <ul class="mt-5 space-y-2.5">
                    {dep.highlights.map((hItem, hIdx) => (
                      <li key={hIdx} class="flex items-center gap-2 text-xs font-mono-code">
                        <ShieldCheck class="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                        <span class={darkMode ? 'text-slate-300' : 'text-slate-700'}>{hItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div class="mt-7 pt-4 border-t border-slate-200/30 flex items-center justify-between text-[11px] font-mono-code">
                  <span class="flex items-center gap-1.5 text-emerald-600 font-bold">
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
