'use client'

import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { SessionProvider } from 'next-auth/react'

export default function AppProvider({ children }) {
  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  )
}
