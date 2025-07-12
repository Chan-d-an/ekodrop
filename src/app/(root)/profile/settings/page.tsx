import { handleSignOut } from '@/actions/user'
import { SignOutButton } from '@/components/auth/SignOutButton'
import React from 'react'

export default function page() {
  return (
    <div>
      <div className='pt-20 w-52 mx-auto'>
        <SignOutButton handleSignOut={handleSignOut} />
      </div>
    </div>
  )
}
