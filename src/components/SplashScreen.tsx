import React from 'react';
import { motion } from 'framer-motion';

export function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden"
    >
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ 
          scale: 1,
          opacity: 1,
          transition: {
            duration: 1,
            ease: "easeOut"
          }
        }}
        className="relative w-full h-full"
      >
        <motion.img 
          src="/images/BlueSplashBackground.png"
          alt="Splash Screen"
          className="w-full h-full object-cover"
          animate={{
            scale: [1, 1.05, 1],
            filter: ["brightness(0.8)", "brightness(1.2)", "brightness(0.8)"]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.3, 0],
            background: [
              "radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
              "radial-gradient(circle at center, rgba(59, 130, 246, 0.5) 0%, transparent 70%)",
              "radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, transparent 70%)"
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        >
          <motion.img 
            src="/images/BSG.png"
            alt="BSG Logo"
            className="w-48 h-48 object-contain"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}