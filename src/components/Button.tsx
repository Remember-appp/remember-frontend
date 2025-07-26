import { ButtonProps } from '@/types/componentsTypes'
import React from 'react'

const Button: React.FC<ButtonProps> = ({
  children,
  text,
  onClick,
  disabled = false,
  type = 'button',
  className,
}) => {
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

export default Button
