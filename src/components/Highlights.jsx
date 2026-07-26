import React from 'react';
import { motion } from 'framer-motion';
import { IdCard, Globe, Landmark, School, CheckCircle2 } from 'lucide-react';

export default function Highlights() {
  const highlightItems = [
    {
      id: 'id-card-software',
      icon: IdCard,
      badge: 'FLAGSHIP SOFTWARE',
      title: 'Smart Institutional ID Card Software',
      description: 'Automated batch ID card generation, RFID/QR integration, instant barcode scanning, and multi-tier access security used by top universities and schools.',
      metrics: ['Instant Batch Export', 'RFID & QR Sync', 'High Security Access']
    },
    {
      id: 'custom-websites',
      icon: Globe,
      badge: 'ENTERPRISE WEB',
      title: 'High-Performance Custom Web Platforms',
      description: 'Spatial UI design, sub-second load times, high-concurrency cloud architecture, and sleek interactive frontends built for modern enterprises.',
      metrics: ['Core Web Vitals 100', 'SEO Optimized', 'Cyber-Secured']
    },
    {
      id: 'iit-jodhpur',
      icon: Landmark,
      badge: 'PRESTIGE DEPLOYMENT',
      title: 'Software Solutions at IIT Jodhpur',
      description: 'Advanced technical software modules engineered for academic, research, and institutional administration workflows at IIT Jodhpur.',
      metrics: ['High Concurrency', 'Research Integration', 'Custom API Suite']
    },
    {
      id: 'dps-indirapuram',
      icon: School,
      badge: 'TECH INTEGRATION',
      title: 'Tech Systems at DPS Indirapuram',
      description: 'Empowering DPS Indirapuram with specialized institutional software management systems and integrated campus technology.',
      metrics: ['Campus Management', 'Institutional Portals', 'Automated Workflows']
    }
  ];

  return (
    <section id="highlights" class="py-20 relative z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-14">
          <span class="text-xs font-mono-code uppercase tracking-wider text-[#FF6B00]">Proven Excellence</span>
          <h2 class="text-2xl sm:text-4xl font-extrabold font-['Orbitron',sans-serif] text-white tracking-tight mt-2 mb-3">
            FLAGSHIP <span class="text-gradient-orange">HIGHLIGHTS</span> &amp; DEPLOYMENTS
          </h2>
          <p class="text-slate-400 text-sm sm:text-base">
            Proven software platforms and institutional deployments across India.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlightItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                class="glass-card glass-card-hover p-7 rounded-2xl relative overflow-hidden group"
              >
                <div class="flex items-center justify-between mb-5">
                  <div class="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#FF6B00] group-hover:border-[#FF6B00]/40 transition-colors">
                    <Icon class="w-6 h-6" />
                  </div>
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono-code bg-slate-900 text-slate-300 border border-slate-800 uppercase">
                    {item.badge}
                  </span>
                </div>

                <h3 class="text-lg font-bold text-white mb-2.5 group-hover:text-[#FF6B00] transition-colors">
                  {item.title}
                </h3>

                <p class="text-slate-400 text-xs leading-relaxed mb-5 font-normal">
                  {item.description}
                </p>

                <div class="grid grid-cols-3 gap-2 py-2.5 px-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  {item.metrics.map((m, idx) => (
                    <div key={idx} class="flex items-center gap-1.5 text-[11px] font-medium text-slate-300">
                      <CheckCircle2 class="w-3 h-3 text-[#FF6B00] flex-shrink-0" />
                      <span class="truncate">{m}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
