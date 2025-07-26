'use client'

import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@/components/Button'
import FormSection from '@/components/FormSection'
import InputField from '@/components/InputField'
import PasswordInput from '@/components/PasswordInput'
import {
  registerUser,
  selectAuthError,
  selectAuthStatus,
  setAuthError,
  setAuthStatus,
} from '@/redux/slices/authSlice'
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
import Link from 'next/link'
import P from '@/components/P'
import {
  selectAuthConfirmPasswordError,
  selectAuthEmailError,
  selectAuthNameError,
  selectAuthPasswordError,
  setAuthConfirmPasswordError,
  setAuthEmailError,
  setAuthNameError,
  setAuthPasswordError,
} from '@/redux/slices/authValidationSlice'
import {
  validateAuthConfirmPassword,
  validateAuthEmail,
  validateAuthName,
  validateAuthPassword,
} from '@/utils/authValidators'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { PayloadActionCreator } from '@reduxjs/toolkit'
import Error from '@/components/Error'
import { RegisterIsTouched } from '@/types/authTypes'

function RegisterPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const emailInput = useSelector(selectAuthEmail)
  const nameInput = useSelector(selectAuthName)
  const passwordInput = useSelector(selectAuthPassword)
  const confirmPasswordInput = useSelector(selectAuthConfirmPassword)
  const emailInputError = useSelector(selectAuthEmailError)
  const passwordInputError = useSelector(selectAuthPasswordError)
  const nameInputError = useSelector(selectAuthNameError)
  const confirmPasswordInputError = useSelector(selectAuthConfirmPasswordError)
  const status = useSelector(selectAuthStatus)
  const errorAuth = useSelector(selectAuthError)

  const [mounted, setMounted] = useState(false)

  const [isTouched, setIsTouched] = useState<RegisterIsTouched>({
    nameIsTouched: false,
    emailIsTouched: false,
    passwordIsTouched: false,
    confirmPasswordIsTouched: false,
  })

  useEffect(() => {
    setMounted(true)
    dispatch(setAuthStatus('idle'))
    dispatch(setAuthError(null))
    dispatch(resetAuthForm())
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsTouched((prev) => ({
      ...prev,
      nameIsTouched: true,
      emailIsTouched: true,
      passwordIsTouched: true,
      confirmPasswordIsTouched: true,
    }))

    const nameErr = validateAuthName(nameInput)
    const emailErr = validateAuthEmail(emailInput)
    const passwordErr = validateAuthPassword(passwordInput)
    const confirmPasswordErr = validateAuthConfirmPassword(
      passwordInput,
      confirmPasswordInput
    )

    dispatch(setAuthNameError(nameErr))
    dispatch(setAuthEmailError(emailErr))
    dispatch(setAuthPasswordError(passwordErr))
    dispatch(setAuthConfirmPasswordError(confirmPasswordErr))

    if (nameErr || emailErr || passwordErr || confirmPasswordErr) return
    try {
      await dispatch(
        registerUser({
          name: nameInput,
          email: emailInput,
          password: passwordInput,
          password_confirmation: confirmPasswordInput,
        })
      ).unwrap()

      router.push('/login')
    } catch (err) {
      console.log('Registration failed:', err.message)
    }
  }

  const handleChange =
    (
      actionCreatorInput: PayloadActionCreator<string>,
      actionCreatorError: PayloadActionCreator<string>,
      actionCreatorValidation: (value: string) => string
    ) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      dispatch(actionCreatorInput(value))
      dispatch(actionCreatorError(actionCreatorValidation(value)))
    }

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    dispatch(setAuthConfirmPassword(value))
    dispatch(
      setAuthConfirmPasswordError(
        validateAuthConfirmPassword(passwordInput, value)
      )
    )
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormSection>
          <InputField
            label="Name"
            type="text"
            placeholder="Enter name"
            value={nameInput}
            onChange={handleChange(
              setAuthName,
              setAuthNameError,
              validateAuthName
            )}
            onBlur={() =>
              setIsTouched((prev) => ({ ...prev, nameIsTouched: true }))
            }
            errorText={isTouched.nameIsTouched ? nameInputError : ''}
          />
          <InputField
            label="Email"
            type="email"
            placeholder="Enter email"
            value={emailInput}
            onChange={handleChange(
              setAuthEmail,
              setAuthEmailError,
              validateAuthEmail
            )}
            onBlur={() =>
              setIsTouched((prev) => ({ ...prev, emailIsTouched: true }))
            }
            errorText={isTouched.emailIsTouched ? emailInputError : ''}
          />
          <PasswordInput
            value={passwordInput}
            onChange={handleChange(
              setAuthPassword,
              setAuthPasswordError,
              validateAuthPassword
            )}
            onBlur={() =>
              setIsTouched((prev) => ({ ...prev, passwordIsTouched: true }))
            }
            errorText={isTouched.passwordIsTouched ? passwordInputError : ''}
          />
          <PasswordInput
            label="Confirm password"
            value={confirmPasswordInput}
            onChange={handleConfirmPasswordChange}
            onBlur={() =>
              setIsTouched((prev) => ({
                ...prev,
                confirmPasswordIsTouched: true,
              }))
            }
            errorText={
              isTouched.confirmPasswordIsTouched
                ? confirmPasswordInputError
                : ''
            }
          />
            {mounted && status === 'failed' && errorAuth && (
              <Error error={String(errorAuth)} classNameWrapper='mb-2'/>
            )}
          <Button
            text={'Sign up'}
            type="submit"
            className={
              'bg-lime-400 hover:bg-lime-500 transition duration-200 m-2'
            }
          />
          <Link href={'/login'}>
            <P
              text={'Alredy have an account? Sign in'}
              className="text-blue-400 font-bold cursor-pointer hover:underline"
            />
          </Link>
        </FormSection>
      </form>
    </div>
  )
}

export default RegisterPage
