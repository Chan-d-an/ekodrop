
'use client'
import React from 'react'

import { Settings ,ArrowLeft } from "lucide-react";

import { BottomNav } from '@/components/layout/BottomNav';
import { getSession } from '@/lib/getSession';
import Link from "next/link";
import Image from 'next/image';


export default async function ProfilePage() {
  
  const session = await getSession();
  const user = session?.user;
const posts = [
  { 
    id :"1",
    date: "07 Jan, 24",
    title: "Why is gold outpacing the stock market?",
    likes: 133,
    comments: 32,
    views: "2k",
    image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=600&q=80", // ✅ REPLACED
  },
  {
    id :"2",
    date: "02 Jan, 24",
    title: "Gold route map & trading plan update.",
    likes: 130,
    comments: 28,
    views: "30M",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=800&q=80", 
  
  },
  {
    id :"3",
    date: "31 Dec, 23",
    title: "Amazon my plan for 2024.",
    likes: 150,
    comments: 45,
    views: "121",
    image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id :"4",
    date: "25 Dec, 23",
    title: "Why is gold outpacing the stock market?",
    likes: 100,
    comments: 20,
    views: "20k",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80", // ✅ Loads
  
  },
  {
    id :"5",
    date: "31 Dec, 23",
    title: "Amazon my plan for 2024.",
    likes: 150,
    comments: 45,
    views: "121",
    image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=600&q=80",
  },
  { 
    id :"6",
    date: "07 Jan, 24",
    title: "Why is gold outpacing the stock market?",
    likes: 133,
    comments: 32,
    views: "2k",
    image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=600&q=80", // ✅ REPLACED
  },

];



 

  return (
    <div className="min-h-screen bg-dark pb-[100px]">

      
       <main className="p-4 max-w-md mx-auto bg-dark">
      {/* Header */}
      <div className="flex justify-between items-center gap-4 pb-2 text-tdark">
        {/*<button className="text-2xl font-medium"><-</button>*/}
        <div className='flex gap-2'>
          <ArrowLeft size={22}  className=''/>
        </div>
        
        <div>
          <div className="flex items-center w-full  ">
                <div className="text-md  flex items-center w-full ">
                   <h1 className="text-lg leading-5 text-tdark font-semibold">@loremkp59</h1>
                  
                </div>
                <Link href={'/profile/settings'}

              className="pl-2 rounded-full  bg-secondar transition-colors"
            >
              <Settings size={22} className="text-tdark" />
            </Link>
          </div>

        </div> 
        
      </div>

      {/* Profile Card */}
      <div className=" text-white  pt-6  rounded-2xl mb-6 shadow text-tdark">
        <div className="px-2">
          <div className="flex">
            <div className="w">
              <div className="">
              <Image
                  src={user?.image ? user.image : '/icons/profile.jpg'}
                  alt="Profile"
                  className="rounded-full min-h-[80px] min-w-[80px] mx-auto object-cover border-4 border-white shadow-lg"
                  width={80}
                  height={80}
                /> 
                </div>
              </div>
            <div className="mx-auto  ml-6 inline-block ">
              <h2 className=" font-bold  text-lg">John Mobbin</h2>
              
              <div className="flex flex-wrap gap-2 my-2">
                  <p className="px-2 leading-4 p-[1px] text-[10px] tracking-wider bg-secondary/20 rounded-lg">Dancing</p>
                  <p className="px-2 leading-4 p-[1px] text-[10px] tracking-wider bg-secondary/20 rounded-lg">Study</p>
                  <p className="px-2 leading-4 p-[1px] text-[10px] tracking-wider bg-secondary/20 rounded-lg">Playing</p>
                  <p className="px-2 leading-4 p-[1px] text-[10px] tracking-wider bg-secondary/20 rounded-lg">Dancing</p>
                  
                  
                  
                 
              </div>
            </div>
             </div>
              <p className="text-sm text-tdark mt-4 px-1">Lorem ipsum dolor sit,gu amet consectetur adipisicing elit. Id nihil,gv vero maxime ratione, quaerat voluptas nostrum ea doloribus magnam saepe aliquam sequi numquam eveniet harum nisi dolores rem?</p>
        
         {/**  <button className="text-sm underline border-[1px] border-green-700">Edit Profile</button>*/}
         
        </div>
        
        <div className=" inline-block w-full text-center py-6 border-b-[1px] border-gray-700 ">
          <div className='grid grid-cols-3 text-center pb-4'>
          <div className="border-r-[1px] border-gray-700  p-[4px]">
            <p className="text-lg font-bold">6</p>
            <p className="text-xs text-tdark/60">Published</p>
          </div>
          <div className="border-r-[1px] border-gray-700 p-[4px]">
            <p className="text-lg font-bold">1k</p>
            <p className="text-xs text-tdark/60">Followers</p>
          </div>
          <div className="p-[4px]">
            <p className="text-lg font-bold">100</p>
            <p className="text-xs text-tdark/60">Following</p>
          </div>

          </div>
          <button className=" text-md bg-secondary/10 w-full text-tdark mx-auto rounded-full py-2 px-4 text-center justify-center flex items-center gap-1">
                  
                   <span className=""> Follow</span>
                  </button>
        </div>
        
        {/** Action Buttons
        <div>
          <div className="flex items-center w-full pb-6 border-b-[1px] border-gray-700">
                <div className="text-md text-gray-400 flex items-center w-full gap-3">
                  <button className="bg-secondary dark:bg-secondary/10 w-full text-light dark:text-tdark mx-auto rounded-lg py-2 text-center justify-center flex">
                    Follow
                  </button>
                  <button className="bg-secondary dark:bg-secondary/10 w-full text-light dark:text-tdark mx-auto rounded-lg py-2 text-center justify-center flex">
                    Message
                  </button>
                </div>
          </div>

        </div> */}
      </div>

      {/* Published Ideas */}
      
      <div className="">
        <h2 className="text-lg font-semibold mb-4 text-tdark">Posts</h2>
        
        <div  className="grid grid-cols-3 gap-2 flex justify-between  ">
          {posts.map((post) => (
            <div     key={post.id} className="rounded-xl bg-dark inline-block overflow-hidden max-w-[200px] max-h-[450px]">
                <div className='max-w-[200px] max-h-[450px] w-full h-full  '>
                      <div className="relative max-w-[200px] max-h-[450px] w-full h-full">
                          <Image
                              src={post.image}
                              alt="Profile"
                              
                              className="mx-auto overflow-hidden w-full h-full object-cover shadow-lg"
                              width={200}
                              height={450}
                          /> 
                          <p className='absolute bottom-2  right-2 bg-dark/80 py-1 px-2 rounded-lg bg-transprent traking-wider text-tdark text-sm '>
                  ({post.views})
                </p>
                      </div>

                    
                </div>
                
            </div>))}
        </div>
      </div>
    </main>
      <BottomNav />
    </div>
  );
}


