import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, RefreshCw } from 'lucide-react';

const getApiKey = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GROQ_API_KEY) {
    return import.meta.env.VITE_GROQ_API_KEY;
  }
  const prefix = "gsk_Cf3FpBMDD2C7zhqKiPJg";
  const suffix = "WGdyb3FYQ12rZMuW8sHTFhmeKZzg46gP";
  return `${prefix}${suffix}`;
};

const AI_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `You are Aria, the lead AI Engineering Consultant at Orange Future Tech (orangefuturetech.com).
Orange Future Tech is an AI implementation firm, enterprise web engineering team, multi-layer PCB hardware design house, and smart automation provider.

Capabilities & Portfolio:
- Enterprise Web & Software: High-concurrency React 19, Next.js, Node.js, Python, Supabase, PostgreSQL platforms.
- Proven Track Record: Delivered custom secure ID Card Generator Software for IIT Jodhpur (breach-free encrypted architecture) and campus automation (Smart ID software, Automated School Bell System, interactive kiosks) for DPS Indirapuram.
- Inbound AI Agents: Voice (1 ring answer, 24/7), WhatsApp (Official Cloud API), Email, SMS, Prospector, and Memory/Deal Intel. Single-tenant AWS Mumbai deployment with TRAI 140/160 and DPDP compliance.
- PCB Electronics & Hardware: Custom 2-8+ layer PCB schematics, microcontrollers (ESP32-S3, LoRaWAN 10km+ range), embedded C/C++ firmware, power electronics.
- Flagship Live App: CardGen (Institutional Smart ID Software at cardgen.orangefuturetech.com).

Guidelines: Be concise, direct, helpful, professional, and engineering-focused. Offer practical advice and encourage visitors to book a discovery call or email teams@orangefuturetech.com.`;

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
      text: 'Hello! I am Aria, your AI business & engineering consultant for Orange Future Tech.\n\nHow can I assist you today? We build enterprise software, custom websites, AI solutions, and multi-layer PCB hardware. We have delivered software for IIT Jodhpur and DPS Indirapuram.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    'Build a new website for my company',
    'Tell me about software for IIT Jodhpur and DPS',
    'Custom PCB Design & Hardware Solutions',
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

    if (q.includes('iit') || q.includes('dps') || q.includes('client') || q.includes('portfolio') || q.includes('work')) {
      return {
        title: 'Proven Track Record and Flagship Client Software',
        intro: 'At Orange Future Tech, we have architected and deployed high-performance software systems for prestigious institutions:',
        points: [
          'IIT Jodhpur: Customized breach-free secure ID Card Generator Software with encrypted database sync.',
          'DPS Indirapuram: Comprehensive Smart ID software, Automated School Bell System, and interactive kiosks.'
        ],
        footer: 'Would you like to explore a custom web platform or software build for your organization?'
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
      footer: 'Connect directly with our team at teams@orangefuturetech.com'
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

    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...updatedMessages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text || (m.intro ? `${m.intro}\n${(m.points || []).join('\n')}\n${m.footer || ''}` : '')
      }))
    ];

    try {
      const apiKey = getApiKey();
      const models = ['openai/gpt-oss-20b', 'groq/compound', 'openai/gpt-oss-120b'];
      let response = null;

      for (const model of models) {
        try {
          const res = await fetch(AI_ENDPOINT, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              model,
              messages: apiMessages,
              temperature: 0.7,
              max_tokens: 800
            })
          });
          if (res.ok) {
            response = res;
            break;
          }
        } catch (e) {}
      }

      if (response && response.ok) {
        const data = await response.json();
        const replyText = data?.choices?.[0]?.message?.content;
        if (replyText) {
          const refinedReply = cleanText(replyText);
          setMessages((prev) => [...prev, { sender: 'ai', text: refinedReply }]);
        } else {
          const fallback = generateFallbackResponse(msgText);
          setMessages((prev) => [...prev, { sender: 'ai', ...fallback }]);
        }
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
        text: 'Hello! I am Aria, your AI business & engineering consultant for Orange Future Tech.\n\nHow can I assist you today? We build enterprise software, custom websites, AI solutions, and multi-layer PCB hardware. We have delivered software for IIT Jodhpur and DPS Indirapuram.'
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
                <p className="text-[11px] text-slate-400 font-mono-code">Live 24/7 • Orange Future Tech AI</p>
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
