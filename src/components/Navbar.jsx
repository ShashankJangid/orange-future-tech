import React, { useState, useEffect } from 'react';
import { Cpu, Bot, Menu, X, Sun, Moon } from 'lucide-react';

export default function Navbar({ onOpenAi, darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header class={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <nav class={`flex items-center justify-between px-5 py-2.5 rounded-xl transition-all ${
          scrolled
            ? darkMode
              ? 'bg-[#0B0F17]/90 backdrop-blur-md border border-slate-800 shadow-lg'
              : 'bg-white/90 backdrop-blur-md border border-slate-200 shadow-md'
            : 'bg-transparent'
        }`}>
          <a href="#" class="flex items-center gap-2.5">
            <div class="w-7 h-7 rounded-md bg-[#FF6B00] flex items-center justify-center text-white font-bold">
              <Cpu class="w-4 h-4" />
            </div>
            <span class={`font-['Orbitron',sans-serif] font-bold text-base tracking-wide ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              ORANGE <span class="text-[#FF6B00]">FUTURE</span>
            </span>
          </a>

          <div class={`hidden md:flex items-center gap-7 text-xs font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            <a href="#highlights" class="hover:text-[#FF6B00] transition-colors">Highlights</a>
            <a href="#verticals" class="hover:text-[#FF6B00] transition-colors">Verticals</a>
            <a href="#playground" class="hover:text-[#FF6B00] transition-colors">Tech Lab</a>
            <a href="#electronics" class="hover:text-[#FF6B00] transition-colors">Electronics</a>
            <a href="#contact" class="hover:text-[#FF6B00] transition-colors">Contact</a>
          </div>

          <div class="hidden md:flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              class={`p-2 rounded-lg transition-colors cursor-pointer border ${
                darkMode
                  ? 'bg-slate-900 border-slate-800 text-yellow-400 hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {darkMode ? <Sun class="w-4 h-4" /> : <Moon class="w-4 h-4" />}
            </button>

            <button 
              onClick={onOpenAi}
              class={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                darkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-[#FF6B00] hover:text-white'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:border-[#FF6B00] hover:text-slate-900'
              }`}
            >
              <Bot class="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>OrangeAI</span>
            </button>

            <a 
              href="#contact" 
              class="px-3.5 py-1.5 rounded-lg bg-[#FF6B00] text-white text-xs font-semibold hover:bg-[#FF5500] transition-colors cursor-pointer"
            >
              Get in Touch
            </a>
          </div>

          <div class="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setDarkMode(!darkMode)}
              class={`p-2 rounded-lg border ${
                darkMode ? 'bg-slate-900 border-slate-800 text-yellow-400' : 'bg-slate-100 border-slate-300 text-slate-700'
              }`}
            >
              {darkMode ? <Sun class="w-4 h-4" /> : <Moon class="w-4 h-4" />}
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              class={`p-2 rounded-lg border ${darkMode ? 'text-slate-300 bg-slate-900 border-slate-800' : 'text-slate-700 bg-slate-100 border-slate-300'}`}
            >
              {mobileMenuOpen ? <X class="w-5 h-5" /> : <Menu class="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div class={`md:hidden mt-2 p-4 rounded-xl border shadow-xl flex flex-col gap-3 text-xs font-medium ${
            darkMode ? 'bg-[#0B0F17] border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
          }`}>
            <a href="#highlights" onClick={() => setMobileMenuOpen(false)}>Highlights</a>
            <a href="#verticals" onClick={() => setMobileMenuOpen(false)}>Verticals</a>
            <a href="#playground" onClick={() => setMobileMenuOpen(false)}>Tech Lab</a>
            <a href="#electronics" onClick={() => setMobileMenuOpen(false)}>Electronics</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            <div class="pt-2 border-t border-slate-800 flex flex-col gap-2">
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenAi(); }}
                class="py-2 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 text-center font-medium"
              >
                Ask OrangeAI
              </button>
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                class="py-2 rounded-lg bg-[#FF6B00] text-white text-center font-semibold"
              >
                Get in Touch
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
