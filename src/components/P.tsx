import { PProps } from '@/types/componentsTypes'
import React from 'react'

const P: React.FC<PProps> = ({ children, text, className = '' }) => {
  return (
    <div
      className={`flex items-center justify-center text-center ${className}`}
    >
      <p className="text-base m-0">{text || children}</p>
    </div>
  )
}

export default P
