import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Volume2, VolumeX, Music2, Music, Palette, Sparkles, Sparkle } from 'lucide-react';
import type { Difficulty } from '../types/GameTypes';

interface SettingsPageProps {
  onClose: () => void;
  musicEnabled: boolean;
  soundEnabled: boolean;
  difficulty: Difficulty;
  onMusicToggle: (enabled: boolean) => void;
  onSoundToggle: (enabled: boolean) => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onBackgroundChange: (color: string) => void;
  currentBackground: string;
  animatedBackgrounds: boolean;
  onAnimatedBackgroundsToggle: (enabled: boolean) => void;
}

export function SettingsPage({
  onClose,
  musicEnabled,
  soundEnabled,
  difficulty,
  onMusicToggle,
  onSoundToggle,
  onDifficultyChange,
  onBackgroundChange,
  currentBackground,
  animatedBackgrounds,
  onAnimatedBackgroundsToggle
}: SettingsPageProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(difficulty);
  const [showConfirm, setShowConfirm] = useState(false);
  const [hue, setHue] = useState(210); // Default blue hue

  const handleDifficultySelect = (newDifficulty: Difficulty) => {
    if (newDifficulty !== difficulty) {
      setSelectedDifficulty(newDifficulty);
      setShowConfirm(true);
    }
  };

  const handleStartNewGame = () => {
    onDifficultyChange(selectedDifficulty);
    setShowConfirm(false);
    onClose();
  };

  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHue = parseInt(e.target.value);
    setHue(newHue);
    onBackgroundChange(`hsl(${newHue}, 70%, 60%)`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="absolute inset-0 z-30"
    >
      <div className="absolute inset-0">
        <img 
          src="/images/BlueSplashBlankBackground.png"
          alt="Background"
          className="w-full h-full object-cover"
          style={{ filter: `hue-rotate(${hue - 210}deg)` }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      <button
        onClick={onClose}
        className="absolute right-4 top-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <div className="absolute inset-0 overflow-y-auto">
        <div className="min-h-full p-6">
          <h1 className="text-3xl font-bold text-center text-white mb-8">Settings</h1>

          <div className="max-w-md mx-auto space-y-6">
            <motion.div
              layout
              className="bg-white/10 p-6 rounded-xl border border-white/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <Palette className="w-6 h-6 text-emerald-400" />
                <h2 className="text-xl font-semibold text-white">Background Color</h2>
              </div>
              
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={hue}
                  onChange={handleHueChange}
                  className="w-full h-2 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, 
                      hsl(0, 70%, 60%),
                      hsl(60, 70%, 60%),
                      hsl(120, 70%, 60%),
                      hsl(180, 70%, 60%),
                      hsl(240, 70%, 60%),
                      hsl(300, 70%, 60%),
                      hsl(360, 70%, 60%)
                    )`
                  }}
                />
                <div className="h-20 rounded-lg overflow-hidden">
                  <div 
                    className="w-full h-full"
                    style={{ 
                      backgroundColor: `hsl(${hue}, 70%, 60%)`,
                      transition: 'background-color 0.2s'
                    }}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              layout
              className="bg-white/10 p-6 rounded-xl border border-white/20"
            >
              <h2 className="text-xl font-semibold mb-4 text-white">Game Settings</h2>
              <div className="space-y-2">
                <label className="block text-white text-sm font-medium mb-2">
                  Difficulty Level
                </label>
                <div className="flex rounded-lg overflow-hidden border border-white/20">
                  {(['easy', 'medium', 'hard'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => handleDifficultySelect(level)}
                      className={`flex-1 py-3 px-4 text-sm font-medium transition-all ${
                        selectedDifficulty === level
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white/5 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
                <p className="text-white/60 text-sm mt-2">
                  {selectedDifficulty === 'easy' && 'Start with an empty board'}
                  {selectedDifficulty === 'medium' && 'Start with 3 random cards'}
                  {selectedDifficulty === 'hard' && 'Start with 6 random cards'}
                </p>

                {showConfirm && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-white/10 rounded-lg border border-white/20"
                  >
                    <p className="text-white mb-3">
                      Starting a new game will reset your current progress. Are you sure?
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={handleStartNewGame}
                        className="flex-1 py-2 px-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                      >
                        Start New Game
                      </button>
                      <button
                        onClick={() => {
                          setSelectedDifficulty(difficulty);
                          setShowConfirm(false);
                        }}
                        className="flex-1 py-2 px-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            <motion.div
              layout
              className="bg-white/10 p-6 rounded-xl border border-white/20"
            >
              <h2 className="text-xl font-semibold mb-4 text-white">Visual Settings</h2>
              <div className="space-y-4">
                <button
                  onClick={() => onAnimatedBackgroundsToggle(!animatedBackgrounds)}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {animatedBackgrounds ? (
                      <Sparkles className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <Sparkle className="w-6 h-6 text-white/70" />
                    )}
                    <span className="text-white">Animated Backgrounds</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full ${animatedBackgrounds ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/20 text-white/70'}`}>
                    {animatedBackgrounds ? 'ON' : 'OFF'}
                  </div>
                </button>

                <button
                  onClick={() => onMusicToggle(!musicEnabled)}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {musicEnabled ? (
                      <Music2 className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <Music className="w-6 h-6 text-white/70" />
                    )}
                    <span className="text-white">Background Music</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full ${musicEnabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/20 text-white/70'}`}>
                    {musicEnabled ? 'ON' : 'OFF'}
                  </div>
                </button>

                <button
                  onClick={() => onSoundToggle(!soundEnabled)}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {soundEnabled ? (
                      <Volume2 className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <VolumeX className="w-6 h-6 text-white/70" />
                    )}
                    <span className="text-white">Sound Effects</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full ${soundEnabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/20 text-white/70'}`}>
                    {soundEnabled ? 'ON' : 'OFF'}
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}