'use client'
import styles from '../styles/Icon.module.css'
import React, { useState } from 'react'
import { BiShow } from 'react-icons/bi'
import { BiHide } from 'react-icons/bi'

function PasswordInput({
  classNameDiv,
  classNameLabel,
  classNameInput,
  onChange,
  value,
  label = 'Password',
  placeholder = 'Enter password',
  hideBtn = true,
}) {
  const [show, setShow] = useState(false)

  return (
    <div className={`flex flex-col gap-1 relative ${classNameDiv}`}>
      <label
        className={`text-sm font-medium text-emerald-700 ${classNameLabel}`}
      >
        {label}
      </label>
      <input
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        className={`border border-emerald-300 focus:border-emerald-500 focus:scale-[1.02] transition-all duration-200 outline-none px-4 py-2 rounded pr-10 ${classNameInput}`}
        value={value}
        onChange={onChange}
      />
      {hideBtn && (
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 bottom-2 text-sm text-emerald-600 hover:underline"
        >
          {show ? (
            <BiShow className={styles.icon} />
          ) : (
            <BiHide className={styles.icon} />
          )}
        </button>
      )}
    </div>
  )
}

export default PasswordInput
