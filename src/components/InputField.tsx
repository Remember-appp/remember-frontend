import React from 'react'
import { InputFieldProps } from '@/types/componentsTypes'
import clsx from 'clsx'

const InputField: React.FC<InputFieldProps> = ({
  classNameDiv = '',
  classNameLabel = '',
  classNameInput = '',
  onChange,
  value,
  onBlur,
  label = 'Label',
  placeholder = 'Text',
  type = 'text',
  errorText = '',
  errorTextAllowed = true,
}) => {
  const defaultInputClasses =
    'border border-emerald-300 focus:border-emerald-500 focus:scale-[1.02] transition-all duration-200 outline-none px-4 py-2 rounded'

  const defaultLabelClasses = 'text-sm font-medium text-emerald-700'

  return (
    <div className={clsx('flex flex-col gap-1 mb-0.5 mt-0.5', classNameDiv)}>
      <label className={clsx(defaultLabelClasses, classNameLabel)}>
        {label}
      </label>
      <input
        type={type}
        onBlur={onBlur}
        placeholder={placeholder}
        className={clsx(defaultInputClasses, classNameInput)}
        value={value}
        onChange={onChange}
      />
      {errorTextAllowed && (
        <div className="min-h-[1rem]">
          {errorText && (
            <p className="text-red-500 text-sm mt-1 ml-1">{errorText}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default InputField
