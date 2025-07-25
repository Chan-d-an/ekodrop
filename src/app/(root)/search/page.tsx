'use client';

import { useState } from "react";
import { BottomNav } from '@/components/layout/BottomNav';
import {HomeFeed } from "@/components/home/HomeFeed";
import Image from 'next/image';
import { Search } from 'lucide-react';

export default function SearchPage() {
 
 const [activeTab, setActiveTab] = useState("posts");
const [isFollowing, setIsFollowing] = useState(false);
 

  return (
    <div className="min-h-screen bg-light dark:bg-dark ">
      
      <main className="pt-6 pb-20 px-4">
        <div className="max-w-md mx-auto">
          {/* Search Bar */}
          
          <div
            
            className="relative mb-4 bg-secondary dark:bg-secondary/10 rounded-full text-tlight dark:text-tdark"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tlight dark:text-tdark/30" size={20} />
            <input
              type="text"
              placeholder="Search drops, topics, or locations..."
              className=" w-full pl-10 pr-4 py-3 bg-secondary dark:bg-secondary/10 border border-secondary/10 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
            />
          </div>
          
          
      <div className="inline-flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab("posts")}
          className={`text-xs py-1 px-3 rounded-xl border bg-secondary dark:bg-secondary/20 text-light dark:text-tdark ${
            activeTab === "posts" ? "border-[#72ff50]" : ""
          }`}
        >
          Posts
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`text-xs py-1 px-3 rounded-xl border bg-secondary dark:bg-secondary/20 text-light dark:text-tdark ${
            activeTab === "users" ? "border-[#72ff50]" : ""
          }`}
        >
          Users
        </button>
      </div>
   

          {/* users accounts */}
         {/* Conditional Rendering Based on Active Tab */}
{activeTab === "posts" && <HomeFeed />}

{activeTab === "users" && (
  <div className="rounded-lg">
    <div className="grid grid-cols-2 gap-2 ">
      {/* Repeat user card as needed */}
      {[1, 2,3,4,5,6].map((_, index) => (
        <div
          key={index}
          className="rounded-lg px-2 py-4 border-[1px] border-secondary/10 flex flex-col items-center justify-center space-y-2 bg-[url('/bg.jpeg')] bg-cover bg-center bg-no-repeat relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)] z-0 rounded-lg" />

          <div className="relative z-10">
            <div className="h-[50px] w-[50px] mx-auto">
              <Image
                src="/profile.jpg" // Replace with actual src
                alt="Profile"
                className="border-secondary bg-secondary/20 border rounded-full mt-1 mx-auto object-cover shadow-lg"
                width={50}
                height={50}
              />
            </div>

            <div className="text-center leading-tight mt-1">
              <p className="text-sm font-medium text-tdark mx-auto mb-0 leading-none">user name</p>
              <p className="text-xs text-tdark mx-auto mt-0 leading-none">user title</p>
            </div>

            <div className="mx-auto mt-2">
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`rounded-lg px-5 py-1 font-semibold text-white transition-all duration-200 shadow-md
                  ${isFollowing ? 'bg-secondary/20' : 'bg-primary'}
                `}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}


        </div>
      </main>
      <BottomNav />
    </div>
  );
}