'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@/components/Button'
import FormSection from '@/components/FormSection'
import InputField from '@/components/InputField'
import PasswordInput from '@/components/PasswordInput'
import {
  resetAuthForm,
  selectAuthConfirmPassword,
  selectAuthEmail,
  selectAuthName,
  selectAuthPassword,
  setAuthConfirmPassword,
  setAuthEmail,
  setAuthName,
  setAuthPassword,
} from '@/redux/slices/authFormSlice'

function RegisterPage() {
  const dispatch = useDispatch()
  const router = useRouter()

  const emailInput = useSelector(selectAuthEmail)
  const nameInput = useSelector(selectAuthName)
  const passwordInput = useSelector(selectAuthPassword)
  const confirmPasswordInput = useSelector(selectAuthConfirmPassword)

  useEffect(() => {
    dispatch(resetAuthForm())
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleChange = (actionCreator) => (e) => {
    dispatch(actionCreator(e.target.value))
  }
  return (
    <div>
      <FormSection>
        <InputField
          label="Name"
          type="text"
          placeholder="Enter name"
          value={nameInput}
          onChange={handleChange(setAuthName)}
        />
        <InputField
          label="Email"
          type="email"
          placeholder="Enter email"
          value={emailInput}
          onChange={handleChange(setAuthEmail)}
        />
        <PasswordInput
          value={passwordInput}
          onChange={handleChange(setAuthPassword)}
        />
        <PasswordInput
          label="Confirm password"
          value={confirmPasswordInput}
          onChange={handleChange(setAuthConfirmPassword)}
        />
        <Button
          text={'Sign up'}
          type="submit"
          className={'bg-lime-400 hover:bg-lime-500 transition duration-200'}
        />
      </FormSection>
    </div>
  )
}

export default RegisterPage
