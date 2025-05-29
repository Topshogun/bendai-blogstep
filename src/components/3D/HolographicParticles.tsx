import React from 'react';

const HolographicParticles = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <div className="relative w-full h-full">
        {/* Floating particles with explicit dimensions */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.6,
              minWidth: '1px',
              minHeight: '1px'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HolographicParticles;