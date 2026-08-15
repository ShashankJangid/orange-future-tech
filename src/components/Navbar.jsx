import React, { useState } from 'react';
import { Menu, X, Sparkles, Sun, Moon, ExternalLink, Key } from 'lucide-react';

export default function Navbar({ onOpenAi, onOpenApiKeys, darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Core Verticals', href: '#verticals' },
    { name: 'Tech Lab', href: '#playground' },
    { name: 'Deployments', href: '#highlights' },
    { name: 'Electronics', href: '#electronics' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl saturate-180 border-b transition-all duration-300 ${
      darkMode 
        ? 'bg-[#000000]/70 border-white/10 text-white' 
        : 'bg-white/75 border-black/5 text-slate-900'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center group">
          <div className="h-10 py-1 px-3 bg-white rounded-xl border border-[#FF6B00]/40 shadow-sm flex items-center group-hover:scale-105 transition-transform duration-300">
            <img src="/logo.png" alt="Orange Future Tech Logo" className="h-full w-auto object-contain" />
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-tight">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`transition-colors duration-200 hover:text-[#FF6B00] ${
                darkMode ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenApiKeys}
            className={`px-3.5 py-2 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
              darkMode
                ? 'bg-slate-900/80 border-slate-700 text-slate-200 hover:border-[#FF6B00]'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:border-[#FF6B00]'
            }`}
          >
            <Key className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>API Keys</span>
          </button>

          <a
            href="https://cardgen.orangefuturetech.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-[#FF6B00] text-white text-xs font-semibold hover:bg-[#e05e00] transition-all duration-300 flex items-center gap-1.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Launch Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full border transition-all duration-300 cursor-pointer ${
              darkMode 
                ? 'bg-white/10 border-white/10 text-amber-400 hover:bg-white/20' 
                : 'bg-black/5 border-black/10 text-slate-700 hover:bg-black/10'
            }`}
            title="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden p-2 rounded-lg cursor-pointer ${darkMode ? 'text-white' : 'text-slate-900'}`}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className={`md:hidden border-b px-6 py-5 space-y-3 ${
          darkMode ? 'bg-[#000000]/95 border-white/10' : 'bg-white/95 border-black/5'
        }`}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block text-sm font-medium hover:text-[#FF6B00] ${
                darkMode ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMenuOpen(false);
                onOpenApiKeys();
              }}
              className="w-full py-2.5 rounded-full border border-slate-700 bg-slate-900 text-white text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <Key className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Configure API Keys</span>
            </button>
            <a
              href="https://cardgen.orangefuturetech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-full bg-[#FF6B00] text-white text-xs font-semibold text-center block"
            >
              Launch Live Demo
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
