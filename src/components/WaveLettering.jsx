'use client';

import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from 'react';

const hexToRgb = (hex) => {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
};

const lerpRgb = (c1, c2, t) => {
  const clampT = Math.max(0, Math.min(1, t));
  return `rgb(${Math.round(c1.r + (c2.r - c1.r) * clampT)}, ${Math.round(c1.g + (c2.g - c1.g) * clampT)}, ${Math.round(c1.b + (c2.b - c1.b) * clampT)})`;
};

const WaveLettering = forwardRef(({
  text = ' Orange Future Tech',
  colors = ['#ff7c00', '#ca6700'],
  letterSpacing = 0.06,
  glyphSize = 18,
  rows = 17,
  perspective = 0.36,
  tilt = 30,
  horizon = 0.38,
  amplitude = 2.35,
  wavelength = 0.68,
  speed = 0.5,
  direction = 64,
  sharpness = 0.38,
  flow = 2.5,
  focusDepth = 0.22,
  depthOfField = 0.39,
  tension = 1.25,
  fontFamily = 'Outfit, sans-serif',
  fontWeight = 700,
  clickStrum = true,
  strumStrength = 1.2,
  sustain = 1.6,
  paused = false,
  className = '',
  style = {},
  children
}, ref) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const ripplesRef = useRef([]);
  const mouseFocusRef = useRef(focusDepth);
  const isHoveredRef = useRef(false);

  useImperativeHandle(ref, () => ({
    strum: (x = 0.5, y = 0.5) => {
      ripplesRef.current.push({
        x,
        y,
        startTime: performance.now(),
        duration: sustain * 1000,
        strength: strumStrength
      });
    }
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId;
    let lastTime = performance.now();
    let totalTime = 0;

    const color1 = hexToRgb(colors[0] || '#ff7c00');
    const color2 = hexToRgb(colors[1] || '#ca6700');

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(10, Math.floor(rect.width * dpr));
      canvas.height = Math.max(10, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    handleResize();
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const yNorm = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      mouseFocusRef.current = 1 - yNorm;
      isHoveredRef.current = true;
    };

    const onPointerLeave = () => {
      isHoveredRef.current = false;
    };

    const onPointerDown = (e) => {
      if (!clickStrum) return;
      const rect = container.getBoundingClientRect();
      const xNorm = (e.clientX - rect.left) / rect.width;
      const yNorm = (e.clientY - rect.top) / rect.height;
      ripplesRef.current.push({
        x: xNorm,
        y: yNorm,
        startTime: performance.now(),
        duration: sustain * 1000,
        strength: strumStrength
      });
    };

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerleave', onPointerLeave);
    container.addEventListener('pointerdown', onPointerDown);

    const dirRad = (direction * Math.PI) / 180;
    const cosDir = Math.cos(dirRad);
    const sinDir = Math.sin(dirRad);

    const render = (now) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (!paused) {
        totalTime += dt * speed;
      }

      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const targetFocus = isHoveredRef.current ? mouseFocusRef.current : focusDepth;
      const activeFocus = targetFocus;

      const activeRipples = ripplesRef.current.filter(r => (now - r.startTime) < r.duration);
      ripplesRef.current = activeRipples;

      const effectiveRows = Math.max(2, rows);
      const rowStep = 1 / (effectiveRows - 1);

      for (let rIndex = 0; rIndex < effectiveRows; rIndex++) {
        const depth = 1 - (rIndex * rowStep);
        const zFactor = Math.pow(depth, 1.2 + perspective * 0.8);
        const scale = (1 - perspective * 0.75) + (perspective * 0.75) * depth;
        const currentGlyphSize = Math.max(9, glyphSize * scale);
        
        const baseY = height * horizon + (height * (1 - horizon)) * depth;
        
        const distToFocus = Math.abs(depth - activeFocus);
        const blurFactor = Math.min(1, distToFocus / (0.3 + depthOfField * 0.4));
        const alpha = Math.max(0.18, 1 - blurFactor * depthOfField * 0.75);

        ctx.font = `${fontWeight} ${currentGlyphSize}px ${fontFamily}`;
        ctx.textBaseline = 'middle';

        const sampleText = text.trim() === '' ? ' ORANGE FUTURE TECH ' : text;
        const letterSpacingPx = currentGlyphSize * letterSpacing;
        
        const stringWidth = ctx.measureText(sampleText).width + sampleText.length * letterSpacingPx;
        if (stringWidth <= 0) continue;

        const xOffsetBase = (totalTime * flow * 25) % stringWidth;
        const startX = -stringWidth + (xOffsetBase < 0 ? xOffsetBase + stringWidth : xOffsetBase);

        const columns = Math.ceil((width + stringWidth * 2) / stringWidth) + 1;

        for (let c = -1; c < columns; c++) {
          let currX = startX + c * stringWidth;
          
          for (let charIdx = 0; charIdx < sampleText.length; charIdx++) {
            const char = sampleText[charIdx];
            const charW = ctx.measureText(char).width + letterSpacingPx;
            
            if (currX + charW >= -40 && currX <= width + 40) {
              const xNorm = currX / Math.max(1, width);
              const yNorm = depth;

              const wavePhase = (xNorm * cosDir + yNorm * sinDir) / Math.max(0.01, wavelength);
              let waveVal = Math.sin(wavePhase * Math.PI * 2 + totalTime * 3);
              
              if (sharpness > 0) {
                const sSign = Math.sign(waveVal);
                waveVal = sSign * Math.pow(Math.abs(waveVal), Math.max(0.2, 1 - sharpness * 0.5));
              }

              let strumDisplace = 0;
              for (let ripIdx = 0; ripIdx < activeRipples.length; ripIdx++) {
                const rip = activeRipples[ripIdx];
                const age = (now - rip.startTime) / rip.duration;
                const dX = xNorm - rip.x;
                const dY = (1 - depth) - rip.y;
                const dist = Math.sqrt(dX * dX + dY * dY * 2);
                const ring = Math.sin((dist * 18 * tension) - age * 12);
                const decay = Math.max(0, 1 - age) * Math.exp(-dist * 4);
                strumDisplace += ring * decay * rip.strength * 18;
              }

              const waveDisplace = (waveVal * amplitude * (currentGlyphSize * 0.75)) + strumDisplace;
              const drawY = baseY + waveDisplace;

              const colorT = Math.max(0, Math.min(1, (waveVal + 1) * 0.5));
              const charColor = lerpRgb(color2, color1, colorT);

              ctx.fillStyle = charColor;
              ctx.globalAlpha = alpha;

              if (depthOfField > 0.4 && blurFactor > 0.6) {
                ctx.filter = `blur(${Math.min(3, blurFactor * 2.5)}px)`;
              } else {
                ctx.filter = 'none';
              }

              ctx.fillText(char, currX, drawY);
            }
            currX += charW;
          }
        }
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerleave', onPointerLeave);
      container.removeEventListener('pointerdown', onPointerDown);
    };
  }, [
    text,
    colors,
    letterSpacing,
    glyphSize,
    rows,
    perspective,
    tilt,
    horizon,
    amplitude,
    wavelength,
    speed,
    direction,
    sharpness,
    flow,
    focusDepth,
    depthOfField,
    tension,
    fontFamily,
    fontWeight,
    clickStrum,
    strumStrength,
    sustain,
    paused
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[260px] overflow-hidden select-none ${className}`}
      style={style}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
      />
      {children && (
        <div className="relative z-10 w-full h-full pointer-events-none">
          {children}
        </div>
      )}
    </div>
  );
});

export default WaveLettering;
