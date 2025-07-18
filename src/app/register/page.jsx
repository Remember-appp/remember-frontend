'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
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

function RegisterPage() {
  const dispatch = useDispatch()
  const router = useRouter()

  const emailInput = useSelector(selectAuthEmail)
  const nameInput = useSelector(selectAuthName)
  const passwordInput = useSelector(selectAuthPassword)
  const confirmPasswordInput = useSelector(selectAuthConfirmPassword)
  const emailInputError = useSelector(selectAuthEmailError)
  const passwordInputError = useSelector(selectAuthPasswordError)
  const nameInputError = useSelector(selectAuthNameError)
  const confirmPasswordInputError = useSelector(selectAuthConfirmPasswordError)

  const [isTouched, setIsTouched] = useState({
    nameIsTouched: false,
    emailIsTouched: false,
    passwordIsTouched: false,
    confirmPasswordIsTouched: false,
  })

  useEffect(() => {
    dispatch(resetAuthForm())
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

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
  }

  const handleChange =
    (actionCreatorInput, actionCreatorError, actionCreatorValidation) =>
    (e) => {
      dispatch(actionCreatorInput(e.target.value))
      dispatch(actionCreatorError(actionCreatorValidation(e.target.value)))
    }
  const handleConfirmPasswordChange = (e) => {
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
          <Button
            text={'Sign up'}
            type="submit"
            className={
              'bg-lime-400 hover:bg-lime-500 transition duration-200 m-2'
            }
          />
          <Link href={'/auth'}>
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
