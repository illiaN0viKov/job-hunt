"use client"

import React from 'react'
import { Button } from './ui/button'
import { signOut } from '@/lib/auth/auth-client'
import { useRouter } from 'next/navigation'

type Props = {}

const SignOutButton = (props: Props) => {
  const router = useRouter()
  
  const handleSignOut = async () => {
    await signOut()
    router.push('/')
    router.refresh()
  }
  return (
        <Button
            variant="ghost" 
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
  )
}

export default SignOutButton