import React from 'react';

interface InformationButtonProps {
  onClick: () => void;
}

export function InformationButton({ onClick }: InformationButtonProps) {
  return (
    <div className="absolute top-[10px] left-6">
      <button 
        onClick={onClick}
        className="hover:scale-110 transition-transform"
      >
        <img 
          src="/images/information.png"
          alt="Information"
          className="w-[45px] h-[45px] object-contain"
        />
      </button>
    </div>
  );
}