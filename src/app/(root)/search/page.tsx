'use client';

import { useState } from 'react';
import { BottomNav } from '@/components/layout/BottomNav';

export default function SearchPage() {
  const initialAccounts = [
    {
      id: 1,
      username: 'john_doe',
      displayName: 'John Doe',
    },
    {
      id: 2,
      username: 'sarah_lee',
      displayName: 'Sarah Lee',
    },
    {
      id: 3,
      username: 'mike.dev',
      displayName: 'Mike Developer',
    },
    {
      id: 4,
      username: 'Avnish Singh',
      displayName: 'Python Developer',
    },
    {
      id: 2,
      username: 'sarah_lee',
      displayName: 'Sarah Lee',
    },
    {
      id: 3,
      username: 'mike.dev',
      displayName: 'Mike Developer',
    },
    {
      id: 4,
      username: 'Avnish Singh',
      displayName: 'Python Developer',
    },
  ];

  const posts = [
    {
      id: 1,
      title: 'Exploring the Mountains',
      caption: 'An amazing journey through the Himalayas.',
    },
    {
      id: 2,
      title: 'City Lights',
      caption: 'Captured the beauty of urban life at night.',
    },
    {
      id: 1,
      title: 'Exploring the Mountains',
      caption: 'An amazing journey through the Himalayas.',
    },
    {
      id: 2,
      title: 'City Lights',
      caption: 'Captured the beauty of urban life at night.',
    },
  ];

  const [activeFilter, setActiveFilter] = useState('All');

const filterOptions = ['All', 'Users', 'Posts', 'Places', 'Tags'];

  const [showAllPosts, setShowAllPosts] = useState(false);
const visiblePosts = showAllPosts ? posts : posts.slice(0, 2); // Show 1 post initially

  const [showAllAccounts, setShowAllAccounts] = useState(false);
  const [following, setFollowing] = useState<{ [key: number]: boolean }>({});

  const visibleAccounts = showAllAccounts ? initialAccounts : initialAccounts.slice(0, 3);

  const toggleFollow = (id: number) => {
    setFollowing((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      <main className="pt-6 pb-20 px-4">
        <div className="max-w-md mx-auto">

          {/* Search Bar */}
          <div className="min-h-screen bg-dark text-white py-4">
            <div className="w-full max-w-md mx-auto mb-4">
              <input
                type="text"
                placeholder="Search accounts or posts"
                className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-secondary/10 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500"
              />

              {/* Filter Tags */}
             <div className="flex flex-wrap gap-2 pt-4 text-sm">
  {filterOptions.map((filter) => (
    <button
      key={filter}
      onClick={() => setActiveFilter(filter)}
      className={`px-2 py-[2px] rounded-lg tracking-wider transition 
        ${
          activeFilter === filter
            ? 'bg-light text-tlight'
            : 'bg-secondary/20 text-tdark'
        }`}
    >
      {filter}
    </button>
  ))}
</div>

            </div>

            {/* Top Accounts Section */}
            <div className="w-full max-w-md mx-auto">
              <h2 className="text-lg font-semibold mb-2">Top Accounts</h2>
              {visibleAccounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 mr-3"></div>
                    <div>
                      <p className="font-medium text-tdark">{account.username}</p>
                      <p className="text-sm text-tdark/70">{account.displayName}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFollow(account.id)}
                    className={`px-4 py-2 text-sm rounded-full transition ${
                      following[account.id]
                        ? 'bg-secondary/10 text-primary tracking-wide'
                        : ' bg-primary text-tlight font-bold tracking-wide'
                    }`}
                  >
                    {following[account.id] ? 'Following' : 'Follow'}
                  </button>
                </div>
              ))}

              <button
  onClick={() => setShowAllAccounts(!showAllAccounts)}
  className="text-sm text-blue-400 mt-1"
>
  {showAllAccounts ? 'Show less accounts ▲' : 'See all accounts >'}
</button>
            </div>

            {/* Top Posts Section */}
            <div className="w-full max-w-md mx-auto mt-6">
              <h2 className="text-lg font-semibold mb-2">Top Posts</h2>
              {visiblePosts.map((post) => (
  <div key={post.id} className="flex items-start mb-4">
    <div className="w-16 h-16 bg-secondary/20 rounded-md mr-3"></div>
    <div>
      <p className="font-medium text-white">{post.title}</p>
      <p className="text-sm text-gray-400">{post.caption}</p>
    </div>
  </div>
))}

<button
  onClick={() => setShowAllPosts(!showAllPosts)}
  className="text-sm text-blue-400 mt-1"
>
  {showAllPosts ? 'Show less posts ▲' : 'See all posts >'}
</button>

            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
