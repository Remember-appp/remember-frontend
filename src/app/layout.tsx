import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import AppProvider from '@/providers/AppProvider'
import NavBar from '@/components/NavBar'
import React from 'react'
import { RootLayoutProps } from '@/types/appTypes'
import Sidebar from '@/components/SideBar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Remember App',

  description: 'Remember',
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
          <NavBar />
          <Sidebar />
          <div className='ml-5'>{children}</div>
        </AppProvider>
      </body>
    </html>
  )
}
export default RootLayout
