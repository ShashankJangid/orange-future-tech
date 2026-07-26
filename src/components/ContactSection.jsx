import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, Mail, MapPin, Globe } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Enterprise Query',
    message: ''
  });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: 'c94d4135-0008-4714-a81a-698f4d6ad1fd',
          name: formData.name,
          email: formData.email,
          subject: `Orange Future Tech Query: ${formData.subject}`,
          message: formData.message
        })
      });

      const data = await response.json();

      if (data.success) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        setStatus('success');
        setFormData({ name: '', email: '', subject: 'General Enterprise Query', message: '' });
      } else {
        setStatus('idle');
      }
    } catch (err) {
      setStatus('idle');
    }
  };

  return (
    <section id="contact" class="py-16 relative z-10">
      <div class="max-w-4xl mx-auto px-4">
        <div class="text-center mb-10">
          <span class="text-xs font-mono-code uppercase tracking-wider text-[#FF6B00]">Get in Touch</span>
          <h2 class="text-2xl sm:text-3xl font-bold font-['Orbitron',sans-serif] text-white mt-1">
            LET'S WORK TOGETHER
          </h2>
        </div>

        <div class="glass-card p-6 sm:p-8 rounded-xl border border-slate-800">
          {status === 'success' ? (
            <div class="py-8 text-center space-y-3">
              <div class="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 class="w-6 h-6" />
              </div>
              <h3 class="text-lg font-bold text-white font-['Orbitron',sans-serif]">Message Transmitted!</h3>
              <p class="text-slate-300 text-xs max-w-sm mx-auto">
                Thank you for reaching out to Orange Future Tech. Our leadership team will respond within 24 hours.
              </p>
              <button
                onClick={() => setStatus('idle')}
                class="mt-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-200 text-xs font-medium hover:bg-slate-700 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-mono-code text-slate-400 mb-1">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Dr. Rajesh Kumar"
                    class="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#FF6B00] transition-colors"
                  />
                </div>

                <div>
                  <label class="block text-xs font-mono-code text-slate-400 mb-1">YOUR EMAIL</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rajesh@institution.edu"
                    class="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#FF6B00] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label class="block text-xs font-mono-code text-slate-400 mb-1">DOMAIN</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  class="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#FF6B00] transition-colors"
                >
                  <option value="ID Card Software System">Smart ID Card Software System</option>
                  <option value="Enterprise Web & App Solutions">Enterprise Web &amp; App Solutions</option>
                  <option value="Advanced Electronics Solutions">Advanced Electronics Solutions</option>
                  <option value="Industrial Automation & PCB Design">Industrial Automation &amp; PCB Design</option>
                  <option value="General Technical Query">General Technical Query</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-mono-code text-slate-400 mb-1">MESSAGE</label>
                <textarea
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Briefly describe your requirements..."
                  class="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#FF6B00] transition-colors"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                class="w-full py-2.5 rounded-lg bg-[#FF6B00] text-white font-semibold text-xs hover:bg-[#FF5500] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {status === 'sending' ? (
                  <span>Transmitting...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send class="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}

          <div class="mt-6 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <div class="flex items-center gap-2">
              <Globe class="w-4 h-4 text-[#FF6B00]" />
              <span>orangefuturetech.com</span>
            </div>
            <div class="flex items-center gap-2">
              <Mail class="w-4 h-4 text-[#FF6B00]" />
              <a href="mailto:teams@orangefuturetech.com" class="hover:text-white transition-colors">teams@orangefuturetech.com</a>
            </div>
            <div class="flex items-center gap-2">
              <MapPin class="w-4 h-4 text-[#FF6B00]" />
              <span>IIT Jodhpur &amp; DPS Indirapuram</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
