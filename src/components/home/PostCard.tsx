'use client'

import { useEffect, useState, useRef } from "react";
import { motion } from 'framer-motion'
import Image from 'next/image'
import GhostMap from './Ghostmap';
import {
  ArrowUp,
  ArrowDown,
  MessageCircle,
  Ghost,
  Heart,
  MoreVertical,
  Send,
  Bookmark,
  Flag,
  MapPinned
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
  
  const [showMap, setShowMap] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
const dropdownRef = useRef<HTMLDivElement>(null)

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
  function handleClickOutside(e: MouseEvent) {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setShowDropdown(false)
    }
  }

  if (showDropdown) {
    document.addEventListener("mousedown", handleClickOutside)
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside)
  }
}, [showDropdown])

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
    <div className="bg-dark  px-4 border-secondary/5 pt-6 pb-4 shadow-sm max-w-md mx-auto">
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
          <div className="text-tdark ml-3">
            <div className='text-[16px] font-semibold'>{post.uid}</div>
            <div className='flex text-[12px] text-tdark/70'>
              <div>15 min ago</div>
              <p className='mx-1'>|</p>
              <div>{category}</div>
            </div>
          </div>
        </div>
        <div className="relative">
  <button onClick={() => setShowDropdown(prev => !prev)} className="mt-2 mr-1">
    <MoreVertical size={20} className="text-tlight dark:text-tdark" />
  </button>

  {showDropdown && (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-40 bg-dark text-tdark shadow-lg rounded-lg  z-50 border border-neutral-700"
    >
      <button
        onClick={() => {
          setShowDropdown(false)
          alert("Post saved!") // Replace with real logic
        }}
        className="w-full px-4 pt-3 pb-2 hover:bg-neutral-800 flex items-center gap-2 text-sm rounded-t-lg"
      >
        <Bookmark size={16} /> Save Post
      </button>
      <button
        onClick={() => {
          setShowDropdown(false)
          alert("Reported!") // Replace with real logic
        }}
        className="w-full px-4 pb-3 pt-2 hover:bg-neutral-800 flex items-center gap-2 text-sm rounded-b-lg text-red-400"
      >
        <Flag size={16} /> Report Post
      </button>
    </div>
  )}
</div>

      </div>

      {/* Caption */}
      <p className="mt-4 text-tdark text-[16px] leading-relaxed bg-secondary/10 py-2 px-4 rounded-lg ">
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
      <div className="mt-4 flex justify-between text-tdark">
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
        <div className="flex gap-4">
        
         <button onClick={() => setShowMap(true)}>
          <MapPinned size={24} className="text-tdark" />
        </button>
        <button>
          <Send size={24} className="text-tdark" />
        </button>
        </div>
      </div>

      <p className="mt-2 text-[14px] text-blue-400">#trending #famous #cricket</p>

      {showMap && (
        <div className="fixed inset-0 z-50 flex justify-center items-end "> 
          <div className="absolute inset-0 max-w-md mx-auto  " onClick={() => setShowMap(false)} />
          <div
            
            className="relative z-10  max-h-[90vh] bg-dark/90 bg-opacity/10 bottom-0 w-full max-w-md mx-auto overflow-hidden rounded-t-2xl shadow-xl overflow-y-auto"
          >
            <div className="w-full flex justify-center py-2  cursor-pointer ">
              <div className="h-1.5 w-14 rounded-full bg-secondary/10" />
            </div>
            <GhostMap lat={post.lat} lng={post.lng} />

          </div>
        </div>
      )}


      {/* Comments Section */}
      {showComments && (
  <div className="fixed inset-0 z-50  flex justify-center items-end ">
    {/* BACKDROP */}
    <div
      className="absolute inset-0 bg-transparent bg-opacity-50"
      onClick={() => setShowComments(false)}
    />

    {/* COMMENT PANEL */}
    <div
      
      className="relative z-10 bg-dark  mt-[150px] bottom-0 max-h-[70vh] text-tdark max-w-md w-full mx-auto overflow-y-auto rounded-t-xl"
      ref={commentSectionRef}
    >

          
        <motion.div
  drag="y"
  dragConstraints={{ top: 0, bottom: 0 }}
  onDragEnd={(_, info) => {
    if (info.offset.y > 5) {
      setShowComments(false)
    }
  }}
  className="w-full flex justify-center py-2 cursor-pointer"
>
  <div className="h-1.5 w-14 rounded-full bg-secondary/10" />
</motion.div>

          <div className="px-4 pb-82 pt-2 space-y-4">
            <h3 className="text-lg font-semibold mb-2">Comments</h3>
            {comments.map((comment, index) => (
              <div key={index} className="flex items-start gap-3 bg-dark p-3 rounded-lg text-tdark">
                <div className="shrink-0">
                  {comment.isAnonymous ? (
                    <Ghost className="w-6 h-6 mt-1 text-gray-400" />
                  ) : (
                    <Image
                      src={comment.userImage}
                      alt="Profile"
                      className="w-6 h-6 mt-1 rounded-full object-cover"
                      width={24}
                      height={24}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-semibold text-tdark">
                      {comment.isAnonymous ? "Anonymous" : comment.username}
                    </span>
                    <span className="text-xs text-tdark/70">{comment.time}</span>
                  </div>
                  <p className="text-sm mb-2 text-tdark">{comment.text}</p>
                  <div className="flex gap-4 text-xs text-tdark/30">
                    <button
                      onClick={() => toggleCommentLike(index)}
                      className={`flex items-center gap-1 transition-colors ${comment.liked ? "text-primary" : "hover:text-primary"}`}
                    >
                      <Heart className={`w-4 h-4 ${comment.liked ? "fill-primary" : ""}`} />
                      {comment.likesCount}
                    </button>
                   {/* <button className="flex items-center gap-1 ">
                      <MessageCircle className="w-4 h-4" /> Reply
                    </button>*/}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area with Anon Toggle */}
          <div className="fixed bottom-0 w-full mb-[55px] max-w-md bg-dark border-t border-secondary/10 p-3">
            <div className="flex items-center justify-between mb-2 text-sm text-tdark">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={postAnon}
                  onChange={() => setPostAnon(prev => !prev)}
                  className="accent-primary"
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
                className="flex-1 p-2 rounded bg-secondary/10 text-tdark focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                onClick={handlePostComment}
                className="bg-primary text-shadow-black text-shadow-xs  text-tdark px-4 py-2 rounded "
              >
                Drop
              </button>
            </div>
          </div>
             </div>
    </div>
)}

      
    </div>
  )
}
