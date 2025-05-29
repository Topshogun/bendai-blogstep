import React from 'react';
import { motion } from 'framer-motion';

interface ChartBarProps {
  label: string;
  value: string;
  percentage: number;
  delay?: number;
}

const ResultsChart = ({ label, value, percentage, delay = 0 }: ChartBarProps) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-orbitron text-gray-300">{label}</span>
        <span className="text-sm font-orbitron text-green-400">{value}</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-green-500 to-green-300"
        />
      </div>
    </div>
  );
};

export default ResultsChart;