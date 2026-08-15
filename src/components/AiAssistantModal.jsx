import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, RefreshCw, Bot } from 'lucide-react';

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

export default function AiAssistantModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      title: 'Aria — Orange Future Tech AI Consultant',
      text: 'Hello! I am Aria, your AI business & engineering consultant for Orange Future Tech.\n\nHow can I assist you today? We build enterprise software, custom websites, AI solutions, and multi-layer PCB hardware. We have delivered software for IIT, DPS, and Shipmate Logistics.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    'Can you build a new website for my company?',
    'Tell me about your software work for IIT and DPS',
    'Custom PCB Design and Hardware Solutions',
    'Schedule a Discovery Call'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const generateFallbackResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes('iit') || q.includes('dps') || q.includes('client') || q.includes('portfolio') || q.includes('work') || q.includes('experience')) {
      return {
        title: 'Proven Track Record and Flagship Client Software',
        intro: 'At Orange Future Tech, we have architected and deployed high-performance software systems for prestigious institutions:',
        points: [
          'IIT (Indian Institute of Technology): Specialized academic software portals and high-concurrency database systems.',
          'DPS (Delhi Public School): Comprehensive educational management systems and student-parent cloud platforms.',
          'Shipmate Logistics: Real-time supply chain telemetry and automated cloud dispatch tracking.'
        ],
        footer: 'Would you like to explore a custom web platform or software build for your organization?'
      };
    }

    if (q.includes('website') || q.includes('upgrade') || q.includes('build') || q.includes('software') || q.includes('web') || q.includes('app')) {
      return {
        title: 'Enterprise Web and Software Development',
        intro: 'We build blazing-fast, modern web applications and mobile platforms using cutting-edge tech:',
        points: [
          'Next.js and React 19: High-performance, SEO-optimized web experiences with clean animations.',
          'Scalable Microservices: Node.js, Python, PostgreSQL, Supabase, and Redis backends.',
          'Autonomous AI Agents: Automated client outreach, CRM chatbots, and intelligent workflow automation.'
        ],
        footer: 'Schedule a free 20-minute technical roadmap session at https://orangefuturetech.com/portal'
      };
    }

    if (q.includes('pcb') || q.includes('hardware') || q.includes('electronics') || q.includes('iot')) {
      return {
        title: 'Custom Multi-Layer PCB and IoT Engineering',
        intro: 'From schematic design to high-volume fabrication, our hardware engineering covers:',
        points: [
          'Multi-Layer PCB Routing: 2 to 8+ layer boards with controlled impedance and EMI shielding.',
          'IoT Telemetry Networks: ESP32 and LoRaWAN wireless sensor hardware (10km+ range).',
          'Embedded Firmware: Real-time C/C++ firmware for industrial actuators and sensors.'
        ],
        footer: 'Email your hardware requirements directly to teams@orangefuturetech.com'
      };
    }

    return {
      title: 'Orange Future Tech Solutions',
      intro: `Thank you for asking about "${query}".`,
      points: [
        'Enterprise Web and Mobile Software (IIT and DPS track record)',
        'Custom Multi-Layer PCB Engineering and IoT Telemetry',
        '24/7 Autonomous AI Business and CRM Engines'
      ],
      footer: 'Connect directly with our team at teams@orangefuturetech.com or book a discovery call at https://orangefuturetech.com/portal'
    };
  };

  const handleSend = async (textToSend) => {
    const msgText = cleanText(textToSend || input);
    if (!msgText.trim()) return;

    const userMsg = { sender: 'user', text: msgText };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    if (!textToSend) setInput('');
    setIsTyping(true);

    const apiMessages = updatedMessages
      .filter((m) => m.text || m.intro)
      .map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text || (m.intro ? `${m.intro}\n${(m.points || []).join('\n')}\n${m.footer || ''}` : '')
      }));

    try {
      const endpoints = ['http://localhost:8080/api/chat', '/api/chat'];
      let resData = null;

      for (const endpoint of endpoints) {
        try {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: apiMessages, session_id: 'web-user' })
          });
          if (res.ok) {
            resData = await res.json();
            if (resData && resData.reply) break;
          }
        } catch (err) {
          // try next
        }
      }

      if (resData && resData.reply) {
        const refinedReply = cleanText(resData.reply);
        setMessages((prev) => [...prev, { sender: 'ai', text: refinedReply }]);
      } else {
        const fallback = generateFallbackResponse(msgText);
        setMessages((prev) => [...prev, { sender: 'ai', ...fallback }]);
      }
    } catch (error) {
      const fallback = generateFallbackResponse(msgText);
      setMessages((prev) => [...prev, { sender: 'ai', ...fallback }]);
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
        title: 'Aria — Orange Future Tech AI Consultant',
        text: 'Hello! I am Aria, your AI business & engineering consultant for Orange Future Tech.\n\nHow can I assist you today? We build enterprise software, custom websites, AI solutions, and multi-layer PCB hardware. We have delivered software for IIT, DPS, and Shipmate Logistics.'
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xl bg-[#0B0F17] text-white rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[85vh]"
        >
          <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between relative overflow-hidden">
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-2xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00] shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold font-['Orbitron',sans-serif] text-white flex items-center gap-2">
                  <span>Aria AI Consultant</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </h3>
                <p className="text-[11px] text-slate-400 font-mono-code">Live 24/7 • Software • PCB • AI Solutions</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 relative z-10">
              <button
                onClick={resetChat}
                title="Reset Conversation"
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-4 text-xs relative">
            <div className="absolute right-4 top-4 w-40 opacity-15 pointer-events-none">
              <img src="/assets/svg/ai-brain-board.svg" alt="AI Brain Animation" className="w-full h-auto object-contain" />
            </div>

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-4 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#FF6B00] text-white font-medium rounded-tr-none shadow-md'
                      : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none space-y-2.5 backdrop-blur-md'
                  }`}
                >
                  {msg.sender === 'user' ? (
                    <div>{msg.text}</div>
                  ) : (
                    <div>
                      {msg.title && (
                        <div className="font-bold text-sm font-['Orbitron',sans-serif] text-white border-b border-slate-800 pb-1.5 mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
                          <span>{msg.title}</span>
                        </div>
                      )}

                      {msg.text && (
                        <div className="text-slate-200 whitespace-pre-wrap leading-relaxed font-sans">{msg.text}</div>
                      )}

                      {msg.intro && (
                        <div className="text-slate-300 font-medium">{msg.intro}</div>
                      )}

                      {msg.points && (
                        <ul className="space-y-1.5 pt-1">
                          {msg.points.map((pt, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2 text-slate-300">
                              <span className="text-[#FF6B00] font-bold shrink-0 mt-0.5">•</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {msg.footer && (
                        <div className="pt-2 text-slate-400 italic border-t border-slate-800/80 mt-2">
                          {msg.footer}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none p-3.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length < 5 && (
            <div className="px-6 py-2.5 bg-slate-950 border-t border-slate-800/80 flex flex-wrap gap-1.5">
              {quickPrompts.map((prompt, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleSend(prompt)}
                  className="text-[11px] font-mono-code px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-[#FF6B00] transition-all cursor-pointer text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <div className="p-4 bg-slate-950 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Aria about building websites, AI bots, or hardware..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00] transition-colors"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className={`p-2.5 rounded-xl bg-[#FF6B00] text-white transition-all cursor-pointer ${
                  input.trim() ? 'hover:bg-[#e05e00] shadow-md' : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
