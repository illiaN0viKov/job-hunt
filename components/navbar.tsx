import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getSession } from '@/lib/auth/auth'
import SignOutButton from './sign-out-button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback } from './ui/avatar'
import { signOut } from 'better-auth/api'

// Navbar for logged-out users
export const NavbarLoggedOut = () => {

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
      <Link href="/">
        <h1 className="text-2xl font-bold text-gray-900 cursor-pointer">JobHunt</h1>
      </Link>
      <div className="flex gap-4">
        <Link href="/sign-in">
          <Button variant="ghost">Sign In</Button>
        </Link>

        <Link href="/sign-up">
          <Button>Get Started</Button>
        </Link>
      </div>
    </nav>
  )
}

type Props = {
  session: {
    user: {
      email: string
    }
  }
}

// Navbar for logged-in users
export const NavbarLoggedIn = ({session}:Props) => {

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
      <Link href="/">
        <h1 className="text-2xl font-bold text-gray-900 cursor-pointer">JobHunt</h1>
      </Link>
      <div className="flex gap-4 items-center">
        <Link href="/dashboard">
          <Button variant="ghost">Dashboard</Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <Avatar>
                <AvatarFallback className='bg-primary text-white'>
                  {session.user?.email[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className='w-50  mx-4 my-2'>

            <DropdownMenuLabel>
              <div>
                <p>
                  {session?.user?.email}
                </p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuItem >
                 <SignOutButton/>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2">
          {/* <span className="text-sm text-gray-700">
            {session?.user?.email?.split('@')[0]}
          </span> */}

        </div>
      </div>
    </nav>
  )
}

// Main navbar component that conditionally renders based on auth status
export const Navbar =  async () => {

  const session = await getSession()

  // if (isPending) {
  //   return (
  //     <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
  //       <h1 className="text-2xl font-bold text-gray-900">JobHunt</h1>
  //       <div className="w-20 h-10 bg-gray-200 rounded animate-pulse" />
  //     </nav>
  //   )
  // }

  return session ? <NavbarLoggedIn session={session} /> : <NavbarLoggedOut />
}

export default Navbar
