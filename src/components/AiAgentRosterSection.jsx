import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, MessageCircle, Mail, MessageSquare, Search, Brain, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function AiAgentRosterSection({ darkMode }) {
  const agents = [
    {
      id: 'voice',
      name: 'Inbound Voice Agent',
      badge: 'FLAGSHIP',
      badgeColor: 'bg-[#FF6B00] text-white',
      icon: PhoneCall,
      description: 'Answers every call in one ring — nights, Sundays, festival weekends. Qualifies, handles objections, books the site visit or consult, and logs it to your CRM before the call ends.',
      channel: '140-Series Telephony / Voice Bot'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Agent',
      badge: 'Official Cloud API',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
      icon: MessageCircle,
      description: 'Picks up the thread the moment a call ends — brochure, location pin, cost sheet, reminders — in Hinglish, Tamil, Telugu, whatever your buyer speaks.',
      channel: 'Meta Official Cloud API'
    },
    {
      id: 'email',
      name: 'Email Agent',
      badge: 'Threaded Triage',
      badgeColor: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      icon: Mail,
      description: 'Threaded follow-ups, cost sheets, and inbound triage that read like a person wrote them. Built for longer B2B consideration cycles.',
      channel: 'Automated CRM Triage'
    },
    {
      id: 'sms',
      name: 'SMS Agent',
      badge: 'DLT Registered',
      badgeColor: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
      icon: MessageSquare,
      description: 'DLT-registered reminders, confirmations, and re-engagement where WhatsApp and email don\'t land.',
      channel: 'TRAI-Clean SMS Gateway'
    },
    {
      id: 'prospector',
      name: 'Prospector Agent',
      badge: 'Multi-Source',
      badgeColor: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
      icon: Search,
      description: 'Scans IndiaMART, Justdial, LinkedIn, and MSME data for buyers matching your ICP — and responds inside the 90-second window that wins the deal.',
      channel: 'High-Speed Prospect Capture'
    },
    {
      id: 'intel',
      name: 'Memory & Deal Intel',
      badge: 'System Core',
      badgeColor: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
      icon: Brain,
      description: 'Remembers every signal across calls, chats, and emails for months. Scores pipeline, flags at-risk deals, and greets repeat callers by name.',
      channel: 'Single-Tenant Memory Pipeline'
    }
  ];

  return (
    <section id="agents" class="py-24 relative z-10 font-['Plus_Jakarta_Sans',sans-serif]">
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
            <Brain class="w-3.5 h-3.5" />
            <span>Autonomous Inbound AI Roster</span>
          </div>
          <h2 class={`text-3xl sm:text-5xl font-extrabold font-['Space_Grotesk',sans-serif] tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            THE AGENTS WE DEPLOY
          </h2>
          <p class={`mt-3 text-sm sm:text-base max-w-xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Engineered per business on our orchestration layer — not templates. Inbound capture leads; everything else compounds it.
          </p>
        </motion.div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((ag, idx) => {
            const IconComp = ag.icon;
            return (
              <motion.div
                key={ag.id}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                class={`p-7 rounded-3xl border relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between group ${
                  darkMode 
                    ? 'bg-[#0E131F] border-slate-800 hover:border-[#FF6B00]/40' 
                    : 'bg-white border-slate-200/90 shadow-md hover:border-[#FF6B00]/40'
                }`}
              >
                <div>
                  <div class="flex items-center justify-between gap-3 mb-4">
                    <div class="p-3 rounded-2xl bg-gradient-to-br from-[#FF6B00] to-amber-500 text-white shadow-md">
                      <IconComp class="w-6 h-6" />
                    </div>
                    <span class={`px-2.5 py-0.5 rounded-[7px] text-[10px] font-mono-code font-bold uppercase tracking-wider ${ag.badgeColor}`}>
                      {ag.badge}
                    </span>
                  </div>

                  <h3 class={`text-lg font-extrabold font-['Space_Grotesk',sans-serif] ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {ag.name}
                  </h3>

                  <p class={`mt-3 text-xs leading-relaxed font-normal ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {ag.description}
                  </p>
                </div>

                <div class="mt-6 pt-4 border-t border-slate-200/30 flex items-center justify-between text-[11px] font-mono-code">
                  <span class="text-slate-500">{ag.channel}</span>
                  <CheckCircle2 class="w-4 h-4 text-[#FF6B00]" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <div class="mt-12 text-center text-xs font-mono-code text-slate-500 max-w-2xl mx-auto flex items-center justify-center gap-2">
          <ShieldAlert class="w-4 h-4 text-[#FF6B00] shrink-0" />
          <span>Outbound AI calling is available as a compliance-gated add-on — 140-series numbers, DLT consent, DND scrubbing, and AI disclosure included.</span>
        </div>

      </div>
    </section>
  );
}
