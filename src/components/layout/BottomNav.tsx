'use client';


import { useRouter, usePathname } from 'next/navigation';
import { Home, Search, Droplet, User, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';

const NavItem = ({ icon: Icon, label, isActive, onClick }: {
  icon: Icon;
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
    
  </motion.button>
);

export function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },

    { icon: Droplet, label: 'Drop', path: '/drop' },
    
    { icon: Zap, label: 'AirDrop', path: '/airdrop' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div
      
      className="fixed bottom-0 left-0 right-0 bg-white backdrop-blur-lg border-t border-gray-200 z-50"
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
    </div>
  );
}