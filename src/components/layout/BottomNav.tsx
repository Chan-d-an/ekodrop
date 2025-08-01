'use client';


import { useRouter, usePathname } from 'next/navigation';
import { Home, Search, Droplet, User, Zap, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';


const NavItem = ({ icon: Icon,  isActive, onClick }: {
  icon: LucideIcon;
  
  path: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <motion.button
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className={`flex  flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ${
      isActive 
        ? 'text-tdak  text-primary b-secondary/10 ' 
        : 'text-tdark'
    }`}
  >
    <Icon size={24} className={isActive ? 'drop-shadow-sm' : ''} />
    
    
  </motion.button>
);

export function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { icon: Home,  path: '/' },
    { icon: Search, path: '/search' },

    { icon: Droplet ,path: '/drop' },
    
    { icon: Zap,  path: '/airdrop' },
    { icon: User,  path: '/profile' },
  ];

  return (
    <div
      
      className="fixed bottom-0 left-0 right-0 bg-dark backdrop-blur-lg border-t border-secondary/20 z-50"
    >
      <div className="flex justify-around items-center px-4 py-2 max-w-md mx-auto">
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            icon={item.icon}
            
            path={item.path}
            isActive={pathname === item.path}
            onClick={() => router.push(item.path)}
          />
        ))}
      </div>
    </div>
  );
}