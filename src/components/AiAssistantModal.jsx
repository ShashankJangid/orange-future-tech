import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, User, Cpu } from 'lucide-react';

export default function AiAssistantModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello! I am OrangeAI, your intelligent advisor for Orange Future Tech. How can I assist you with our Enterprise Software, Multi-Layer PCB Design, Advanced Electronics Solutions, or institutional deployments at IIT Jodhpur and DPS Indirapuram today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const quickQuestions = [
    'Tell me about ID Card Software',
    'Custom PCB Design & Firmware',
    'Deployments at IIT Jodhpur & DPS Indirapuram',
    'Custom Enterprise Web & AI Solutions'
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAiResponse(query);
      setMessages((prev) => [...prev, { sender: 'ai', text: response }]);
      setIsTyping(false);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          class="relative w-full max-w-2xl h-[620px] rounded-3xl bg-[#0D131F] border border-[#FF6B00]/40 shadow-2xl flex flex-col overflow-hidden"
        >
          <div class="px-6 py-4 bg-[#080B11] border-b border-slate-800 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/40 text-[#00F0FF] flex items-center justify-center shadow-sm shadow-[#00F0FF]/30">
                <Bot class="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 class="text-sm font-bold text-white flex items-center gap-2 font-['Orbitron',sans-serif]">
                  OrangeAI Model Assistant
                  <span class="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                </h3>
                <span class="text-[11px] text-slate-400 font-mono-code">AI Core v3.6 // Domain Trained</span>
              </div>
            </div>
            <button
              onClick={onClose}
              class="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors"
            >
              <X class="w-5 h-5" />
            </button>
          </div>

          <div class="flex-1 p-6 overflow-y-auto space-y-4 bg-[#080B11]/90">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                class={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div class="w-8 h-8 rounded-xl bg-[#FF6B00]/20 border border-[#FF6B00]/40 text-[#FF6B00] flex items-center justify-center flex-shrink-0">
                    <Cpu class="w-4 h-4" />
                  </div>
                )}
                <div
                  class={`max-w-[82%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF5500] text-white font-medium shadow-md'
                      : 'bg-[#151D2A] text-slate-200 border border-slate-800'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === 'user' && (
                  <div class="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center flex-shrink-0">
                    <User class="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-xl bg-[#FF6B00]/20 border border-[#FF6B00]/40 text-[#FF6B00] flex items-center justify-center">
                  <Bot class="w-4 h-4 animate-spin" />
                </div>
                <div class="p-3 rounded-2xl bg-[#151D2A] border border-slate-800 text-slate-400 text-xs font-mono-code flex items-center gap-2">
                  <span>OrangeAI is thinking</span>
                  <span class="animate-pulse">...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div class="p-4 bg-[#0D131F] border-t border-slate-800 space-y-3">
            <div class="flex flex-wrap gap-2">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  class="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-[#FF6B00]/20 hover:border-[#FF6B00]/50 border border-slate-800 text-[11px] text-slate-300 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              class="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Software, Electronics Solutions, ID Card System, or PCB design..."
                class="flex-1 px-4 py-3 rounded-xl bg-[#080B11] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-[#FF6B00] transition-colors"
              />
              <button
                type="submit"
                class="px-5 py-3 rounded-xl bg-[#FF6B00] text-white text-xs font-bold hover:bg-[#FF5500] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Send</span>
                <Send class="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function generateAiResponse(query) {
  const q = query.toLowerCase();
  if (q.includes('id card') || q.includes('id software')) {
    return "Our Smart Institutional ID Card Software provides automated batch card generation, RFID/QR code sync, barcode reading, and multi-tier security. It is widely used by universities and schools for frictionless student & staff management.";
  }
  if (q.includes('electronics') || q.includes('pcb') || q.includes('firmware') || q.includes('hardware')) {
    return "Orange Future Tech offers Advanced Electronics Solutions including up to 8-layer custom PCB design, C/C++ embedded firmware (ESP32/ARM/STM32), industrial automation PLC modules, and IoT telemetry sensor hardware!";
  }
  if (q.includes('jodhpur') || q.includes('dps') || q.includes('indirapuram') || q.includes('client') || q.includes('deployment')) {
    return "We have prestigious institutional deployments including specialized software engineering modules for IIT Jodhpur and institutional management + smart tech integration for DPS Indirapuram!";
  }
  if (q.includes('website') || q.includes('web') || q.includes('software') || q.includes('app') || q.includes('ai')) {
    return "We build enterprise custom web platforms, native mobile applications, AI/ML integrations, and resilient cloud architectures. Designed with Spatial UI, 100 Core Web Vitals, and zero layout shifts out of the box!";
  }
  return "Orange Future Tech (orangefuturetech.com) bridges Enterprise Software, Industrial Automation, and Advanced Electronics Solutions. Feel free to contact our engineering team via teams@orangefuturetech.com or through the Contact form!";
}
