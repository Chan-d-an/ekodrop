'use client';

import { useState } from 'react';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { HomeFeed } from './components/home/HomeFeed';
import { AuthModal } from './components/auth/AuthModal';
import { motion } from 'framer-motion';

export default function Home() {
  const [showAuth, setShowAuth] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5FAFF] to-[#E8F4FD] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-8"
        >
          <motion.div
           
            className="w-24 h-24 bg-gradient-to-r from-[#00C4CC] to-[#8E44AD] rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-white text-4xl"
            >
              💧
            </motion.div>
          </motion.div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00C4CC] to-[#8E44AD] bg-clip-text text-transparent mb-4">
            EkoDrop
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Share your thoughts, spread the echo
          </p>
          
          <div className="space-y-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowAuth(true);
                setTimeout(() => setIsAuthenticated(true), 1000);
              }}
              className="w-full bg-gradient-to-r from-[#00C4CC] to-[#8E44AD] text-white py-4 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Get Started
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAuthenticated(true)}
              className="w-full bg-white text-gray-700 py-4 rounded-full font-medium text-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Continue as Guest
            </motion.button>
          </div>
        </motion.div>
        
        <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5FAFF] to-[#E8F4FD]">
      <Header />
      <main>
        <HomeFeed />
      </main>
      <BottomNav />
    </div>
  );
}