import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CardBubblesProps {
  x: number;
  y: number;
  type: 'deal' | 'pickup' | 'drop';
}

export function CardBubbles({ x, y, type }: CardBubblesProps) {
  const bubbleCount = type === 'deal' ? 16 : type === 'pickup' ? 8 : 12;
  
  const bubbles = Array.from({ length: bubbleCount }, (_, i) => ({
    id: i,
    scale: Math.random() * 0.4 + 0.2,
    angle: (Math.PI * 2 * i) / bubbleCount + Math.random() * 0.5,
    speed: Math.random() * 2 + (type === 'deal' ? 3 : 2),
    delay: Math.random() * 0.2,
  }));

  return (
    <AnimatePresence>
      {bubbles.map((bubble) => {
        const distance = type === 'deal' ? 150 : 80;
        const dx = Math.cos(bubble.angle) * distance;
        const dy = Math.sin(bubble.angle) * distance;

        return (
          <motion.img
            key={bubble.id}
            src="/images/bubble.png"
            alt=""
            className="fixed w-8 h-8 pointer-events-none"
            style={{
              left: x,
              top: y,
              opacity: 0.6,
            }}
            initial={{ 
              scale: 0,
              opacity: 0.6,
              x: 0,
              y: 0
            }}
            animate={{
              x: dx,
              y: dy,
              scale: [0, bubble.scale, bubble.scale * 0.8, 0],
              opacity: [0.6, 0.8, 0.6, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: bubble.speed,
              delay: bubble.delay,
              ease: "easeOut",
              times: [0, 0.3, 0.7, 1]
            }}
          />
        );
      })}
    </AnimatePresence>
  );
}