import React, { useState, useEffect } from 'react';
import { Cpu, Bot, Menu, X, ChevronRight } from 'lucide-react';

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
        <nav class={`relative flex items-center justify-between px-6 py-2.5 rounded-2xl transition-all duration-300 ${scrolled ? 'bg-[#0A0D14]/90 backdrop-blur-xl border border-white/10 shadow-2xl' : 'bg-[#0A0D14]/40 backdrop-blur-md border border-white/5'}`}>
          <a href="#" class="flex items-center gap-2.5 group">
            <div class="w-8 h-8 rounded-lg bg-[#FF6B00] flex items-center justify-center text-white shadow-md shadow-[#FF6B00]/20 group-hover:scale-105 transition-transform">
              <Cpu class="w-4 h-4" />
            </div>
            <div class="flex items-center gap-1.5 font-['Orbitron',sans-serif] font-bold text-base tracking-wide text-white">
              ORANGE <span class="text-[#FF6B00]">FUTURE</span>
            </div>
          </a>

          <div class="hidden md:flex items-center gap-7 text-xs font-medium text-slate-300">
            <a href="#highlights" class="hover:text-white transition-colors">Highlights</a>
            <a href="#verticals" class="hover:text-white transition-colors">Verticals</a>
            <a href="#playground" class="hover:text-white transition-colors">Tech Lab</a>
            <a href="#electronics" class="hover:text-white transition-colors">Electronics</a>
            <a href="#clients" class="hover:text-white transition-colors">Deployments</a>
          </div>

          <div class="hidden md:flex items-center gap-3">
            <button 
              onClick={onOpenAi}
              class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-xs font-medium hover:border-[#FF6B00] hover:text-white transition-all cursor-pointer"
            >
              <Bot class="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>OrangeAI</span>
            </button>

            <a 
              href="#contact" 
              class="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#FF6B00] text-white text-xs font-semibold hover:bg-[#FF5500] transition-colors cursor-pointer"
            >
              <span>Get in Touch</span>
              <ChevronRight class="w-3.5 h-3.5" />
            </a>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            class="md:hidden p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900 border border-slate-800"
          >
            {mobileMenuOpen ? <X class="w-5 h-5" /> : <Menu class="w-5 h-5" />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div class="md:hidden mt-2 p-5 rounded-2xl bg-[#0A0D14] border border-slate-800 shadow-2xl flex flex-col gap-4 text-xs font-medium">
            <a href="#highlights" onClick={() => setMobileMenuOpen(false)} class="text-slate-300 hover:text-white">Highlights</a>
            <a href="#verticals" onClick={() => setMobileMenuOpen(false)} class="text-slate-300 hover:text-white">Verticals</a>
            <a href="#playground" onClick={() => setMobileMenuOpen(false)} class="text-slate-300 hover:text-white">Tech Lab</a>
            <a href="#electronics" onClick={() => setMobileMenuOpen(false)} class="text-slate-300 hover:text-white">Electronics Solutions</a>
            <a href="#clients" onClick={() => setMobileMenuOpen(false)} class="text-slate-300 hover:text-white">Deployments</a>
            <div class="pt-3 border-t border-slate-800 flex flex-col gap-2.5">
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenAi(); }}
                class="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-xs font-medium"
              >
                <Bot class="w-4 h-4 text-[#FF6B00]" />
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
