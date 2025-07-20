'use client'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import Button from './Button'
import { usePathname } from 'next/navigation'

export default function NavBar() {
  const dispatch = useDispatch()
  const pathname = usePathname()

  const isAuthorizing =
    pathname === '/register' || pathname === '/login' || pathname === '/welcome'

  return (
    <nav className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 sm:gap-0 px-6 py-4 bg-green-50 drop-shadow-[0_1px_30px_rgba(120,120,80,0.3)]">
      <Link href={'/welcome'}>
        {' '}
        <div className="text-3xl font-bold text-emerald-700 hover:text-emerald-800 transition cursor-default">
          Remember
        </div>
      </Link>

      <div className="flex items-center space-x-4">
        {isAuthorizing && (
          <Link
            href={'/register'}
            className={`
            bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded transition duration-200`}
          >
            Sign up
          </Link>
        )}
        {isAuthorizing && (
          <Link
            href={'/login'}
            className={`
           bg-stone-200 hover:bg-neutral-300 border-neutral-400 border text-black font-semibold px-4 py-2 rounded transition duration-200`}
          >
            Sign in
          </Link>
        )}
      </div>
    </nav>
  )
}
