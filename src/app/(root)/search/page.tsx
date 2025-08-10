'use client';

import { useState } from 'react';
import { BottomNav } from '@/components/layout/BottomNav';

export default function SearchPage() {
  const initialAccounts = [
    { id: 1, username: 'john_doe', displayName: 'John Doe' },
    { id: 2, username: 'sarah_lee', displayName: 'Sarah Lee' },
    { id: 3, username: 'mike.dev', displayName: 'Mike Developer' },
    { id: 4, username: 'Avnish Singh', displayName: 'Python Developer' },
  ];

  const posts = [
    {
      id: 1,
      title: 'Exploring the Mountains',
      caption: 'An amazing journey through the Himalayas.',
      places: ['Himalayas'],
      tags: ['#travel', '#mountains'],
    },
    {
      id: 2,
      title: 'City Lights',
      caption: 'Captured the beauty of urban life at night.',
      places: ['New York'],
      tags: ['#photography', '#nightlife'],
    },
    {
      id: 3,
      title: 'Relaxing at Goa Beach',
      caption: 'Sunny vibes and waves.',
      places: ['Goa Beach'],
      tags: ['#travel', '#beachlife'],
    },
  ];

  // Added Places and Tags to filters
  const filterOptions = ['All', 'Users', 'Posts', 'Places', 'Tags'];

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [showAllAccounts, setShowAllAccounts] = useState(false);
  const [following, setFollowing] = useState<{ [key: number]: boolean }>({});

  const toggleFollow = (id: number) => {
    setFollowing((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Accounts filter
  const filteredAccounts = initialAccounts.filter(
    (acc) =>
      acc.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Posts filter
  const filteredPosts = posts
    .filter((post) => {
      const term = searchTerm.toLowerCase();
      if (activeFilter === 'Places') {
        return post.places.some((p) => p.toLowerCase().includes(term));
      }
      if (activeFilter === 'Tags') {
        return post.tags.some((t) => t.toLowerCase().includes(term));
      }
      return (
        post.title.toLowerCase().includes(term) ||
        post.caption.toLowerCase().includes(term) ||
        post.places.some((p) => p.toLowerCase().includes(term)) ||
        post.tags.some((t) => t.toLowerCase().includes(term))
      );
    })
    .sort((a, b) => {
      const aPriority =
        a.places.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase())) ||
        a.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
          ? 0
          : 1;
      const bPriority =
        b.places.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase())) ||
        b.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
          ? 0
          : 1;
      return aPriority - bPriority;
    });

  const showAccounts = activeFilter === 'All' || activeFilter === 'Users';
  const showPosts =
    activeFilter === 'All' || activeFilter === 'Posts' || activeFilter === 'Places' || activeFilter === 'Tags';

  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      <main className="pt-6 pb-20 px-4">
        <div className="max-w-md mx-auto">
          <div className="min-h-screen bg-dark text-white py-4">
            {/* Search Bar */}
            <div className="w-full max-w-md mx-auto mb-4">
              <input
                type="text"
                placeholder="Search accounts, posts, tags, or places"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-secondary/10 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500"
              />

              {/* Filter Badges */}
              <div className="flex flex-wrap gap-2 pt-4 text-sm">
                {filterOptions.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-2 py-[2px] rounded-lg tracking-wider transition 
                      ${activeFilter === filter ? 'bg-light text-tlight' : 'bg-secondary/20 text-tdark'}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Accounts */}
            {showAccounts && filteredAccounts.length > 0 && (
              <div className="w-full max-w-md mx-auto">
                <h2 className="text-lg font-semibold mb-2">Top Accounts</h2>
                {(showAllAccounts ? filteredAccounts : filteredAccounts.slice(0, 3)).map((account) => (
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

                {filteredAccounts.length > 3 && (
                  <button
                    onClick={() => setShowAllAccounts(!showAllAccounts)}
                    className="text-sm text-blue-400 mt-1"
                  >
                    {showAllAccounts ? 'Show less accounts ▲' : 'See all accounts >'}
                  </button>
                )}
              </div>
            )}

            {/* Posts */}
            {showPosts && filteredPosts.length > 0 && (
              <div className="w-full max-w-md mx-auto mt-6">
                <h2 className="text-lg font-semibold mb-2">Top Posts</h2>
                {(showAllPosts ? filteredPosts : filteredPosts.slice(0, 2)).map((post) => (
                  <div key={post.id} className="flex items-start mb-4">
                    <div className="w-16 h-16 bg-secondary/20 rounded-md mr-3"></div>
                    <div>
                      <p className="font-medium text-white">{post.title}</p>
                      <p className="text-sm text-gray-400">{post.caption}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Places: {post.places.join(', ')}
                      </p>
                      <p className="text-xs text-gray-500">
                        Tags: {post.tags.join(' ')}
                      </p>
                    </div>
                  </div>
                ))}
                {filteredPosts.length > 2 && (
                  <button
                    onClick={() => setShowAllPosts(!showAllPosts)}
                    className="text-sm text-blue-400 mt-1"
                  >
                    {showAllPosts ? 'Show less posts ▲' : 'See all posts >'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
