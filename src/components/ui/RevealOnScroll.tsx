import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
}

const RevealOnScroll = ({ children, className = '' }: RevealOnScrollProps) => {
  const ref = useScrollReveal();

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
};

export default RevealOnScroll;