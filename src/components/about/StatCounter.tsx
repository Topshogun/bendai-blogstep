import React from 'react';
import { StatItem } from '../../types';
import { useCountUp } from '../../hooks/useCountUp';

const StatCounter = ({ label, value }: StatItem) => {
  const numericValue = parseInt(value.replace(/\D/g, ''));
  const displayValue = useCountUp(numericValue);
  const suffix = value.replace(/[0-9]/g, '');

  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
        {displayValue}{suffix}
      </div>
      <p className="text-gray-400">{label}</p>
    </div>
  );
};

export default StatCounter;