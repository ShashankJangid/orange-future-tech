import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, ShieldCheck, Save, X, CheckCircle2, AlertCircle, Sparkles, Send, Mail, Share2 } from 'lucide-react';

export default function ApiKeysModal({ isOpen, onClose, darkMode }) {
  const [keys, setKeys] = useState({
    GEMINI_API_KEY: '',
    TELEGRAM_BOT_TOKEN: '',
    TELEGRAM_CHAT_ID: '',
    RESEND_API_KEY: '',
    SENDER_EMAIL: 'teams@orangefuturetech.com',
    LINKEDIN_ACCESS_TOKEN: '',
    INSTAGRAM_ACCESS_TOKEN: '',
    TWITTER_BEARER_TOKEN: '',
    SUPABASE_URL: '',
    SUPABASE_KEY: ''
  });

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load from local storage or server endpoint
    const savedKeys = localStorage.getItem('oft_api_keys');
    if (savedKeys) {
      try {
        setKeys(JSON.parse(savedKeys));
      } catch (e) {}
    }

    // Try fetching from local python configuration server
    fetch('http://localhost:8080/api/config')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data === 'object') {
          setKeys((prev) => ({ ...prev, ...data }));
        }
      })
      .catch(() => {});
  }, [isOpen]);

  const handleChange = (field, value) => {
    setKeys({ ...keys, [field]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    localStorage.setItem('oft_api_keys', JSON.stringify(keys));

    try {
      await fetch('http://localhost:8080/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(keys)
      });
    } catch (err) {}

    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  if (!isOpen) return null;

  const isLive = Boolean(keys.RESEND_API_KEY && keys.RESEND_API_KEY.length > 5);

  return (
    <AnimatePresence>
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md font-apple">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          class={`w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
            darkMode ? 'bg-[#0E131F] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Modal Header */}
          <div class={`p-6 border-b flex items-center justify-between ${
            darkMode ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50'
          }`}>
            <div class="flex items-center gap-3">
              <div class="p-2.5 rounded-2xl bg-[#FF6B00]/10 text-[#FF6B00]">
                <Key class="w-6 h-6" />
              </div>
              <div>
                <h3 class="text-lg font-bold tracking-tight">AI Engine &amp; API Manager</h3>
                <p class="text-xs text-slate-400">Configure your 24/7 Autonomous AI credentials</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <span class={`px-3 py-1 rounded-full text-xs font-mono-code font-semibold flex items-center gap-1.5 ${
                isLive ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
              }`}>
                <span class={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                <span>{isLive ? 'LIVE OUTREACH MODE' : 'SIMULATION MODE'}</span>
              </span>

              <button
                onClick={onClose}
                class={`p-2 rounded-full hover:bg-slate-200/50 transition-colors ${darkMode ? 'hover:bg-slate-800' : ''}`}
              >
                <X class="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div class="p-6 overflow-y-auto space-y-6">
            
            {/* Section 1: AI Brain */}
            <div>
              <div class="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-[#FF6B00]">
                <Sparkles class="w-4 h-4" />
                <span>1. Gemini AI Core Key</span>
              </div>
              <div class="grid grid-cols-1 gap-4">
                <div>
                  <label class="block text-xs font-mono-code mb-1 text-slate-400">GEMINI_API_KEY</label>
                  <input
                    type="password"
                    value={keys.GEMINI_API_KEY}
                    onChange={(e) => handleChange('GEMINI_API_KEY', e.target.value)}
                    placeholder="AIzaSy..."
                    class={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono-code focus:outline-none focus:border-[#FF6B00] ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Real-time Notifications */}
            <div class="pt-4 border-t border-slate-200/15">
              <div class="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-emerald-500">
                <Send class="w-4 h-4" />
                <span>2. Real-Time Phone Alerts (Telegram Bot)</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-mono-code mb-1 text-slate-400">TELEGRAM_BOT_TOKEN</label>
                  <input
                    type="password"
                    value={keys.TELEGRAM_BOT_TOKEN}
                    onChange={(e) => handleChange('TELEGRAM_BOT_TOKEN', e.target.value)}
                    placeholder="7123456789:AA..."
                    class={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono-code focus:outline-none focus:border-[#FF6B00] ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
                <div>
                  <label class="block text-xs font-mono-code mb-1 text-slate-400">TELEGRAM_CHAT_ID</label>
                  <input
                    type="text"
                    value={keys.TELEGRAM_CHAT_ID}
                    onChange={(e) => handleChange('TELEGRAM_CHAT_ID', e.target.value)}
                    placeholder="123456789"
                    class={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono-code focus:outline-none focus:border-[#FF6B00] ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Cold Email Outreach */}
            <div class="pt-4 border-t border-slate-200/15">
              <div class="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-amber-500">
                <Mail class="w-4 h-4" />
                <span>3. Email Outreach (Resend API)</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-mono-code mb-1 text-slate-400">RESEND_API_KEY</label>
                  <input
                    type="password"
                    value={keys.RESEND_API_KEY}
                    onChange={(e) => handleChange('RESEND_API_KEY', e.target.value)}
                    placeholder="re_123456789..."
                    class={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono-code focus:outline-none focus:border-[#FF6B00] ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
                <div>
                  <label class="block text-xs font-mono-code mb-1 text-slate-400">SENDER_EMAIL</label>
                  <input
                    type="email"
                    value={keys.SENDER_EMAIL}
                    onChange={(e) => handleChange('SENDER_EMAIL', e.target.value)}
                    placeholder="teams@orangefuturetech.com"
                    class={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono-code focus:outline-none focus:border-[#FF6B00] ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Social Media Tokens */}
            <div class="pt-4 border-t border-slate-200/15">
              <div class="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-sky-400">
                <Share2 class="w-4 h-4" />
                <span>4. Social Media Graph Tokens</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs font-mono-code mb-1 text-slate-400">LINKEDIN_TOKEN</label>
                  <input
                    type="password"
                    value={keys.LINKEDIN_ACCESS_TOKEN}
                    onChange={(e) => handleChange('LINKEDIN_ACCESS_TOKEN', e.target.value)}
                    placeholder="AQV..."
                    class={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono-code focus:outline-none focus:border-[#FF6B00] ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
                <div>
                  <label class="block text-xs font-mono-code mb-1 text-slate-400">INSTAGRAM_TOKEN</label>
                  <input
                    type="password"
                    value={keys.INSTAGRAM_ACCESS_TOKEN}
                    onChange={(e) => handleChange('INSTAGRAM_ACCESS_TOKEN', e.target.value)}
                    placeholder="EAA..."
                    class={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono-code focus:outline-none focus:border-[#FF6B00] ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
                <div>
                  <label class="block text-xs font-mono-code mb-1 text-slate-400">TWITTER_BEARER</label>
                  <input
                    type="password"
                    value={keys.TWITTER_BEARER_TOKEN}
                    onChange={(e) => handleChange('TWITTER_BEARER_TOKEN', e.target.value)}
                    placeholder="AAAA..."
                    class={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono-code focus:outline-none focus:border-[#FF6B00] ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Modal Footer */}
          <div class={`p-6 border-t flex items-center justify-between ${
            darkMode ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50'
          }`}>
            <div>
              {saved && (
                <div class="flex items-center gap-2 text-xs font-mono-code text-emerald-500 font-bold">
                  <CheckCircle2 class="w-4 h-4" />
                  <span>API Keys updated &amp; saved to ai-engine/.env</span>
                </div>
              )}
            </div>

            <div class="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                class="px-5 py-2.5 rounded-full text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={loading}
                class="btn-apple-primary px-6 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-md"
              >
                <Save class="w-4 h-4" />
                <span>{loading ? 'Saving...' : 'Save & Update API Keys'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
