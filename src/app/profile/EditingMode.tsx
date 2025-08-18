'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowDownToLine } from 'lucide-react'
import Button from '@/components/Button'
import InputField from '@/components/InputField'
import {
  selectAuthEmail,
  selectAuthName,
  setAuthEmail,
  setAuthName,
} from '@/redux/slices/authFormSlice'
import {
  selectAuthEmailError,
  selectAuthNameError,
  setAuthEmailError,
  setAuthNameError,
} from '@/redux/slices/authValidationSlice'
import {
  EditingModePayload,
  EditingModeProps,
  ProfileEditingModeIsTouched,
} from '@/types/profileTypes'
import {
  validateAuthEmailEditMode,
  validateAuthNameEditMode,
} from '@/utils/authValidators'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export const EditingMode: React.FC<EditingModeProps> = ({ onCancel }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { data: session, status } = useSession()

  const [mounted, setMounted] = useState(false)

  const inputName = useSelector(selectAuthName)
  const inputEmail = useSelector(selectAuthEmail)
  const inputNameError = useSelector(selectAuthNameError)
  const inputEmailError = useSelector(selectAuthEmailError)

  const [isTouched, setIsTouched] = useState<ProfileEditingModeIsTouched>({
    nameIsToched: false,
    emailIsTouched: false,
  })

  useEffect(() => {
    setMounted(true)
    dispatch(setAuthName(session.user.name))
    dispatch(setAuthEmail(session.user.email))
  }, [session, dispatch])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    dispatch(setAuthName(value))
    dispatch(setAuthNameError(validateAuthNameEditMode(value)))
  }
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    dispatch(setAuthEmail(value))
    dispatch(setAuthEmailError(validateAuthEmailEditMode(value)))
  }

  const handleSaveClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsTouched((prev) => ({
      ...prev,
      nameIsToched: true,
      emailIsTouched: true,
    }))

    const nameErr = validateAuthNameEditMode(inputName)
    const emailErr = validateAuthEmailEditMode(inputEmail)

    dispatch(setAuthNameError(nameErr))
    dispatch(setAuthEmailError(emailErr))

    if (nameErr || emailErr) return

    const payload: Partial<EditingModePayload> = {}

    if (inputName !== session.user.name) {
      payload.name = inputName
    }
    if (inputEmail !== session.user.email) {
      payload.email = inputEmail
    }

    if (Object.keys(payload).length === 0) {
      toast.warning('No changes to update')
      return
    }
    try {
      // const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/settings/profile`, payload)
      // const data = res.data
      toast.success(
        `payload.name: ${payload?.name}; payload.email: ${payload?.email}`
      )
      onCancel()
    } catch (error) {}
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
      <InputField
        label="New email"
        placeholder="Email"
        value={inputEmail}
        onChange={handleEmailChange}
        onBlur={() =>
          setIsTouched((prev) => ({ ...prev, emailIsTouched: true }))
        }
        errorText={isTouched.emailIsTouched ? inputEmailError : null}
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
