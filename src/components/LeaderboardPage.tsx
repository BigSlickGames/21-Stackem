import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Trophy, Medal, Crown } from 'lucide-react';
import { getLeaderboard, LeaderboardEntry } from '../utils/supabase';
import type { Difficulty } from '../types/GameTypes';

interface LeaderboardPageProps {
  onClose: () => void;
  playerScore?: number;
  backgroundColor?: string;
}

export function LeaderboardPage({ onClose, playerScore, backgroundColor = 'hsl(210, 70%, 60%)' }: LeaderboardPageProps) {
  const [leaderboards, setLeaderboards] = useState<Record<Difficulty, LeaderboardEntry[]>>({
    easy: [],
    medium: [],
    hard: []
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Difficulty>('medium');
  const [playerRank, setPlayerRank] = useState<number | null>(null);

  useEffect(() => {
    const loadLeaderboards = async () => {
      try {
        const [easyData, mediumData, hardData] = await Promise.all([
          getLeaderboard('easy'),
          getLeaderboard('medium'),
          getLeaderboard('hard')
        ]);
        
        setLeaderboards({
          easy: easyData,
          medium: mediumData,
          hard: hardData
        });
        
        if (playerScore) {
          const currentLeaderboard = activeTab === 'easy' ? easyData :
                                   activeTab === 'hard' ? hardData : mediumData;
          const rank = currentLeaderboard.findIndex(entry => entry.score <= playerScore) + 1;
          setPlayerRank(rank > 0 ? rank : currentLeaderboard.length + 1);
        }
      } catch (error) {
        console.error('Error loading leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboards();
  }, [activeTab, playerScore]);

  const currentLeaderboard = leaderboards[activeTab];

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
          style={{ filter: `hue-rotate(${parseInt(backgroundColor.split(',')[0].split('(')[1]) - 210}deg)` }}
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
          <div className="flex justify-center items-center gap-3 mb-8">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h1 className="text-3xl font-bold text-center text-white">Leaderboard</h1>
          </div>

          <div className="max-w-md mx-auto">
            <div className="flex justify-center gap-2 mb-6">
              {(['easy', 'medium', 'hard'] as const).map((diff) => (
                <motion.button
                  key={diff}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(diff)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    activeTab === diff
                      ? 'bg-emerald-500 text-white shadow-lg scale-105'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {diff.charAt(0).toUpperCase() + diff.slice(1)}
                </motion.button>
              ))}
            </div>

            {playerRank && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="bg-emerald-500/20 rounded-xl p-4 border border-emerald-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-white">Your Rank:</span>
                    <span className="text-2xl font-bold text-emerald-400">#{playerRank}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {!loading && currentLeaderboard.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[1, 0, 2].map((position) => {
                  const entry = currentLeaderboard[position];
                  if (!entry) return null;

                  const isSecond = position === 0;
                  const isThird = position === 2;

                  return (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: position * 0.1 }}
                      className={`relative ${isSecond ? 'order-2' : ''} ${isThird ? 'order-3' : ''}`}
                    >
                      <div className={`p-4 rounded-xl border ${
                        isSecond ? 'bg-yellow-500/20 border-yellow-500/30' :
                        isThird ? 'bg-orange-500/20 border-orange-500/30' :
                        'bg-gray-500/20 border-gray-500/30'
                      }`}>
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                          {isSecond ? (
                            <Crown className="w-8 h-8 text-yellow-400" />
                          ) : isThird ? (
                            <Medal className="w-8 h-8 text-orange-400" />
                          ) : (
                            <Trophy className="w-8 h-8 text-gray-400" />
                          )}
                        </div>
                        <div className="mt-4 text-center">
                          <div className="font-bold text-xl text-white mb-1 truncate">
                            {entry.name}
                          </div>
                          <div className={`text-lg font-semibold ${
                            isSecond ? 'text-yellow-400' :
                            isThird ? 'text-orange-400' :
                            'text-gray-400'
                          }`}>
                            {entry.score}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            <div className="bg-white/10 rounded-xl overflow-hidden border border-white/20">
              {loading ? (
                <div className="p-8 text-center text-white">Loading scores...</div>
              ) : currentLeaderboard.length === 0 ? (
                <div className="p-8 text-center text-white">No scores yet. Be the first!</div>
              ) : (
                <div className="divide-y divide-white/10">
                  {currentLeaderboard.slice(3).map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                          <span className="text-white text-sm font-medium">#{index + 4}</span>
                        </div>
                        <div>
                          <div className="text-white font-medium">{entry.name}</div>
                          <div className="text-white/60 text-sm">
                            {new Date(entry.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-xl font-bold text-emerald-400">{entry.score}</div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}