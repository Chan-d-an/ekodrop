import React from 'react'

import Image from 'next/image'

import { BottomNav } from '@/components/layout/BottomNav';
export default function page() {
  return (
    <>
    <div className='bg-dark text-tdark  flex items-center w-full  '> 
      <div className='min-h-screen max-w-md mx-auto w-full p-4 text-tdark'>
          <div className='pb-6'>
            <h1 className="text-xl font-semibold">Notification</h1>
          </div>
          <div>
            <div className='flex gap-3 pb-4 '>
              <div className="relative mt-[2px] w-10 h-10 rounded-full grid place-items-center w-3/6">
                          
                            <Image
                              src="/"
                              alt="post visual"
                              fill
                              className="absolute rounded-full h-10  w-10 object-cover border border-red-400"
                            />
                          
              </div>
              <p className='text-sm w-7/8  '> ti! Lorem, ipsum Lorem, ipsumtur adipisicing elit. Consectetur, illum.<span className='text-tdark/30 pl-[4px]'>2d</span>
              </p>
            </div>
             <div className='flex gap-3 pb-4 '>
              <div className="relative mt-[2px] w-10 h-10 rounded-full grid place-items-center w-3/6">
                          
                            <Image
                              src="/"
                              alt="post visual"
                              fill
                              className="absolute rounded-full h-10  w-10 object-cover border border-red-400"
                            />
                          
              </div>
              <p className='text-sm w-7/8  '> ti! Lorem, ipsum Lorem, ipsum cing elit. Lorem ipsum dolor sit ametvv consectetur adipisicing elit. Consectetur, illum.<span className='text-tdark/30 pl-[4px]'>1w</span>
              </p>
            </div>
             <div className='flex gap-3'>
              <div className="relative mt-[2px] w-10 h-10 rounded-full grid place-items-center w-3/6">
                          
                            <Image
                              src="/"
                              alt="post visual"
                              fill
                              className="absolute rounded-full h-10  w-10 object-cover border border-red-400"
                            />
                          
              </div>
              <p className='text-sm w-7/8  '> ti! Lorem, ipsum Lorem, ipsum dolor sit ametv consectetur adipisicing elit. Lorem ipsum dolor sit ametvv consectetur adipisicing elit. Consectetur, illum.<span className='text-tdark/30 pl-[4px]'>3w</span>
              </p>
            </div>
            
          </div>
      </div>
        <BottomNav />
    </div>
    
      
    </>
  )
}
