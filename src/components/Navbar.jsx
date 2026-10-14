import React, { useState } from 'react';
import { Menu, X, Sparkles, Sun, Moon, ExternalLink, School, CreditCard, Code2, Cpu, Users, MessageSquareText, Layers } from 'lucide-react';

export default function Navbar({ activeLayer = 'overview', setActiveLayer, onOpenAi, darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const layersList = [
    { id: 'overview', name: 'Overview', icon: Layers },
    { id: 'schools', name: 'Schools & 360° VR', icon: School, badge: 'Popular' },
    { id: 'cardgen', name: 'CardGen Suite', icon: CreditCard },
    { id: 'enterprise', name: 'Web & AI Tech', icon: Code2 },
    { id: 'electronics', name: 'PCB & Hardware', icon: Cpu },
    { id: 'clients', name: 'Case Studies', icon: Users },
    { id: 'contact', name: 'Instant Quote', icon: MessageSquareText },
  ];

  const handleSelectLayer = (id) => {
    if (setActiveLayer) {
      setActiveLayer(id);
      window.location.hash = id;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl border-b ${
      darkMode 
        ? 'bg-[#000000]/80 border-white/10 text-white' 
        : 'bg-white/90 border-slate-200/80 text-slate-900 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleSelectLayer('overview')} 
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <img 
              src={darkMode ? "/orange_future_tech_logo_dark.svg" : "/orange_future_tech_logo.svg"} 
              alt="Orange Future Tech Logo" 
              className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
            />
          </button>
        </div>

        <nav className={`hidden lg:flex items-center gap-1.5 p-1 rounded-full border transition-colors ${
          darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-100/70 border-slate-200/70'
        }`}>
          {layersList.map((layer) => {
            const Icon = layer.icon;
            const isActive = activeLayer === layer.id;
            return (
              <button
                key={layer.id}
                onClick={() => handleSelectLayer(layer.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#FF6B00] text-white shadow-sm font-semibold'
                    : darkMode ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{layer.name}</span>
                {layer.badge && !isActive && (
                  <span className="text-[9px] px-1.5 py-0.2 bg-orange-100 text-[#FF6B00] rounded-full font-bold">
                    {layer.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://cardgen.orangefuturetech.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-[#FF6B00] text-white text-xs font-semibold hover:bg-[#e05e00] transition-all duration-300 flex items-center gap-1.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
          >
            <span>CardGen Demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full border transition-all duration-300 cursor-pointer ${
              darkMode 
                ? 'bg-white/10 border-white/10 text-amber-400 hover:bg-white/20' 
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/70'
            }`}
            title="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`lg:hidden p-2 rounded-lg cursor-pointer ${darkMode ? 'text-white' : 'text-slate-900'}`}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className={`lg:hidden border-b px-6 py-5 space-y-2 ${
          darkMode ? 'bg-[#000000]/95 border-white/10' : 'bg-white/95 border-slate-200'
        }`}>
          <div className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-slate-400 mb-2">
            Select Page Layer
          </div>
          <div className="grid grid-cols-1 gap-1">
            {layersList.map((layer) => {
              const Icon = layer.icon;
              const isActive = activeLayer === layer.id;
              return (
                <button
                  key={layer.id}
                  onClick={() => handleSelectLayer(layer.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#FF6B00] text-white font-semibold'
                      : darkMode ? 'text-slate-200 hover:bg-white/5' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{layer.name}</span>
                  </div>
                  {layer.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-orange-100 text-[#FF6B00]'
                    }`}>
                      {layer.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
            <a
              href="https://cardgen.orangefuturetech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 rounded-xl bg-[#FF6B00] text-white text-xs font-semibold text-center block"
            >
              CardGen Demo
            </a>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-700"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
