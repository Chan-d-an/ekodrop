'use client';

import { useState, useEffect } from 'react';

import { PostCard } from './PostCard';
import { Post } from '@/lib/types';


// Mock data for demo
// Ultra‑funny / trolling campus feed
const mockPosts: Post[] = [
  {
    id: '1',
    uid: 'userLOL1',
    caption: "Professor: “Any doubts?”  Me: “Yeah, why 8 a.m. exists?” ☕️",
    imageURL: 'https://images.pexels.com/photos/3768159/pexels-photo-3768159.jpeg',
    isAnon: true,
    lat: 40.7129,
    lng: -74.0007,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1_000),
    views: ['user2', 'user5'],
    likes: ['user7'],
    comments: 9,
    ekoStats: { reach: 3.8, viewers: 73, maxRadius: 5 }
  },
  {
    id: '2',
    uid: 'userLOL2',
    caption: "Group project update: it’s just me, caffeine, and a single brain‑cell.",
    imageURL: 'https://images.pexels.com/photos/983585/pexels-photo-983585.jpeg',
    isAnon: false,
    lat: 40.7272,
    lng: -73.9976,
    createdAt: new Date(Date.now() - 30 * 60 * 1_000),
    expiresAt: new Date(Date.now() + 21.5 * 60 * 60 * 1_000),
    views: ['user1', 'user3', 'user9'],
    likes: ['user1'],
    comments: 14,
    ekoStats: { reach: 4.1, viewers: 98, maxRadius: 5 }
  },
  {
    id: '3',
    uid: 'userLOL3',
    caption: "Confession: I spell‑checked my name wrong on the exam cover sheet.",
    imageURL: 'https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg',
    isAnon: true,
    lat: 40.7311,
    lng: -73.9922,
    createdAt: new Date(Date.now() - 55 * 60 * 1_000),
    expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1_000),
    views: ['user4'],
    likes: ['user8'],
    comments: 7,
    ekoStats: { reach: 2.9, viewers: 54, maxRadius: 5 }
  },
  {
    id: '4',
    uid: 'userLOL4',
    caption: "Told my crush via Kahoot username: “MarryMePls.” She chose another game. 😭",
    imageURL: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
    isAnon: false,
    lat: 40.7423,
    lng: -73.9890,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1_000),
    expiresAt: new Date(Date.now() + 19 * 60 * 60 * 1_000),
    views: ['user2', 'user6'],
    likes: ['user3', 'user6'],
    comments: 11,
    ekoStats: { reach: 3.4, viewers: 68, maxRadius: 5 }
  },
  {
    id: '5',
    uid: 'userLOL5',
    caption: "Mid‑lecture phone rang. Ringtone?  “Baby Shark.” Send help. 🦈",
    imageURL: 'https://images.pexels.com/photos/220938/pexels-photo-220938.jpeg',
    isAnon: true,
    lat: 40.7518,
    lng: -73.9770,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1_000),
    expiresAt: new Date(Date.now() + 18 * 60 * 60 * 1_000),
    views: ['user4', 'user7'],
    likes: [],
    comments: 5,
    ekoStats: { reach: 2.3, viewers: 42, maxRadius: 5 }
  },
  {
    id: '6',
    uid: 'userLOL6',
    caption: "Asked ChatGPT to do my assignment. Got a therapy session instead.",
    imageURL: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg',
    isAnon: false,
    lat: 40.7580,
    lng: -73.9855,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1_000),
    expiresAt: new Date(Date.now() + 17 * 60 * 60 * 1_000),
    views: ['user5', 'user8', 'user9'],
    likes: ['user2'],
    comments: 12,
    ekoStats: { reach: 3.6, viewers: 80, maxRadius: 5 }
  },
  {
    id: '7',
    uid: 'userLOL7',
    caption: "If GPA equaled TikTok hours, I’d graduate summa cum laude.",
    imageURL: 'https://images.pexels.com/photos/260923/pexels-photo-260923.jpeg',
    isAnon: true,
    lat: 40.7694,
    lng: -73.9683,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1_000),
    views: ['user1', 'user2'],
    likes: ['user4'],
    comments: 6,
    ekoStats: { reach: 3.0, viewers: 61, maxRadius: 5 }
  },
  {
    id: '8',
    uid: 'userLOL8',
    caption: "Lecture slides said 'Optional Reading'… so I opted OUT entirely. ✌️",
    imageURL: 'https://images.pexels.com/photos/1554102/pexels-photo-1554102.jpeg',
    isAnon: false,
    lat: 40.7402,
    lng: -73.9954,
    createdAt: new Date(Date.now() - 20 * 60 * 1_000),
    expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1_000),
    views: ['user3'],
    likes: [],
    comments: 4,
    ekoStats: { reach: 2.4, viewers: 49, maxRadius: 5 }
  },
  {
    id: '9',
    uid: 'userLOL9',
    caption: "Wanted to network; accidentally joined alumni group chat from 1987. 👴",
    imageURL: 'https://images.pexels.com/photos/3771061/pexels-photo-3771061.jpeg',
    isAnon: true,
    lat: 40.7465,
    lng: -73.9829,
    createdAt: new Date(Date.now() - 90 * 60 * 1_000),
    expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1_000),
    views: ['user12', 'user13'],
    likes: ['user14'],
    comments: 8,
    ekoStats: { reach: 3.2, viewers: 64, maxRadius: 5 }
  },
  {
    id: '10',
    uid: 'userLOL10',
    caption: "Pro‑tip: rename your Wi‑Fi hotspot 'Campus_Extender' for free popularity.",
    imageURL: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg',
    isAnon: false,
    lat: 40.7217,
    lng: -74.0014,
    createdAt: new Date(Date.now() - 110 * 60 * 1_000),
    expiresAt: new Date(Date.now() + 19 * 60 * 60 * 1_000),
    views: ['user6', 'user2', 'user8'],
    likes: ['user3', 'user5'],
    comments: 15,
    ekoStats: { reach: 4.0, viewers: 90, maxRadius: 5 }
  },
  {
    id: '11',
    uid: 'userLOL11',
    caption: "Typed ‘HAHAHA’ but was silently screaming inside. Classic.",
    imageURL: 'https://images.pexels.com/photos/5957475/pexels-photo-5957475.jpeg',
    isAnon: true,
    lat: 40.7532,
    lng: -73.9806,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 23 * 60 * 60 * 1_000),
    views: ['user9', 'user3'],
    likes: ['user8'],
    comments: 13,
    ekoStats: { reach: 3.7, viewers: 82, maxRadius: 5 }
  },
  {
    id: '12',
    uid: 'userLOL12',
    caption: "Woke at 8:55 AM, class at 8. Walked in with latte like a CEO.",
    imageURL: 'https://images.pexels.com/photos/2091513/pexels-photo-2091513.jpeg',
    isAnon: false,
    lat: 40.7354,
    lng: -73.9918,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1_000),
    views: ['user11'],
    likes: [],
    comments: 19,
    ekoStats: { reach: 3.9, viewers: 97, maxRadius: 5 }
  },
  {
    id: '13',
    uid: 'userLOL13',
    caption: "Borrowed a pen. Graduated with it. Thanks random freshman.",
    imageURL: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg',
    isAnon: true,
    lat: 40.7699,
    lng: -73.9602,
    createdAt: new Date(Date.now() - 10 * 60 * 1_000),
    expiresAt: new Date(Date.now() + 18 * 60 * 60 * 1_000),
    views: ['user2', 'user5'],
    likes: ['user10'],
    comments: 3,
    ekoStats: { reach: 2.6, viewers: 55, maxRadius: 5 }
  },
  {
    id: '14',
    uid: 'userLOL14',
    caption: "Asked a senior for ‘career tips’. He said: “Run.”",
    imageURL: 'https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg',
    isAnon: false,
    lat: 40.7520,
    lng: -73.9687,
    createdAt: new Date(Date.now() - 160 * 60 * 1_000),
    expiresAt: new Date(Date.now() + 17 * 60 * 60 * 1_000),
    views: ['user4'],
    likes: ['user6', 'user2'],
    comments: 4,
    ekoStats: { reach: 2.8, viewers: 60, maxRadius: 5 }
  },
  {
    id: '15',
    uid: 'userLOL15',
    caption: "Presentation slides corrupted; I improvised interpretive dance.",
    imageURL: 'https://images.pexels.com/photos/3782231/pexels-photo-3782231.jpeg',
    isAnon: true,
    lat: 40.7486,
    lng: -73.9742,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 21 * 60 * 60 * 1_000),
    views: ['user1', 'user8'],
    likes: ['user5'],
    comments: 21,
    ekoStats: { reach: 4.5, viewers: 103, maxRadius: 5 }
  },
  {
    id: '16',
    uid: 'userLOL16',
    caption: "Career fair tip: offer recruiters snacks; secure interviews immediately.",
    imageURL: 'https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg',
    isAnon: false,
    lat: 40.7134,
    lng: -74.0071,
    createdAt: new Date(Date.now() - 45 * 60 * 1_000),
    expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1_000),
    views: ['user12', 'user15'],
    likes: ['user3'],
    comments: 6,
    ekoStats: { reach: 3.1, viewers: 72, maxRadius: 5 }
  },
  // ---- Posts WITHOUT images (17–20) ----
  {
    id: '17',
    uid: 'userLOL17',
    caption: "Typed a 2 000‑word essay, forgot to hit save. RIP.",
    isAnon: true,
    lat: 40.7377,
    lng: -73.9972,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 19 * 60 * 60 * 1_000),
    views: ['user4'],
    likes: [],
    comments: 16,
    ekoStats: { reach: 3.3, viewers: 78, maxRadius: 5 }
  },
  {
    id: '18',
    uid: 'userLOL18',
    caption: "Lecture Wi‑Fi died; professor blamed ‘sunspots’. Sure, buddy.",
    isAnon: false,
    lat: 40.7451,
    lng: -73.9819,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1_000),
    expiresAt: new Date(Date.now() + 18 * 60 * 60 * 1_000),
    views: ['user2', 'user6'],
    likes: ['user1'],
    comments: 2,
    ekoStats: { reach: 2.5, viewers: 48, maxRadius: 5 }
  },
  {
    id: '19',
    uid: 'userLOL19',
    caption: "Tried ‘study with me’ livestream. Everyone watched me nap.",
    isAnon: true,
    lat: 40.7589,
    lng: -73.9666,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 23 * 60 * 60 * 1_000),
    views: ['user9'],
    likes: ['user11', 'user7'],
    comments: 5,
    ekoStats: { reach: 2.7, viewers: 52, maxRadius: 5 }
  },
  {
    id: '20',
    uid: 'userLOL20',
    caption: "Sent professor meme instead of assignment. Got extra credit for ‘creativity’.",
    isAnon: false,
    lat: 40.7703,
    lng: -73.9591,
    createdAt: new Date(Date.now() - 70 * 60 * 1_000),
    expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1_000),
    views: ['user3', 'user5', 'user6'],
    likes: ['user12'],
    comments: 12,
    ekoStats: { reach: 4.2, viewers: 94, maxRadius: 5 }
  }
];


  // Add more entries as needed in the same format...






export function HomeFeed() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const feedType = localStorage.getItem('selectedFeed') || 'Anonymous Users';

    let filtered: Post[] = [];

    if (feedType === 'Anonymous Users') {
      filtered = mockPosts.filter(p => p.isAnon);
    } else if (feedType === 'Real Account Users') {
      filtered = mockPosts.filter(p => !p.isAnon);
    } else {
      filtered = mockPosts;
    }

    setPosts(filtered);
  }, []); // Run only once when HomeFeed mounts

  const handleLike = (postId: string) =>
    setPosts(p =>
      p.map(post =>
        post.id === postId ? { ...post, likes: [...post.likes, 'currentUser'] } : post
      )
    );

  const handleComment = (postId: string) => {
    console.log('Comment on post:', postId);
  };

  const handleShare = (postId: string) => {
    console.log('Share post:', postId);
  };

  const handleEcho = (postId: string) => {
    console.log('Echo post:', postId);
  };



  

  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(245,247,249)] to-[#E8F4FD] pt-16 pb-20">
      <div
        
        className="max-w-md mx-auto space-y-2 px-2"
      >
        {posts.map(post => (
          <div key={post.id} >
            <PostCard
              post={post}
              onLike={handleLike}
              onComment={handleComment}
              onShare={handleShare}
              onEcho={handleEcho}
            />
          </div>
        ))}
      </div>
    </div>
  );
}