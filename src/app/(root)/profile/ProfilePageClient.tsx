'use client';

import React, { useState } from 'react';
import { Settings, ArrowLeft, X } from 'lucide-react';
import { BottomNav } from '@/components/layout/BottomNav';
import Link from 'next/link';
import Image from 'next/image';


import { PostCard } from '@/components/home/PostCard';  // Make sure this path is correct
import { motion, AnimatePresence } from 'framer-motion';

interface User {
  name?: string | null;
  image?: string | null;
  email?: string | null;
}

interface Post {
  id: string;
  date: string;
  title: string;
  likes: number;
  comments: number;
  lat: number;
  lng: number;
  location: string;
  views: string;
  image: string;
}

interface ProfilePageClientProps {
  user: User | null;
}

const posts: Post[] = [
  { 
    id: "1",
    date: "07 Jan, 24",
    title: "Why is gold outpacing the stock market?",
    likes: 133,
    comments: 32,
    views: "2k",
    image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=600&q=80",
     lat: 22.5726, // Kolkata
    lng: 88.3639,
    location: "Kolkata"
  },
  {
    id: "2",
    date: "02 Jan, 24",
    title: "Gold route map & trading plan update.",
    likes: 130,
    comments: 28,
    views: "30M",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=800&q=80",
    lat: 19.0760,
    lng: 72.8777,
    location: "Mumbai"
  },
  {
    id: "3",
    date: "31 Dec, 23",
    title: "Amazon my plan for 2024.",
    likes: 150,
    comments: 45,
    views: "121",
    image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=600&q=80",
    lat: 13.0827,
    lng: 80.2707,
    location: "Chennai"
  },
  {
    id: "4",
    date: "28 Dec, 23",
    title: "Exploring the tech boom in Bangalore.",
    likes: 210,
    comments: 15,
    views: "7.5k",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    lat: 12.9716,
    lng: 77.5946,
    location: "Bangalore"
  },
  {
    id: "5",
    date: "25 Dec, 23",
    title: "Sunset by the Ganges, spiritual vibes.",
    likes: 320,
    comments: 20,
    views: "10k",
    image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg",
    lat: 25.3176,
    lng: 82.9739,
    location: "Varanasi"
  },
  {
    id: "6",
    date: "20 Dec, 23",
    title: "Cultural fest highlights from Jaipur.",
    likes: 410,
    comments: 25,
    views: "15k",
    image: "https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg",
    lat: 26.9124,
    lng: 75.7873,
    location: "Jaipur"
  }
];

export default function ProfilePageClient({ user }: ProfilePageClientProps) {
  const [following, setFollowing] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Dummy handlers to pass to PostCard for expanded post
  const handleLike = (postId: string) => {
    console.log("Like post", postId);
  };
  const handleComment = (postId: string) => {
    console.log("Comment post", postId);
  };
  const handleShare = (postId: string) => {
    console.log("Share post", postId);
  };
  const handleEcho = (postId: string) => {
    console.log("Echo post", postId);
  };

  return (
    <div className="min-h-screen bg-dark pb-[100px] relative">
      <main className="p-4 max-w-md mx-auto bg-dark">
        {/* Header */}
        <div className="flex justify-between items-center gap-4 pb-2 text-tdark">
          <div className='flex gap-2'>
            <ArrowLeft size={22} />
          </div>

          <div>
            <div className="flex items-center w-full">
              <div className="text-md flex items-center w-full">
                <h1 className="text-lg leading-5 text-tdark font-semibold">@loremkp59</h1>
              </div>
              <Link
                href={'/profile/settings'}
                className="pl-2 rounded-full transition-colors"
              >
                <Settings size={22} className="text-tdark" />
              </Link>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="text-white pt-6 rounded-2xl mb-6 shadow text-tdark">
          <div className="px-2">
            <div className="flex">
              <div>
                <Image
                  src={user?.image ? user.image : '/icons/profile.jpg'}
                  alt="Profile"
                  className="rounded-full min-h-[80px] min-w-[80px] mx-auto object-cover border-4 border-white shadow-lg cursor-pointer"
                  width={80}
                  height={80}
                  onClick={() => setIsProfileModalOpen(true)} // OPEN profile image modal on click
                />
              </div>
              <div className="mx-auto ml-6 inline-block">
                <h2 className="font-bold text-lg">John Mobbin</h2>

                <div className="flex flex-wrap gap-2 my-2">
                  <p className="px-2 leading-4 p-[1px] text-[10px] tracking-wider bg-secondary/20 rounded-lg">Dancing</p>
                  <p className="px-2 leading-4 p-[1px] text-[10px] tracking-wider bg-secondary/20 rounded-lg">Study</p>
                  <p className="px-2 leading-4 p-[1px] text-[10px] tracking-wider bg-secondary/20 rounded-lg">Playing</p>
                  <p className="px-2 leading-4 p-[1px] text-[10px] tracking-wider bg-secondary/20 rounded-lg">Dancing</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-tdark mt-4 px-1">
              m ea doloribus magnam saepe aliquam sequi numquam eveniet harum nisi dolores rem?
            </p>
          </div>

          <div className="inline-block w-full text-center py-6 border-b-[1px] border-gray-700">
            <div className='grid grid-cols-3 text-center pb-4'>
              <div className="p-[4px]">
                <p className="text-lg font-bold">6</p>
                <p className="text-xs text-tdark/60">Published</p>
              </div>
              <div className="p-[4px]">
                <p className="text-lg font-bold">1k</p>
                <p className="text-xs text-tdark/60">Followers</p>
              </div>
              <div className="p-[4px]">
                <p className="text-lg font-bold">100</p>
                <p className="text-xs text-tdark/60">Following</p>
              </div>
            </div>
            <button
              onClick={() => setFollowing(!following)}
              className={`text-md w-full text-tdark mx-auto rounded-full py-2 px-4 text-center justify-center flex items-center gap-1 transition-colors duration-200
                ${following ? 'bg-primary text-tlight font-medium tracking-wide' : ' font-medium tracking-wide bg-secondary/10'}`}
            >
              {following ? 'Following' : 'Follow'}
            </button>
          </div>
        </div>

        {/* Published Ideas */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-tdark">Posts</h2>

          <div className="grid grid-cols-3 gap-2 flex justify-between">
            {posts.map((post) => (
              <div 
                key={post.id} 
                className="rounded-xl bg-dark inline-block overflow-hidden max-w-[200px] max-h-[450px] cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className='max-w-[200px] max-h-[450px] w-full h-full'>
                  <div className="relative max-w-[200px] max-h-[450px] w-full h-full">
                    <Image
                      src={post.image}
                      alt="Post Image"
                      className="mx-auto overflow-hidden w-full h-full  max-w-[200px] min-h-[200px] max-w-[200px] max-h-[450px] object-cover shadow-lg"
                      width={200}
                      height={450}
                    />
                    <p className='absolute bottom-2 right-2 bg-dark/80 py-1 px-2 rounded-lg tracking-wider text-tdark text-xs'>
                      {post.views}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />

      {/* Expanded Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div 
            key="modal"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-md w-full bg-dark rounded-xl shadow-xl overflow-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-3 right-3 text-tdark hover:text-primary"
                aria-label="Close expanded post"
              >
                <X size={24} />
              </button>

              {/* You may need to adjust props here depending on PostCard interface */}
              <PostCard
                post={{
                  id: selectedPost.id,
                  uid: 'userLOL', // you may want to adjust
                  caption: selectedPost.title,
                  imageURL: selectedPost.image,
                  isAnon: false, // you can adjust as needed
                  lat: selectedPost.lat,
                  lng: selectedPost.lng,
                  createdAt: new Date(selectedPost.date),
                  expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
                  views: [],
                  likes: Array(selectedPost.likes).fill(''),
                  comments: selectedPost.comments,
                  ekoStats: { reach: 0, viewers: 0, maxRadius: 0 }
                }}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
                onEcho={handleEcho}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Image Modal */}
      <AnimatePresence>
        {isProfileModalOpen && (
          <motion.div
            key="profileModal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4"
            onClick={() => setIsProfileModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-md w-full bg-dark rounded-xl shadow-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
            >
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="absolute top-3 right-3 text-tdark hover:text-primary"
                aria-label="Close profile image"
              >
                <X size={24} />
              </button>
              <Image
                src={user?.image ? user.image : '/icons/profile.jpg'}
                alt="Profile Large"
                width={400}
                height={400}
                className="rounded-xl object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
