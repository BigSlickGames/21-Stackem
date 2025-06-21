import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Card } from '../types/Card';
import { CardBubbles } from './CardBubbles';

interface DeckAreaProps {
  remainingCards: number;
  deckCycles: number;
  dealtCards: Card[];
  handleDragEnd: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: { point: { x: number, y: number } },
    card: Card,
    index: number
  ) => void;
  soundEnabled: boolean;
}

export function DeckArea({
  remainingCards,
  deckCycles,
  dealtCards,
  handleDragEnd,
  soundEnabled
}: DeckAreaProps) {
  const [bubblePosition, setBubblePosition] = useState<{ x: number; y: number; type: 'deal' | 'pickup' | 'drop' } | null>(null);
  const pickupSound = new Audio('/audio/pickup.mp4');

  const playPickupSound = () => {
    if (soundEnabled) {
      pickupSound.currentTime = 0;
      pickupSound.play().catch(error => console.log('Audio playback failed:', error));
    }
    // Vibrate on pickup
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  return (
    <div className="flex justify-center gap-4 mb-4 relative -mt-[225px]">
      <div className="relative w-[55px] h-[55px]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold text-black z-10">
          {remainingCards}
        </div>
        <div className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold z-10">
          {deckCycles}/3
        </div>
        <img 
          src="/images/21-stackem-card-tile.png" 
          alt="Deck" 
          className="w-full h-full object-contain"
        />
      </div>

      <div className="relative w-[125px]">
        <AnimatePresence>
          {dealtCards.map((card, index) => {
            const isPlayable = index === dealtCards.length - 1;

            return (
              <motion.div
                key={`${card.suit}-${card.rank}`}
                className={`absolute w-[55px] h-[55px] ${isPlayable ? 'cursor-grab active:cursor-grabbing' : 'cursor-not-allowed'} touch-none`}
                initial={{ x: -85, y: 0, opacity: 0, scale: 0.8, zIndex: index }}
                animate={{ 
                  x: index * 35,
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  transition: { 
                    duration: 0.3,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                drag={isPlayable}
                dragConstraints={{
                  top: -400,
                  left: -150,
                  right: 150,
                  bottom: 50
                }}
                dragElastic={0.05}
                dragMomentum={false}
                whileDrag={{ scale: 1.05, zIndex: 30 }}
                onDragStart={(e) => {
                  if (isPlayable) {
                    const element = e.target as HTMLElement;
                    const rect = element.getBoundingClientRect();
                    setBubblePosition({ 
                      x: rect.left + rect.width / 2,
                      y: rect.top + rect.height / 2,
                      type: 'pickup'
                    });
                    playPickupSound();
                  }
                }}
                onDragEnd={(e, info) => {
                  if (isPlayable) {
                    const element = e.target as HTMLElement;
                    const rect = element.getBoundingClientRect();
                    setBubblePosition({ 
                      x: rect.left + rect.width / 2,
                      y: rect.top + rect.height / 2,
                      type: 'drop'
                    });
                    handleDragEnd(e, info, card, index);
                  }
                }}
                style={{
                  filter: isPlayable ? 'none' : 'brightness(0.7)',
                  touchAction: 'none',
                }}
              >
                <img 
                  src="/images/21-stackem-card-tile.png" 
                  alt={`${card.rank} of ${card.suit}`}
                  className="w-full h-full object-contain pointer-events-none"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold pointer-events-none">
                  {card.rank}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {bubblePosition && (
        <CardBubbles 
          x={bubblePosition.x}
          y={bubblePosition.y}
          type={bubblePosition.type}
        />
      )}
    </div>
  );
}