import React from 'react';

const GeometricCore = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-48 h-48 relative transform-gpu rotate-45">
        {/* Main geometric shape with fallback background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 via-blue-500/80 to-cyan-400/80 rounded-lg">
          <div className="w-full h-full" />
        </div>
        
        {/* Inner geometric patterns with guaranteed dimensions */}
        <div className="absolute inset-4 bg-gradient-to-tr from-purple-500/40 via-transparent to-cyan-400/40 rounded-lg">
          <div className="w-full h-full" />
        </div>
        
        {/* Holographic overlay with explicit size */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] rounded-lg">
          <div className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default GeometricCore;