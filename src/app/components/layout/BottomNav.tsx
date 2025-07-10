'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Home, Search, MessageCircle, Droplet, User, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const NavItem = ({ icon: Icon, label, path, isActive, onClick }: {
  icon: any;
  label: string;
  path: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <motion.button
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ${
      isActive 
        ? 'text-[#00C4CC] bg-[#00C4CC]/10' 
        : 'text-gray-600 hover:text-[#00C4CC] hover:bg-[#00C4CC]/5'
    }`}
  >
    <Icon size={20} className={isActive ? 'drop-shadow-sm' : ''} />
    <span className="text-xs mt-1 font-medium">{label}</span>
    {isActive && (
      <motion.div
        layoutId="activeTab"
        className="absolute -top-1 w-1 h-1 bg-[#00C4CC] rounded-full"
      />
    )}
  </motion.button>
);

export function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: MessageCircle, label: 'Chat', path: '/chat' },
    { icon: Droplet, label: 'Drop', path: '/drop' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Zap, label: 'AirDrop', path: '/airdrop' },
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 z-50"
    >
      <div className="flex justify-around items-center px-4 py-2 max-w-md mx-auto">
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            isActive={pathname === item.path}
            onClick={() => router.push(item.path)}
          />
        ))}
      </div>
    </motion.div>
  );
}