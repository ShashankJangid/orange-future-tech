import React, { useState } from 'react';
import { Menu, X, Sparkles, Sun, Moon, ExternalLink } from 'lucide-react';

export default function Navbar({ onOpenAi, darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Core Verticals', href: '#verticals' },
    { name: 'Tech Lab', href: '#playground' },
    { name: 'Deployments', href: '#highlights' },
    { name: 'Electronics', href: '#electronics' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header class={`fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${
      darkMode 
        ? 'bg-[#080B11]/80 border-slate-800 text-white' 
        : 'bg-white/80 border-slate-200 text-slate-900'
    }`}>
      <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#" class="flex items-center group">
          <div class="h-11 py-1 px-3 bg-white rounded-lg border border-[#FF6B00]/40 shadow-sm flex items-center group-hover:scale-105 transition-transform">
            <img src="/logo.png" alt="Orange Future Tech Logo" class="h-full w-auto object-contain" />
          </div>
        </a>

        <nav class="hidden md:flex items-center gap-6 text-xs font-semibold">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              class={`transition-colors hover:text-[#FF6B00] ${
                darkMode ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div class="hidden md:flex items-center gap-3">
          <a
            href="https://cardgen.orangefuturetech.com"
            target="_blank"
            rel="noopener noreferrer"
            class="px-3.5 py-1.5 rounded-[7px] bg-[#FF6B00] text-white text-xs font-bold hover:bg-[#e05e00] transition-all flex items-center gap-1.5 shadow-sm hover:shadow-md cursor-pointer"
          >
            <span>Try CardGen App</span>
            <ExternalLink class="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            class={`p-2 rounded-[7px] border transition-colors cursor-pointer ${
              darkMode 
                ? 'bg-slate-900 border-slate-700 text-amber-400 hover:bg-slate-800' 
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {darkMode ? <Sun class="w-4 h-4" /> : <Moon class="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenAi}
            class={`px-3.5 py-1.5 rounded-[7px] border text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              darkMode 
                ? 'bg-slate-900 border-slate-700 text-slate-200 hover:border-slate-500' 
                : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
            }`}
          >
            <Sparkles class="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>OrangeAI</span>
          </button>
        </div>

        <div class="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setDarkMode(!darkMode)}
            class={`p-2 rounded-[7px] border transition-colors ${
              darkMode ? 'bg-slate-900 border-slate-700 text-amber-400' : 'bg-slate-100 border-slate-300 text-slate-700'
            }`}
          >
            {darkMode ? <Sun class="w-4 h-4" /> : <Moon class="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            class={`p-2 rounded-[7px] ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}
          >
            {menuOpen ? <X class="w-6 h-6" /> : <Menu class="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div class={`md:hidden border-b px-4 py-4 space-y-3 ${
          darkMode ? 'bg-[#080B11] border-slate-800' : 'bg-white border-slate-200'
        }`}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              class={`block text-sm font-medium ${
                darkMode ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              {link.name}
            </a>
          ))}

          <a
            href="https://cardgen.orangefuturetech.com"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full py-2 bg-[#FF6B00] text-white rounded-[7px] text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Try CardGen Software</span>
            <ExternalLink class="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => {
              setMenuOpen(false);
              onOpenAi();
            }}
            class="w-full py-2 bg-slate-900 border border-slate-700 text-white rounded-[7px] text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles class="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Ask OrangeAI</span>
          </button>
        </div>
      )}
    </header>
  );
}
