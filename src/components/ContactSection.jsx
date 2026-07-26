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
          particleCount: 120,
          spread: 80,
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
    <section id="contact" class="py-24 relative z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/30 text-xs font-semibold uppercase tracking-wider mb-4">
              <Mail class="w-3.5 h-3.5" />
              <span>Connect With Us</span>
            </div>

            <h2 class="text-3xl sm:text-5xl font-extrabold font-['Orbitron',sans-serif] text-white tracking-tight mb-6">
              LET'S BUILD THE <span class="text-gradient-orange">FUTURE</span> TOGETHER
            </h2>

            <p class="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed font-light">
              Whether you need enterprise software development, institutional ID card management, custom multi-layer PCB design, or advanced electronics hardware, our engineers are ready.
            </p>

            <div class="space-y-6">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] flex items-center justify-center">
                  <Globe class="w-6 h-6" />
                </div>
                <div>
                  <div class="text-xs text-slate-400 font-mono-code uppercase">Official Domain</div>
                  <div class="text-base font-bold text-white">orangefuturetech.com</div>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center">
                  <Mail class="w-6 h-6" />
                </div>
                <div>
                  <div class="text-xs text-slate-400 font-mono-code uppercase">Direct Email</div>
                  <a href="mailto:teams@orangefuturetech.com" class="text-base font-bold text-white hover:text-[#FF6B00] transition-colors">
                    teams@orangefuturetech.com
                  </a>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-[#8A2BE2]/10 border border-[#8A2BE2]/30 text-[#8A2BE2] flex items-center justify-center">
                  <MapPin class="w-6 h-6" />
                </div>
                <div>
                  <div class="text-xs text-slate-400 font-mono-code uppercase">Deployments</div>
                  <div class="text-base font-bold text-white">IIT Jodhpur Campus &amp; DPS Indirapuram</div>
                </div>
              </div>
            </div>
          </div>

          <div class="glass-card p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative">
            {status === 'success' ? (
              <div class="py-12 text-center space-y-4">
                <div class="w-16 h-16 rounded-full bg-green-500/20 border border-green-500 text-green-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 class="w-8 h-8" />
                </div>
                <h3 class="text-2xl font-bold text-white font-['Orbitron',sans-serif]">Message Transmitted!</h3>
                <p class="text-slate-300 text-sm max-w-md mx-auto">
                  Thank you for connecting with Orange Future Tech. Our engineering leadership will reach out within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  class="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition-colors"
                >
                  Send Another Query
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} class="space-y-5">
                <div>
                  <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono-code">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Dr. Rajesh Kumar"
                    class="w-full px-4 py-3 rounded-xl bg-[#080B11] border border-slate-700 text-white text-sm focus:outline-none focus:border-[#FF6B00] transition-colors"
                  />
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono-code">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rajesh@institution.edu"
                    class="w-full px-4 py-3 rounded-xl bg-[#080B11] border border-slate-700 text-white text-sm focus:outline-none focus:border-[#FF6B00] transition-colors"
                  />
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono-code">Select Domain</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    class="w-full px-4 py-3 rounded-xl bg-[#080B11] border border-slate-700 text-white text-sm focus:outline-none focus:border-[#FF6B00] transition-colors"
                  >
                    <option value="ID Card Software System">Smart ID Card Software System</option>
                    <option value="Enterprise Web & App Solutions">Enterprise Web &amp; App Solutions</option>
                    <option value="Advanced Electronics Solutions">Advanced Electronics Solutions</option>
                    <option value="Industrial Automation & PCB Design">Industrial Automation &amp; PCB Design</option>
                    <option value="General Technical Query">General Technical Query</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono-code">Message Details</label>
                  <textarea
                    required
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your requirements or campus setup..."
                    class="w-full px-4 py-3 rounded-xl bg-[#080B11] border border-slate-700 text-white text-sm focus:outline-none focus:border-[#FF6B00] transition-colors"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  class="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FF5500] text-white font-extrabold text-sm hover:shadow-xl hover:shadow-[#FF6B00]/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {status === 'sending' ? (
                    <span>Transmitting Query...</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send class="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
