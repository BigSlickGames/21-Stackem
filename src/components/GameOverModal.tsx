import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Difficulty } from '../types/GameTypes';

interface GameOverModalProps {
  score: number;
  difficulty: Difficulty;
  onPlayAgain: (difficulty: Difficulty) => void;
  reason: 'score-submitted';
}

export function GameOverModal({ score, difficulty, onPlayAgain }: GameOverModalProps) {
  const [rank, setRank] = useState<number | null>(null);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={overlayVariants}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        variants={overlayVariants}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      
      <motion.div
        variants={modalVariants}
        className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 max-w-sm w-full border border-white/30 shadow-2xl relative z-10"
      >
        <motion.h2 
          variants={contentVariants}
          custom={0}
          className="text-2xl font-bold text-center mb-4 text-white"
        >
          Score Submitted!
        </motion.h2>
        
        <div className="text-center mb-8">
          <motion.div 
            variants={contentVariants}
            custom={1}
            className="mb-4"
          >
            <p className="text-lg font-semibold text-white/90">Final Score</p>
            <motion.p 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="text-4xl font-bold text-emerald-400"
            >
              {score}
            </motion.p>
          </motion.div>
        </div>

        <motion.div 
          variants={contentVariants}
          custom={3}
          className="space-y-3"
        >
          <p className="text-center font-medium text-white/90 mb-2">Want to try again?</p>
          {(['easy', 'medium', 'hard'] as const).map((diff, index) => (
            <motion.button
              key={diff}
              variants={contentVariants}
              custom={4 + index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onPlayAgain(diff)}
              className={`w-full py-3 ${
                diff === difficulty 
                  ? 'bg-emerald-500 hover:bg-emerald-600' 
                  : 'bg-white/10 hover:bg-white/20'
              } text-white rounded-xl font-medium transition-colors capitalize border border-white/20 hover:border-white/40 hover:shadow-lg`}
            >
              {diff} Mode
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}