import React from 'react';
import RevealOnScroll from '../ui/RevealOnScroll';

interface PageHeaderProps {
  title: string;
  description: string;
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <RevealOnScroll>
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          {title}
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          {description}
        </p>
      </div>
    </RevealOnScroll>
  );
};

export default PageHeader;