import React from 'react';

export default function Footer({ darkMode }) {
  return (
    <footer class={`relative z-10 py-10 border-t ${
      darkMode ? 'bg-[#070A0F] border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
    }`}>
      <div class="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-['Plus_Jakarta_Sans',sans-serif]">
        <div class="flex items-center gap-2.5">
          <div class="w-7 h-7 rounded-[7px] overflow-hidden border border-[#FF6B00]/30 shadow-sm">
            <img src="/logo.jpg" alt="Orange Future Tech Logo" class="w-full h-full object-cover" />
          </div>
          <span class={`font-['Space_Grotesk',sans-serif] font-bold tracking-wide ${darkMode ? 'text-white' : 'text-slate-900'}`}>
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
