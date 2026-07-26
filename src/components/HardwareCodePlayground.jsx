import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Check, Copy, CircuitBoard } from 'lucide-react';

export default function HardwareCodePlayground({ darkMode }) {
  const [activeMode, setActiveMode] = useState('code');
  const [copied, setCopied] = useState(false);

  const sampleCode = `#include <OrangeBot.h>
#include <WiFi.h>

#define MOTOR_PIN_A 18
#define MOTOR_PIN_B 19

OrangeBot bot;

void setup() {
  Serial.begin(115200);
  bot.initHardware(MOTOR_PIN_A, MOTOR_PIN_B);
  bot.connectCloud("orangefuturetech.com");
  Serial.println("SYS: Hardware Online - IIT Jodhpur Spec");
}

void loop() {
  bot.telemetrySync();
  delay(50);
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(sampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="playground" class="py-16 relative z-10">
      <div class="max-w-5xl mx-auto px-4">
        <div class="text-center mb-10">
          <span class="text-xs font-mono-code uppercase tracking-wider text-[#FF6B00]">Interactive Tech Lab</span>
          <h2 class={`text-2xl sm:text-3xl font-bold font-['Orbitron',sans-serif] mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            HARDWARE &amp; CODE FUSION
          </h2>
        </div>

        <div class={`rounded-xl border overflow-hidden shadow-lg ${
          darkMode ? 'bg-[#0B0F17] border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div class={`px-5 py-3 border-b flex flex-wrap items-center justify-between gap-3 ${
            darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
              <span class="text-xs font-mono-code text-slate-400 ml-2 hidden sm:inline">orange_controller_firmware.cpp</span>
            </div>

            <div class="flex items-center gap-2">
              <button
                onClick={() => setActiveMode('code')}
                class={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeMode === 'code'
                    ? 'bg-[#FF6B00] text-white'
                    : darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Code2 class="w-3.5 h-3.5" />
                <span>Firmware C++</span>
              </button>

              <button
                onClick={() => setActiveMode('hardware')}
                class={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeMode === 'hardware'
                    ? 'bg-[#FF6B00] text-white'
                    : darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Cpu class="w-3.5 h-3.5" />
                <span>PCB Hardware</span>
              </button>
            </div>

            {activeMode === 'code' && (
              <button
                onClick={copyCode}
                class={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono-code border transition-colors ${
                  darkMode ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-700'
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                class="font-mono-code text-xs text-slate-300 overflow-x-auto leading-relaxed"
              >
                <pre class="text-[#00F0FF]">
                  <code>{sampleCode}</code>
                </pre>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                class="py-6 flex flex-col items-center justify-center text-center"
              >
                <div class="w-full max-w-md p-5 rounded-lg bg-slate-950 border border-slate-800 flex flex-col items-center gap-3">
                  <div class="flex items-center gap-6">
                    <div class="p-3 rounded-lg bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]">
                      <Cpu class="w-6 h-6" />
                      <span class="block text-[10px] font-mono-code mt-1">ESP32 SOC</span>
                    </div>

                    <div class="h-0.5 w-12 bg-[#FF6B00]"></div>

                    <div class="p-3 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500">
                      <CircuitBoard class="w-6 h-6" />
                      <span class="block text-[10px] font-mono-code mt-1">DRIVER</span>
                    </div>
                  </div>

                  <div class="text-[11px] font-mono-code text-slate-400">
                    STATUS: Custom 4-Layer PCB Layout // SMT Assembled
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
