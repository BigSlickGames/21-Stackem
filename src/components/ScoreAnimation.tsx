import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScoreAnimationProps {
  show: boolean;
  message: string;
  onComplete?: () => void;
  type?: '2-card' | '3-card';
}

export function ScoreAnimation({ show, message, onComplete, type = '2-card' }: ScoreAnimationProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{
            scale: [0.5, 1.1, 1],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 1.5,
            times: [0, 0.3, 1],
            ease: "easeOut"
          }}
          onAnimationComplete={onComplete}
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        >
          <motion.img
            src={type === '2-card' ? "/images/nice.png" : "/images/sweet.png"}
            alt={type === '2-card' ? "Nice!" : "Sweet!"}
            className="w-80 h-80 object-contain"
            animate={
              type === '2-card' 
                ? {
                    rotate: [0, -10, 10, -5, 5, 0],
                    scale: [1, 1.1, 1.1, 1.05, 1.05, 1]
                  }
                : {
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                    y: [0, -50, 0]
                  }
            }
            transition={
              type === '2-card'
                ? {
                    duration: 1,
                    times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                    ease: "easeInOut"
                  }
                : {
                    duration: 1.2,
                    times: [0, 0.7, 1],
                    ease: "easeInOut"
                  }
            }
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}