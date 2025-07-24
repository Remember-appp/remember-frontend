import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import AppProvider from '@/providers/AppProvider'
import NavBar from '@/components/NavBar'
import React from 'react'

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

type RootLayoutProps = {
  children: React.ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
          <NavBar />
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
export default RootLayout
