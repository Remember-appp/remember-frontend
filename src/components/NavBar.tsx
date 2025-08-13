'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../components/logos/logo.png'
import Button from './Button'
import { signOut, useSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'
import { clearUserInfo } from '@/redux/slices/userInfoSlice'

const NavBar: React.FC = () => {
  const dispatch = useDispatch()
  const { data: session, status } = useSession()
  const [isMounted, setIsMounted] = useState(false)
  const isAnauthenticated = status === 'unauthenticated'
  const isAuthenticated = status === 'authenticated'
  const appLink = isAuthenticated ? '/' : '/welcome'

  const handleSignOut = () => {
    signOut({ callbackUrl: '/login' })
    dispatch(clearUserInfo())
  }

  return (
    <nav className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 sm:gap-0 px-6 py-4 bg-green-50 drop-shadow-[0_1px_30px_rgba(120,120,80,0.3)] animate-fade-down animate-once animate-duration-300">
      <Link href={appLink}>
        <div className="flex space-x-2 items-center transition duration-300">
          <Image
            src={logo}
            alt="Logo"
            width={40}
            height={40}
            className=" hover:scale-115 trasition duration-300"
          />
          <div className="text-3xl font-black font-sans text-emerald-700 hover:text-emerald-800 hover:scale-104 transition duration-300 cursor-pointer">
            Remember
          </div>
        </div>
      </Link>

      <div className="flex items-center space-x-4">
        {isAnauthenticated && (
          <Link
            href={'/login'}
            className={`
           bg-stone-200 hover:bg-neutral-300 text-black font-semibold px-4 py-2 rounded transition duration-200 animate-fade-down sm:animate-flip-down animate-duration-300`}
          >
            Sign in
          </Link>
        )}
        {isAnauthenticated && (
          <Link
            href={'/register'}
            className={`
            bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded transition duration-200 animate-fade-down sm:animate-flip-down animate-duration-300`}
          >
            Sign up
          </Link>
        )}
        {isAuthenticated && (
          <Button
            onClick={handleSignOut}
            className={`
           bg-stone-200 hover:bg-neutral-300 text-black font-semibold px-4 py-2 rounded transition duration-200 animate-fade-down sm:animate-flip-down animate-duration-300`}
          >
            Sign out
          </Button>
        )}
      </div>
    </nav>
  )
}

export default NavBar
