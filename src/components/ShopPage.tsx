import React from 'react';
import { motion } from 'framer-motion';
import { X, ArrowLeft } from 'lucide-react';

interface ShopPageProps {
  onClose: () => void;
  onBack: () => void;
}

export function ShopPage({ onClose, onBack }: ShopPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="absolute inset-0 z-30 rounded-[55px] overflow-hidden"
    >
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/blue blank background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-black/50" />
      
      <button
        onClick={onClose}
        className="absolute right-4 top-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors z-50"
        aria-label="Close shop"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={onBack}
        className="absolute left-4 top-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors z-50"
        aria-label="Go back to information"
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </button>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">Coming Soon</h1>
          <p className="text-xl text-white/80">Exciting new features and items are on the way!</p>
        </div>
      </div>
    </motion.div>
  );
}