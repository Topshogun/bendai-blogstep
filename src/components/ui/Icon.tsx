import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
}

const Icon = ({ icon: IconComponent, size = 24, className = '' }: IconProps) => {
  return (
    <div className={`icon ${className}`}>
      <IconComponent size={size} />
    </div>
  );
};

export default Icon;