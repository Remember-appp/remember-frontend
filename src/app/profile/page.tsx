'use client'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useUserinfo } from '@/hooks/useUserInfo'
import ProfileCard from '@/components/ProfileCard'
import ProfileInfo from '@/components/ProfileInfo'
import { selectUserEmail, selectUserName } from '@/redux/slices/userInfoSlice'
import { EditingMode } from './EditingMode'
import { UserInfoMode } from './UserInfoMode'
import { HeaderText } from '@/components/HeaderText'
import { resetAuthForm } from '@/redux/slices/authFormSlice'

const ProfilePage: React.FC = () => {
  useUserinfo()

  const dispatch = useDispatch()

  const name = useSelector(selectUserName)
  const email = useSelector(selectUserEmail)

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
        <ProfileInfo>
          <h2 className="font-black text-xl">
            {isEditing ? 'Editing' : 'Personal info :'}
          </h2>
          {!isEditing ? (
            <UserInfoMode onEdit={handleEdit} name={name} email={email} />
          ) : (
            <EditingMode
              onCancel={handleCancel}
              placeholderName={name}
              placeholderEmail={email}
            />
          )}
        </ProfileInfo>
      </ProfileCard>
    </div>
  )
}

export default ProfilePage
