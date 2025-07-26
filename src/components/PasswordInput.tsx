'use client'
import { PasswordInputProps } from '@/types/componentsTypes'
import styles from '../styles/Icon.module.css'
import React, { useState } from 'react'
import { BiShow } from 'react-icons/bi'
import { BiHide } from 'react-icons/bi'

const PasswordInput: React.FC<PasswordInputProps> = ({
  classNameDiv,
  classNameLabel,
  classNameInput,
  onChange,
  value,
  onBlur,
  label = 'Password',
  placeholder = 'Enter password',
  hideBtn = true,
  errorText = '',
}) => {
  const [show, setShow] = useState(false)

  return (
    <div className={`flex flex-col gap-1 mb-0.5 mt-0.5 ${classNameDiv}`}>
      <label
        className={`text-sm font-medium text-emerald-700 ${classNameLabel}`}
      >
        {label}
      </label>

      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          className={`w-full border border-emerald-300 focus:border-emerald-500 focus:scale-[1.02] transition-all duration-200 outline-none px-4 py-2 rounded pr-10 ${classNameInput}`}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
        />
        {hideBtn && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600"
          >
            {show ? (
              <BiShow className={styles.icon} />
            ) : (
              <BiHide className={styles.icon} />
            )}
          </button>
        )}
      </div>

      <div className="min-h-[1rem]">
        {errorText && (
          <p className="text-red-500 text-sm mt-1 ml-1">{errorText}</p>
        )}
      </div>
    </div>
  )
}

export default PasswordInput
