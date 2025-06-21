import React from 'react';

interface ScoreDisplayProps {
  score: number;
}

export function ScoreDisplay({ score }: ScoreDisplayProps) {
  return (
    <div className="absolute top-[120px] w-full flex justify-center">
      <div className="relative">
        <img 
          src="/images/scoreNew.png"
          alt="Score"
          className="w-[180px] object-contain"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-black">
          {score}
        </div>
      </div>
    </div>
  );
}