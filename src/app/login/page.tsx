'use client'

import Button from '@/components/Button'
import type { FormEvent, ChangeEvent } from 'react'
import FormSection from '@/components/FormSection'
import InputField from '@/components/InputField'
import P from '@/components/P'
import PasswordInput from '@/components/PasswordInput'
import {
  resetAuthForm,
  selectAuthEmail,
  selectAuthPassword,
  setAuthEmail,
  setAuthPassword,
} from '@/redux/slices/authFormSlice'
import {
  selectAuthEmailError,
  selectAuthPasswordError,
  setAuthEmailError,
  setAuthPasswordError,
} from '@/redux/slices/authValidationSlice'
import { validateAuthEmail, validateAuthPassword } from '@/utils/authValidators'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from 'next-auth/react'
import { LoginIsTouched } from '@/types/authTypes'
import { selectAuthError, setAuthError } from '@/redux/slices/authSlice'
import { toast } from 'sonner'

function AuthPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const emailInput = useSelector(selectAuthEmail)
  const passwordInput = useSelector(selectAuthPassword)
  const emailInputError = useSelector(selectAuthEmailError)
  const passwordInputError = useSelector(selectAuthPasswordError)
  const error = useSelector(selectAuthError)

  const [mounted, setMounted] = useState(false)

  const [isTouched, setIsTouched] = useState<LoginIsTouched>({
    emailIsTouched: false,
    passwordIsTouched: false,
  })

  useEffect(() => {
    setMounted(true)
    dispatch(setAuthError(null))
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const emailErr = validateAuthEmail(emailInput)
    const passwordErr = validateAuthPassword(passwordInput)

    dispatch(setAuthEmailError(emailErr))
    dispatch(setAuthPasswordError(passwordErr))

    if (emailErr || passwordErr) return

    const res = await signIn('credentials', {
      email: emailInput,
      password: passwordInput,
      redirect: false,
    })

    if (!res.ok && res?.error) {
      console.log(res.error)
      dispatch(setAuthError(res.error))
      toast.error(error)
    }

    if (res.ok) {
      toast.success('Successfully authorized')
      router.push('/profile')
      dispatch(resetAuthForm())
    }
  }

  const handleChange =
    (
      actionCreatorInput: (value: string) => any,
      actionCreatorError: (value: string) => any,
      actionCreatorValidation: (value: string) => string
    ) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(actionCreatorInput(e.target.value))
      dispatch(actionCreatorError(actionCreatorValidation(e.target.value)))
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
            label="Password"
            placeholder="Enter password"
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
          <Button
            type="submit"
            text={'Sign in'}
            className={
              'bg-lime-400 hover:bg-lime-500 transition duration-200 m-2'
            }
          />
          <Link href="/register">
            <P
              text={"Don't have an account? Sign up"}
              className="text-blue-400 font-bold cursor-pointer hover:underline"
            />
          </Link>
        </FormSection>
      </form>
    </div>
  )
}

export default AuthPage
