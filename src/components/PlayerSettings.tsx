import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music2, Music, X, ChevronDown, Sparkles, Sparkle } from 'lucide-react';
import type { Difficulty } from '../types/GameTypes';

interface PlayerSettingsProps {
  onSubmit: (name: string, difficulty: Difficulty, animatedBackgrounds: boolean) => void;
  musicEnabled: boolean;
  onMusicToggle: (enabled: boolean) => void;
  title: string;
  onClose?: () => void;
}

export function PlayerSettings({ onSubmit, musicEnabled, onMusicToggle, title, onClose }: PlayerSettingsProps) {
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [showConfirm, setShowConfirm] = useState(false);
  const [animatedBackgrounds, setAnimatedBackgrounds] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim(), difficulty, animatedBackgrounds);
    }
  };

  const renderInitialSetup = () => {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl border border-white/20"
        >
          <h2 className="text-xl font-semibold mb-4 text-white">Player Details</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            maxLength={20}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
            autoFocus
          />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl border border-white/20"
        >
          <h2 className="text-xl font-semibold mb-4 text-white">Game Settings</h2>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Difficulty Level
            </label>
            <div className="flex rounded-lg overflow-hidden border border-white/10 bg-white/5 p-1">
              {(['easy', 'medium', 'hard'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setDifficulty(level)}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all duration-300 ${
                    difficulty === level
                      ? 'bg-emerald-500 text-white shadow-lg scale-105 transform'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
            <p className="text-white/60 text-sm mt-2">
              {difficulty === 'easy' && 'Start with an empty board'}
              {difficulty === 'medium' && 'Start with 3 random cards'}
              {difficulty === 'hard' && 'Start with 6 random cards'}
            </p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl border border-white/20"
        >
          <h2 className="text-xl font-semibold mb-4 text-white">Visual Settings</h2>
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => onMusicToggle(!musicEnabled)}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                {musicEnabled ? (
                  <Music2 className="w-6 h-6 text-emerald-300" />
                ) : (
                  <Music className="w-6 h-6 text-white/70" />
                )}
                <span className="text-white">Background Music</span>
              </div>
              <div className={`px-3 py-1 rounded-full ${musicEnabled ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-white/70'}`}>
                {musicEnabled ? 'ON' : 'OFF'}
              </div>
            </button>

            <button
              type="button"
              onClick={() => setAnimatedBackgrounds(!animatedBackgrounds)}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                {animatedBackgrounds ? (
                  <Sparkles className="w-6 h-6 text-emerald-300" />
                ) : (
                  <Sparkle className="w-6 h-6 text-white/70" />
                )}
                <span className="text-white">Animated Backgrounds</span>
              </div>
              <div className={`px-3 py-1 rounded-full ${animatedBackgrounds ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-white/70'}`}>
                {animatedBackgrounds ? 'ON' : 'OFF'}
              </div>
            </button>
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!name.trim()}
          className="w-full py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start Playing
        </motion.button>
      </form>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50"
    >
      <div className="absolute inset-0">
        <img 
          src="/images/BlueSplashBlankBackground.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm" />

      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors z-50"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      )}

      <div className="absolute inset-0 overflow-y-auto scrollbar-thin">
        <style>
          {`
            .scrollbar-thin::-webkit-scrollbar {
              width: 6px;
            }
            .scrollbar-thin::-webkit-scrollbar-track {
              background: transparent;
            }
            .scrollbar-thin::-webkit-scrollbar-thumb {
              background-color: rgba(255, 255, 255, 0.5);
              border-radius: 20px;
              border: transparent;
            }
          `}
        </style>

        <div className="min-h-full p-8 flex flex-col items-center justify-center">
          <div className="w-full max-w-md">
            {renderInitialSetup()}
          </div>
        </div>
      </div>
    </motion.div>
  );
}