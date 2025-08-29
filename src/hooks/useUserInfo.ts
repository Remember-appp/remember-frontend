'use client'
import {
  selectUserInfo,
  setMainUserInfo,
  setProfileUserInfo,
} from '@/redux/slices/userInfoSlice'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

export const useUserinfo = () => {
  const dispatch = useDispatch()
  const { data: session, status } = useSession()
  const { profileInfo } = useSelector(selectUserInfo)
  const getProfile = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/me/profile`,
        { headers: { Authorization: `Bearer ${session?.accessToken}` } }
      )
      const data = res.data
      console.log(data?.profile?.display_name)
      dispatch(setProfileUserInfo(data.profile))
      toast.success('Good')
    } catch (error) {
      toast.error('Error loading profile')
    }
  }
  useEffect(() => {
    if (session?.user) {
      dispatch(setMainUserInfo(session?.user))
      getProfile()
    }
  }, [session, status])
}
