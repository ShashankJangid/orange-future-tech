'use client';

import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

import './TextLoop.css';

const VIEW_W = 1200;
const VIEW_H = 260;
const CX = VIEW_W / 2;
const CY = VIEW_H / 2;
const EDGE_PAD = 12;

const buildPath = (shape, curviness, ribbonWidth) => {
  const c = Math.max(0, curviness);
  const room = Math.max(20, CY - Math.max(0, ribbonWidth) / 2 - EDGE_PAD);

  switch (shape) {
    case 'circle': {
      const r = Math.min(90 + c * 0.95, room);
      return `M ${CX - r} ${CY} A ${r} ${r} 0 1 1 ${CX + r} ${CY} A ${r} ${r} 0 1 1 ${CX - r} ${CY} Z`;
    }
    case 'infinity': {
      const r = 150 + c * 1.4;
      const h = Math.min(60 + c * 0.95, room);
      return [
        `M ${CX} ${CY}`,
        `C ${CX + r * 0.55} ${CY - h} ${CX + r} ${CY - h} ${CX + r} ${CY}`,
        `C ${CX + r} ${CY + h} ${CX + r * 0.55} ${CY + h} ${CX} ${CY}`,
        `C ${CX - r * 0.55} ${CY - h} ${CX - r} ${CY - h} ${CX - r} ${CY}`,
        `C ${CX - r} ${CY + h} ${CX - r * 0.55} ${CY + h} ${CX} ${CY}`,
        'Z'
      ].join(' ');
    }
    case 'arch': {
      const rise = Math.min(120 + c * 1.1, room * 2);
      return `M 120 ${CY + rise / 2} Q ${CX} ${CY - rise * 1.5} ${VIEW_W - 120} ${CY + rise / 2}`;
    }
    case 'line':
      return `M -400 ${CY} L ${VIEW_W + 400} ${CY}`;
    case 'wave':
    default: {
      const a = Math.min(c * 1.2, room);
      return `M -400 ${CY} Q -200 ${CY - a} 0 ${CY} T 400 ${CY} T 800 ${CY} T 1200 ${CY} T 1600 ${CY}`;
    }
  }
};

const TextLoop = ({
  text = 'React • Bits',
  shape = 'wave',
  path,
  speed = 60,
  direction = 'forward',
  separator = '•',
  curviness = 20,
  fontSize = 24,
  fontWeight = 800,
  letterSpacing = 2,
  uppercase = true,
  color = '#ffffff',
  ribbon = true,
  ribbonColor = '#F97316',
  ribbonWidth = 68,
  pauseOnHover = true,
  className = '',
  style = {}
}) => {
  const rootRef = useRef(null);
  const pathRef = useRef(null);
  const measureRef = useRef(null);
  const textPathRef = useRef(null);

  const [metrics, setMetrics] = useState({ length: 2000, unitWidth: 600, reps: 6 });

  const rawId = useId();
  const pathId = `text-loop-${rawId.replace(/:/g, '')}`;

  const d = useMemo(() => path || buildPath(shape, curviness, ribbonWidth), [path, shape, curviness, ribbonWidth]);

  const unit = useMemo(() => {
    const base = uppercase ? String(text).toUpperCase() : String(text);
    const gap = separator ? `\u00A0\u00A0\u00A0${separator}\u00A0\u00A0\u00A0` : '\u00A0\u00A0\u00A0\u00A0';
    return `${base}${gap}`;
  }, [text, separator, uppercase]);

  const textStyle = useMemo(
    () => ({ 
      fontSize: `${fontSize}px`, 
      fontWeight, 
      letterSpacing: `${letterSpacing}px`,
      fontFamily: 'Outfit, sans-serif'
    }),
    [fontSize, fontWeight, letterSpacing]
  );

  useLayoutEffect(() => {
    const pathEl = pathRef.current;
    const measureEl = measureRef.current;
    if (!pathEl || !measureEl) return undefined;

    let cancelled = false;

    const measure = () => {
      if (cancelled) return;
      let length = 0;
      let unitWidth = 0;
      try {
        length = pathEl.getTotalLength();
        unitWidth = measureEl.getComputedTextLength();
      } catch {
        return;
      }
      if (!length || !unitWidth) return;

      const reps = Math.max(3, Math.ceil((length + unitWidth * 2) / unitWidth) + 2);
      setMetrics(prev => (
        prev.length === length && prev.unitWidth === unitWidth && prev.reps === reps 
          ? prev 
          : { length, unitWidth, reps }
      ));
    };

    measure();
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }

    return () => {
      cancelled = true;
    };
  }, [d, unit, fontSize, fontWeight, letterSpacing]);

  useEffect(() => {
    const { unitWidth } = metrics;
    const textPathEl = textPathRef.current;
    if (!textPathEl || !unitWidth) return undefined;

    const apply = offset => {
      textPathEl.setAttribute('startOffset', String(offset));
    };

    apply(0);

    const prefersReduced =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || speed <= 0) return undefined;

    const state = { offset: 0 };
    const targetOffset = direction === 'reverse' ? unitWidth : -unitWidth;
    const tween = gsap.to(state, {
      offset: targetOffset,
      duration: unitWidth / speed,
      ease: 'none',
      repeat: -1,
      onUpdate: () => apply(state.offset)
    });

    const root = rootRef.current;
    const pause = () => tween.pause();
    const resume = () => tween.resume();

    if (pauseOnHover && root) {
      root.addEventListener('pointerenter', pause);
      root.addEventListener('pointerleave', resume);
    }

    return () => {
      tween.kill();
      if (pauseOnHover && root) {
        root.removeEventListener('pointerenter', pause);
        root.removeEventListener('pointerleave', resume);
      }
    };
  }, [metrics, speed, direction, pauseOnHover]);

  const loopText = unit.repeat(metrics.reps);

  return (
    <div ref={rootRef} className={`text-loop ${className}`.trim()} style={style}>
      <svg
        className="text-loop-svg"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={text}
      >
        <path
          ref={pathRef}
          id={pathId}
          d={d}
          fill="none"
          stroke={ribbon ? ribbonColor : 'none'}
          strokeWidth={ribbon ? ribbonWidth : 0}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <text ref={measureRef} className="text-loop-measure" style={textStyle} aria-hidden="true">
          {unit}
        </text>

        <text
          className="text-loop-text"
          style={textStyle}
          fill={color}
          dominantBaseline="central"
          alignmentBaseline="central"
          aria-hidden="true"
        >
          <textPath 
            ref={textPathRef} 
            href={`#${pathId}`} 
            xlinkHref={`#${pathId}`} 
            startOffset={0}
            dominantBaseline="central"
            alignmentBaseline="central"
          >
            {loopText}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default TextLoop;
