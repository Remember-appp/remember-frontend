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

const ProfilePage: React.FC = () => {
  useUserinfo()

  const { data: session } = useSession()

  const dispatch = useDispatch()

  const { mainInfo } = useSelector(selectUserInfo)
  const { profileInfo } = useSelector(selectUserInfo)

  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleCancel = () => {
    dispatch(resetAuthForm())
    setIsEditing(!isEditing)
  }

  return (
    <div>
      <HeaderText text="My Profile" />
      <ProfileCard>
        <AvatarCreator name={mainInfo.name} />
        <ProfileInfo>
          <h2 className="font-black text-xl">
            {isEditing ? 'Editing' : 'Personal info :'}
          </h2>
          <div>
            {!isEditing ? (
              <UserInfoMode
                onEdit={handleEdit}
                name={mainInfo.name || profileInfo.display_name}
                email={mainInfo.email}
                bio={profileInfo.bio}
                birth={profileInfo.birth_date}
                phrases={profileInfo.favorite_phrases}
              />
            ) : (
              <EditingMode onCancel={handleCancel} />
            )}
          </div>
        </ProfileInfo>
      </ProfileCard>
    </div>
  )
}

export default ProfilePage
