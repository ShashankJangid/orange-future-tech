import React from 'react';

export default function Footer({ darkMode }) {
  return (
    <footer class={`relative z-10 py-10 border-t ${
      darkMode ? 'bg-[#070A0F] border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
    }`}>
      <div class="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-['Plus_Jakarta_Sans',sans-serif]">
        <div class="flex items-center gap-2.5">
          <div class="h-9 py-1 px-2.5 bg-white rounded-md border border-[#FF6B00]/40 shadow-sm flex items-center">
            <img src="/logo.png" alt="Orange Future Tech Logo" class="h-full w-auto object-contain" />
          </div>
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
