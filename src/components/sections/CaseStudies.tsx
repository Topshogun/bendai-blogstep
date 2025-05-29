import React from 'react';
import { motion } from 'framer-motion';
import ResultsChart from '../visualizations/ResultsChart';
import AnimatedGlobe from '../visualizations/AnimatedGlobe';
import { CASE_STUDIES } from '../../constants/case-studies';

const CaseStudies = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-900/10 to-black" />
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-6">
            Real Results, Real Impact
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Transforming businesses through AI automation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CASE_STUDIES.map((study, index) => (
            <motion.div
              key={study.industry}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <div className="flex items-center gap-4 mb-6">
                <AnimatedGlobe />
                <div>
                  <h3 className="text-xl font-orbitron text-blue-400">{study.industry}</h3>
                  <p className="text-gray-400 mt-2">{study.challenge}</p>
                </div>
              </div>

              <div className="space-y-6">
                {study.results.map((result, i) => (
                  <ResultsChart
                    key={result.label}
                    label={result.label}
                    value={result.value}
                    percentage={parseFloat(result.value)}
                    delay={i * 0.2}
                  />
                ))}
              </div>

              <blockquote className="mt-8 text-gray-300 italic border-l-2 border-blue-400 pl-4">
                "{study.quote}"
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;