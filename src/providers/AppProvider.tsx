'use client'

import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { AppProviderProps } from '@/types/appTypes'
import { Toaster } from 'sonner'

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <SessionProvider>
      <Toaster richColors position="bottom-right"/>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  )
}
export default AppProvider
