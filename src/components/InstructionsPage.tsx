import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

interface InstructionsPageProps {
  onContinue: () => void;
}

export function InstructionsPage({ onContinue }: InstructionsPageProps) {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleContinue = () => {
    if (dontShowAgain) {
      localStorage.setItem('hideInstructions', 'true');
    }
    onContinue();
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

        <div className="min-h-full p-8 pt-[80px] flex flex-col items-center">
          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl border border-white/30 max-w-sm w-full mb-8">
            <div className="flex items-center gap-2 mb-4">
              <ArrowDown className="w-5 h-5 text-emerald-300" />
              <h2 className="text-lg font-semibold text-white">For the best experience</h2>
            </div>
            <p className="text-white/80">
              Hide the toolbar by clicking the arrow in the top right corner of your browser.
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl border border-white/30 max-w-sm w-full space-y-4">
            <h2 className="text-xl font-semibold text-white">How to Play</h2>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img src="/images/play.png" alt="Play button" className="w-16 h-16" />
                <p className="text-white/80">
                  Press Play to deal three cards at a time.
                </p>
              </div>
              
              <p className="text-white/80">
                Drag and drop cards onto the grid to create rows and columns that add up to exactly 21.
              </p>
              
              <p className="text-white/80">
                The more cards you use to make 21, the more points you'll earn:
              </p>
              
              <ul className="space-y-2 text-white/80 list-disc pl-5">
                <li>2 cards = 250 points</li>
                <li>3 cards = 350 points</li>
                <li>4 cards = 450 points</li>
                <li>5 cards = 600 points</li>
              </ul>
              
              <p className="text-white/80">
                Be careful! Going over 21 will cost you 50 points.
              </p>

              <div className="flex items-center gap-4">
                <img src="/images/submit.png" alt="Submit button" className="w-16 h-16" />
                <p className="text-white/80">
                  Submit your score when you're done to see how you rank against other players.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 mb-4 flex flex-col items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="w-4 h-4 rounded border-white/30 bg-white/20 checked:bg-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
              />
              <span className="text-white/80">Don't show this again</span>
            </label>

            <button
              onClick={handleContinue}
              className="px-8 py-3 bg-emerald-500 rounded-full text-white font-semibold hover:bg-emerald-600 transition-colors"
            >
              Let's Play!
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}