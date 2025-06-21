import React from 'react';
import { motion } from 'framer-motion';

export function Bubbles() {
  const bubbles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    scale: Math.random() * 0.5 + 0.5,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
    initialX: Math.random() * 100,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <motion.img
          key={bubble.id}
          src="/images/bubble.png"
          alt=""
          className="absolute w-16 h-16 opacity-30"
          style={{
            left: `${bubble.initialX}%`,
          }}
          initial={{ 
            y: '100vh',
            scale: bubble.scale,
            opacity: 0
          }}
          animate={{
            y: '-100vh',
            opacity: [0, 0.3, 0.3, 0],
            scale: [bubble.scale, bubble.scale * 1.2, bubble.scale]
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.2, 0.8, 1]
          }}
        />
      ))}
    </div>
  );
}