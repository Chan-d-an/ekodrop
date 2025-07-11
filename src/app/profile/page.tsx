'use client';


import { BottomNav } from '@/components/layout/BottomNav';

import { User, Crown, Zap, MapPin, Clock, Edit } from 'lucide-react';

export default function ProfilePage() {
  const userStats = {
    drops: 23,
    echoes: 156,
    reach: 8.5,
    tier: 'Plus'
  };

  const recentPosts = [
    {
      id: 1,
      caption: "Just finished my final exam! Time to celebrate 🎉",
      reach: 2.1,
      echoes: 15,
      timeLeft: "18h"
    },
    {
      id: 2,
      caption: "Late night study session vibes ✨",
      reach: 3.2,
      echoes: 28,
      timeLeft: "4h"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5FAFF] to-[#E8F4FD]">
      
      <main className="pt-4 pb-20 px-4">
        <div className="max-w-md mx-auto">
          {/* Profile Header */}
          <div
            
            className="bg-white rounded-2xl p-6 shadow-lg mb-6"
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-[#00C4CC] to-[#8E44AD] rounded-full flex items-center justify-center">
                  <User className="text-white" size={32} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Crown size={14} className="text-white" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-bold text-gray-800">Alex Johnson</h1>
                  <span className="px-2 py-1 bg-gradient-to-r from-[#00C4CC] to-[#8E44AD] text-white text-xs rounded-full">
                    {userStats.tier}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-1">
                  Digital nomad | Coffee enthusiast | Late night thinker
                </p>
              </div>
              
              <button
               
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Edit size={18} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div
            
            className="grid grid-cols-4 gap-4 mb-6"
          >
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <div className="text-2xl font-bold text-[#00C4CC]">{userStats.drops}</div>
              <div className="text-xs text-gray-600">Drops</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <div className="text-2xl font-bold text-[#8E44AD]">{userStats.echoes}</div>
              <div className="text-xs text-gray-600">Echoes</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <div className="text-2xl font-bold text-[#00C4CC]">{userStats.reach}k</div>
              <div className="text-xs text-gray-600">Reach</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <div className="text-2xl font-bold text-[#8E44AD]">15</div>
              <div className="text-xs text-gray-600">Chats</div>
            </div>
          </div>

          {/* Recent Posts */}
          <div
           
            className="mb-6"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Drops</h2>
            <div className="space-y-3">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  
                  className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
                >
                  <p className="text-gray-800 mb-3">{post.caption}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <MapPin size={14} />
                        <span>{post.reach}km</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Zap size={14} />
                        <span>{post.echoes}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{post.timeLeft}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Upgrade CTA */}
          <div
           
            className="bg-gradient-to-r from-[#00C4CC] to-[#8E44AD] rounded-2xl p-6 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold mb-2">Upgrade to Pro</h3>
                <p className="text-white/80 text-sm">
                  Get 15km reach, analytics, and custom avatars
                </p>
              </div>
              <button
                
                className="bg-white text-[#00C4CC] px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors"
              >
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}