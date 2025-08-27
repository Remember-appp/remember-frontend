'use client'
import { useState, useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { clearUserInfo } from '@/redux/slices/userInfoSlice'
import {
  LayoutDashboard,
  LogOut,
  LucideDatabase,
  PersonStanding,
  Settings,
  User,
  UserCheck,
} from 'lucide-react'
import Link from 'next/link'
import P from './P'
export default function ProfileMenu() {
  const { data: session } = useSession()
  const dispatch = useDispatch()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
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
    <div className="relative z-50">
      {mounted && isMobile && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <User />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-35" align="start">
            <DropdownMenuLabel> My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <Link href={'/profile'}>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>
                    <User />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleLogOut}>
              Log out
              <DropdownMenuShortcut>
                <LogOut />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {mounted && !isMobile && (
        <div className="flex gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Other staff</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink href="/">
                    <div className="flex items-center gap-3">
                      <P text="Dashboard" classNameText="font-[500]" />
                      <LayoutDashboard />
                    </div>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>My account</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink href="/profile">
                    <div className="flex items-center gap-3">
                      <P text="Profile" classNameText="font-[500]" />
                      <User />
                    </div>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/settings">
                    <div className="flex items-center gap-3">
                      <P text="Settings" classNameText="font-[500]" />
                      <Settings />
                    </div>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant="outline">
                <LogOut className="text-red-400" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. You will be unauthorized.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleLogOut}
                  className="bg-emerald-600 hover:bg-emerald-800"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  )
}
