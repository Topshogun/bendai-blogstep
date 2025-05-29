import React from 'react';
import { motion } from 'framer-motion';

const AnimatedGlobe = () => {
  return (
    <div className="relative w-12 h-12">
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8)_70%)]" />
      </motion.div>
    </div>
  );
};

export default AnimatedGlobe;