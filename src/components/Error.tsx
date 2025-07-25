'use client'
import React from 'react'

type ErrorProps = {
  error: string | null
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  if (!error) return null
  return (
    <div className="mt-4">
      <div className="px-4 py-3 bg-red-100 text-red-700 border border-red-300 rounded-md text-sm">
        {error}
      </div>
    </div>
  )
}

export default Error
