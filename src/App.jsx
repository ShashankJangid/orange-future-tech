import React, { useState } from 'react';
import ThreeBackground from './components/ThreeBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Verticals from './components/Verticals';
import HardwareCodePlayground from './components/HardwareCodePlayground';
import ElectronicsSolutionsSection from './components/ElectronicsSolutionsSection';
import AiAssistantModal from './components/AiAssistantModal';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <div class="relative min-h-screen bg-[#080B11] text-slate-100 overflow-x-hidden selection:bg-[#FF6B00] selection:text-white">
      <ThreeBackground />
      <Navbar onOpenAi={() => setAiOpen(true)} />
      <main>
        <Hero onOpenAi={() => setAiOpen(true)} />
        <Highlights />
        <Verticals onOpenAi={() => setAiOpen(true)} />
        <HardwareCodePlayground />
        <ElectronicsSolutionsSection onOpenAi={() => setAiOpen(true)} />
        <ContactSection />
      </main>
      <Footer />
      <AiAssistantModal isOpen={aiOpen} onClose={() => setAiOpen(false)} />
    </div>
  );
}
