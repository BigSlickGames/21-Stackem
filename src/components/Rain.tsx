import React from 'react';
import { motion } from 'framer-motion';

export function Rain() {
  // Create rain drops with smaller sizes and more subtle effects
  const drops = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    delay: Math.random() * 2,
    duration: Math.random() * 1 + 0.8, // Slightly slower drops
    x: Math.random() * 100, // Random horizontal position
    y: Math.random() * -50, // Start above screen for smoother entry
    size: Math.random() * 0.4 + 0.3, // Much smaller drops
    opacity: Math.random() * 0.3 + 0.2, // More transparent
    splash: Math.random() > 0.7, // 30% chance of splash
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {drops.map((drop) => (
        <React.Fragment key={drop.id}>
          <motion.img
            src="/images/drop.png"
            alt=""
            className="absolute w-8 h-8" // Smaller base size
            style={{
              left: `${drop.x}%`,
              top: `${drop.y}%`,
              opacity: drop.opacity,
              scale: drop.size,
            }}
            animate={{
              y: [`${drop.y}%`, '120%'],
              opacity: [0, drop.opacity, drop.opacity, 0],
              scale: [drop.size, drop.size * 1.1, drop.size], // Smaller scale change
            }}
            transition={{
              duration: drop.duration,
              delay: drop.delay,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.1, 0.9, 1]
            }}
          />
          {drop.splash && (
            <motion.img
              src="/images/drop.png"
              alt=""
              className="absolute w-8 h-8 blur-[1px]" // Smaller splash with less blur
              style={{
                left: `${drop.x}%`,
                bottom: '0%',
                opacity: 0,
                scale: drop.size,
              }}
              animate={{
                opacity: [0, 0.2, 0],
                scale: [1, 1.5, 2],
                y: ['0%', '-10%', '-5%'],
              }}
              transition={{
                duration: 0.8,
                delay: drop.delay + drop.duration - 0.2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}