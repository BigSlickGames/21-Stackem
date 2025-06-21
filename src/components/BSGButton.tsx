import React from 'react';

interface BSGButtonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function BSGButton({ className = "", style }: BSGButtonProps) {
  return (
    <div className="absolute top-[120px] left-6">
      <img 
        src="/images/BSG.png"
        alt="BSG"
        className={`w-[45px] h-[45px] object-contain hover:scale-110 transition-transform cursor-pointer ${className}`}
        style={style}
      />
    </div>
  );
}