import { HeaderText } from '@/components/HeaderText'
import React from 'react'

const WelcomePage: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex justify-center ">
     <HeaderText text='Welcome to Remember app' />
    </div>
  )
}

export default WelcomePage
