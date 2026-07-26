import React from 'react';
import { Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer class="relative z-10 bg-[#070A0F] border-t border-slate-800 py-10">
      <div class="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div class="flex items-center gap-2.5">
          <div class="w-6 h-6 rounded bg-[#FF6B00] flex items-center justify-center text-white font-bold">
            <Cpu class="w-3.5 h-3.5" />
          </div>
          <span class="font-['Orbitron',sans-serif] font-bold text-white tracking-wide">
            ORANGE <span class="text-[#FF6B00]">FUTURE</span> TECH
          </span>
        </div>

        <div>
          &copy; {new Date().getFullYear()} Orange Future Tech. All rights reserved.
        </div>

        <div class="flex items-center gap-4 font-mono-code text-[11px]">
          <a href="mailto:teams@orangefuturetech.com" class="hover:text-white transition-colors">teams@orangefuturetech.com</a>
          <span>•</span>
          <a href="#" class="hover:text-white transition-colors">orangefuturetech.com</a>
        </div>
      </div>
    </footer>
  );
}
