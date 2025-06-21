import React from 'react';
import { motion } from 'framer-motion';

export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
    >
      <motion.img
        src="/images/BSG.png"
        alt="BSG"
        className="w-48 h-48 object-contain"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: 1,
          opacity: [0, 1, 1, 0],
          transition: {
            duration: 3,
            times: [0, 0.2, 0.8, 1],
            ease: "easeInOut"
          }
        }}
      />
    </motion.div>
  );
}