'use client'

import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { AppProviderProps } from '@/types/appTypes'
import { Toaster } from 'sonner'
import { MantineProvider } from '@mantine/core'

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <SessionProvider>
      <Toaster richColors position="bottom-right" closeButton/>
      <Provider store={store}>
        <MantineProvider defaultColorScheme='light'>{children}</MantineProvider>
      </Provider>
    </SessionProvider>
  )
}
export default AppProvider
