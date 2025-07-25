'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

import { Send } from "lucide-react";


import {
  ArrowUp,
  ArrowDown,
  MessageCircle,

  MoreVertical
} from 'lucide-react'
import { Post } from '@/types/types'
const categoryFor = (post: Post) =>
  post.isAnon ? 'Confession' : post.imageURL ? 'Meme' : 'Post'
{/* 
const categoryColor = (category: string) => {
  switch (category) {
    case 'Confession':
      return {
        bg: 'bg-violet-100',
        text: 'text-violet-700'
      }
    case 'Meme':
      return {
        bg: 'bg-teal-100',
        text: 'text-teal-700'
      }
    default:
      return {
        bg: 'bg-gray-100',
        text: 'text-gray-700'
      }
  }
}
*/}

{/** 

const categoryColor = (category: string) => {
  switch (category) {
    case 'Confession':
      return {
        
        text: 'text-gray-800'
      }
    case 'Meme':
      return {
        
        text: 'text-gray-800'
      }
    default:
      return {
        
        text: 'text-gray-800'
      }
  }
}*/}
/* ─── component ─────────────────────────────────────────────────────── */
interface Props {
  post: Post
  onLike: (postId: string) => void
  onComment: (postId: string) => void
  onShare: (postId: string) => void      // not shown on UI but kept for API parity
  onEcho: (postId: string) => void  
     // not shown on UI but kept for API parity
}

export function PostCard({
  post,
  onLike,
  onComment,

}: Props) {

  const [upvoted, setUpvoted] = useState(false)
  const [downvoted, setDownvoted] = useState(false)

  const category = categoryFor(post)



  const upCount = post.likes.length + (upvoted ? 1 : 0) - (downvoted ? 1 : 0)
  const downCount =
    ('dislikes' in post && Array.isArray(post.dislikes)
      ? post.dislikes.length
      : 0) + (downvoted ? 1 : 0)



  const handleUpvote = () => {
    setUpvoted(p => !p)
    if (downvoted) setDownvoted(false)
    onLike(post.id)
  }

  const handleDownvote = () => {
    setDownvoted(p => !p)
    if (upvoted) setUpvoted(false)
    /* you can wire this to your API */
  }

  /* ── layout ──────────────────────────────────────────────────────── */
  return (
    <div

      className="bg-light dark:bg-dark border-b-[1px] border-secondary/10  pt-6 pb-4 shadow-sm "
    >
      {/* top row: avatar + category pill */}
      <div className="flex justify-between">
        {/* avatar */}
        <div className="flex items-start">
          {/*
        <div className="flex-none mt-[2px] w-10 h-10 rounded-full bg-gradient-to-br from-[#00C4CC] to-[#8E44AD] grid place-items-center">
         */}{/** {post.isAnon ? (
            <div className="w-10 h-10 bg-[#53C7C0] border-[2px] border-green-800 rounded-full relative">

              <Ghost size={22} className="text-black  rounded-full " />
               
     
            </div>

          ) : (
            <div className="w-10 h-10 bg-[#70F1F1] rounded-full  flex items-center justify-center">

              <Leaf size={22} className="text-black  rounded-full " />
              
      
            </div>
          )}
        </div> */}
        <div className="relative mt-[2px] w-10 h-10 rounded-full grid place-items-center">
                  {post.imageURL && (
        <Image
          src={post.imageURL}
          alt="post visual"
    fill
          className="absolute rounded-full object-cover"
        />
      )}
        </div>
          <div className="text-tlight dark:text-tdark ml-[10px]">
            
                <div className='text-[16px] font-semibold'> {post.uid}

                </div>
                <div className='flex text-[12px] text-tlight dark:text-tdark/70'>
                    <div className=''>
                      15 min ago
                    </div>
                    <p className='mx-[2px]'>|</p>
                    <div>
                        <span className={`{catColor.text}`}>
                          {category}
                        </span>
                       
                    </div>
                </div>
            

          </div>
          </div>
          <div>
            <button className="mr-[0px] mt-[8px]">
          <MoreVertical size={20} className="text-tlight dark:text-tdark" />
        </button>
          </div>
        {/* category pill 
        <span
          className={`${catColor.bg} ${catColor.text} ml-3 mt-1 px-3 py-1 rounded-full text-xs font-medium`}
        >
          {category}
        </span>*/}
      </div>

      {/* caption */}
      <p className="mt-4 text-tlight dark:text-tdark leading-relaxed text-[16px]">
        {post.caption}
      </p>

      {/* optional image */}
      {post.imageURL && (
        <Image
          src={post.imageURL}
          alt="post visual"
          width={500}
          height={1000}
          className="mt-3 w-full rounded-xl object-cover"
        />
      )}

      {/* actions */}
      <div className="mt-4 flex justify-between text-tlight dark:text-tdark">
        <div className="flex items-center space-x-6 text-sm">
        {/* upvote */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleUpvote}
          className="flex items-center space-x-1"
        >
          <ArrowUp
            size={24}
            className={upvoted ? 'fill-primary text-primary' : ''}
          />
          <span className="font-medium">{upCount}</span>
        </motion.button>

        {/* downvote */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleDownvote}
          className="flex items-center space-x-1"
        >
          <ArrowDown
            size={24}
            className={downvoted ? 'fill-primary text-primary' : ''}
          />
          <span className="font-medium">{downCount}</span>
        </motion.button>

        {/* comments */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onComment(post.id)}
          className="flex items-center space-x-1"
        >
          <MessageCircle size={24} />
          <span className="font-medium">{post.comments}</span>
        </motion.button>
        </div>
        <button>
        <Send size={24} className="text-tlight dark:text-tdark" />
        </button>
      </div>
      <div>
        <p className="mt-[6px] text-[14px] text-blue-400">#trending #famous #cricet ...</p>
      </div>
    </div>
  )
}
