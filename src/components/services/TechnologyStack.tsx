import React from 'react';
import { Brain, Code, Database, Server } from 'lucide-react';
import RevealOnScroll from '../ui/RevealOnScroll';
import Icon from '../ui/Icon';

interface TechItem {
  icon: React.ComponentType;
  name: string;
  description: string;
}

const TECH_STACK: TechItem[] = [
  {
    icon: Brain,
    name: 'Machine Learning',
    description: 'Advanced AI algorithms for intelligent automation'
  },
  {
    icon: Code,
    name: 'Custom Development',
    description: 'Tailored solutions built with modern technologies'
  },
  {
    icon: Database,
    name: 'Data Processing',
    description: 'Efficient handling of large-scale data operations'
  },
  {
    icon: Server,
    name: 'Cloud Infrastructure',
    description: 'Scalable and reliable cloud-based solutions'
  }
];

const TechnologyStack = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Our Technology Stack
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TECH_STACK.map((tech) => (
            <RevealOnScroll key={tech.name}>
              <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                <Icon icon={tech.icon} size={48} className="text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{tech.name}</h3>
                <p className="text-gray-400">{tech.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologyStack;