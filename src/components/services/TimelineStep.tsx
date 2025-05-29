import React from 'react';
import { ProcessStep } from '../../types';
import RevealOnScroll from '../ui/RevealOnScroll';

interface TimelineStepProps extends ProcessStep {
  index: number;
  isLast: boolean;
}

const TimelineStep = ({ title, description, duration, index, isLast }: TimelineStepProps) => {
  return (
    <RevealOnScroll>
      <div className={`relative flex items-center ${isLast ? '' : 'pb-12'}`}>
        {/* Empty left side for visual balance */}
        <div className="flex-1" />
        
        {/* Center timeline element */}
        <div className="relative flex flex-col items-center mx-8">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold">
            {index}
          </div>
          <span className="mt-2 text-sm text-blue-400">{duration}</span>
        </div>
        
        {/* Right side content */}
        <div className="flex-1 pl-8">
          <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-400">{description}</p>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
};

export default TimelineStep;