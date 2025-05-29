import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const DifferentiatorCard = ({ title, description }: {
  title: string;
  description: string;
}) => (
  <div className="text-center p-8">
    <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-6" />
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const WhyChooseUs = () => {
  return (
    <section className="py-24 px-4 bg-white/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Why Businesses Choose Bendai
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <DifferentiatorCard
            title="Proven Expertise"
            description="Our team delivers AI solutions trusted by businesses worldwide."
          />
          <DifferentiatorCard
            title="Results-Driven"
            description="We focus on measurable outcomes that drive growth and efficiency."
          />
          <DifferentiatorCard
            title="Tailored Solutions"
            description="Every solution is customized to meet your business needs."
          />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;