import React from 'react'
import P from './P'

type InputFieldProps = {
  classNameDiv?: string
  classNameLabel?: string
  classNameInput?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  onBlur: () => void
  label?: string
  placeholder?: string
  type?: string
  errorText?: string
}

const InputField: React.FC<InputFieldProps> = ({
  classNameDiv,
  classNameLabel,
  classNameInput,
  onChange,
  value,
  onBlur,
  label = 'Label',
  placeholder = 'Text',
  type = 'text',
  errorText = '',
}) => {
  return (
    <div className={`flex flex-col gap-1 mb-0.5 mt-0.5 ${classNameDiv}`}>
      <label
        className={`text-sm font-medium text-emerald-700 ${classNameLabel}`}
      >
        {label}
      </label>
      <input
        type={type}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`border border-emerald-300 focus:border-emerald-500 focus:scale-[1.02] transition-all duration-200 outline-none px-4 py-2 rounded ${classNameInput}`}
        value={value}
        onChange={onChange}
      />
      <div className="min-h-[1rem]">
        {errorText && (
          <p className="text-red-500 text-sm mt-1 ml-1">{errorText}</p>
        )}
      </div>
    </div>
  )
}

export default InputField
