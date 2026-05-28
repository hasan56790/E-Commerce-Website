import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div 
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
    >
      <div className="relative">
        {/* Gold smoke animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 bg-gold-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <img 
            src="/logo.png" 
            alt="AL NASR FRAGRANCES" 
            className="w-32 h-32 object-contain"
          />
        </motion.div>
        
        {/* Animated text */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mt-8"
        />
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-gold-500 text-sm tracking-widest mt-4 font-serif"
        >
          ROYAL FRAGRANCES
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;