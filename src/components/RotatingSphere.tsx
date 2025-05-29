import React from 'react';

const RotatingSphere = () => {
  return (
    <div className="relative w-64 h-64 animate-spin-slow">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-white opacity-80 blur-sm"></div>
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-600 via-blue-600 to-white opacity-90"></div>
      <div className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%,transparent_100%)] animate-pulse"></div>
    </div>
  );
};

export default RotatingSphere;