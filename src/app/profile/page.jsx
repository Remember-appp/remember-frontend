import { useSession } from 'next-auth/react'
import React from 'react'

function ProfilePage() {
  const { data: session, status } = useSession()
  
   if (!session) {
    router.push('/login')
  }
  return (
    <div>page</div>
  )
}

export default ProfilePage