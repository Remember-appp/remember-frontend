'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowDownToLine } from 'lucide-react'
import Button from '@/components/Button'
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
import { getSession, useSession } from 'next-auth/react'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { DatePickerInput } from '@mantine/dates'

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

  const [isTouched, setIsTouched] = useState<ProfileEditingModeIsTouched>({
    nameIsToched: false,
    bioIsTouched: false,
    birthIsTouched: false,
    favoritePhrasesIsTouched: false,
  })
  const [value, setValue] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    dispatch(setAuthName(session.user.name))
    dispatch(setBio())
  }, [session, dispatch])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    dispatch(setAuthName(value))
    dispatch(setAuthNameError(validateAuthNameEditMode(value)))
  }

  const handleSaveClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsTouched((prev) => ({
      ...prev,
      nameIsToched: true,
      emailIsTouched: true,
    }))

    const nameErr = validateAuthNameEditMode(inputName)

    dispatch(setAuthNameError(nameErr))

    if (nameErr) return

    const payload: Partial<EditingModePayload> = {}

    if (inputName !== session.user.name) {
      payload.display_name = inputName
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

      const data = res.data

      toast.success('saved to backend')
      onCancel()
    } catch (error) {
      toast.error('Something went wrong')
      return
    }
  }

  return (
    <form
      onSubmit={handleSaveClick}
      className="w-full flex flex-col animate-fade animate-duration-400"
    >
      <InputField
        label="New name"
        placeholder="Name"
        value={inputName}
        onChange={handleNameChange}
        onBlur={() => setIsTouched((prev) => ({ ...prev, nameIsToched: true }))}
        errorText={isTouched.nameIsToched ? inputNameError : null}
      />
      <DatePickerInput
        label="New birthday"
        placeholder="Pick your birthday"
        value={value}
        onChange={setValue}
        styles={{
          label: {
            color: 'rgb(4, 148, 90)',
            fontWeight: '500',
          },
          input: {
            border: '1px solid #6ee7b7',
            borderRadius: '3px',
            backgroundColor: '#f5f5f4',
          },
        }}
      />
      <div className="pt-2 flex justify-start w-full gap-2">
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
          className="py-2 px-6 text-sm font-semibold rounded-lg transition duration-200 bg-stone-200 hover:bg-stone-300"
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
