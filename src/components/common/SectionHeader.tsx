import React from 'react';
import RevealOnScroll from '../ui/RevealOnScroll';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  centered?: boolean;
}

const SectionHeader = ({ title, subtitle, centered = false }: SectionHeaderProps) => {
  return (
    <RevealOnScroll>
      <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-xl text-gray-400">{subtitle}</p>
      </div>
    </RevealOnScroll>
  );
};

export default SectionHeader;