import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Info, Trophy, Send } from 'lucide-react';

interface BottomMenuProps {
  onSettings: () => void;
  onInformation: () => void;
  onLeaderboard: () => void;
  onSubmitScore: () => void;
}

export function BottomMenu({ onSettings, onInformation, onLeaderboard, onSubmitScore }: BottomMenuProps) {
  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-t border-white/20"
    >
      <div className="max-w-sm mx-auto px-4 py-2 flex justify-around">
        <button 
          onClick={onInformation}
          className="flex flex-col items-center p-2 text-white/80 hover:text-white transition-colors"
        >
          <Info className="w-6 h-6" />
          <span className="text-xs mt-1">Info</span>
        </button>
        <button 
          onClick={onSettings}
          className="flex flex-col items-center p-2 text-white/80 hover:text-white transition-colors"
        >
          <Settings className="w-6 h-6" />
          <span className="text-xs mt-1">Settings</span>
        </button>
        <button 
          onClick={onLeaderboard}
          className="flex flex-col items-center p-2 text-white/80 hover:text-white transition-colors"
        >
          <Trophy className="w-6 h-6" />
          <span className="text-xs mt-1">Leaderboard</span>
        </button>
        <button 
          onClick={onSubmitScore}
          className="flex flex-col items-center p-2 text-white/80 hover:text-white transition-colors"
        >
          <Send className="w-6 h-6" />
          <span className="text-xs mt-1">Submit</span>
        </button>
      </div>
      <div className="h-[env(safe-area-inset-bottom)] bg-white/10" />
    </motion.div>
  );
}