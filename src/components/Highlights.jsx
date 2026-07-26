import React from 'react';
import { motion } from 'framer-motion';
import { IdCard, Globe, Landmark, School, Check } from 'lucide-react';

export default function Highlights() {
  const highlightItems = [
    {
      id: 'id-card-software',
      icon: IdCard,
      badge: 'FLAGSHIP SOFTWARE',
      title: 'Smart Institutional ID Card Software',
      description: 'Automated batch ID card generation, RFID/QR integration, instant barcode scanning, and multi-tier access security used by top universities.',
      metrics: ['Instant Batch Export', 'RFID & QR Sync', 'High Security']
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
      metrics: ['High Concurrency', 'Research Modules', 'Custom APIs']
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
    <section id="highlights" class="py-16 relative z-10">
      <div class="max-w-5xl mx-auto px-4">
        <div class="text-center mb-10">
          <span class="text-xs font-mono-code uppercase tracking-wider text-[#FF6B00]">Key Highlights</span>
          <h2 class="text-2xl sm:text-3xl font-bold font-['Orbitron',sans-serif] text-white mt-1">
            CORE PLATFORMS &amp; DEPLOYMENTS
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {highlightItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                class="glass-card p-6 rounded-xl relative overflow-hidden"
              >
                <div class="flex items-center justify-between mb-4">
                  <div class="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-[#FF6B00]">
                    <Icon class="w-5 h-5" />
                  </div>
                  <span class="px-2 py-0.5 rounded font-mono-code text-[10px] text-slate-400 bg-slate-900 border border-slate-800">
                    {item.badge}
                  </span>
                </div>

                <h3 class="text-base font-bold text-white mb-2">
                  {item.title}
                </h3>

                <p class="text-slate-300 text-xs leading-relaxed mb-4">
                  {item.description}
                </p>

                <div class="flex flex-wrap gap-2 pt-3 border-t border-slate-800/80">
                  {item.metrics.map((m, idx) => (
                    <div key={idx} class="flex items-center gap-1 text-[11px] text-slate-400">
                      <Check class="w-3 h-3 text-[#FF6B00]" />
                      <span>{m}</span>
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
