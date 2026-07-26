import React from 'react';
import { Cpu, Github, Twitter, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer class="relative z-10 bg-[#05070B] border-t border-slate-800/80 pt-16 pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/60">
          <div class="md:col-span-1">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-9 h-9 rounded-xl bg-[#FF6B00] p-0.5 flex items-center justify-center">
                <div class="w-full h-full bg-[#080B11] rounded-[10px] flex items-center justify-center">
                  <Cpu class="w-4 h-4 text-[#FF6B00]" />
                </div>
              </div>
              <span class="font-['Orbitron',sans-serif] font-bold text-lg text-white">
                ORANGE <span class="text-[#FF6B00]">FUTURE</span>
              </span>
            </div>
            <p class="text-xs text-slate-400 leading-relaxed mb-6 font-light">
              Bridging Enterprise Software, Industrial Electronics &amp; Next-Gen STEM Robotics Education.
            </p>
            <div class="text-xs text-[#00F0FF] font-mono-code">
              orangefuturetech.com
            </div>
          </div>

          <div>
            <h4 class="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4 font-mono-code">Flagship Tech</h4>
            <ul class="space-y-2.5 text-xs text-slate-400">
              <li><a href="#highlights" class="hover:text-[#FF6B00] transition-colors">Smart ID Card Software</a></li>
              <li><a href="#highlights" class="hover:text-[#FF6B00] transition-colors">Enterprise Custom Websites</a></li>
              <li><a href="#verticals" class="hover:text-[#FF6B00] transition-colors">AI &amp; Machine Learning</a></li>
              <li><a href="#verticals" class="hover:text-[#FF6B00] transition-colors">Custom PCB &amp; Firmware</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4 font-mono-code">STEM Education</h4>
            <ul class="space-y-2.5 text-xs text-slate-400">
              <li><a href="#stem-kits" class="hover:text-[#FF6B00] transition-colors">Junior Explorer Kits</a></li>
              <li><a href="#stem-kits" class="hover:text-[#FF6B00] transition-colors">Pro Inventor Robotics</a></li>
              <li><a href="#stem-kits" class="hover:text-[#FF6B00] transition-colors">AI Vision Rover Kits</a></li>
              <li><a href="#stem-kits" class="hover:text-[#FF6B00] transition-colors">School STEM Lab Setup</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4 font-mono-code">Prestige Clients</h4>
            <ul class="space-y-2.5 text-xs text-slate-400">
              <li><span class="text-white font-semibold">IIT Jodhpur</span> Campus System</li>
              <li><span class="text-white font-semibold">DPS Indirapuram</span> Robotics &amp; Management</li>
              <li>Enterprise Tech Clients</li>
              <li>Educational Institutions</li>
            </ul>
          </div>
        </div>

        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Orange Future Tech. All rights reserved. Built with React &amp; Spatial UI.
          </div>
          <div class="flex items-center gap-6">
            <a href="#" class="hover:text-[#FF6B00] transition-colors">Privacy Policy</a>
            <a href="#" class="hover:text-[#FF6B00] transition-colors">Terms of Service</a>
            <a href="#" class="hover:text-[#FF6B00] transition-colors">Vercel Hosted</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
