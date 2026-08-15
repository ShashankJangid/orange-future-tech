import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, RefreshCw, Bot, ChevronDown, CheckCircle2 } from 'lucide-react';

const cleanText = (text) => {
  if (!text) return '';
  return text
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/```[a-zA-Z]*\n?/g, '')
    .replace(/```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)')
    .replace(/\*\*/g, '')
    .replace(/~~/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

export default function FloatingChatWidget({ isOpen, onToggle, onClose, darkMode }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I am Aria, AI Engineering Consultant at Orange Future Tech.\n\nWe build custom websites, enterprise software, AI systems, and multi-layer PCB hardware. We have delivered software for IIT and DPS.\n\nHow can I help you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showGreetingBubble, setShowGreetingBubble] = useState(true);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    'Build a new website for my company',
    'Software built for IIT and DPS',
    'Custom PCB and Hardware Solutions',
    'Schedule a Discovery Call'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setShowGreetingBubble(false);
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreetingBubble(false);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  const generateFallbackResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes('iit') || q.includes('dps') || q.includes('client') || q.includes('portfolio') || q.includes('work') || q.includes('experience')) {
      return (
        "Proven Track Record and Client Software\n\n" +
        "At Orange Future Tech, we have built high-performance software systems for prestigious organizations:\n\n" +
        "• IIT (Indian Institute of Technology): Specialized academic portals and high-concurrency database systems.\n" +
        "• DPS (Delhi Public School): Comprehensive cloud management and student-parent enterprise platforms.\n" +
        "• Shipmate Logistics: Real-time supply chain telemetry and automated dispatch tracking.\n\n" +
        "Would you like to build a high-performance web platform for your business?"
      );
    }

    if (q.includes('website') || q.includes('upgrade') || q.includes('build') || q.includes('software') || q.includes('web') || q.includes('app') || q.includes('price')) {
      return (
        "Enterprise Web and Software Development\n\n" +
        "We build blazing-fast, modern web applications and mobile platforms using cutting-edge technology:\n\n" +
        "• React 19 and Next.js: High-performance, SEO-optimized web experiences with clean animations.\n" +
        "• Scalable Cloud Backends: Node.js, Python, Supabase, PostgreSQL, and Redis.\n" +
        "• 24/7 Autonomous AI Agents: Automated client outreach, CRM chatbots, and intelligent workflow automation.\n\n" +
        "You can book a free 20-minute discovery call with our engineering team at https://orangefuturetech.com/portal"
      );
    }

    if (q.includes('pcb') || q.includes('hardware') || q.includes('electronics') || q.includes('iot')) {
      return (
        "Custom Multi-Layer PCB and IoT Engineering\n\n" +
        "From schematic design to high-volume fabrication:\n\n" +
        "• Multi-Layer PCB Routing: 2 to 8+ layer boards with controlled impedance and EMI shielding.\n" +
        "• IoT Telemetry Networks: ESP32 and LoRaWAN wireless sensor networks with 10km+ range.\n" +
        "• Embedded Firmware: Real-time C/C++ programming for industrial actuators.\n\n" +
        "Email your hardware specs directly to teams@orangefuturetech.com"
      );
    }

    return (
      `Thank you for asking about "${query}".\n\n` +
      "At Orange Future Tech, we engineer:\n" +
      "• Enterprise Web and Mobile Software (IIT and DPS track record)\n" +
      "• Custom Multi-Layer PCB Engineering and IoT Hardware\n" +
      "• 24/7 Autonomous AI Business and CRM Engines\n\n" +
      "Feel free to connect directly with our engineering team at teams@orangefuturetech.com or book a discovery call at https://orangefuturetech.com/portal"
    );
  };

  const handleSend = async (textToSend) => {
    const msgText = cleanText(textToSend || input);
    if (!msgText.trim()) return;

    const userMsg = { sender: 'user', text: msgText };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    if (!textToSend) setInput('');
    setIsTyping(true);

    const apiMessages = updatedMessages.map((m) => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    }));

    try {
      const endpoints = ['http://localhost:8080/api/chat', '/api/chat'];
      let resData = null;

      for (const endpoint of endpoints) {
        try {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: apiMessages, session_id: 'web-visitor' })
          });
          if (res.ok) {
            resData = await res.json();
            if (resData && resData.reply) break;
          }
        } catch (err) {
          // fallback to next
        }
      }

      if (resData && resData.reply) {
        const refinedReply = cleanText(resData.reply);
        setMessages((prev) => [...prev, { sender: 'ai', text: refinedReply }]);
      } else {
        const fallback = cleanText(generateFallbackResponse(msgText));
        setMessages((prev) => [...prev, { sender: 'ai', text: fallback }]);
      }
    } catch (error) {
      const fallback = cleanText(generateFallbackResponse(msgText));
      setMessages((prev) => [...prev, { sender: 'ai', text: fallback }]);
    } finally {
      setIsTyping(false);
    }
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
        text: "Hello! I am Aria, AI Engineering Consultant at Orange Future Tech.\n\nWe build custom websites, enterprise software, AI systems, and multi-layer PCB hardware. We have delivered software for IIT and DPS.\n\nHow can I help you today?"
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Greeting Bubble */}
      <AnimatePresence>
        {!isOpen && showGreetingBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-3 max-w-[280px] bg-[#0B0F17] text-white p-3.5 rounded-2xl shadow-2xl border border-slate-800 relative cursor-pointer group"
            onClick={onToggle}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowGreetingBubble(false);
              }}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-xs"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#FF6B00]/20 text-[#FF6B00] flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Chat with Aria (AI)</p>
                <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                  Need a new website, AI bot, or custom hardware? Let's chat!
                </p>
              </div>
            </div>
            {/* Triangle pointer */}
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#0B0F17] border-b border-r border-slate-800 transform rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expandable Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-[360px] sm:w-[400px] h-[540px] max-h-[82vh] bg-[#0B0F17] text-white rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col mb-4"
          >
            {/* Chat Header */}
            <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF6B00] to-amber-500 flex items-center justify-center text-white shadow-md">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-950"></span>
                </div>
                <div>
                  <h3 className="text-xs font-bold font-['Orbitron',sans-serif] text-white flex items-center gap-1.5">
                    <span>Aria AI Consultant</span>
                  </h3>
                  <p className="text-[10px] text-slate-400 font-mono-code flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Online • Orange Future Tech
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={resetChat}
                  title="Reset Conversation"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[86%] rounded-2xl p-3.5 leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#FF6B00] text-white font-medium rounded-tr-none shadow-md'
                        : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none backdrop-blur-md'
                    }`}
                  >
                    <div className="whitespace-pre-wrap leading-relaxed font-sans">{msg.text}</div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none px-3.5 py-2.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Chips */}
            {messages.length < 5 && (
              <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800/80 flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {quickPrompts.map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleSend(prompt)}
                    className="text-[10px] font-mono-code px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-[#FF6B00] transition-all text-left"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Chat Input */}
            <div className="p-3 bg-slate-950 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Aria about software, websites, or AI..."
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00] transition-colors"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className={`p-2 rounded-xl bg-[#FF6B00] text-white transition-all ${
                    input.trim() ? 'hover:bg-[#e05e00] shadow-md' : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (FAB) */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={onToggle}
        className="relative group w-14 h-14 rounded-full bg-gradient-to-tr from-[#FF6B00] to-amber-500 text-white flex items-center justify-center shadow-2xl hover:shadow-[0_0_25px_rgba(255,107,0,0.5)] transition-all cursor-pointer border border-white/20"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0B0F17] animate-pulse"></span>
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="relative"
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
