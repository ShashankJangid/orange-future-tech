import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Code2, Play, Check, Copy, RefreshCw, Zap, CircuitBoard } from 'lucide-react';

export default function HardwareCodePlayground() {
  const [activeMode, setActiveMode] = useState('code');
  const [copied, setCopied] = useState(false);

  const sampleCode = `#include <OrangeBot.h>
#include <WiFi.h>

#define MOTOR_PIN_A 18
#define MOTOR_PIN_B 19
#define SENSOR_TRIG  5
#define SENSOR_ECHO 18

OrangeBot bot;
WiFiClient client;

void setup() {
  Serial.begin(115200);
  bot.initHardware(MOTOR_PIN_A, MOTOR_PIN_B);
  bot.connectCloud("orangefuturetech.com");
  Serial.println("SYS: Hardware Online - IIT Jodhpur Spec");
}

void loop() {
  float distance = bot.readUltrasonic(SENSOR_TRIG, SENSOR_ECHO);
  if (distance < 15.0) {
    bot.stopMotors();
    bot.triggerObstacleAvoidance();
  } else {
    bot.driveForward(85);
  }
  bot.telemetrySync();
  delay(50);
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(sampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="playground" class="py-24 relative z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8A2BE2]/10 text-[#8A2BE2] border border-[#8A2BE2]/30 text-xs font-semibold uppercase tracking-wider mb-4">
            <CircuitBoard class="w-3.5 h-3.5" />
            <span>Interactive Tech Lab</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold font-['Orbitron',sans-serif] text-white tracking-tight mb-4">
            HARDWARE &amp; CODE <span class="text-gradient-cyan">FUSION</span>
          </h2>
          <p class="text-slate-400 text-base sm:text-lg">
            Switch between raw C++/Embedded Firmware and PCB Hardware schematics in real-time.
          </p>
        </div>

        <div class="glass-card rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <div class="bg-[#0D131F] px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-[#FF5500]"></span>
                <span class="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span class="w-3 h-3 rounded-full bg-green-500"></span>
              </div>
              <span class="text-xs font-mono-code text-slate-400 ml-3 hidden sm:inline">orange_controller_firmware.cpp</span>
            </div>

            <div class="flex items-center gap-2 bg-[#080B11] p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveMode('code')}
                class={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeMode === 'code'
                    ? 'bg-[#FF6B00] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code2 class="w-3.5 h-3.5" />
                <span>Firmware C++</span>
              </button>

              <button
                onClick={() => setActiveMode('hardware')}
                class={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeMode === 'hardware'
                    ? 'bg-[#00F0FF] text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Cpu class="w-3.5 h-3.5" />
                <span>PCB Hardware View</span>
              </button>
            </div>

            {activeMode === 'code' && (
              <button
                onClick={copyCode}
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 text-xs font-mono-code border border-slate-700 transition-colors"
              >
                {copied ? <Check class="w-3.5 h-3.5 text-green-400" /> : <Copy class="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            )}
          </div>

          <div class="p-6 sm:p-8 bg-[#080B11]">
            {activeMode === 'code' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                class="font-mono-code text-xs sm:text-sm text-slate-300 overflow-x-auto leading-relaxed"
              >
                <pre class="text-[#00F0FF]">
                  <code>{sampleCode}</code>
                </pre>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                class="py-8 px-4 flex flex-col items-center justify-center text-center"
              >
                <div class="relative w-full max-w-xl h-64 rounded-2xl bg-slate-950 border-2 border-dashed border-[#00F0FF]/40 p-6 flex flex-col items-center justify-center gap-4 overflow-hidden group">
                  <div class="absolute inset-0 bg-cyber-grid opacity-30"></div>
                  
                  <div class="relative z-10 flex items-center gap-8">
                    <div class="p-4 rounded-2xl bg-[#FF6B00]/20 border border-[#FF6B00] text-[#FF6B00] animate-bounce">
                      <Cpu class="w-8 h-8" />
                      <span class="block text-[10px] font-mono-code mt-1">ESP32 SOC</span>
                    </div>

                    <div class="h-0.5 w-16 bg-gradient-to-r from-[#FF6B00] to-[#00F0FF] relative">
                      <span class="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-mono-code text-[#00F0FF]">SPI / I2C</span>
                    </div>

                    <div class="p-4 rounded-2xl bg-[#00F0FF]/20 border border-[#00F0FF] text-[#00F0FF]">
                      <CircuitBoard class="w-8 h-8" />
                      <span class="block text-[10px] font-mono-code mt-1">L298N DRIVER</span>
                    </div>
                  </div>

                  <div class="relative z-10 text-xs font-mono-code text-slate-300 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800">
                    STATUS: Custom 4-Layer PCB Layout // Double Sided Copper Trace // SMT Assembled
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
