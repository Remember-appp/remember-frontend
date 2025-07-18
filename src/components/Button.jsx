import React from 'react'

export default function Button({
  children,
  text,
  onClick,
  disabled = false,
  type = 'button',
  className,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded px-4 py-2 cursor-pointer font-black ${className}`}
    >
      {text || children}
    </button>
  )
}
