'use client';

import { useState } from 'react';
import { BottomNav } from '@/components/layout/BottomNav';
import { motion } from 'framer-motion';
import { Zap, Users, Wifi, WifiOff, User, Ghost } from 'lucide-react';

export default function AirDropPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [showAllAccounts, setShowAllAccounts] = useState(false);

  const [nearbyUsers, setNearbyUsers] = useState([
    { id: 1, name: 'Anonymous', isAnon: true, distance: 12 },
    { id: 2, name: 'Sarah', isAnon: false, distance: 23 },
    { id: 3, name: 'Anonymous', isAnon: true, distance: 35 },
    { id: 4, name: 'Mike', isAnon: false, distance: 42 },
    { id: 5, name: 'John', isAnon: false, distance: 50 }
  ]);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setNearbyUsers([
        ...nearbyUsers,
        { id: Date.now(), name: 'Anonymous', isAnon: true, distance: Math.floor(Math.random() * 50) + 10 }
      ]);
    }, 3000);
  };

  const displayedUsers = showAllAccounts ? nearbyUsers : nearbyUsers.slice(0, 3);

  return (
    <div className="min-h-screen bg-dark">
      <main className="pt-8 pb-20 px-4">
        <div className="max-w-md mx-auto">

          {/* Header */}
          <div className="text-center mb-4 ">
            <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="text-primary" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-tdark mb-1">AirDrop</h1>
            <p className="text-tdark text-sm mb-1">Share your presence with nearby users</p>
            <div className="mt-2 text-xs text-yellow-400 bg-yellow-900/20 px-3 py-1 rounded-full inline-block">
              🚧 Coming Soon – Get ready to connect!
            </div>
          </div>
          {/* Info Dropdown Card */}
<div className="mb-4">
  <motion.div
    initial={{ height: 55 }}
    animate={{ height: showAllAccounts ? 220 : 55 }}
    transition={{ duration: 0.4 }}
    className="bg-secondary/5 rounded-xl overflow-hidden relative border border-secondary/10"
  >
    <div
      className="flex items-center justify-between px-4 py-3 cursor-pointer "
      onClick={() => setShowAllAccounts(!showAllAccounts)}
    >
      <div className="flex items-center space-x-3 ">
        <Ghost className="text-primary" size={20} />
        <h2 className="text-sm font-semibold text-secondary">
          Anonymous Sharing
        </h2>
      </div>
      <span className="text-xs text-secondary/70">
        {showAllAccounts ? 'Hide ▲' : 'Learn More ▼'}
      </span>
    </div>

    {showAllAccounts && (
      <div className="px-4 pb-4 text-xs text-secondary/80 leading-relaxed">
        <p className="mb-2">
          This feature allows you to <strong>share accounts anonymously</strong>
          with nearby users – without exposing your identity. Perfect for those who
          want to connect discreetly or exchange access temporarily.
        </p>
        <p className="mb-1">
          When sharing anonymously:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Your real name is hidden.</li>
          <li>Only your proximity is shown.</li>
          <li>Recipient sees a temporary alias.</li>
        </ul>
      </div>
    )}
  </motion.div>
</div>

          

          {/* Scan Button */}
          <div className="mb-8">
            <button
              
              disabled={isScanning}
              className={`w-full py-4 cursor-not-allowed opacity-70  rounded-full font-medium text-lg mt-2 transition-all ${
                isScanning
                  ? 'border border-secondary/10 text-primary cursor-not-allowed'
                  : 'border border-secondary/10 text-primary text-shadow-xs text-shadow-black'
              }`}
            >
              {isScanning ? (
                <div className="flex items-center justify-center space-x-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Wifi size={20} />
                  </motion.div>
                  <span>Scanning...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Users size={20} />
                  <span>Find Nearby Users</span>
                </div>
              )}
            </button>
          </div>

          {/* Nearby Users */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-secondary">Nearby Users</h2>
              <span className="text-sm text-secondary/70">{nearbyUsers.length} found</span>
            </div>

            <div className="space-y-3">
              {displayedUsers.map((user) => (
                <div
                  key={user.id}
                  className="rounded-lg p-4 shadow-sm border mb-2 border-secondary/10"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full text-tdark flex items-center justify-center">
                        {user.isAnon ? (
                          <Ghost className="text-tdark text-shadow-xs text-shadow-black" size={20} />
                        ) : (
                          <User className="text-tdark text-shadow-xs text-shadow-black" size={20} />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-secondary">{user.name}</h3>
                        <p className="text-sm text-secondary/70">{user.distance}m away</p>
                      </div>
                    </div>

                    <div className="flex space-x-2 cursor-not-allowed opacity-70">
                      <button className="px-3 py-1 bg-secondary/10 text-tdark rounded-full text-sm transition-colors ">
                        Share
                      </button>
                      <button className="px-3 py-1 bg-secondary/10 text-primary rounded-full text-sm transition-colors ">
                        Chat
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Toggle Button */}
              {nearbyUsers.length > 3 && (
                <button
                  disabled
                  className="text-sm text-blue-400 mt-1 cursor-not-allowed opacity-70"
                >
                  {showAllAccounts ? 'Show less accounts ▲' : 'See all accounts >'}
                </button>
              )}
            </div>

            {/* Empty State */}
            {nearbyUsers.length === 0 && !isScanning && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <WifiOff className="text-gray-400" size={24} />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No users nearby</h3>
                <p className="text-gray-600 text-sm">
                  Try scanning again or move to a different location
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
