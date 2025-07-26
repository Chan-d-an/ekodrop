'use client'

import { useEffect, useState, useRef } from "react";
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  ArrowUp,
  ArrowDown,
  MessageCircle,
  Ghost,
  Heart,
  MoreVertical,
  Send,
} from 'lucide-react'
import { Post } from '@/types/types'

interface Props {
  post: Post
  onLike: (postId: string) => void
  onComment: (postId: string) => void
  onShare: (postId: string) => void
  onEcho: (postId: string) => void
}

export function PostCard({
  post,
  onLike
}: Props) {
  const [upvoted, setUpvoted] = useState(false)
  const [downvoted, setDownvoted] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [postAnon, setPostAnon] = useState(true) // <-- Added
  const [comments, setComments] = useState([
    {
      isAnonymous: true,
      username: "Anonymous",
      userImage: "",
      time: "2h ago",
      text: "This post is amazing!",
      liked: false,
      likesCount: 0,
    },
    {
      isAnonymous: false,
      username: "Chandan Kumar",
      userImage: "/chandan.jpg",
      time: "1h ago",
      text: "Really loved the perspective.",
      liked: false,
      likesCount: 0,
    },
  ])

  const commentSectionRef = useRef<HTMLDivElement>(null)
  const lastScrollTop = useRef<number>(0)

  const category = post.isAnon ? 'Confession' : post.imageURL ? 'Meme' : 'Post'
  const upCount = post.likes.length + (upvoted ? 1 : 0) - (downvoted ? 1 : 0)
  const downCount = ('dislikes' in post && Array.isArray(post.dislikes) ? post.dislikes.length : 0) + (downvoted ? 1 : 0)

  const handleUpvote = () => {
    setUpvoted(p => !p)
    if (downvoted) setDownvoted(false)
    onLike(post.id)
  }

  const handleDownvote = () => {
    setDownvoted(p => !p)
    if (upvoted) setUpvoted(false)
  }

  const handlePostComment = () => {
    if (!newComment.trim()) return
    setComments(prev => [
      ...prev,
      {
        isAnonymous: postAnon,
        username: postAnon ? "Anonymous" : "You",
        userImage: postAnon ? "" : "/profile.jpg", // optional: adjust image
        time: "Just now",
        text: newComment.trim(),
        liked: false,
        likesCount: 0,
      }
    ])
    setNewComment("")
  }

  const toggleCommentLike = (index: number) => {
    setComments(prev =>
      prev.map((c, i) => {
        if (i === index) {
          const newLiked = !c.liked
          return {
            ...c,
            liked: newLiked,
            likesCount: newLiked ? c.likesCount + 1 : c.likesCount - 1,
          }
        }
        return c
      })
    )
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop
      if (currentScroll > lastScrollTop.current) {
        setShowComments(false)
      }
      lastScrollTop.current = currentScroll <= 0 ? 0 : currentScroll
    }

    if (showComments) {
      window.addEventListener("scroll", handleScroll)
    }

    return () => window.removeEventListener("scroll", handleScroll)
  }, [showComments])

  useEffect(() => {
    document.body.style.overflow = showComments ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [showComments])

  return (
    <div className="bg-light dark:bg-dark border-b border-secondary/10 pt-6 pb-4 shadow-sm max-w-md mx-auto">
      {/* Top Row */}
      <div className="flex justify-between">
        <div className="flex items-start">
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
          <div className="text-tlight dark:text-tdark ml-3">
            <div className='text-[16px] font-semibold'>{post.uid}</div>
            <div className='flex text-[12px] text-tlight dark:text-tdark/70'>
              <div>15 min ago</div>
              <p className='mx-1'>|</p>
              <div>{category}</div>
            </div>
          </div>
        </div>
        <button className="mt-2 mr-1">
          <MoreVertical size={20} className="text-tlight dark:text-tdark" />
        </button>
      </div>

      {/* Caption */}
      <p className="mt-4 text-tlight dark:text-tdark text-[16px] leading-relaxed">
        {post.caption}
      </p>

      {/* Image */}
      {post.imageURL && (
        <Image
          src={post.imageURL}
          alt="post visual"
          width={500}
          height={1000}
          className="mt-3 w-full rounded-xl object-cover"
        />
      )}

      {/* Actions */}
      <div className="mt-4 flex justify-between text-tlight dark:text-tdark">
        <div className="flex items-center space-x-6 text-sm">
          <motion.button whileTap={{ scale: 0.9 }} onClick={handleUpvote} className="flex items-center space-x-1">
            <ArrowUp size={24} className={upvoted ? 'fill-primary text-primary' : ''} />
            <span>{upCount}</span>
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} onClick={handleDownvote} className="flex items-center space-x-1">
            <ArrowDown size={24} className={downvoted ? 'fill-primary text-primary' : ''} />
            <span>{downCount}</span>
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowComments(prev => !prev)} className="flex items-center space-x-1">
            <MessageCircle size={24} />
            <span>{post.comments}</span>
          </motion.button>
        </div>
        <button>
          <Send size={24} className="text-tlight dark:text-tdark" />
        </button>
      </div>

      <p className="mt-2 text-[14px] text-blue-400">#trending #famous #cricket</p>

      {/* Comments Section */}
      {showComments && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 80 }}
          className="fixed inset-0 z-50 bg-dark text-tdark max-w-md w-full mx-auto overflow-y-auto rounded-t-xl"
          ref={commentSectionRef}
        >
          <div className="w-full flex justify-center py-2">
            <div className="h-1.5 w-14 rounded-full bg-neutral-600" />
          </div>

          <div className="px-4 pb-24 pt-2 space-y-4">
            <h3 className="text-lg font-semibold mb-2">Comments</h3>
            {comments.map((comment, index) => (
              <div key={index} className="flex items-start gap-3 bg-dark p-3 rounded-lg text-tdark">
                <div className="shrink-0">
                  {comment.isAnonymous ? (
                    <Ghost className="w-8 h-8 text-gray-400" />
                  ) : (
                    <Image
                      src={comment.userImage}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-semibold">
                      {comment.isAnonymous ? "Anonymous" : comment.username}
                    </span>
                    <span className="text-xs text-gray-400">{comment.time}</span>
                  </div>
                  <p className="text-sm mb-2">{comment.text}</p>
                  <div className="flex gap-4 text-xs text-gray-400">
                    <button
                      onClick={() => toggleCommentLike(index)}
                      className={`flex items-center gap-1 transition-colors ${comment.liked ? "text-pink-500" : "hover:text-white"}`}
                    >
                      <Heart className={`w-4 h-4 ${comment.liked ? "fill-pink-500" : ""}`} />
                      {comment.likesCount}
                    </button>
                    <button className="flex items-center gap-1 hover:text-white">
                      <MessageCircle className="w-4 h-4" /> Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area with Anon Toggle */}
          <div className="fixed bottom-0 w-full max-w-md bg-dark border-t border-neutral-700 p-3">
            <div className="flex items-center justify-between mb-2 text-sm text-gray-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={postAnon}
                  onChange={() => setPostAnon(prev => !prev)}
                  className="accent-teal-500"
                />
                Post as Anonymous
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 p-2 rounded bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <button
                onClick={handlePostComment}
                className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
              >
                Post
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
