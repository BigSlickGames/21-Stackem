import React, { useState } from 'react';
import { CardBubbles } from './CardBubbles';

interface GameControlsProps {
  onDeal: () => void;
  isDealing: boolean;
  soundEnabled: boolean;
}

export function GameControls({ 
  onDeal,
  isDealing,
  soundEnabled 
}: GameControlsProps) {
  const [showBubbles, setShowBubbles] = useState(false);
  const [bubblePosition, setBubblePosition] = useState({ x: 0, y: 0 });

  const handleDeal = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDealing) {
      const rect = e.currentTarget.getBoundingClientRect();
      setBubblePosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
      setShowBubbles(true);
      setTimeout(() => setShowBubbles(false), 1000);
      onDeal();
    }
  };

  return (
    <div className="absolute bottom-20 left-0 right-0 flex justify-center items-center px-4">
      <button 
        className="w-24 h-24 relative"
        onClick={handleDeal}
        disabled={isDealing}
      >
        <img 
          src="/images/play.png" 
          alt="Play" 
          className="w-full h-full object-contain hover:scale-110 transition-transform"
        />
        {showBubbles && (
          <CardBubbles 
            x={bubblePosition.x}
            y={bubblePosition.y}
            type="deal"
          />
        )}
      </button>
    </div>
  );
}