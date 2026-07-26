import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, RefreshCw, Cpu, Radio, Code2, ArrowRight } from 'lucide-react';

export default function AiAssistantModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      title: 'Welcome to OrangeAI Advisor',
      text: 'Hello! I am your senior engineering consultant for Orange Future Tech.\nHow can I assist you today with Enterprise Software, Custom Multi-Layer PCB Design, or Smart Automation & Industrial IoT Systems?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    'Custom PCB Design Capabilities',
    'Smart Automation & Industrial IoT',
    'Enterprise Cloud & Web Platforms',
    'Request Technical Proposal'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const generateResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes('pcb') || q.includes('circuit') || q.includes('hardware') || q.includes('electronics') || q.includes('schematic')) {
      return {
        title: 'Custom Multi-Layer PCB & Electronics Engineering',
        intro: 'At Orange Future Tech, we engineer high-reliability custom electronics from initial schematic concept to final fabrication:',
        points: [
          'Multi-Layer CAD Schematics: 2 to 8+ layer PCB routing with controlled impedance and EMI shielding.',
          'Embedded C/C++ Firmware: High-performance microcontroller programming (ESP32, STM32, ARM Cortex).',
          'Industrial Power Electronics: Custom power regulators, motor drivers, and sensor breakout boards.',
          'DFM & Fabrication Sourcing: Component sourcing and prototyping.'
        ],
        footer: 'Would you like to share your hardware schematics or request a technical BOM review?'
      };
    }

    if (q.includes('iot') || q.includes('automation') || q.includes('smart') || q.includes('sensor') || q.includes('lora')) {
      return {
        title: 'Smart Automation & Industrial IoT Solutions',
        intro: 'We design end-to-end IoT telemetry networks and automated control systems:',
        points: [
          'Industrial Telemetry: ESP32 and LoRaWAN long-range wireless sensor networks up to 10km+ range.',
          'Smart Building & Campus Automation: Automated access control, HVAC, and power management.',
          'Real-Time Dashboards: Web and mobile dashboards for remote device monitoring and instant alert triggers.',
          'Edge Computing: On-device sensor data filtering and real-time actuator control.'
        ],
        footer: 'How can we help automate your facility or building infrastructure?'
      };
    }

    if (q.includes('software') || q.includes('web') || q.includes('app') || q.includes('ai') || q.includes('cloud') || q.includes('react')) {
      return {
        title: 'Enterprise Software & AI Platform Engineering',
        intro: 'We architect resilient, high-concurrency software ecosystems tailored for enterprise scale:',
        points: [
          'Modern Full-Stack Applications: Built with React, Next.js, Node.js, and clean CSS.',
          'High-Concurrency Backends: Distributed microservices, PostgreSQL/MongoDB, and Redis caching.',
          'AI & Machine Learning: Custom LLM integration, predictive analytics, and automated workflow agents.',
          'API Gateways: Secure REST and GraphQL endpoints with OAuth2 authentication.'
        ],
        footer: 'Tell me about your software project goals or upcoming feature release!'
      };
    }

    if (q.includes('proposal') || q.includes('contact') || q.includes('price') || q.includes('quote') || q.includes('hire') || q.includes('email')) {
      return {
        title: 'Requesting a Technical Proposal',
        intro: 'We would be delighted to collaborate on your project. Connect with our engineering team:',
        points: [
          'Email: Send your requirements directly to teams@orangefuturetech.com',
          'Website Form: Submit your project brief in the Contact Section.',
          'Turnaround Time: We typically respond with a detailed technical scope and proposal within 24 hours.'
        ],
        footer: 'You can also test our live software demo at cardgen.orangefuturetech.com!'
      };
    }

    return {
      title: 'Orange Future Tech Advisory',
      intro: `Thank you for your inquiry regarding "${query}".`,
      points: [
        'Enterprise Web Software Development & High-Concurrency Systems',
        'Custom Multi-Layer PCB Engineering & Firmware',
        'Smart Building Automation & Industrial IoT Networks'
      ],
      footer: 'To discuss your specific technical requirements, email our team directly at teams@orangefuturetech.com!'
    };
  };

  const handleSend = (textToSend) => {
    const msgText = textToSend || input;
    if (!msgText.trim()) return;

    const userMsg = { sender: 'user', text: msgText };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiReply = generateResponse(msgText);
      setMessages((prev) => [...prev, { sender: 'ai', ...aiReply }]);
      setIsTyping(false);
    }, 500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const resetChat = () => {
    setMessages([
      {
        sender: 'ai',
        title: 'Welcome to OrangeAI Advisor',
        text: 'Hello! I am your senior engineering consultant for Orange Future Tech.\nHow can I assist you today with Enterprise Software, Custom Multi-Layer PCB Design, or Smart Automation & Industrial IoT Systems?'
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.2 }}
          class="relative w-full max-w-lg bg-[#0B0F17] text-white rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[580px] max-h-[85vh]"
        >
          <div class="px-5 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF6B00] to-amber-500 flex items-center justify-center text-white shadow-md">
                <Sparkles class="w-5 h-5" />
              </div>
              <div>
                <h3 class="text-sm font-bold font-['Orbitron',sans-serif] text-white flex items-center gap-2">
                  <span>OrangeAI Engineering Advisor</span>
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </h3>
                <p class="text-[11px] text-slate-400 font-mono-code">Software • PCB • Smart Automation &amp; IoT</p>
              </div>
            </div>

            <div class="flex items-center gap-1.5">
              <button
                onClick={resetChat}
                title="Reset Conversation"
                class="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
              >
                <RefreshCw class="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                class="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
              >
                <X class="w-5 h-5" />
              </button>
            </div>
          </div>

          <div class="flex-1 p-5 overflow-y-auto space-y-4 text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                class={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  class={`max-w-[88%] rounded-2xl p-4 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#FF6B00] text-white font-medium rounded-tr-none shadow-md'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none space-y-2.5'
                  }`}
                >
                  {msg.sender === 'user' ? (
                    <div>{msg.text}</div>
                  ) : (
                    <div>
                      {msg.title && (
                        <div class="font-bold text-sm font-['Orbitron',sans-serif] text-white border-b border-slate-800 pb-1.5 mb-2 flex items-center gap-2">
                          <span class="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
                          <span>{msg.title}</span>
                        </div>
                      )}

                      {msg.text && (
                        <div class="text-slate-300 whitespace-pre-wrap">{msg.text}</div>
                      )}

                      {msg.intro && (
                        <div class="text-slate-300 font-medium">{msg.intro}</div>
                      )}

                      {msg.points && (
                        <ul class="space-y-1.5 pt-1">
                          {msg.points.map((pt, pIdx) => (
                            <li key={pIdx} class="flex items-start gap-2 text-slate-300">
                              <span class="text-[#FF6B00] font-bold shrink-0 mt-0.5">•</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {msg.footer && (
                        <div class="pt-2 text-slate-400 italic border-t border-slate-800/80 mt-2">
                          {msg.footer}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div class="flex justify-start">
                <div class="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none p-3.5 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-[#FF6B00] animate-bounce"></span>
                  <span class="w-2 h-2 rounded-full bg-[#FF6B00] animate-bounce [animation-delay:0.2s]"></span>
                  <span class="w-2 h-2 rounded-full bg-[#FF6B00] animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length < 4 && (
            <div class="px-5 py-2.5 bg-slate-950 border-t border-slate-800/80 flex flex-wrap gap-1.5">
              {quickPrompts.map((prompt, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleSend(prompt)}
                  class="text-[11px] font-mono-code px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-[#FF6B00] transition-all cursor-pointer text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <div class="p-4 bg-slate-950 border-t border-slate-800">
            <div class="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask OrangeAI about Software, PCB, or Smart Automation..."
                class="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00] transition-colors"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                class={`p-2.5 rounded-xl bg-[#FF6B00] text-white transition-all cursor-pointer ${
                  input.trim() ? 'hover:bg-[#e05e00] shadow-md' : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <Send class="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
