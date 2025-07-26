'use client'

import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { AppProviderProps } from '@/types/appTypes'

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  )
}
export default AppProvider
