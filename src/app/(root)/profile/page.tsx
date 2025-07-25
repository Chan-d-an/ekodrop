

import { ThumbsUp, MessageCircle } from "lucide-react";

import { BottomNav } from '@/components/layout/BottomNav';
import { getSession } from '@/lib/getSession';

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
    image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=600&q=80", // ✅ REPLACED
  },
  {
    id :"2",
    date: "02 Jan, 24",
    title: "Gold route map & trading plan update.",
    likes: 130,
    comments: 28,
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=800&q=80", 
  
  },
  {
    id :"3",
    date: "31 Dec, 23",
    title: "Amazon my plan for 2024.",
    likes: 150,
    comments: 45,
    image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id :"4",
    date: "25 Dec, 23",
    title: "Why is gold outpacing the stock market?",
    likes: 100,
    comments: 20,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80", // ✅ Loads
  
  },
];



 

  return (
    <div className="min-h-screen bg-light dark:bg-dark pb-[100px]">

      
       <main className="p-4 max-w-md mx-auto bg-light dark:bg-dark">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4 text-tlight dark:text-tdark">
        <button className="text-2xl font-medium">{`←`}</button>
        <h1 className="text-xl font-semibold">My Profile</h1>
      </div>

      {/* Profile Card */}
      <div className=" text-white px-6 py-8 rounded-2xl mb-6 shadow ">
        <div className="flex items-center mb- ">
          <div className="inline-block items-center mx-auto ">
            <div className="flex items-center ">
              <Image
                  src={user?.image ? user.image : '/icons/profile.jpg'}
                  alt="Profile"
                  className="rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                  width={70}
                  height={70}
                /> 
              </div>
            <div>
              <h2 className="text-lg font-bold pt-3">John Mobbin</h2>
              
            </div>
          </div>
         {/**  <button className="text-sm underline border-[1px] border-green-700">Edit Profile</button>*/}
        </div>
        
        <div className=" grid grid-cols-3 text-center py-6  borderb-[1px] border-gray-700">
          
          <div className="border-r-[1px] dark:text-tdark border-gray-700 p p-[4px]">
            <p className="text-lg font-bold">6</p>
            <p className="text-xs text-gray-400">Published</p>
          </div>
          <div className="border-r-[1px] border-gray-700 p p-[4px]">
            <p className="text-lg font-bold">1k</p>
            <p className="text-xs text-gray-400">Followers</p>
          </div>
          <div className="p-[4px]">
            <p className="text-lg font-bold">100</p>
            <p className="text-xs text-gray-400">Following</p>
          </div>
        </div>
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

        </div>
      </div>

      {/* Published Ideas */}
      
      <div className="">
        <h2 className="text-lg font-semibold mb-4 text-tlight dark:text-tdark">Published Ideas</h2>
        <div  className="grid grid-cols-2 gap-0">
          {posts.map((post) => (
            <div     key={post.id} className="rounded-xl inline-block overflow-hidden">
                <div className="">
                  <Image
                  src={post.image}
                  alt="Profile"
                  className="mx-auto overflow-hidden  object-cover border-4 border-white shadow-lg"
                  width={200}
                  height={150}
                /> 
                </div>
                <p className="text-xs text-gray-500">{post.date}</p>
                <p className="text-sm font-semibold mt-1 mb-2 leading-tight">{post.title}</p>
                <div className="flex gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <ThumbsUp size={14} /> ({post.likes})
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle size={14} /> ({post.comments})
                </span>
              </div>
            </div>))}
        </div>
      </div>
    </main>
      <BottomNav />
    </div>
  );
}