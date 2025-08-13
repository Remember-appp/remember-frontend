import { FormSectionProps } from '@/types/componentsTypes'
import React from 'react'

const FormSection: React.FC<FormSectionProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 animate-fade animate-duration-500">
      <div className="w-full max-w-md  px-4  mb-30">
        <div className="flex flex-col pt-8 pb-8 pl-6 pr-6 bg-white rounded-xl shadow-md">
          {children}
        </div>
      </div>
    </div>
  )
}

export default FormSection
