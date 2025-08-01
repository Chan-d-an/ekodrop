'use client'

import { handleSignOut } from '@/actions/user'
import { SignOutButton } from '@/components/auth/SignOutButton'
import { UserRoundPen, Moon, Bell, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'

export default function Page() {
  const [isDarkMode, setIsDarkMode] = useState(true)

 const toggleDarkMode = () => {
  const newMode = !isDarkMode
  setIsDarkMode(newMode)
  document.documentElement.classList.toggle('dark', newMode)
}


  return (
    <div className='dark:bg-dark bg-light text-tdark min-h-screen'>
      <div className='p-4  mx-auto max-w-lg w-full'>
        <div className='pb-4'>
          <h1 className="text-xl font-semibold">Setting</h1>
        </div>

        <div className='p-4 border-secondary/10 border-[1px] rounded-lg my-4'>
          {/* Edit Profile */}
          <div className='flex justify-between py-2 text-tdark'>
            <div className='flex items-center gap-2'>
              <UserRoundPen size={22} />
              <button className='text-lg leading-none'>Edit Profile</button>
            </div>
            <ChevronRight size={22} />
          </div>

          {/* Dark Mode with Toggle */}
          <div className='flex justify-between py-2 text-tdark'>
            <div className='flex items-center gap-2'>
              <Moon size={22} />
              <span className='text-lg leading-none'>
  {isDarkMode ? 'Dark Mode' : 'Light Mode'}
</span>

            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 dark:bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>

          {/* Notification */}
          <div className='flex justify-between py-2 text-tdark'>
            <div className='flex items-center gap-2'>
              <Bell size={22} />
              <button className='text-lg leading-none'>Notification</button>
            </div>
            <ChevronRight size={22} />
          </div>
        </div>

        <div>
          <SignOutButton handleSignOut={handleSignOut} />
        </div>
      </div>
    </div>
  )
}
