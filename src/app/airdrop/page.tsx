'use client';

import { useState } from 'react';
import { Header } from '@/app/components/layout/Header';
import { BottomNav } from '@/app/components/layout/BottomNav';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Users, Wifi, WifiOff, User, Ghost } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-[#F5FAFF] to-[#E8F4FD]">
     
      <main className="pt-8 pb-20 px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div
            
          >
            <div className="w-20 h-20 bg-gradient-to-r from-[#00C4CC] to-[#8E44AD] rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="text-white" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">AirDrop</h1>
            <p className="text-gray-600">Share your presence with nearby users</p>
          </div>

          {/* Scan Button */}
          <div
            
            className="mb-8"
          >
            <button
              
              onClick={handleScan}
              disabled={isScanning}
              className={`w-full py-4 rounded-full font-medium text-lg transition-all ${
                isScanning
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#00C4CC] to-[#8E44AD] text-white hover:shadow-lg'
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
              <h2 className="text-lg font-semibold text-gray-800">Nearby Users</h2>
              <span className="text-sm text-gray-500">{nearbyUsers.length} found</span>
            </div>

            <div className="space-y-3">
              <div>
                {nearbyUsers.map((user, index) => (
                  <div
                    key={user.id}
                    
                    className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          user.isAnon 
                            ? 'bg-gradient-to-r from-[#8E44AD] to-[#9B59B6]' 
                            : 'bg-gradient-to-r from-[#00C4CC] to-[#17A2B8]'
                        }`}>
                          {user.isAnon ? (
                            <Ghost className="text-white" size={20} />
                          ) : (
                            <User className="text-white" size={20} />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{user.name}</h3>
                          <p className="text-sm text-gray-500">{user.distance}m away</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          
                          className="px-3 py-1 bg-[#00C4CC] text-white rounded-full text-sm hover:bg-[#00B0B8] transition-colors"
                        >
                          Chat
                        </button>
                        <button
                          
                          className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300 transition-colors"
                        >
                          Share
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