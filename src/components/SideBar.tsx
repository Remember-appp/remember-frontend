'use client'
import { useState } from 'react'
import {
  Home,
  Info,
  Phone,
  Menu,
  X,
  LayoutDashboard,
  User2,
} from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const path = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { data: session } = useSession()

  if (!session || path === '/welcome') return null

  return (
    <div className="z-9 flex">
      {/* Мобильная кнопка */}
      {!mobileOpen && (
        <button
          className="md:hidden fixed z-10 p-2 m-2 bg-gray-800 text-white rounded animate-fade"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Menu />
        </button>
      )}

      {/* Десктопный сайдбар с ховером */}
      <div className="hidden md:flex fixed z-10 top-0 left-0 h-full flex-col bg-emerald-900 text-white group animate-fade">
        <div className="flex flex-col h-full transition-all duration-300 w-16 group-hover:w-64 overflow-hidden">
          {/* Заголовок */}
          <div className="p-4 font-bold border-b border-gray-700 flex items-center">
            <Menu className="flex-shrink-0" />
            <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Remember App
            </span>
          </div>

          {/* Пункты меню */}
          <ul className="mt-4 flex flex-col flex-1">
            <li>
              <Link
                href={'/'}
                className="flex items-center p-4 hover:bg-gray-800 cursor-pointer"
              >
                <LayoutDashboard className="flex-shrink-0" />
                <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  Dashboard
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={'/profile'}
                className="flex items-center p-4 hover:bg-gray-800 cursor-pointer"
              >
                <User2 className="flex-shrink-0" />
                <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  Profile
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Мобильный сайдбар */}
      <div
        className={`
    md:hidden flex flex-col fixed z-10 top-0 left-0 h-full bg-emerald-900 text-white
    transition-transform duration-300
    ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
    w-64
  `}
      >
        {/* Заголовок */}
        <div className="flex w-full border-b border-white-800 p-3 items-center justify-between">
          <p className="font-bold">Menu</p>
          {mobileOpen && (
            <button
              className="text-white rounded"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <X />
            </button>
          )}
        </div>

        {/* Пункты меню */}
        <div className="mt-4 flex flex-col flex-1">
          <Link
            href="/"
            className="flex items-center p-4 hover:bg-gray-800 cursor-pointer"
          >
            <LayoutDashboard className="flex-shrink-0" />
            <span className="ml-3 whitespace-nowrap">Dashboard</span>
          </Link>
          <Link
            href="/profile"
            className="flex items-center p-4 hover:bg-gray-800 cursor-pointer"
          >
            <User2 className="flex-shrink-0" />
            <span className="ml-3 whitespace-nowrap">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
