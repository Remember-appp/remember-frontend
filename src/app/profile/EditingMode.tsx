'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DayPicker } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import { ArrowDownToLine } from 'lucide-react'
import InputField from '@/components/InputField'
import {
  selectAuthName,
  selectBio,
  selectBirth,
  selectFavoritePhrases,
  setAuthName,
  setBio,
} from '@/redux/slices/authFormSlice'
import {
  selectAuthNameError,
  setAuthNameError,
} from '@/redux/slices/authValidationSlice'
import {
  EditingModePayload,
  EditingModeProps,
  ProfileEditingModeIsTouched,
} from '@/types/profileTypes'
import { validateAuthNameEditMode } from '@/utils/authValidators'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import {
  selectUserInfo,
  setProfileUserInfo,
} from '@/redux/slices/userInfoSlice'
import { format } from 'date-fns'

export const EditingMode: React.FC<EditingModeProps> = ({ onCancel }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { data: session, status, update } = useSession()

  const [mounted, setMounted] = useState(false)

  const inputName = useSelector(selectAuthName)
  const inputBio = useSelector(selectBio)
  const inputBirth = useSelector(selectBirth)
  const inputPhrases = useSelector(selectFavoritePhrases)
  const inputNameError = useSelector(selectAuthNameError)
  const { profileInfo } = useSelector(selectUserInfo)

  const [isTouched, setIsTouched] = useState<ProfileEditingModeIsTouched>({
    nameIsToched: false,
    bioIsTouched: false,
    birthIsTouched: false,
    favoritePhrasesIsTouched: false,
  })
  const [selectedDate, setSelectedDate] = useState<Date>()

  useEffect(() => {
    setMounted(true)
    dispatch(setAuthName(profileInfo.display_name || session.user.name))
    dispatch(setBio(profileInfo.bio))
    setSelectedDate(profileInfo.birth_date)
  }, [session, dispatch])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    dispatch(setAuthName(value))
    dispatch(setAuthNameError(validateAuthNameEditMode(value)))
  }
  const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    dispatch(setBio(value))
  }

  const handleSaveClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsTouched((prev) => ({
      ...prev,
      nameIsToched: true,
      bioIsTouched: true,
    }))

    const nameErr = validateAuthNameEditMode(inputName)

    dispatch(setAuthNameError(nameErr))

    if (nameErr) return

    const payload: Partial<EditingModePayload> = {}

    if (
      inputName !== profileInfo.display_name &&
      inputName !== session.user.name
    ) {
      payload.display_name = inputName
    }
    if (inputBio !== profileInfo.bio) {
      payload.bio = inputBio
    }
    if (selectedDate !== profileInfo.birth_date) {
      payload.birth_date = selectedDate
    }

    if (Object.keys(payload).length === 0) {
      toast.warning('No changes to update')
      return
    }
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/me/profile`,
        payload,
        { headers: { Authorization: `Bearer ${session?.accessToken}` } }
      )

      const profileRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/me/profile`,
        { headers: { Authorization: `Bearer ${session?.accessToken}` } }
      )

      const data = profileRes.data

      dispatch(setProfileUserInfo(data.profile))

      toast.success('saved to backend')
      onCancel()
    } catch (error) {
      toast.error('Something went wrong')
      return
    }
  }

  return (
    <div>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Info</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <form
            onSubmit={handleSaveClick}
            className="w-full flex flex-col animate-fade animate-duration-400"
          >
            <InputField
              label="New name"
              placeholder="Name"
              value={inputName || ''}
              onChange={handleNameChange}
              onBlur={() =>
                setIsTouched((prev) => ({ ...prev, nameIsToched: true }))
              }
              errorText={isTouched.nameIsToched ? inputNameError : null}
            />
            <InputField
              label="New bio"
              placeholder="Bio"
              value={inputBio || ''}
              onChange={handleBioChange}
              onBlur={() =>
                setIsTouched((prev) => ({ ...prev, bioIsTouched: true }))
              }
            />
            <div className="border-y-1 p-2 border-emerald-300 pl-2 rounded">
              <DayPicker
                animate
                selected={selectedDate}
                onSelect={setSelectedDate}
                captionLayout="dropdown"
                ISOWeek
                mode="single"
                navLayout="after"
                reverseYears
                timeZone="UTC"
                footer={
                  selectedDate
                    ? `Selected: ${format(selectedDate, 'dd/MM/yyyy')}` // формат через date-fns
                    : 'Pick a day.'
                }
                style={
                  {
                    '--rdp-accent-color': 'rgb(66, 194, 7)',
                    '--rdp-accent-background-color': '#ad0c0c',
                    '--rdp-background-color': '#ffebee',
                    '--rdp-cell-size': '36px',
                    '--rdp-outline': '2px solid #51ff00',
                    '--rdp-outline-selected': '2px solid #51ff00',
                  } as React.CSSProperties
                }
              />
            </div>
            <div className="mt-6 flex justify-start w-full gap-2">
              <div>
                <Button
                  type="submit"
                  className="py-2 px-6 text-sm flex items-center justify-center gap-1 font-semibold rounded-lg transition duration-200 bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  <ArrowDownToLine size={17} />
                  Save
                </Button>
              </div>
              <Button
                type="button"
                onClick={onCancel}
                className="py-2 px-6 text-sm text-black font-semibold rounded-lg transition duration-200 bg-stone-300 hover:bg-stone-400"
              >
                Cancel
              </Button>
            </div>
          </form>
        </TabsContent>
        <TabsContent value="password">Changge password here</TabsContent>
      </Tabs>
    </div>
  )
}
