import React from 'react';
import { Cpu } from 'lucide-react';

export default function Footer({ darkMode }) {
  return (
    <footer class={`relative z-10 py-10 border-t ${
      darkMode ? 'bg-[#070A0F] border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
    }`}>
      <div class="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div class="flex items-center gap-2.5">
          <div class="w-6 h-6 rounded bg-[#FF6B00] flex items-center justify-center text-white font-bold">
            <Cpu class="w-3.5 h-3.5" />
          </div>
          <span class={`font-['Orbitron',sans-serif] font-bold tracking-wide ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            ORANGE <span class="text-[#FF6B00]">FUTURE</span> TECH
          </span>
        </div>

        <div>
          &copy; {new Date().getFullYear()} Orange Future Tech. All rights reserved.
        </div>

        <div class="flex items-center gap-4 font-mono-code text-[11px]">
          <a href="mailto:teams@orangefuturetech.com" class="hover:text-[#FF6B00] transition-colors">teams@orangefuturetech.com</a>
          <span>•</span>
          <a href="#" class="hover:text-[#FF6B00] transition-colors">orangefuturetech.com</a>
        </div>
      </div>
    </footer>
  );
}
