import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music2, Music } from 'lucide-react';
import type { Difficulty } from '../types/GameTypes';

interface PlayerNameInputProps {
  onSubmit: (name: string, difficulty: Difficulty) => void;
  musicEnabled: boolean;
  onMusicToggle: (enabled: boolean) => void;
}

export function PlayerNameInput({ onSubmit, musicEnabled, onMusicToggle }: PlayerNameInputProps) {
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim(), difficulty);
    }
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
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute top-5 left-0 right-0 flex justify-center">
        <img 
          src="/images/21 bannerNoBG.png"
          alt="21 Banner"
          className="w-[300px] h-[120px] object-contain"
        />
      </div>

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
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl border border-white/30">
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
              </div>

              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl border border-white/30">
                <h2 className="text-xl font-semibold mb-4 text-white">Game Settings</h2>
                <div className="space-y-2">
                  <label className="block text-white text-sm font-medium mb-2">
                    Difficulty Level
                  </label>
                  <div className="flex rounded-lg overflow-hidden border border-white/20">
                    {(['easy', 'medium', 'hard'] as const).map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setDifficulty(level)}
                        className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                          difficulty === level
                            ? 'bg-emerald-500 text-white'
                            : 'bg-white/5 text-white/70 hover:bg-white/10'
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
              </div>

              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl border border-white/30">
                <h2 className="text-xl font-semibold mb-4 text-white">Audio Settings</h2>
                <button
                  type="button"
                  onClick={() => onMusicToggle(!musicEnabled)}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {musicEnabled ? (
                      <Music2 className="w-6 h-6 text-emerald-300" />
                    ) : (
                      <Music className="w-6 h-6 text-white/70" />
                    )}
                    <span className="text-white">Background Music</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full ${musicEnabled ? 'bg-emerald-300/30 text-emerald-300' : 'bg-white/20 text-white/70'}`}>
                    {musicEnabled ? 'ON' : 'OFF'}
                  </div>
                </button>
              </div>

              <button
                type="submit"
                disabled={!name.trim()}
                className="w-full py-3 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Start Playing
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}