import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, CheckCircle2, Sparkles, Building2, Award } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Dr. R. K. Sharma",
    role: "Head of Research Systems",
    organization: "Indian Institute of Technology (IIT)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    tag: "Academic Cloud Architecture",
    rating: 5,
    quote: "Orange Future Tech engineered a high-concurrency academic portal handling millions of requests with zero latency. Their architectural rigor and execution speed exceeded every benchmark.",
    metric: "99.99% Uptime",
    verified: true
  },
  {
    id: 2,
    name: "S. Mukherjee",
    role: "Director of Digital Infrastructure",
    organization: "Delhi Public School (DPS)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    tag: "Campus Cloud Platform",
    rating: 5,
    quote: "The multi-campus management software revolutionized our entire academic workflow across 40,000+ students and faculty. Truly world-class full-stack engineering.",
    metric: "40k+ Active Users",
    verified: true
  },
  {
    id: 3,
    name: "A. Khurana",
    role: "VP of Supply Chain Operations",
    organization: "Shipmate Logistics",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    tag: "Real-Time IoT Telemetry",
    rating: 5,
    quote: "Real-time hardware telemetry and automated cloud dispatching transformed our fleet efficiency. The embedded sensors and web dashboard work in absolute synchrony.",
    metric: "3.2x Faster Dispatch",
    verified: true
  },
  {
    id: 4,
    name: "Vikram Patel",
    role: "Chief Technology Officer",
    organization: "NexGen Industrial Robotics",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    tag: "Custom Multi-Layer PCB",
    rating: 5,
    quote: "Their multi-layer PCB design and C++ embedded firmware achieved zero electromagnetic interference in high-voltage industrial testing. Exceptional hardware mastery.",
    metric: "6-Layer Impedance Match",
    verified: true
  },
  {
    id: 5,
    name: "Jennifer Ross",
    role: "Managing Partner",
    organization: "Apex Global Technology Ventures",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    tag: "Autonomous AI Engine",
    rating: 5,
    quote: "The autonomous AI sales pipeline generated a 340% surge in qualified inbound leads within 30 days. Orange Future Tech delivers unprecedented engineering ROI.",
    metric: "+340% Qualified Inbound",
    verified: true
  }
];

export default function StaggerTestimonials({ darkMode = true }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextTestimonial, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, activeIndex]);

  return (
    <section 
      id="testimonials"
      className={`py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300 ${
        darkMode ? 'bg-[#080B11]' : 'bg-slate-50'
      }`}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#FF6B00]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono-code mb-4 border bg-[#FF6B00]/10 border-[#FF6B00]/30 text-[#FF6B00]">
            <Award className="w-3.5 h-3.5" />
            <span>ENTERPRISE CLIENT VALIDATION</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-['Orbitron',sans-serif] ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Trusted by Leaders at <span className="text-[#FF6B00]">IIT, DPS &amp; Industry</span>
          </h2>
          <p className={`mt-4 text-sm sm:text-base leading-relaxed ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            See what institutions, CTOs, and global founders say about engineering precision, high-concurrency systems, and custom hardware delivered by Orange Future Tech.
          </p>
        </div>

        {/* Staggered Cards Showcase */}
        <div className="relative min-h-[460px] sm:min-h-[420px] flex items-center justify-center">
          <div className="w-full max-w-3xl relative">
            {testimonials.map((t, idx) => {
              // Calculate offset relative to active index
              const offset = (idx - activeIndex + testimonials.length) % testimonials.length;
              
              // Only render visible staggered cards (active, +1, +2)
              const isVisible = offset === 0 || offset === 1 || offset === 2;
              if (!isVisible) return null;

              // Stagger offsets
              let transformStyles = '';
              let zIndex = 30 - offset * 10;
              let opacity = 1 - offset * 0.28;
              let scale = 1 - offset * 0.05;
              let translateY = offset * 20;

              return (
                <div
                  key={t.id}
                  onClick={() => setActiveIndex(idx)}
                  style={{
                    zIndex,
                    opacity,
                    transform: `translateY(${translateY}px) scale(${scale})`,
                    transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className={`cursor-pointer rounded-3xl p-6 sm:p-8 md:p-10 border transition-shadow ${
                    offset === 0
                      ? darkMode
                        ? 'relative bg-[#0E131F] border-[#FF6B00]/40 shadow-[0_20px_60px_rgba(255,107,0,0.15)] ring-1 ring-[#FF6B00]/20'
                        : 'relative bg-white border-[#FF6B00]/40 shadow-[0_20px_60px_rgba(255,107,0,0.1)] ring-1 ring-[#FF6B00]/20'
                      : darkMode
                      ? 'absolute top-0 left-0 right-0 bg-[#0B0F18] border-slate-800 shadow-xl'
                      : 'absolute top-0 left-0 right-0 bg-slate-100/90 border-slate-200 shadow-lg'
                  }`}
                >
                  {/* Top Row: Tag, Rating & Quote Mark */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono-code font-semibold px-3 py-1 rounded-full bg-[#FF6B00]/15 text-[#FF6B00] border border-[#FF6B00]/30 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        {t.tag}
                      </span>
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <div className="text-[#FF6B00]/30 hidden sm:block">
                      <Quote className="w-8 h-8" />
                    </div>
                  </div>

                  {/* Quote Body */}
                  <p className={`text-base sm:text-lg md:text-xl font-medium leading-relaxed font-sans ${
                    darkMode ? 'text-slate-100' : 'text-slate-800'
                  }`}>
                    "{t.quote}"
                  </p>

                  {/* Bottom Row: Author & Metric */}
                  <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative shrink-0">
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-[#FF6B00]"
                        />
                        {t.verified && (
                          <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                      <div>
                        <h4 className={`text-sm font-bold font-['Orbitron',sans-serif] ${
                          darkMode ? 'text-white' : 'text-slate-900'
                        }`}>
                          {t.name}
                        </h4>
                        <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          {t.role} • <span className="text-[#FF6B00] font-semibold">{t.organization}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className={`text-xs font-mono-code px-3 py-1.5 rounded-xl border ${
                        darkMode 
                          ? 'bg-slate-900/90 text-emerald-400 border-emerald-500/30' 
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {t.metric}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Controls & Avatar Selector */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-3xl mx-auto">
          {/* Client Avatar Indicators */}
          <div className="flex items-center gap-2.5">
            {testimonials.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setActiveIndex(idx)}
                title={`${t.name} (${t.organization})`}
                className={`relative transition-all duration-300 rounded-full cursor-pointer ${
                  activeIndex === idx
                    ? 'ring-2 ring-[#FF6B00] ring-offset-2 ring-offset-[#080B11] scale-110'
                    : 'opacity-50 hover:opacity-100'
                }`}
              >
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Next / Previous Arrow Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevTestimonial}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                darkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-[#FF6B00]'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-[#FF6B00]'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono-code text-slate-500">
              0{activeIndex + 1} / 0{testimonials.length}
            </span>
            <button
              onClick={nextTestimonial}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                darkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-[#FF6B00]'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-[#FF6B00]'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
