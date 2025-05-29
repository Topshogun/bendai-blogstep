import React from 'react';
import { XCircle } from 'lucide-react';

const PainPoint = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3 text-lg font-orbitron">
    <XCircle className="text-red-500" size={24} />
    <span>{text}</span>
  </div>
);

const ProblemSolution = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Are You Struggling with Inefficiencies and Missed Opportunities?
        </h2>
        
        <div className="space-y-6 mb-12">
          <PainPoint text="Slow or ineffective customer support" />
          <PainPoint text="Messy workflows without proper CRM integration" />
          <PainPoint text="Manual processes draining time and resources" />
        </div>
        
        <p className="text-xl text-gray-300 long-text">
          At Bendai, we use cutting-edge AI tools to solve these problems seamlessly, 
          so you can focus on growth while we handle the automation.
        </p>
      </div>
    </section>
  );
};

export default ProblemSolution;