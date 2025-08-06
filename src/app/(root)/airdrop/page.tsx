'use client';

import { useState } from 'react';
import { BottomNav } from '@/components/layout/BottomNav';
import { motion} from 'framer-motion';
import { Zap,Users, Wifi, WifiOff,User, Ghost } from 'lucide-react';

export default function AirDropPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [nearbyUsers, setNearbyUsers] = useState([
    { id: 1, name: 'Anonymous', isAnon: true, distance: 12 },
    { id: 2, name: 'Sarah', isAnon: false, distance: 23 },
    { id: 3, name: 'Anonymous', isAnon: true, distance: 35 }
  ]);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning
    setTimeout(() => {
      setIsScanning(false);
      // Add more users
      setNearbyUsers([
        ...nearbyUsers,
        { id: Date.now(), name: 'Anonymous', isAnon: true, distance: Math.floor(Math.random() * 50) + 10 }
      ]);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-dark">
     
      <main className="pt-8 pb-20 px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div
            
          >
            <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="text-primary" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-tdark mb-2">AirDrop</h1>
            <p className="text-tdark">Share your presence with nearby users</p>
          </div>

          {/* Scan Button */}
          <div
            
            className="mb-8"
          >
            <button
              
              onClick={handleScan}
              disabled={isScanning}
              className={`w-full py-4 rounded-full font-medium text-lg mt-2 transition-all ${
                isScanning
                  ? 'border border-secondary/10 text-primary cursor-not-allowed'
                  : 'border border-secondary/10 text-primary text-shadow-xs text-shadow-black '
              }`}
            >
              {isScanning ? (
                <div className="flex items-center justify-center space-x-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
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
          <div
            
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-secondary">Nearby Users</h2>
              <span className="text-sm text-secondary/70">{nearbyUsers.length} found</span>
            </div>

            <div className="space-y-3">
              <div>
                {nearbyUsers.map((user) => (
                  <div
                    key={user.id}
                    
                    className=" rounded-lg p-4 shadow-sm border mb-2 border-secondary/10"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-full text-tdark flex items-center justify-center ${
                          user.isAnon 
                            ? '' 
                            : ''
                        }`}>
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
                      
                      <div className="flex space-x-2">
                        
                        <button
                          
                          className="px-3 py-1 bg-secondary/10 text-tdark rounded-full text-sm  transition-colors"
                        >
                          Share
                        </button>
                        <button
                          
                          className="px-3 py-1 bg-secondary/10 text-primary rounded-full text-sm  transition-colors"
                        >
                          Chat
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Empty State */}
            {nearbyUsers.length === 0 && !isScanning && (
              <div
                
                className="text-center py-12"
              >
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