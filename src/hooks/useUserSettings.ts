'use client'
import { setUserSettings } from '@/redux/slices/userSettingsSlice'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

export const useUserSettings = () => {
  const dispatch = useDispatch()
  const { data: session } = useSession()

  const getSettings = async () => {
    if (session?.accessToken) {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/me/settings`,
          { headers: { Authorization: `Bearer ${session.accessToken}` } }
        )
        const data = res.data
        dispatch(setUserSettings(data.settings))
        toast.success('Settings page data loaded')
      } catch (error) {
        toast.error('Data did not load')
        return
      }
    }
  }

  useEffect(() => {
    getSettings()
  }, [session])
}
