import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Cpu, Check, Copy, CircuitBoard, Zap, Radio } from 'lucide-react';

export default function HardwareCodePlayground({ darkMode }) {
  const [activeMode, setActiveMode] = useState('code');
  const [copied, setCopied] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('esp32');

  const sampleCode = `#include <OrangeBot.h>
#include <WiFi.h>

#define MOTOR_PIN_A 18
#define MOTOR_PIN_B 19

OrangeBot bot;

void setup() {
  Serial.begin(115200);
  bot.initHardware(MOTOR_PIN_A, MOTOR_PIN_B);
  bot.connectCloud("orangefuturetech.com");
  Serial.println("SYS: Hardware & Firmware Online");
}

void loop() {
  bot.telemetrySync();
  delay(50);
}`;

  const pcbComponents = {
    esp32: {
      name: 'ESP32-S3 Dual Core SoC',
      type: '2.4 GHz Wi-Fi & BLE 5.0',
      pins: '38-pin QFN Vector IC',
      voltage: '3.3V DC (240MHz)',
      details: 'Primary System-on-Chip handling high-concurrency cloud telemetry and real-time motor signals.',
      vectorColor: '#FF6B00'
    },
    driver: {
      name: 'L298N Dual H-Bridge Driver',
      type: 'High Power Motor Controller',
      pins: '15-Lead Multiwatt Package',
      voltage: '5V - 35V DC (2A per bridge)',
      details: 'Controls dual DC motor direction and PWM speed for industrial automated rovers.',
      vectorColor: '#00F0FF'
    },
    power: {
      name: 'LM2596 Voltage Regulator',
      type: 'Step-Down DC-DC Converter',
      pins: 'TO-263 Surface Mount',
      voltage: '12V Input -> 5V/3.3V Output',
      details: 'High-efficiency switching regulator maintaining stable power logic for sensitive IC sensors.',
      vectorColor: '#10B981'
    },
    lora: {
      name: 'SX1276 LoRa Telemetry IC',
      type: 'Long Range RF Transceiver',
      pins: 'SPI Bus Interface',
      voltage: '868/915 MHz Frequency',
      details: 'Enables 10km+ long-range industrial sensor communication for campus IoT deployment.',
      vectorColor: '#8A2BE2'
    }
  };

  const currentComp = pcbComponents[selectedComponent];

  const copyCode = () => {
    navigator.clipboard.writeText(sampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="playground" class="py-20 relative z-10">
      <div class="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          class="text-center mb-12"
        >
          <span class="text-xs font-mono-code uppercase tracking-wider text-[#FF6B00] font-semibold">Interactive Tech Lab</span>
          <h2 class={`text-3xl sm:text-4xl font-bold font-['Orbitron',sans-serif] mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            HARDWARE &amp; CODE FUSION
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          class={`rounded-2xl border overflow-hidden shadow-2xl ${
            darkMode ? 'bg-[#0B0F17] border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div class={`px-5 py-3.5 border-b flex flex-wrap items-center justify-between gap-3 ${
            darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-red-500/80"></span>
              <span class="w-3 h-3 rounded-full bg-yellow-500/80"></span>
              <span class="w-3 h-3 rounded-full bg-green-500/80"></span>
              <span class={`text-xs font-mono-code ml-2 hidden sm:inline ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {activeMode === 'code' ? 'orange_firmware.cpp' : '4-Layer_PCB_Schematic_CAD.vct'}
              </span>
            </div>

            <div class="flex items-center gap-2">
              <button
                onClick={() => setActiveMode('code')}
                class={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeMode === 'code'
                    ? 'bg-[#FF6B00] text-white shadow-md'
                    : darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Code2 class="w-3.5 h-3.5" />
                <span>Firmware C++</span>
              </button>

              <button
                onClick={() => setActiveMode('hardware')}
                class={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeMode === 'hardware'
                    ? 'bg-[#FF6B00] text-white shadow-md'
                    : darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Cpu class="w-3.5 h-3.5" />
                <span>PCB Hardware View</span>
              </button>
            </div>

            {activeMode === 'code' && (
              <button
                onClick={copyCode}
                class={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono-code border transition-all cursor-pointer ${
                  darkMode ? 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white' : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {copied ? <Check class="w-3.5 h-3.5 text-green-400" /> : <Copy class="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            )}
          </div>

          <div class="p-6 bg-[#080B11]">
            {activeMode === 'code' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                class="font-mono-code text-xs text-slate-300 overflow-x-auto leading-relaxed"
              >
                <pre class="text-[#00F0FF]">
                  <code>{sampleCode}</code>
                </pre>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                class="space-y-6"
              >
                <div class="flex flex-wrap gap-2.5 justify-center">
                  <button
                    onClick={() => setSelectedComponent('esp32')}
                    class={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono-code transition-all cursor-pointer border ${
                      selectedComponent === 'esp32'
                        ? 'bg-[#FF6B00] text-white border-[#FF6B00] shadow-md'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <Cpu class="w-3.5 h-3.5" />
                    <span>ESP32 SoC</span>
                  </button>

                  <button
                    onClick={() => setSelectedComponent('driver')}
                    class={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono-code transition-all cursor-pointer border ${
                      selectedComponent === 'driver'
                        ? 'bg-[#00F0FF] text-slate-950 font-bold border-[#00F0FF] shadow-md'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <CircuitBoard class="w-3.5 h-3.5" />
                    <span>Motor Driver IC</span>
                  </button>

                  <button
                    onClick={() => setSelectedComponent('power')}
                    class={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono-code transition-all cursor-pointer border ${
                      selectedComponent === 'power'
                        ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-500 shadow-md'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <Zap class="w-3.5 h-3.5" />
                    <span>Power Regulator</span>
                  </button>

                  <button
                    onClick={() => setSelectedComponent('lora')}
                    class={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono-code transition-all cursor-pointer border ${
                      selectedComponent === 'lora'
                        ? 'bg-purple-500 text-white border-purple-500 shadow-md'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <Radio class="w-3.5 h-3.5" />
                    <span>LoRa Radio</span>
                  </button>
                </div>

                <div class="relative w-full rounded-2xl bg-slate-950 border border-slate-800 p-6 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
                  <div class="flex-1 w-full flex items-center justify-center p-4 bg-[#0B0F17] rounded-xl border border-slate-800/80 shadow-inner">
                    <svg viewBox="0 0 300 200" class="w-full max-w-xs h-auto">
                      <rect x="20" y="20" width="260" height="160" rx="10" fill="#0A1812" stroke="#10B981" stroke-width="2" />
                      
                      <line x1="40" y1="20" x2="40" y2="180" stroke="#047857" stroke-width="1" stroke-dasharray="4,4" />
                      <line x1="260" y1="20" x2="260" y2="180" stroke="#047857" stroke-width="1" stroke-dasharray="4,4" />

                      <path d="M 60 50 L 120 50 L 150 100 L 220 100" fill="none" stroke={currentComp.vectorColor} stroke-width="2" stroke-linecap="round" />
                      <path d="M 60 140 L 100 140 L 150 100 L 240 140" fill="none" stroke={currentComp.vectorColor} stroke-width="2" stroke-linecap="round" opacity="0.6" />

                      <circle cx="150" cy="100" r="5" fill={currentComp.vectorColor} />
                      <circle cx="60" cy="50" r="4" fill="#34D399" />
                      <circle cx="220" cy="100" r="4" fill="#34D399" />

                      <rect x="110" y="70" width="80" height="60" rx="6" fill="#1E293B" stroke={currentComp.vectorColor} stroke-width="2" />
                      
                      <rect x="118" y="78" width="8" height="8" fill={currentComp.vectorColor} />
                      <rect x="130" y="78" width="8" height="8" fill={currentComp.vectorColor} />
                      <rect x="142" y="78" width="8" height="8" fill={currentComp.vectorColor} />
                      <rect x="154" y="78" width="8" height="8" fill={currentComp.vectorColor} />
                      <rect x="166" y="78" width="8" height="8" fill={currentComp.vectorColor} />
                      
                      <text x="150" y="112" font-family="monospace" font-size="9" fill="#FFFFFF" text-anchor="middle" font-weight="bold">
                        {selectedComponent.toUpperCase()}
                      </text>
                    </svg>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedComponent}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.25 }}
                      class="flex-1 w-full space-y-3"
                    >
                      <div class="flex items-center gap-2">
                        <span 
                          class="w-2.5 h-2.5 rounded-full" 
                          style={{ backgroundColor: currentComp.vectorColor }}
                        ></span>
                        <span class="text-xs font-mono-code text-slate-400 uppercase font-semibold">{currentComp.type}</span>
                      </div>

                      <h4 class="text-lg font-bold text-white font-['Orbitron',sans-serif]">
                        {currentComp.name}
                      </h4>

                      <p class="text-xs text-slate-300 leading-relaxed font-normal">
                        {currentComp.details}
                      </p>

                      <div class="grid grid-cols-2 gap-2.5 pt-2 text-[11px] font-mono-code">
                        <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                          <span class="text-slate-500 block">FOOTPRINT</span>
                          <span class="text-white font-semibold">{currentComp.pins}</span>
                        </div>
                        <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                          <span class="text-slate-500 block">VOLTAGE / BUS</span>
                          <span class="text-white font-semibold">{currentComp.voltage}</span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
