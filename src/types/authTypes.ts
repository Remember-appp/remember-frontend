
export type authFormState = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export type authState = {
  user: string | boolean | null
  token: string | boolean | null
  status: string
  error: string | boolean | null
}

export type authValidationState = {
  authNameError: string | null
  authEmailError: string | null
  authPasswordError: string | null
  authConfirmPasswordError: string | null
}

export type AuthStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export type UserDataType = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export type RegisterData = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export type LoginData = {
  email: string
  password: string
}

export type ValidationResult = string | null

export type RegisterIsTouched = {
  nameIsTouched: boolean
  emailIsTouched: boolean
  passwordIsTouched: boolean
  confirmPasswordIsTouched: boolean
}

export type LoginIsTouched = {
  emailIsTouched: boolean
  passwordIsTouched: boolean
}
