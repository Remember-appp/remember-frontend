'use client'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { resetAuthForm } from '@/redux/slices/authFormSlice'
import Button from './Button'

export default function NavBar() {
  const dispatch = useDispatch()
  const [isClicked, setIsClicked] = useState(false)
  const handleClick = () => {
    setIsClicked(!isClicked)
  }

  return (
    <nav className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 sm:gap-0 px-6 py-4 bg-green-50 drop-shadow-[0_1px_30px_rgba(120,120,80,0.3)]">
      
      {/*  */}
      <div className="text-3xl font-bold text-emerald-700 hover:text-emerald-800 transition cursor-default">
        Remember
      </div>
      <div className="flex items-center space-x-4">
        <Link
          onClick={handleClick}
          href={isClicked ? '/register' : '/auth'}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded transition-transform duration-200"
        >
          {isClicked ? 'Sign up' : 'Sign in'}
        </Link>
        <Button text={'NaN'} className={'w-12 h-12 rounded-full border-[1px] border-lime-500 text-black flex items-center justify-center font-bold hover:scale-105 transition-transform duration-200'}/>
      </div>
    </nav>
  )
}
