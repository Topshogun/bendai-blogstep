import React from 'react';
import GeometricCore from './GeometricCore';
import GlowingEdges from './GlowingEdges';
import HolographicParticles from './HolographicParticles';

const FuturisticObject = () => {
  return (
    <div className="relative w-64 h-64 animate-spin-slow">
      {/* Container for 3D transforms with explicit dimensions */}
      <div className="absolute inset-0 w-full h-full perspective-1000">
        <div className="relative w-full h-full transform-gpu preserve-3d">
          <GeometricCore />
          <GlowingEdges />
          <HolographicParticles />
        </div>
      </div>
    </div>
  );
};

export default FuturisticObject;