import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code, Radio, ChevronRight, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';

export default function Verticals({ onOpenAi, darkMode }) {
  const verticalsList = [
    {
      id: 'software',
      icon: Code,
      title: 'Enterprise Software & AI',
      subtitle: 'HIGH-CONCURRENCY CLOUD & WEB PLATFORMS',
      description: 'Scalable full-stack web applications, AI models, cloud microservices, and custom management software built for modern enterprises.',
      features: ['React & Node.js Architecture', 'AI & Machine Learning Models', 'High-Concurrency Database Systems', 'REST & GraphQL API Gateways'],
      gradient: 'from-[#FF6B00] to-amber-500'
    },
    {
      id: 'electronics',
      icon: Cpu,
      title: 'Electronics & PCB Design',
      subtitle: 'MULTI-LAYER CAD & CIRCUIT FABRICATION',
      description: 'Custom multi-layer PCB schematics, microcontrollers, embedded C/C++ firmware, power electronics, and hardware prototypes.',
      features: ['Multi-Layer PCB Schematics', 'Embedded C/C++ Firmware', 'Microcontroller Integration', 'Hardware Prototyping & Testing'],
      gradient: 'from-[#00F0FF] to-blue-600'
    },
    {
      id: 'iot-automation',
      icon: Radio,
      title: 'Smart Automation & Industrial IoT',
      subtitle: 'WIRELESS TELEMETRY & SMART CONTROL',
      description: 'Industrial IoT sensor networks, ESP32/LoRa telemetry, smart building automation, and remote cloud monitoring dashboards.',
      features: ['Industrial IoT Telemetry', 'Smart Building & Campus Automation', 'ESP32 & LoRa Gateway Networks', 'Real-Time Remote Cloud Control'],
      gradient: 'from-emerald-500 to-teal-600'
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.97 },
    visible: (idx) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: idx * 0.15,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <section id="verticals" className="py-24 relative z-10 font-apple">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span 
            className="inline-block px-3.5 py-1.5 rounded-full text-xs font-mono-code uppercase font-bold mb-2 border backdrop-blur-md shadow-2xs"
            style={{
              borderColor: darkMode ? 'rgba(255, 107, 0, 0.4)' : 'rgba(255, 107, 0, 0.3)',
              backgroundColor: darkMode ? 'rgba(11, 15, 23, 0.6)' : 'rgba(255, 255, 255, 0.8)',
              color: '#FF6B00'
            }}
          >
            Core Engineering Capabilities
          </span>
          <h2 className={`text-3xl sm:text-5xl font-extrabold mt-2 tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Core Engineering Verticals
          </h2>
          <p className={`mt-3 text-sm sm:text-base max-w-xl mx-auto leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Delivering end-to-end synergy between Software Engineering, Custom PCB Electronics, and Smart Automation &amp; IoT Systems.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`mb-14 rounded-3xl p-8 border relative overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 group ${
            darkMode ? 'bg-[#0E131F] border-[#FF6B00]/40' : 'bg-white border-slate-200/90 shadow-sm hover:border-[#FF6B00]/40'
          }`}
        >
          <div className="space-y-3 flex-1 text-left relative z-10">
            <div 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono-code font-bold uppercase border backdrop-blur-md shadow-2xs"
              style={{
                borderColor: darkMode ? 'rgba(255, 107, 0, 0.4)' : 'rgba(255, 107, 0, 0.3)',
                backgroundColor: darkMode ? 'rgba(11, 15, 23, 0.6)' : 'rgba(255, 255, 255, 0.8)',
                color: '#FF6B00'
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>LIVE SOFTWARE DEMO AVAILABLE</span>
            </div>
            <h3 className={`text-xl sm:text-2xl font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              CardGen – Institutional Smart ID Software
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed max-w-xl ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Experience our live production software platform deployed for automated campus ID generation, RFID database syncing, and security access control.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-mono-code text-slate-500 pt-1">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#FF6B00]" /> Real-Time Database Sync</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#FF6B00]" /> High-Speed Card Rendering</span>
            </div>

            <div className="pt-2">
              <a
                href="https://cardgen.orangefuturetech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FF6B00] text-white text-xs font-bold hover:bg-[#e05e00] transition-all shadow-md hover:shadow-orange-500/20 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Launch Live CardGen Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-80 relative z-10 flex items-center justify-center p-4 rounded-2xl bg-slate-900/5 dark:bg-slate-800/40">
            <img
              src="/assets/svg/time-tracking.svg"
              alt="Time Tracking and Smart ID Software"
              className="w-full h-auto max-h-52 object-contain drop-shadow-sm"
              loading="lazy"
              decoding="async"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {verticalsList.map((vert, idx) => {
            const IconComp = vert.icon;
            return (
              <motion.div
                key={vert.id}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className={`rounded-3xl border p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group ${
                  darkMode 
                    ? 'bg-[#0E131F] border-slate-800 hover:border-slate-700' 
                    : 'bg-white border-slate-200/90 shadow-sm hover:border-[#FF6B00]/40'
                }`}
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${vert.gradient} flex items-center justify-center text-white mb-6 shadow-md`}>
                    <IconComp className="w-7 h-7" />
                  </div>

                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono-code text-[#FF6B00] font-bold tracking-wider uppercase bg-[#FF6B00]/10 border border-[#FF6B00]/20 mb-2">
                    {vert.subtitle}
                  </span>
                  
                  <h3 className={`text-xl font-extrabold mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {vert.title}
                  </h3>

                  <p className={`mt-3 text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {vert.description}
                  </p>

                  <ul className="mt-6 space-y-2.5">
                    {vert.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-xs font-mono-code">
                        <span className="w-2 h-2 rounded-full bg-[#FF6B00]"></span>
                        <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-200/30 dark:border-slate-800/60">
                  <button
                    onClick={onOpenAi}
                    className="w-full flex items-center justify-between text-xs font-bold text-[#FF6B00] hover:underline cursor-pointer group/link"
                  >
                    <span>Request Technical Proposal</span>
                    <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
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
