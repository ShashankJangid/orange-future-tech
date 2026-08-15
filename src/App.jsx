import React, { useState, useEffect } from 'react';
import ThreeBackground from './components/ThreeBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Verticals from './components/Verticals';
import BentoGridSection from './components/BentoGridSection';
import IsometricStageSection from './components/IsometricStageSection';
import HardwareCodePlayground from './components/HardwareCodePlayground';
import ElectronicsSolutionsSection from './components/ElectronicsSolutionsSection';
import AiAssistantModal from './components/AiAssistantModal';
import ApiKeysModal from './components/ApiKeysModal';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [aiOpen, setAiOpen] = useState(false);
  const [apiKeysOpen, setApiKeysOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div class={`relative min-h-screen transition-colors duration-300 font-apple overflow-x-hidden selection:bg-[#FF6B00] selection:text-white ${
      darkMode ? 'bg-[#080B11] text-slate-100' : 'bg-[#F8FAFC] text-slate-900'
    }`}>
      <ThreeBackground darkMode={darkMode} />
      <Navbar
        onOpenAi={() => setAiOpen(true)}
        onOpenApiKeys={() => setApiKeysOpen(true)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <main>
        <Hero onOpenAi={() => setAiOpen(true)} darkMode={darkMode} />
        <Highlights darkMode={darkMode} />
        <Verticals onOpenAi={() => setAiOpen(true)} darkMode={darkMode} />
        <BentoGridSection darkMode={darkMode} />
        <IsometricStageSection darkMode={darkMode} />
        <HardwareCodePlayground darkMode={darkMode} />
        <ElectronicsSolutionsSection onOpenAi={() => setAiOpen(true)} darkMode={darkMode} />
        <ContactSection darkMode={darkMode} />
      </main>
      <Footer darkMode={darkMode} />
      <AiAssistantModal isOpen={aiOpen} onClose={() => setAiOpen(false)} />
      <ApiKeysModal isOpen={apiKeysOpen} onClose={() => setApiKeysOpen(false)} darkMode={darkMode} />
    </div>
  );
}
