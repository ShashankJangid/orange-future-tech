import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2, AlertCircle, Clock, ShieldCheck } from 'lucide-react';

export default function ContactSection({ darkMode }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'c94d4135-0008-4714-a81a-698f4d6ad1fd',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          from_name: 'Orange Future Tech Website Contact Form',
          subject: 'New Technical Inquiry from ' + formData.name
        }),
      });

      const res = await response.json();
      if (res.success || response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" class="py-24 relative z-10 font-apple">
      <div class="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          class="text-center mb-16"
        >
          <span class={`inline-block px-4 py-1.5 rounded-full text-xs font-mono-code uppercase font-semibold mb-3 border backdrop-blur-xl ${
            darkMode 
              ? 'bg-slate-900/60 border-slate-800 text-[#FF6B00]' 
              : 'bg-white/80 border-slate-200 text-[#FF6B00]'
          }`}>
            Start A Conversation
          </span>
          <h2 class={`apple-h2 tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Connect with our engineers.
          </h2>
          <p class="mt-3 apple-subtitle max-w-lg mx-auto">
            Have an upcoming Enterprise Software project, Custom PCB schematic, or Smart Automation query? Reach out directly.
          </p>
        </motion.div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            class="glass-apple-card hover-apple-lift p-8 sm:p-10 flex flex-col justify-between"
          >
            <div>
              <h3 class={`text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Engineering &amp; Technical Support
              </h3>
              <p class={`mt-3 text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                We respond to all technical inquiries and project briefs within 24 hours. Connect via email or complete our inquiry form.
              </p>

              <div class="mt-8 space-y-4">
                <a
                  href="mailto:teams@orangefuturetech.com"
                  class={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 ${
                    darkMode 
                      ? 'bg-slate-950/80 border-slate-800 text-white hover:border-[#FF6B00]/50' 
                      : 'bg-white border-slate-200 text-slate-900 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div class="p-3 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00]">
                    <Mail class="w-5 h-5" />
                  </div>
                  <div>
                    <span class="text-[10px] font-mono-code text-slate-400 uppercase font-semibold block">DIRECT EMAIL</span>
                    <span class="text-xs font-mono-code font-bold text-[#FF6B00]">teams@orangefuturetech.com</span>
                  </div>
                </a>

                <div class={`flex items-center gap-4 p-4 rounded-2xl border ${
                  darkMode 
                    ? 'bg-slate-950/80 border-slate-800 text-white' 
                    : 'bg-white border-slate-200 text-slate-900 shadow-sm'
                }`}>
                  <div class="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                    <Clock class="w-5 h-5" />
                  </div>
                  <div>
                    <span class="text-[10px] font-mono-code text-slate-400 uppercase font-semibold block">RESPONSE TIME</span>
                    <span class="text-xs font-mono-code font-bold">Within 24 Hours</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-8 pt-6 border-t border-slate-200/15 text-xs text-slate-400 font-mono-code flex items-center gap-2">
              <ShieldCheck class="w-4 h-4 text-emerald-500" />
              <span>Global Digital Engineering &amp; Remote Operations</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            class="glass-apple-card hover-apple-lift p-8 sm:p-10"
          >
            <form onSubmit={handleSubmit} class="space-y-4">
              <div>
                <label class={`block text-xs font-mono-code mb-1.5 font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  YOUR NAME
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Alex Mercer"
                  class={`w-full px-4 py-3 rounded-xl border text-xs transition-all duration-200 focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 ${
                    darkMode 
                      ? 'bg-slate-950/80 border-slate-800 text-white placeholder-slate-600' 
                      : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              <div>
                <label class={`block text-xs font-mono-code mb-1.5 font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  WORK EMAIL
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@company.com"
                  class={`w-full px-4 py-3 rounded-xl border text-xs transition-all duration-200 focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 ${
                    darkMode 
                      ? 'bg-slate-950/80 border-slate-800 text-white placeholder-slate-600' 
                      : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              <div>
                <label class={`block text-xs font-mono-code mb-1.5 font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  PROJECT REQUIREMENTS / BRIEF
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your software, PCB design, or IoT requirements..."
                  class={`w-full px-4 py-3 rounded-xl border text-xs transition-all duration-200 focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 ${
                    darkMode 
                      ? 'bg-slate-950/80 border-slate-800 text-white placeholder-slate-600' 
                      : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                class="w-full py-3.5 rounded-full bg-[#FF6B00] text-white font-semibold text-xs hover:bg-[#e05e00] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                {status === 'submitting' ? (
                  <span>Sending Inquiry...</span>
                ) : (
                  <>
                    <span>Send Technical Message</span>
                    <Send class="w-4 h-4" />
                  </>
                )}
              </button>

              {status === 'success' && (
                <div class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-mono-code flex items-center gap-2">
                  <CheckCircle2 class="w-4 h-4 shrink-0" />
                  <span>Message sent successfully! Our engineering team will reply shortly.</span>
                </div>
              )}

              {status === 'error' && (
                <div class="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono-code flex items-center gap-2">
                  <AlertCircle class="w-4 h-4 shrink-0" />
                  <span>Failed to send via API. Please email teams@orangefuturetech.com directly.</span>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
