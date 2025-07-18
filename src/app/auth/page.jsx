'use client'

import Button from '@/components/Button'
import FormSection from '@/components/FormSection'
import InputField from '@/components/InputField'
import PasswordInput from '@/components/PasswordInput'
import {
  resetAuthForm,
  selectAuthEmail,
  selectAuthPassword,
  setAuthEmail,
  setAuthPassword,
} from '@/redux/slices/authFormSlice'
import { useRouter } from 'next/navigation'
import React, { use, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function AuthPage() {
  const dispatch = useDispatch()
  const router = useRouter()

  const emailInput = useSelector(selectAuthEmail)
  const passwordInput = useSelector(selectAuthPassword)

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
      <form onSubmit={handleSubmit}>
        <FormSection>
          <InputField
            label="Email"
            type="email"
            placeholder="Enter email"
            value={emailInput}
            onChange={handleChange(setAuthEmail)}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter password"
            value={passwordInput}
            onChange={handleChange(setAuthPassword)}
          />
          <Button
            type="submit"
            text={'Sign in'}
            className={'bg-lime-400 hover:bg-lime-500 transition duration-200'}
          />
        </FormSection>
      </form>
    </div>
  )
}

export default AuthPage
