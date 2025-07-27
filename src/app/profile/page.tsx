'use client'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FiEdit } from 'react-icons/fi'
import { useUserinfo } from '@/hooks/useUserInfo'
import Button from '@/components/Button'
import InputField from '@/components/InputField'
import P from '@/components/P'
import ProfileCard from '@/components/ProfileCard'
import ProfileInfo from '@/components/ProfileInfo'
import { selectUserEmail, selectUserName } from '@/redux/slices/userInfoSlice'

const ProfilePage: React.FC = () => {
  useUserinfo()

  const name = useSelector(selectUserName)
  const email = useSelector(selectUserEmail)

  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  return (
    <div>
      <ProfileCard>
        <ProfileInfo>
          <h1 className="font-black text-xl">
            {isEditing ? 'Editing' : 'Personal info :'}
          </h1>
          {!isEditing ? (
            <>
              <P
                label="Name :"
                text={name || 'Loading...'}
                classNameLabel="text-emerald-600"
              />
              <P
                label="Email : "
                text={email || 'Loading...'}
                classNameLabel="text-emerald-600"
              />
            </>
          ) : (
            <div className="w-full flex flex-col gap-3">
              <InputField
                label="New name"
                placeholder={name}
                errorTextAllowed={false}
              />
              <InputField
                label="New email"
                placeholder={email}
                errorTextAllowed={false}
              />
            </div>
          )}

          <div className="pt-2 flex justify-start w-full gap-2">
            {!isEditing ? (
              <Button
                onClick={handleEdit}
                className="py-2 px-6 text-sm font-semibold rounded-lg transition duration-200 bg-stone-300 hover:bg-stone-400 text-black flex items-center gap-2"
              >
                <FiEdit />
                <span>Edit</span>
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleEdit} 
                  className="py-2 px-6 text-sm font-semibold rounded-lg transition duration-200 bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  Save
                </Button>
                <Button
                  onClick={handleEdit} 
                  className="py-2 px-6 text-sm font-semibold rounded-lg transition duration-200 bg-stone-200 hover:bg-stone-300"
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </ProfileInfo>
      </ProfileCard>
    </div>
  )
}

export default ProfilePage
