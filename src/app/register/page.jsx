import Button from '@/components/Button'
import FormSection from '@/components/FormSection'
import InputField from '@/components/InputField'
import PasswordInput from '@/components/PasswordInput'
import React from 'react'

function RegisterPage() {
  return (
    <div>
      <FormSection>
        <InputField label='Email' type='email'/>
        <InputField label='Name' type='text'/>
        <PasswordInput />
        <PasswordInput label='Confirm password'/>
        <Button text={'Sign up'}  type='submit' className={'bg-lime-400 hover:bg-lime-500 transition duration-200'}/>
      </FormSection>
    </div>
  )
}

export default RegisterPage