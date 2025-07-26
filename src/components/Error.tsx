'use client'
import { ErrorProps } from '@/types/componentsTypes'
import React from 'react'

const Error: React.FC<ErrorProps> = ({ error, classNameWrapper }) => {
  if (!error) return null
  return (
    <div className={classNameWrapper}>
      <div className="px-4 py-3 bg-red-100 text-red-700 border border-red-300 rounded-md text-sm">
        {error}
      </div>
    </div>
  )
}

export default Error
