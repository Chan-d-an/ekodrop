'use client';

import { Header } from '@/app/components/layout/Header';
import { BottomNav } from '@/app/components/layout/BottomNav';
import { motion } from 'framer-motion';
import { Search, TrendingUp, MapPin, Clock } from 'lucide-react';

export default function SearchPage() {
  const trendingTopics = [
    { topic: 'campus life', posts: 234 },
    { topic: 'study tips', posts: 156 },
    { topic: 'food reviews', posts: 89 },
    { topic: 'late night thoughts', posts: 67 },
    { topic: 'weekend plans', posts: 45 }
  ];

  const nearbyPosts = [
    { id: 1, snippet: 'Amazing coffee at the new...' },
    { id: 2, snippet: 'Does anyone know when...' },
    { id: 3, snippet: 'Just finished my final...' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5FAFF] to-[#E8F4FD]">
      <Header />
      <main className="pt-16 pb-20 px-4">
        <div className="max-w-md mx-auto">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-6"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search drops, topics, or locations..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00C4CC] focus:border-transparent shadow-sm"
            />
          </motion.div>

          {/* Trending Topics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="text-[#00C4CC]" size={20} />
              <h2 className="text-lg font-semibold text-gray-800">Trending</h2>
            </div>
            <div className="space-y-2">
              {trendingTopics.map((item, index) => (
                <motion.button
                  key={item.topic}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="w-full p-3 bg-white rounded-lg border border-gray-200 hover:border-[#00C4CC] transition-colors text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-800 font-medium">#{item.topic}</span>
                    <span className="text-gray-500 text-sm">{item.posts} drops</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Nearby Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="text-[#8E44AD]" size={20} />
              <h2 className="text-lg font-semibold text-gray-800">Nearby</h2>
            </div>
            <div className="space-y-2">
              {nearbyPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="p-3 bg-white rounded-lg border border-gray-200 hover:border-[#8E44AD] transition-colors cursor-pointer"
                >
                  <p className="text-gray-700 text-sm">{post.snippet}</p>
                  <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                    <Clock size={12} />
                    <span>2h ago</span>
                    <span>•</span>
                    <span>0.5km away</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}