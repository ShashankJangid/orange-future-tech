import React, { useState, useEffect } from 'react';
import ThreeBackground from './components/ThreeBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RoiCalculatorSection from './components/RoiCalculatorSection';
import SchoolSolutionsSection from './components/SchoolSolutionsSection';
import CardGenMarketingSection from './components/CardGenMarketingSection';
import TechUpgradePitchSection from './components/TechUpgradePitchSection';
import AiAgentRosterSection from './components/AiAgentRosterSection';
import DeploymentRoadmapSection from './components/DeploymentRoadmapSection';
import Highlights from './components/Highlights';
import Verticals from './components/Verticals';
import BentoGridSection from './components/BentoGridSection';
import IsometricStageSection from './components/IsometricStageSection';
import HardwareCodePlayground from './components/HardwareCodePlayground';
import ElectronicsSolutionsSection from './components/ElectronicsSolutionsSection';
import StaggerTestimonials from './components/StaggerTestimonials';
import AiAssistantModal from './components/AiAssistantModal';
import FloatingChatWidget from './components/FloatingChatWidget';
import AdminAuthModal from './components/AdminAuthModal';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { Layers, School, CreditCard, Code2, Cpu, Users, MessageSquareText, ChevronRight, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [aiOpen, setAiOpen] = useState(false);
  const [adminAuthOpen, setAdminAuthOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeLayer, setActiveLayer] = useState('overview');

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['overview', 'schools', 'cardgen', 'enterprise', 'electronics', 'clients', 'contact'].includes(hash)) {
        setActiveLayer(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const changeLayer = (layerId) => {
    setActiveLayer(layerId);
    window.location.hash = layerId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const layersList = [
    { id: 'overview', name: 'Overview', icon: Layers, desc: 'Master showcase & live interactive engines' },
    { id: 'schools', name: 'School AI & 360° VR', icon: School, desc: '₹2-3 Lakh AI Websites + ₹60,000 360° Tours' },
    { id: 'cardgen', name: 'CardGen ID Suite', icon: CreditCard, desc: 'Automated bulk school ID card generator' },
    { id: 'enterprise', name: 'Web & AI Tech', icon: Code2, desc: 'High-concurrency React & cloud platforms' },
    { id: 'electronics', name: 'PCB & Hardware', icon: Cpu, desc: 'Multi-layer PCB schematics & firmware' },
    { id: 'clients', name: 'Client Proof', icon: Users, desc: 'Original campus photos & leader outcomes' },
    { id: 'contact', name: 'Instant Quote', icon: MessageSquareText, desc: 'Direct cost estimator & team access' },
  ];

  return (
    <div className={`relative min-h-screen transition-colors duration-300 font-apple overflow-x-hidden selection:bg-[#FF6B00] selection:text-white ${
      darkMode ? 'bg-[#080B11] text-slate-100' : 'bg-white text-slate-900'
    }`}>
      <ThreeBackground darkMode={darkMode} />
      
      <Navbar
        activeLayer={activeLayer}
        setActiveLayer={changeLayer}
        onOpenAi={() => setAiOpen(true)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="pt-16 border-b border-slate-200/80 bg-slate-50/70 backdrop-blur-sm sticky top-16 z-40 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-500 font-mono-code">
            <span className="font-bold text-slate-700">Page Layer:</span>
            <span className="px-2 py-0.5 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] font-bold">
              {layersList.find(l => l.id === activeLayer)?.name || 'Overview'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {layersList.map((layer) => {
              const Icon = layer.icon;
              const isActive = activeLayer === layer.id;
              return (
                <button
                  key={layer.id}
                  onClick={() => changeLayer(layer.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{layer.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <main className="relative z-10">
        {activeLayer !== 'overview' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2">
            <button
              onClick={() => changeLayer('overview')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Overview</span>
            </button>
          </div>
        )}

        {activeLayer === 'overview' && (
          <>
            <Hero onOpenAi={() => setAiOpen(true)} darkMode={darkMode} setActiveLayer={changeLayer} />
            
            <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 mb-3">
                  <Layers className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>Explore Website Layers</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Clear, Focused Engineering Solutions
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl mx-auto">
                  Click any layer to inspect dedicated architecture, calculators, live demos, and verified outcomes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {layersList.filter(l => l.id !== 'overview').map((layer) => {
                  const Icon = layer.icon;
                  return (
                    <button
                      key={layer.id}
                      onClick={() => changeLayer(layer.id)}
                      className="p-5 rounded-2xl border border-slate-200/80 bg-white hover:border-[#FF6B00]/60 hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
                    >
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                          {layer.name}
                        </h3>
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                          {layer.desc}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#FF6B00]">
                        <span>Open Layer</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            <SchoolSolutionsSection darkMode={darkMode} setActiveLayer={changeLayer} />
            <CardGenMarketingSection darkMode={darkMode} setActiveLayer={changeLayer} />
            <TechUpgradePitchSection darkMode={darkMode} />
            <Verticals onOpenAi={() => setAiOpen(true)} darkMode={darkMode} />
            <Highlights darkMode={darkMode} />
            <StaggerTestimonials darkMode={darkMode} />
            <RoiCalculatorSection darkMode={darkMode} />
            <ContactSection darkMode={darkMode} />
          </>
        )}

        {activeLayer === 'schools' && (
          <div className="space-y-8">
            <SchoolSolutionsSection darkMode={darkMode} setActiveLayer={changeLayer} />
            <TechUpgradePitchSection darkMode={darkMode} />
            <StaggerTestimonials darkMode={darkMode} />
            <ContactSection darkMode={darkMode} />
          </div>
        )}

        {activeLayer === 'cardgen' && (
          <div className="space-y-8">
            <CardGenMarketingSection darkMode={darkMode} setActiveLayer={changeLayer} />
            <SchoolSolutionsSection darkMode={darkMode} setActiveLayer={changeLayer} />
            <StaggerTestimonials darkMode={darkMode} />
            <ContactSection darkMode={darkMode} />
          </div>
        )}

        {activeLayer === 'enterprise' && (
          <div className="space-y-8">
            <Verticals onOpenAi={() => setAiOpen(true)} darkMode={darkMode} />
            <Highlights darkMode={darkMode} />
            <BentoGridSection darkMode={darkMode} />
            <AiAgentRosterSection darkMode={darkMode} />
            <DeploymentRoadmapSection darkMode={darkMode} />
            <ContactSection darkMode={darkMode} />
          </div>
        )}

        {activeLayer === 'electronics' && (
          <div className="space-y-8">
            <ElectronicsSolutionsSection onOpenAi={() => setAiOpen(true)} darkMode={darkMode} />
            <HardwareCodePlayground darkMode={darkMode} />
            <IsometricStageSection darkMode={darkMode} />
            <ContactSection darkMode={darkMode} />
          </div>
        )}

        {activeLayer === 'clients' && (
          <div className="space-y-8">
            <StaggerTestimonials darkMode={darkMode} />
            <Highlights darkMode={darkMode} />
            <SchoolSolutionsSection darkMode={darkMode} setActiveLayer={changeLayer} />
            <ContactSection darkMode={darkMode} />
          </div>
        )}

        {activeLayer === 'contact' && (
          <div className="space-y-8">
            <RoiCalculatorSection darkMode={darkMode} />
            <ContactSection darkMode={darkMode} />
          </div>
        )}
      </main>

      <Footer darkMode={darkMode} />
      
      <FloatingChatWidget
        isOpen={aiOpen}
        onToggle={() => setAiOpen(!aiOpen)}
        onClose={() => setAiOpen(false)}
        darkMode={darkMode}
      />
      
      <AdminAuthModal isOpen={adminAuthOpen} onClose={() => setAdminAuthOpen(false)} darkMode={darkMode} />
    </div>
  );
}
