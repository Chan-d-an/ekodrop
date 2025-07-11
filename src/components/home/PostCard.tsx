'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
 
import {
  ArrowUp,
  ArrowDown,
  MessageCircle,
  MoreHorizontal,
  Ghost,
  Leaf
} from 'lucide-react'
import { Post } from '@/types/types'

/* ─── helpers ───────────────────────────────────────────────────────── */
const categoryFor = (post: Post) =>
  post.isAnon ? 'Confession' : post.imageURL ? 'Meme' : 'Post'

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

/* ─── component ─────────────────────────────────────────────────────── */
interface Props {
  post: Post
  onLike: (postId: string) => void
  onComment: (postId: string) => void
  onShare: (postId: string) => void      // not shown on UI but kept for API parity
  onEcho: (postId: string) => void       // not shown on UI but kept for API parity
}

export function PostCard({
  post,
  onLike,
  onComment,
  
}: Props) {
  /* local state for vote toggles */
  const [upvoted, setUpvoted] = useState(false)
  const [downvoted, setDownvoted] = useState(false)

  const category = categoryFor(post)
  const catColor = categoryColor(category)

  /* quick derived counts so UI responds instantly */
  const upCount   = post.likes.length + (upvoted ? 1 : 0) - (downvoted ? 1 : 0)
const downCount = ((post as any).dislikes?.length) ?? (0 + (downvoted ? 1 : 0))


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
      
      className="bg-white rounded-3xl border border-gray-200 p-4 shadow-sm "
    >
      {/* top row: avatar + category pill */}
      <div className="flex items-start ">
        {/* avatar */}
        <div className="flex-none w-8 h-8 rounded-full bg-gradient-to-br from-[#00C4CC] to-[#8E44AD] grid place-items-center">
          {post.isAnon ? (
            <div className="w-8 h-8 bg-[#53C7C0] rounded-full  flex items-center justify-center">
           
                <Ghost size={22} className="text-black  rounded-full " />
            </div>

          ) : (
            <div className="w-8 h-8 bg-[#70F1F1] rounded-full  flex items-center justify-center">
           
                <Leaf size={22} className="text-black  rounded-full " />
            </div>
          )}
        </div>

        {/* category pill */}
        <span
          className={`${catColor.bg} ${catColor.text} ml-3 mt-1 px-3 py-1 rounded-full text-xs font-medium`}
        >
          {category}
        </span>
      </div>

      {/* caption */}
      <p className="mt-4 text-gray-900 leading-relaxed text-[15px] line-clamp-3">
        {post.caption}
      </p>

      {/* optional image */}
      {post.imageURL && (
        <Image
          src={post.imageURL} 
          alt="post visual"
          width={500}
    height={300} 
          className="mt-4 w-full rounded-xl object-cover"
        />
      )}

      {/* actions */}
      <div className="mt-4 flex items-center space-x-6 text-sm text-gray-600">
        {/* upvote */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleUpvote}
          className="flex items-center space-x-1"
        >
          <ArrowUp
            size={18}
            className={upvoted ? 'fill-[#00C4CC] text-[#00C4CC]' : ''}
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
            size={18}
            className={downvoted ? 'fill-[#8E44AD] text-[#8E44AD]' : ''}
          />
          <span className="font-medium">{downCount}</span>
        </motion.button>

        {/* comments */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onComment(post.id)}
          className="flex items-center space-x-1"
        >
          <MessageCircle size={18} />
          <span className="font-medium">{post.comments}</span>
        </motion.button>

        {/* kebab menu aligned right */}
        <button className="ml-auto">
          <MoreHorizontal size={20} />
        </button>
      </div>
    </div>
  )
}
