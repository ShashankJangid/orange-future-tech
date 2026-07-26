import React, { useState, useEffect } from 'react';
import { Cpu, Bot, Menu, X, ChevronRight, Zap } from 'lucide-react';

export default function Navbar({ onOpenAi }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header class={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class={`relative flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-300 ${scrolled ? 'bg-[#0D131F]/80 backdrop-blur-xl border border-[#FF6B00]/30 shadow-lg shadow-[#FF6B00]/10' : 'bg-[#0F172A]/40 backdrop-blur-md border border-white/10'}`}>
          <a href="#" class="flex items-center gap-3 group">
            <div class="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF5500] to-[#FF8C38] p-0.5 flex items-center justify-center shadow-lg shadow-[#FF5500]/30 group-hover:scale-105 transition-transform">
              <div class="w-full h-full bg-[#080B11] rounded-[10px] flex items-center justify-center">
                <Cpu class="w-5 h-5 text-[#FF6B00] group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div class="flex flex-col">
              <span class="font-['Orbitron',sans-serif] font-bold text-lg tracking-wider text-white flex items-center gap-1">
                ORANGE <span class="text-[#FF6B00]">FUTURE</span>
              </span>
              <span class="text-[10px] tracking-widest uppercase text-slate-400 font-mono-code -mt-1">TECH</span>
            </div>
          </a>

          <div class="hidden md:flex items-center gap-8">
            <a href="#highlights" class="text-sm font-medium text-slate-300 hover:text-[#FF6B00] transition-colors">Highlights</a>
            <a href="#verticals" class="text-sm font-medium text-slate-300 hover:text-[#FF6B00] transition-colors">Verticals</a>
            <a href="#playground" class="text-sm font-medium text-slate-300 hover:text-[#FF6B00] transition-colors">Tech Lab</a>
            <a href="#stem-kits" class="text-sm font-medium text-slate-300 hover:text-[#FF6B00] transition-colors">STEM Kits</a>
            <a href="#clients" class="text-sm font-medium text-slate-300 hover:text-[#FF6B00] transition-colors">Deployments</a>
          </div>

          <div class="hidden md:flex items-center gap-3">
            <button 
              onClick={onOpenAi}
              class="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 text-xs font-semibold hover:bg-[#00F0FF]/20 hover:border-[#00F0FF]/60 transition-all cursor-pointer shadow-sm shadow-[#00F0FF]/20 group"
            >
              <Bot class="w-4 h-4 text-[#00F0FF] group-hover:rotate-12 transition-transform" />
              <span>OrangeAI Assistant</span>
              <span class="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping"></span>
            </button>

            <a 
              href="#contact" 
              class="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF5500] text-white text-xs font-semibold hover:shadow-lg hover:shadow-[#FF6B00]/40 hover:scale-105 transition-all cursor-pointer"
            >
              <span>Get in Touch</span>
              <ChevronRight class="w-4 h-4" />
            </a>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            class="md:hidden p-2 rounded-xl text-slate-300 hover:text-white bg-slate-800/50 border border-slate-700"
          >
            {mobileMenuOpen ? <X class="w-6 h-6" /> : <Menu class="w-6 h-6" />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div class="md:hidden mt-2 p-5 rounded-2xl bg-[#0D131F] border border-[#FF6B00]/30 shadow-2xl flex flex-col gap-4">
            <a href="#highlights" onClick={() => setMobileMenuOpen(false)} class="text-sm font-medium text-slate-200">Highlights</a>
            <a href="#verticals" onClick={() => setMobileMenuOpen(false)} class="text-sm font-medium text-slate-200">Verticals</a>
            <a href="#playground" onClick={() => setMobileMenuOpen(false)} class="text-sm font-medium text-slate-200">Tech Lab</a>
            <a href="#stem-kits" onClick={() => setMobileMenuOpen(false)} class="text-sm font-medium text-slate-200">STEM Kits</a>
            <a href="#clients" onClick={() => setMobileMenuOpen(false)} class="text-sm font-medium text-slate-200">Deployments</a>
            <div class="pt-3 border-t border-slate-800 flex flex-col gap-3">
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenAi(); }}
                class="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 text-xs font-semibold"
              >
                <Bot class="w-4 h-4" />
                <span>Ask OrangeAI Assistant</span>
              </button>
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                class="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#FF6B00] text-white text-xs font-semibold"
              >
                <span>Get in Touch</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
