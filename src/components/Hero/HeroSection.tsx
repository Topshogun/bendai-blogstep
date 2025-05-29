import React from 'react';
import HeroContent from './HeroContent';
import { useParallax } from '../../hooks/useParallax';
import RevealOnScroll from '../ui/RevealOnScroll';

const HeroSection = () => {
  const parallaxRef = useParallax({ intensity: 30 });

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,38,44,0.8)_0%,rgba(0,0,0,0.95)_100%)] z-10"></div>
      
      {/* Spline background container */}
      <div className="absolute inset-0 w-full h-full">
        <spline-viewer 
          url="https://prod.spline.design/izhGbtPSQsA-vBgE/scene.splinecode"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            maxWidth: '1920px',
            maxHeight: '1080px'
          }}
        ></spline-viewer>
      </div>

      {/* Content with proper z-index to appear above Spline */}
      <div className="relative z-20 text-center max-w-4xl mx-auto">
        <RevealOnScroll>
          <HeroContent />
        </RevealOnScroll>
      </div>
    </main>
  );
};

export default HeroSection;