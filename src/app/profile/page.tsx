'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const ProfilePage: React.FC = () => {
  const router = useRouter()
  const { data: session, status } = useSession()

  return (
    <div>page</div>
  )
}

export default ProfilePage
