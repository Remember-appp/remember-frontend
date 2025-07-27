import React from "react";

export type PasswordInputProps = {
  classNameDiv?: string
  classNameLabel?: string
  classNameInput?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  onBlur: () => void
  label?: string
  placeholder?: string
  hideBtn?: boolean
  errorText?: string
}

export type PProps = {
  children?: React.ReactNode
  text?: string
  className?: string
}

export type InputFieldProps = {
  classNameDiv?: string
  classNameLabel?: string
  classNameInput?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  onBlur: () => void
  label?: string
  placeholder?: string
  type?: string
  errorText?: string
}

export type FormSectionProps = {
  children: React.ReactNode
}

export type ErrorProps = {
  error: string | null
  classNameWrapper?: string 
}

export type ButtonProps = {
  children?: React.ReactNode
  text?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  type?: 'button' | 'submit'
  className?: string
}