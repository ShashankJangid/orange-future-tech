import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';

export default function SplineLogo({ className = "w-12 h-12" }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div class={`relative overflow-hidden shrink-0 flex items-center justify-center ${className}`}>
      {!loaded && !error && (
        <img
          src="/logo.jpg"
          alt="Orange Future Tech Logo"
          class="w-full h-full object-cover rounded-xl shadow-sm"
        />
      )}

      {error ? (
        <img
          src="/logo.jpg"
          alt="Orange Future Tech Logo"
          class="w-full h-full object-cover rounded-xl shadow-sm"
        />
      ) : (
        <div class={`w-full h-full relative ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
          <Spline
            scene="https://prod.spline.design/N3FG4yz4WDxOXsWK/scene.splinecode"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
          />
        </div>
      )}
    </div>
  );
}
