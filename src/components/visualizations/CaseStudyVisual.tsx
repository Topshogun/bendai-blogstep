import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CaseStudyVisualProps {
  industry: string;
  challenge: string;
  solution: string;
  results: {
    label: string;
    value: string;
  }[];
  quote: string;
}

const CaseStudyVisual = ({
  industry,
  challenge,
  solution,
  results,
  quote
}: CaseStudyVisualProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="p-8 rounded-2xl bg-black/30 backdrop-blur-sm relative overflow-hidden group"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <span className="text-blue-400 font-orbitron">{industry}</span>

      <div className="mt-6 mb-8">
        <h3 className="text-xl font-semibold font-orbitron mb-4">Challenge</h3>
        <p className="text-gray-400">{challenge}</p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold font-orbitron mb-4">Solution</h3>
        <p className="text-gray-400">{solution}</p>
      </div>

      <div className="space-y-4 mb-8">
        <h3 className="text-xl font-semibold font-orbitron">Results</h3>
        {results.map((result, index) => (
          <motion.div
            key={index}
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.2 }}
          >
            <div className="flex justify-between mb-2">
              <span className="text-green-400 font-orbitron">{result.label}</span>
              <span className="text-green-400 font-orbitron">{result.value}</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-green-400 w-full transform origin-left" />
            </div>
          </motion.div>
        ))}
      </div>

      <blockquote className="text-gray-300 italic border-l-2 border-blue-400 pl-4 mt-6">
        "{quote}"
      </blockquote>

      <motion.button
        whileHover={{ scale: 1.05, x: 5 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors flex items-center space-x-2 font-orbitron"
      >
        <span>View Full Case Study</span>
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
};

export default CaseStudyVisual;