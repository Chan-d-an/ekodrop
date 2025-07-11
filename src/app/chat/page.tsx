'use client';

import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { motion } from 'framer-motion';
import { MessageCircle, Ghost, User, Clock } from 'lucide-react';

export default function ChatPage() {
  const chats = [
    {
      id: 1,
      isAnon: true,
      lastMessage: "Hey, loved your post about campus life!",
      lastTime: "2m ago",
      unread: 2
    },
    {
      id: 2,
      isAnon: false,
      name: "Sarah",
      lastMessage: "Are you going to the study group tonight?",
      lastTime: "1h ago",
      unread: 0
    },
    {
      id: 3,
      isAnon: true,
      lastMessage: "That coffee spot recommendation was perfect!",
      lastTime: "3h ago",
      unread: 1
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5FAFF] to-[#E8F4FD]">
      <Header />
      <main className="pt-16 pb-20 px-4">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center space-x-2 mb-4">
              <MessageCircle className="text-[#00C4CC]" size={24} />
              <h1 className="text-2xl font-bold text-gray-800">Chats</h1>
            </div>
            <p className="text-gray-600">Anonymous conversations and messages</p>
          </motion.div>

          <div className="space-y-3">
            {chats.map((chat, index) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-4 border border-gray-200 hover:border-[#00C4CC] transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      chat.isAnon 
                        ? 'bg-gradient-to-r from-[#8E44AD] to-[#9B59B6]' 
                        : 'bg-gradient-to-r from-[#00C4CC] to-[#17A2B8]'
                    }`}>
                      {chat.isAnon ? (
                        <Ghost className="text-white" size={20} />
                      ) : (
                        <User className="text-white" size={20} />
                      )}
                    </div>
                    {chat.unread > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">{chat.unread}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-800 truncate">
                        {chat.isAnon ? 'Anonymous' : chat.name}
                      </h3>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock size={12} />
                        <span>{chat.lastTime}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 truncate mt-1">
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {chats.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="text-gray-400" size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No chats yet</h3>
              <p className="text-gray-600 text-sm">
                Start conversations by commenting on posts or using AirDrop
              </p>
            </motion.div>
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}