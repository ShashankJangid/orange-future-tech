import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, CheckCircle2, Sparkles, Building2, Award } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Dr. R. K. Sharma",
    role: "Head of Systems Architecture",
    organization: "Indian Institute of Technology (IIT)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    tag: "High-Concurrency Cloud Architecture",
    rating: 5,
    quote: "Orange Future Tech engineered an ultra-fast academic web application handling tens of thousands of concurrent users with sub-second response times. Their engineering rigor is unmatched.",
    metric: "99.99% Uptime",
    verified: true
  },
  {
    id: 2,
    name: "Dr. Anita Sen",
    role: "Vice Principal & Academic Director",
    organization: "Delhi Public School (DPS) Ecosystem",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    tag: "AI School Portal & 360° VR Tour",
    rating: 5,
    quote: "The combination of the 24/7 AI Admission Counselor and 360° Virtual Campus Tour dramatically elevated our parent conversions. Prospective parents from NCR and abroad can walk through our labs and classrooms instantly.",
    metric: "+280% Admission Queries",
    verified: true
  },
  {
    id: 3,
    name: "Rajesh Verma",
    role: "Director of Administration",
    organization: "Modern Heritage Public School",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
    tag: "CardGen ID Software Deployment",
    rating: 5,
    quote: "CardGen replaced weeks of vendor delays. We imported our 3,800 student register and generated verified, print-ready student ID cards with automated face alignment in under 5 minutes.",
    metric: "3,800 Cards in 5 Mins",
    verified: true
  },
  {
    id: 4,
    name: "Arjun Mehta",
    role: "Chief Technology Officer",
    organization: "NexGen Industrial Robotics",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
    tag: "Multi-Layer High-Speed PCB",
    rating: 5,
    quote: "Their multi-layer PCB routing and C++ firmware achieved flawless signal integrity under heavy motor noise. Hardware design of this precision is rare in the industry.",
    metric: "6-Layer Impedance Match",
    verified: true
  },
  {
    id: 5,
    name: "Dr. Sunita Kulkarni",
    role: "Dean of Computing & Information",
    organization: "Apex University & Research Labs",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80",
    tag: "Automated Workflow Engine",
    rating: 5,
    quote: "Working with Orange Future Tech was effortless. Fast sprints, transparent codebases, and production deployments that never break under heavy load.",
    metric: "Zero Downtime Deploy",
    verified: true
  }
];

export default function StaggerTestimonials({ darkMode = false }) {
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
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, activeIndex]);

  const current = testimonials[activeIndex];

  return (
    <section 
      id="testimonials"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white text-slate-900 border-t border-slate-200/80"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4 border bg-orange-50 border-orange-200 text-[#FF6B00]">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Educational &amp; Enterprise Proof</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            Trusted by India's Top <br />
            <span className="bg-gradient-to-r from-[#FF6B00] to-orange-600 bg-clip-text text-transparent">
              Schools, Universities &amp; Tech Leaders
            </span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Real outcomes from institutional leaders who trusted Orange Future Tech for their web platforms, AI admission systems, and automated ID infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 p-8 sm:p-10 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm relative">
            <Quote className="w-12 h-12 text-orange-200 absolute top-6 right-6 pointer-events-none" />

            <div className="flex items-center gap-1 text-amber-400 mb-4">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
              <span className="text-xs font-mono-code font-bold text-slate-600 ml-2">
                5.0 Verified Review
              </span>
            </div>

            <p className="text-base sm:text-xl text-slate-800 font-medium leading-relaxed mb-8">
              "{current.quote}"
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-4">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-orange-400 shadow-xs"
                  loading="lazy"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-slate-900">{current.name}</h4>
                    {current.verified && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" title="Verified Institutional Leader" />
                    )}
                  </div>
                  <div className="text-xs text-slate-500">{current.role}</div>
                  <div className="text-xs font-bold text-[#FF6B00]">{current.organization}</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs text-left sm:text-right">
                <span className="text-[11px] text-slate-500 uppercase font-mono-code font-semibold">Key Benchmark</span>
                <div className="text-sm font-extrabold text-[#FF6B00] font-mono-code">{current.metric}</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-3">
            {testimonials.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setActiveIndex(idx)}
                className={`w-full p-4 rounded-xl text-left border transition-all cursor-pointer flex items-center gap-3.5 ${
                  activeIndex === idx
                    ? 'bg-orange-50/80 border-[#FF6B00] shadow-xs'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-900 truncate">{t.name}</div>
                  <div className="text-[11px] text-slate-500 truncate">{t.organization}</div>
                  <div className="text-[10px] font-mono-code text-[#FF6B00] mt-0.5 truncate">{t.tag}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prevTestimonial}
            className="p-2.5 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="text-xs font-mono-code font-bold text-slate-500">
            {activeIndex + 1} / {testimonials.length}
          </div>
          <button
            onClick={nextTestimonial}
            className="p-2.5 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
