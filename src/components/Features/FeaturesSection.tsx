import React from 'react';
import FeatureCard from './FeatureCard';
import { FEATURES } from '../../constants/features';

const FeaturesSection = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {FEATURES.map(({ title, description }) => (
            <FeatureCard
              key={title}
              title={title}
              description={description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;