import React from 'react';

const GlowingEdges = () => {
  return (
    <div className="absolute inset-0">
      {/* Outer glow effect with explicit dimensions */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-xl">
        <div className="w-full h-full" />
      </div>
      
      {/* Animated edge lines with guaranteed size */}
      <div className="absolute inset-0 w-full h-full animate-pulse">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
      </div>
    </div>
  );
};

export default GlowingEdges;