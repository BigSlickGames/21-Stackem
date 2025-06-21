import React from 'react';
import { motion } from 'framer-motion';
import { X, ArrowLeft, Crown, Music2, Palette } from 'lucide-react';

interface PremiumPageProps {
  onClose: () => void;
  onBack: () => void;
}

export function PremiumPage({ onClose, onBack }: PremiumPageProps) {
  const premiumFeatures = [
    {
      icon: <Palette className="w-6 h-6 text-emerald-400" />,
      title: "Exclusive Backgrounds",
      description: "Access to premium animated backgrounds and themes"
    },
    {
      icon: <Music2 className="w-6 h-6 text-emerald-400" />,
      title: "Premium Music",
      description: "Unlock additional background music tracks"
    },
    {
      icon: <Crown className="w-6 h-6 text-yellow-400" />,
      title: "Special Card Designs",
      description: "Unique card designs and animations"
    }
  ];

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
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      <button
        onClick={onClose}
        className="absolute right-4 top-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={onBack}
        className="absolute left-4 top-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </button>

      <div className="absolute inset-0 overflow-y-auto">
        <div className="min-h-full p-6">
          <h1 className="text-3xl font-bold text-center text-white mb-8">Premium Features</h1>

          <div className="max-w-md mx-auto space-y-6">
            {premiumFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 p-6 rounded-xl border border-white/20"
              >
                <div className="flex items-center gap-3 mb-2">
                  {feature.icon}
                  <h2 className="text-xl font-semibold text-white">{feature.title}</h2>
                </div>
                <p className="text-white/80">{feature.description}</p>
              </motion.div>
            ))}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl text-white font-semibold shadow-lg"
            >
              Coming Soon!
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}