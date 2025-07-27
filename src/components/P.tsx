import { PProps } from '@/types/componentsTypes'
import React from 'react'

const P: React.FC<PProps> = ({
  children,
  text,
  label,
  className = '',
  classNameText = '',
  classNameLabel = ''
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {label && <label className={`text-lg font-black ${classNameLabel}`}>{label}</label>}
      <p className={`text-base m-0 ${classNameText}`}>{text || children}</p>
    </div>
  )
}
3
export default P
