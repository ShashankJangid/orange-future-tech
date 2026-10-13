import React from 'react';

export default function Footer({ darkMode }) {
  return (
    <footer class={`relative z-10 py-10 border-t transition-colors duration-300 ${
      darkMode ? 'bg-[#000000] border-white/10 text-slate-400' : 'bg-slate-50 border-black/5 text-slate-600'
    }`}>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-apple">
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2.5 group">
            <img 
              src={darkMode ? "/orange_future_tech_logo_dark.svg" : "/orange_future_tech_logo.svg"} 
              alt="Orange Future Tech Logo" 
              className="h-7 md:h-8 w-auto object-contain transition-transform group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
          </a>
        </div>

        <div class="text-center">
          &copy; {new Date().getFullYear()} Orange Future Tech. All rights reserved.
        </div>

        <div class="flex items-center gap-4 font-mono-code text-[11px]">
          <a href="tel:+918958347428" class="hover:text-[#FF6B00] transition-colors">+91 8958347428</a>
          <span>•</span>
          <a href="mailto:teams@orangefuturetech.com" class="hover:text-[#FF6B00] transition-colors">teams@orangefuturetech.com</a>
          <span>•</span>
          <a href="#" class="hover:text-[#FF6B00] transition-colors">orangefuturetech.com</a>
        </div>
      </div>
    </footer>
  );
}
