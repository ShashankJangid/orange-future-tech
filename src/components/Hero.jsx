import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Cpu, Play, School, CreditCard, ChevronRight, CheckCircle2, Globe, Eye, Flame } from 'lucide-react';
import WaveLettering from './WaveLettering';
import TextLoop from './TextLoop';

export default function Hero({ onOpenAi, darkMode, setActiveLayer }) {
  const quickMetrics = [
    { label: 'School Website Load Time', value: '< 0.8s', sub: 'CBSE & IB Ready' },
    { label: '360° Virtual Tour Quality', value: '8K HDR', sub: 'Interactive Hotspots' },
    { label: 'CardGen Card Speed', value: '1,000 / min', sub: 'Automated Face-Crop' },
    { label: 'SEO Lighthouse Score', value: '99 / 100', sub: 'Google Ranked First' },
  ];

  return (
    <section className={`relative pt-10 pb-12 sm:pt-14 sm:pb-16 overflow-hidden transition-colors duration-300 ${
      darkMode ? 'bg-[#080B11] text-white' : 'bg-white text-slate-900'
    }`}>
      <div className="absolute top-0 inset-x-0 h-96 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(255,107,0,0.12),rgba(255,255,255,0))] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 border shadow-xs ${
            darkMode ? 'bg-orange-950/40 border-orange-800 text-orange-400' : 'bg-orange-50/80 border-orange-200/80 text-[#FF6B00]'
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>PREMIER DELHI NCR SCHOOL WEBSITES &amp; ENTERPRISE SOFTWARE</span>
          </div>

          <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6 ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Websites Built for <br />
            <span className="bg-gradient-to-r from-[#FF6B00] via-amber-500 to-orange-600 bg-clip-text text-transparent">
              Speed, AI &amp; Authenticity
            </span>
          </h1>

          <p className={`text-base sm:text-xl max-w-3xl mx-auto mb-8 font-normal leading-relaxed ${
            darkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            We build high-converting, sub-second AI websites for top Delhi NCR schools (₹2-3 Lakh), immersive 360° Virtual Campus Tours (₹60,000 setup), CardGen automated student ID software, and enterprise full-stack software.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-8">
            <button
              onClick={() => {
                if (setActiveLayer) {
                  setActiveLayer('schools');
                  window.location.hash = 'schools';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="px-6 py-3.5 rounded-full bg-[#FF6B00] text-white text-sm font-semibold hover:bg-[#e05e00] transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
            >
              <School className="w-4 h-4" />
              <span>School Websites &amp; 360° Tours</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                if (setActiveLayer) {
                  setActiveLayer('cardgen');
                  window.location.hash = 'cardgen';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={`px-6 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer ${
                darkMode ? 'bg-white text-slate-900 hover:bg-slate-100' : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>CardGen ID Suite</span>
            </button>

            <button
              onClick={() => {
                if (setActiveLayer) {
                  setActiveLayer('contact');
                  window.location.hash = 'contact';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={`px-6 py-3.5 rounded-full text-sm font-semibold border transition-all duration-200 flex items-center gap-2 shadow-xs cursor-pointer ${
                darkMode ? 'bg-[#0E131F] text-slate-200 border-slate-700 hover:bg-slate-800' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>Instant Quote Calculator</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        <div className={`w-full my-6 overflow-hidden py-3 border-y transition-colors ${
          darkMode ? 'border-slate-800 bg-orange-950/20' : 'border-slate-200/80 bg-orange-50/40'
        }`}>
          <TextLoop
            text="Orange Future Tech • AI Website • 360° Virtual Tours • CardGen Suite"
            shape="wave"
            speed={60}
            direction="forward"
            separator="•"
            curviness={20}
            fontSize={26}
            fontWeight={800}
            letterSpacing={2}
            uppercase
            color="#ffffff"
            ribbon
            ribbonColor="#F97316"
            ribbonWidth={72}
            pauseOnHover={false}
          />
        </div>

        <div className={`w-full my-6 rounded-2xl overflow-hidden border shadow-sm relative transition-colors ${
          darkMode ? 'border-slate-800 bg-[#0E131F]' : 'border-slate-200/80 bg-gradient-to-b from-orange-50/40 via-white to-slate-50'
        }`}>
          <div className={`px-6 pt-4 pb-2 flex items-center justify-between border-b backdrop-blur-sm ${
            darkMode ? 'border-slate-800 bg-[#0E131F]/90 text-slate-300' : 'border-slate-200/60 bg-white/70 text-slate-600'
          }`}>
            <div className="flex items-center gap-2 text-xs font-mono-code font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] animate-ping" />
              <span>Interactive Wave Lettering Engine</span>
            </div>
            <div className={`text-[11px] font-mono-code ${darkMode ? 'text-slate-400' : 'text-slate-400'}`}>
              Click or drag to strum ripples · Depth of field responsive
            </div>
          </div>
          
          <div className="h-[360px] sm:h-[420px] w-full relative">
            <WaveLettering
              text={" Orange Future Tech"}
              colors={darkMode ? ["#FF8400", "#FFA94D"] : ["#ff7c00", "#e05e00"]}
              letterSpacing={0.08}
              glyphSize={16}
              rows={14}
              perspective={0.32}
              tilt={22}
              horizon={0.12}
              amplitude={1.1}
              wavelength={0.72}
              speed={0.5}
              direction={64}
              sharpness={0.36}
              flow={2.0}
              focusDepth={0.22}
              depthOfField={0.35}
              tension={1.25}
            />
          </div>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t ${
          darkMode ? 'border-slate-800' : 'border-slate-200/80'
        }`}>
          {quickMetrics.map((m, idx) => (
            <div key={idx} className={`p-4 rounded-xl border text-left transition-colors ${
              darkMode ? 'bg-[#0E131F] border-slate-800' : 'bg-slate-50/80 border-slate-200/80'
            }`}>
              <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>{m.value}</div>
              <div className={`text-xs font-bold mt-1 ${
                darkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>{m.label}</div>
              <div className="text-[11px] font-mono-code text-[#FF6B00] mt-0.5">{m.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
