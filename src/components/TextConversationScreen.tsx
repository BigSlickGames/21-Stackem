import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import type { Difficulty } from '../types/GameTypes';

interface TextConversationScreenProps {
  onComplete: (name: string, difficulty: Difficulty) => void;
}

interface Message {
  id: number;
  text: string;
  type: 'system' | 'input';
}

export function TextConversationScreen({ onComplete }: TextConversationScreenProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [showDifficultyButtons, setShowDifficultyButtons] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);

  const initialConversation = [
    { text: "Ding!", type: 'system' },
    { text: "Hi! Welcome to 21 Stack'em!", type: 'system' },
    { text: "Before we play, what shall I call you?", type: 'system' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < initialConversation.length) {
        setMessages(prev => [...prev, { 
          id: currentIndex, 
          ...initialConversation[currentIndex]
        }]);
        setCurrentIndex(prev => prev + 1);
        
        if (currentIndex === initialConversation.length - 1) {
          setShowNameInput(true);
        }
      }
    }, currentIndex === 0 ? 500 : 1000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleNameSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (playerName.trim()) {
      setShowNameInput(false);
      setMessages(prev => [
        ...prev,
        {
          id: prev.length,
          text: playerName,
          type: 'input'
        },
        {
          id: prev.length + 1,
          text: `Nice to meet you, ${playerName}! What difficulty would you like to play today?`,
          type: 'system'
        }
      ]);
      setShowDifficultyButtons(true);
    }
  };

  const handleDifficultySelect = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    setShowDifficultyButtons(false);

    const difficultyMessages = {
      easy: "Sure! Let's play!",
      medium: "Ooh, up for a challenge hey?!",
      hard: "Oh! Bring it on!"
    };

    const description = {
      easy: "Blank grid",
      medium: "I'll place 3 cards on the grid",
      hard: "I'll place 6 cards on the grid"
    };

    setMessages(prev => [
      ...prev,
      {
        id: prev.length,
        text: `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} - ${description[difficulty]}!`,
        type: 'input'
      },
      {
        id: prev.length + 1,
        text: difficultyMessages[difficulty],
        type: 'system'
      }
    ]);

    setTimeout(() => {
      onComplete(playerName, difficulty);
    }, 2000);
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

      <div className="absolute inset-0 flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-md space-y-4">
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`p-4 rounded-xl ${
                  message.type === 'system' 
                    ? 'bg-white/10 backdrop-blur-sm border border-white/20' 
                    : 'bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30'
                }`}
              >
                <p className="text-white text-lg">{message.text}</p>
              </motion.div>
            ))}
          </AnimatePresence>

          {showNameInput && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleNameSubmit}
              className="mt-4 relative"
            >
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name"
                maxLength={20}
                className="w-full px-4 py-3 pr-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                disabled={!playerName.trim()}
              >
                <Send className="w-5 h-5" />
              </button>
            </motion.form>
          )}

          {showDifficultyButtons && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              {(['easy', 'medium', 'hard'] as const).map((difficulty) => (
                <motion.button
                  key={difficulty}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDifficultySelect(difficulty)}
                  className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors text-left"
                >
                  <span className="font-medium capitalize">{difficulty}</span>
                  <span className="text-white/70 ml-2">
                    {difficulty === 'easy' && '- Blank grid'}
                    {difficulty === 'medium' && "- I'll place 3 cards"}
                    {difficulty === 'hard' && "- I'll place 6 cards"}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}