'use client'
import { setUserInfo } from '@/redux/slices/userInfoSlice'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const useUserinfo = () => {
  const dispatch = useDispatch()
  const { data: session, status } = useSession()
  useEffect(() => {
    if (session?.user) {
      dispatch(setUserInfo(session?.user))
    }
  }, [session, status])
}
