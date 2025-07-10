'use client';

import { Bell, Settings, Droplet } from 'lucide-react';
import { motion } from 'framer-motion';

export function Header() {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-gray-200 z-50"
    >
      <div className="flex justify-between items-center px-4 py-3 max-w-md mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center space-x-2"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-[#00C4CC] to-[#8E44AD] rounded-full flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Droplet className="w-5 h-5 text-white" />
            </motion.div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-[#00C4CC] to-[#8E44AD] bg-clip-text text-transparent">
            EkoDrop
          </span>
        </motion.div>
        
        <div className="flex items-center space-x-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Bell size={20} className="text-gray-600" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Settings size={20} className="text-gray-600" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}