import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Cpu, Radio, Code2, Check, ArrowRight, RefreshCw, MessageSquare } from 'lucide-react';

export default function AiAssistantModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello! I am OrangeAI, your senior engineering consultant for Orange Future Tech.\n\nHow can I assist you today with Enterprise Software, Custom Multi-Layer PCB Design, or Smart Automation & Industrial IoT Systems?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    'What custom PCB design capabilities do you offer?',
    'Tell me about Smart Automation & Industrial IoT',
    'How do you build enterprise web & cloud platforms?',
    'How can I request a technical proposal?'
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
      return `### ⚡ Custom Multi-Layer PCB & Electronics Engineering\n\nAt **Orange Future Tech**, we engineer high-reliability custom electronics from concept to fabrication:\n\n* **Multi-Layer CAD Schematics**: 2 to 8+ layer PCB routing with controlled impedance & EMI shielding.\n* **Embedded C/C++ Firmware**: High-performance microcontrollers (ESP32, STM32, ARM Cortex).\n* **Industrial Power Electronics**: Custom power regulators, motor drivers, and sensor breakout boards.\n* **DFM & Fabrication**: Prototyping and production component sourcing.\n\nWould you like to share your hardware schematics or request a technical BOM review?`;
    }

    if (q.includes('iot') || q.includes('automation') || q.includes('smart') || q.includes('sensor') || q.includes('lora')) {
      return `### 📶 Smart Automation & Industrial IoT Solutions\n\nWe design end-to-end IoT telemetry networks and automated control systems:\n\n1. **Industrial Telemetry**: ESP32 & LoRaWAN long-range wireless sensor networks (up to 10km+ range).\n2. **Smart Building & Campus Automation**: Automated access control, HVAC, and power management.\n3. **Real-Time Dashboards**: Web & mobile dashboards for remote device monitoring and instant alert triggers.\n4. **Edge Computing**: On-device sensor data filtering & real-time actuator control.\n\nHow can we help automate your facility or building infrastructure?`;
    }

    if (q.includes('software') || q.includes('web') || q.includes('app') || q.includes('ai') || q.includes('cloud') || q.includes('react')) {
      return `### 💻 Enterprise Software & AI Platform Engineering\n\nWe architect resilient, high-concurrency software ecosystems tailored for business scale:\n\n* **Modern Full-Stack Applications**: Built with React, Next.js, Node.js, and Tailwind CSS.\n* **High-Concurrency Backends**: Distributed microservices, PostgreSQL/MongoDB, and Redis caching.\n* **AI & Machine Learning**: Custom LLM integration, predictive analytics, and automated workflow agents.\n* **API Gateways**: Secure REST & GraphQL endpoints with OAuth2 authentication.\n\nTell me about your software project goals or upcoming feature release!`;
    }

    if (q.includes('contact') || q.includes('proposal') || q.includes('price') || q.includes('quote') || q.includes('hire') || q.includes('email')) {
      return `### 📋 Requesting a Technical Proposal\n\nWe would be delighted to collaborate on your project! Here is how to connect with our engineering leadership:\n\n* **Email**: Send your requirements directly to \`teams@orangefuturetech.com\`\n* **Website Consultation**: Submit your project brief in the **Contact Section** below.\n* **Turnaround Time**: We typically respond with a detailed technical scope & proposal within 24 hours.\n\nYou can also click below to jump straight to our contact section!`;
    }

    if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('greetings')) {
      return `Hello! Great to connect with you. I am **OrangeAI**.\n\nI can help answer technical questions about:\n1. Enterprise Web Software & AI Systems\n2. Multi-Layer PCB Electronics Design\n3. Smart Automation & Industrial IoT Networks\n\nWhat project can I assist you with today?`;
    }

    return `Thank you for your inquiry regarding **"${query}"**.\n\nAt **Orange Future Tech**, our engineering teams combine **Enterprise Software Development**, **Custom Multi-Layer PCB Engineering**, and **Smart Automation / Industrial IoT Solutions**.\n\nTo discuss your specific technical requirements, feel free to email our team directly at \`teams@orangefuturetech.com\` or select one of the suggested prompts below!`;
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
      setMessages((prev) => [...prev, { sender: 'ai', text: aiReply }]);
      setIsTyping(false);
    }, 600);
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
        text: 'Hello! I am OrangeAI, your senior engineering consultant for Orange Future Tech.\n\nHow can I assist you today with Enterprise Software, Custom Multi-Layer PCB Design, or Smart Automation & Industrial IoT Systems?'
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          class="relative w-full max-w-xl bg-[#0B0F17] text-white rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[85vh]"
        >
          <div class="px-5 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF6B00] to-amber-500 flex items-center justify-center text-white shadow-md">
                <Sparkles class="w-5 h-5" />
              </div>
              <div>
                <h3 class="text-sm font-bold font-['Orbitron',sans-serif] text-white flex items-center gap-2">
                  <span>OrangeAI Advisor</span>
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </h3>
                <p class="text-[11px] text-slate-400 font-mono-code">Software • PCB • Smart Automation &amp; IoT</p>
              </div>
            </div>

            <div class="flex items-center gap-2">
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

          <div class="flex-1 p-5 overflow-y-auto space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                class={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  class={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#FF6B00] text-white font-medium rounded-tr-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none space-y-2'
                  }`}
                >
                  <div class="whitespace-pre-wrap">{msg.text}</div>
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

          {messages.length < 3 && (
            <div class="px-5 py-2.5 bg-slate-950/60 border-t border-slate-800/60 flex flex-wrap gap-1.5">
              {quickPrompts.map((prompt, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleSend(prompt)}
                  class="text-[11px] font-mono-code px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-[#FF6B00]/50 transition-all cursor-pointer text-left"
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
                placeholder="Ask OrangeAI about Software, PCB Design, or Smart Automation..."
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
