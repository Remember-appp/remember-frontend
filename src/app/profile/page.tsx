'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useUserinfo } from '@/hooks/useUserInfo'
import ProfileCard from '@/components/ProfileCard'
import ProfileInfo from '@/components/ProfileInfo'
import {
  selectUserEmail,
  selectUserInfo,
  selectUserName,
  setProfileUserInfo,
} from '@/redux/slices/userInfoSlice'
import { EditingMode } from './EditingMode'
import { UserInfoMode } from './UserInfoMode'
import { HeaderText } from '@/components/HeaderText'
import { resetAuthForm, selectBio } from '@/redux/slices/authFormSlice'
import { AvatarCreator } from '@/components/AvatarCreator'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { format } from 'date-fns'

const ProfilePage: React.FC = () => {
  useUserinfo()

  const { data: session } = useSession()
  const [mounted, setMounted] = useState(false)

  const dispatch = useDispatch()

  const { mainInfo } = useSelector(selectUserInfo)
  const { profileInfo } = useSelector(selectUserInfo)

  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleCancel = () => {
    dispatch(resetAuthForm())
    setIsEditing(!isEditing)
  }

  return (
    <div className='ml-0 sm:ml-10'>
      <HeaderText text="My Profile" />
      <ProfileCard>
        <AvatarCreator name={mainInfo.name} />
        <ProfileInfo>
          <h2 className="font-black text-xl">
            {isEditing ? 'Editing' : 'Personal info :'}
          </h2>
          <div>
            {mounted && !isEditing && (
              <UserInfoMode
                onEdit={handleEdit}
                name={profileInfo.display_name}
                email={mainInfo.email}
                bio={profileInfo.bio}
                birth={format(profileInfo.birth_date, 'dd/MM/yyyy')}
                phrases={profileInfo.favorite_phrases}
              />
            )}
            {isEditing && <EditingMode onCancel={handleCancel} />}
          </div>
        </ProfileInfo>
      </ProfileCard>
    </div>
  )
}

export default ProfilePage
