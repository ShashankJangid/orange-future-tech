import React from 'react';
import { motion } from 'framer-motion';
import { IdCard, Globe, Landmark, School, CheckCircle2, Shield, Zap, Sparkles } from 'lucide-react';

export default function Highlights() {
  const highlightItems = [
    {
      id: 'id-card-software',
      icon: IdCard,
      badge: 'FLAGSHIP SOFTWARE',
      title: 'Smart Institutional ID Card Software',
      color: '#FF6B00',
      description: 'Ultra-fast automated batch ID card generation, RFID/QR integration, instant barcode scanning, and multi-tier access security used by top universities and schools.',
      metrics: ['Instant Batch Export', 'RFID & QR Sync', '99.9% Uptime'],
      clients: 'Deployed at leading educational & corporate campuses'
    },
    {
      id: 'custom-websites',
      icon: Globe,
      badge: 'ENTERPRISE WEB',
      title: 'High-Performance Custom Web Platforms',
      color: '#00F0FF',
      description: 'Spatial UI design, sub-second load times, high-concurrency cloud architecture, and sleek interactive frontends built for modern enterprises.',
      metrics: ['Core Web Vitals 100', 'SEO Optimized', 'Cyber-Secured'],
      clients: 'Custom portals, e-commerce, & enterprise dashboards'
    },
    {
      id: 'iit-jodhpur',
      icon: Landmark,
      badge: 'KEY PRESTIGE DEPLOYMENT',
      title: 'Software Solutions at IIT Jodhpur',
      color: '#8A2BE2',
      description: 'Advanced technical software modules engineered for premier academic, research, and institutional administration workflows at IIT Jodhpur.',
      metrics: ['High Concurrency', 'Research Integration', 'Custom API Suite'],
      clients: 'IIT Jodhpur Campus'
    },
    {
      id: 'dps-indirapuram',
      icon: School,
      badge: 'STEM & MANAGEMENT',
      title: 'Tech System at DPS Indirapuram',
      color: '#FF5500',
      description: 'Empowering DPS Indirapuram with specialized institutional software along with hands-on STEM Robotics curriculum and kit integration.',
      metrics: ['5,000+ Students Impacted', 'Robotics Labs', 'Management Suite'],
      clients: 'DPS Indirapuram Campus'
    }
  ];

  return (
    <section id="highlights" class="py-24 relative z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 text-xs font-semibold uppercase tracking-wider mb-4">
            <Zap class="w-3.5 h-3.5" />
            <span>Proven Excellence</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold font-['Orbitron',sans-serif] text-white tracking-tight mb-4">
            FLAGSHIP <span class="text-gradient-orange">HIGHLIGHTS</span> &amp; DEPLOYMENTS
          </h2>
          <p class="text-slate-400 text-base sm:text-lg">
            Proven software platforms and prestigious institutional partnerships across India.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          {highlightItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                class="glass-card glass-card-hover p-8 rounded-3xl relative overflow-hidden group"
              >
                <div 
                  class="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-full blur-3xl pointer-events-none"
                  style={{ backgroundColor: item.color }}
                />

                <div class="flex items-center justify-between mb-6">
                  <div 
                    class="w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg"
                    style={{ 
                      backgroundColor: `${item.color}15`, 
                      borderColor: `${item.color}40`,
                      color: item.color 
                    }}
                  >
                    <Icon class="w-7 h-7" />
                  </div>
                  <span 
                    class="px-3 py-1 rounded-full text-[11px] font-bold font-mono-code border"
                    style={{ 
                      backgroundColor: `${item.color}10`,
                      borderColor: `${item.color}30`,
                      color: item.color
                    }}
                  >
                    {item.badge}
                  </span>
                </div>

                <h3 class="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[#FF6B00] transition-colors">
                  {item.title}
                </h3>

                <p class="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                  {item.description}
                </p>

                <div class="grid grid-cols-3 gap-2 py-3 px-4 rounded-xl bg-[#080B11]/90 border border-slate-800 mb-6">
                  {item.metrics.map((m, idx) => (
                    <div key={idx} class="flex items-center gap-1.5 text-[11px] font-medium text-slate-300">
                      <CheckCircle2 class="w-3.5 h-3.5 text-[#FF6B00] flex-shrink-0" />
                      <span class="truncate">{m}</span>
                    </div>
                  ))}
                </div>

                <div class="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-800">
                  <span class="flex items-center gap-1.5">
                    <Shield class="w-4 h-4 text-[#00F0FF]" />
                    {item.clients}
                  </span>
                  <span class="font-mono-code text-[#FF6B00] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    VERIFIED &rarr;
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
