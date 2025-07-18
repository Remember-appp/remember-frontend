import Button from '@/components/Button'
import FormSection from '@/components/FormSection'
import InputField from '@/components/InputField'
import PasswordInput from '@/components/PasswordInput'
import React from 'react'

function AuthPage() {
  return (
    <div>
      <form>
        <FormSection>
          <InputField label="Email" type="email" placeholder='Email'/>
          <PasswordInput label="Password" placeholder='Password'/>
          <Button type="submit" text={'Sign in'} className={'bg-lime-400 hover:bg-lime-500 transition duration-200'}/>
        </FormSection>
      </form>
    </div>
  )
}

export default AuthPage
