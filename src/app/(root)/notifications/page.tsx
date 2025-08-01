'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { BottomNav } from '@/components/layout/BottomNav'

export default function Page() {
  const router = useRouter()

  return (
    <>
      <div className='bg-dark text-tdark flex items-center w-full'>
        <div className='min-h-screen max-w-md mx-auto w-full p-4 text-tdark'>
          <div className='pb-8 flex  ' >
            <div className='pt-[2px]'>
            <ArrowLeft size={22} onClick={() => router.push('/')}/>
              </div>
            <div className='pl-4'>
              <h1 className="text-xl font-semibold tracking-wider leading-none pb-1">Notification</h1>
              <p className='text-sm text-tdark/70'>Stay update with your latest notification.</p>
            </div>
          </div>

          {/* Notifications */}
          <div>
            {[1, 2, 3].map((_, i) => (
              <div key={i} className='flex gap-4 pb-4'>
                <div className="relative mt-[2px] w-10 h-10 rounded-full grid place-items-center">
                  <Image
                    src="/"
                    alt="post visual"
                    fill
                    className="absolute rounded-full h-10 w-10 object-cover border border-secondary/30"
                  />
                </div>
                <p className='text-sm w-7/8 border-b-[1px] border-secondary/20 pb-3'>
                  Sample notification message here. Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, dicta?Lorem ipsum dolor sit amet.
                   <span className='text-tdark/30 pl-2'>{i + 1}d</span>
                </p>
              </div>
            ))}
          </div>
        </div>
        <BottomNav />
      </div>
    </>
  )
}
