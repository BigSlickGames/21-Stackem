import React from 'react';

interface SettingsButtonProps {
  onClick: () => void;
}

export function SettingsButton({ onClick }: SettingsButtonProps) {
  return (
    <div className="absolute top-[9px] right-4">
      <img 
        src="/images/setting.png"
        alt="Settings"
        onClick={onClick}
        className="w-[20px] h-[20px] object-contain"
      />
    </div>
  );
}