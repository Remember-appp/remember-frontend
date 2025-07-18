import React from 'react'

function InputField({ classNameDiv, classNameLabel, classNameInput, onChange, value, label = 'Label', placeholder = 'Text', type = 'text'}) {
  return (
    <div className={`flex flex-col gap-1 ${classNameDiv}`}>
      <label
        className={`text-sm font-medium text-emerald-700 ${classNameLabel}`}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={`border border-emerald-300 focus:border-emerald-500 focus:scale-[1.02] transition-all duration-200 outline-none px-4 py-2 rounded ${classNameInput}`}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default InputField
