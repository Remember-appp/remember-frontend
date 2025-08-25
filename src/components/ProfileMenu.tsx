'use client'
import { useState, useEffect } from 'react'
import { User2, Menu, X, UserCircle, MoreHorizontalIcon, MoreVertical, LucideMoreHorizontal, MenuIcon, UserCog, UserRound, UserCircleIcon, LucideUserCircle } from 'lucide-react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { clearUserInfo } from '@/redux/slices/userInfoSlice'

export default function ProfileMenu() {
  const { data: session } = useSession()
  const dispatch = useDispatch()
  const router = useRouter()

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!session) return null

  const handleToggle = () => setDropdownOpen(!dropdownOpen)
  const handleLogOut = () => {
    signOut({ callbackUrl: '/welcome' })
    dispatch(clearUserInfo())
  }

  return (
    <div className="relative z-10">
      {isMobile && (
        <button onClick={handleToggle} className='text-green-600 focus:text-green-800 mt-1.5'>
          <LucideUserCircle size={30} />
        </button>
      )}

      {!isMobile && (
        <div className="hidden md:flex relative group">
          <Link
            href="/profile"
            className="text-green-600 hover:text-green-800 cursor-pointer transition-colors"
          >
            <LucideUserCircle size={30} />
          </Link>
          <div className="absolute top-10 -right-2 w-40 p-4 space-y-2 bg-emerald-200 font-black text-black rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-600">
            <Link href="/profile" className="block hover:text-cyan-400">
              Profile
            </Link>
            <button
              onClick={handleLogOut}
              className="w-full text-left text-red-400 hover:text-cyan-400"
            >
              Log out
            </button>
          </div>
        </div>
      )}
      {isMobile && dropdownOpen && (
        <div className="fixed top-14 right-2 w-40 p-4 bg-emerald-200 font-black text-black rounded-md shadow-lg space-y-2 z-20 transition-all duration-300">
          <Link href="/profile" className="block hover:text-cyan-400">
            Profile
          </Link>
          <button
            onClick={handleLogOut}
            className="w-full text-left text-red-400 hover:text-cyan-400 z-10"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  )
}
