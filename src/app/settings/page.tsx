'use client'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { HeaderText } from '@/components/HeaderText'
import ProfileCard from '@/components/ProfileCard'
import { useUserSettings } from '@/hooks/useUserSettings'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectUserSettings,
  setUserSettings,
} from '@/redux/slices/userSettingsSlice'
import { toast } from 'sonner'
import Button from '@/components/Button'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { locales } from '@/data/settingsData'

function Settings() {
  useUserSettings()

  const dispatch = useDispatch()
  const { data: session } = useSession()
  const timezones = Intl.supportedValuesOf('timeZone')

  const userSettings = useSelector(selectUserSettings)

  const [tz, setTz] = useState('')
  const [locale, setLocale] = useState('')
  const [privacy, setPrivacy] = useState<object[]>([])
  const [notifications, setnNotifications] = useState<object[]>([])

  useEffect(() => {
    if (userSettings.tz) {
      setTz(userSettings.tz)
    }
    if (userSettings.locale) {
      setLocale(userSettings.locale)
    }
    if (userSettings.privacy) {
      setPrivacy(userSettings.privacy)
    }
    if (userSettings.notifications) {
      setnNotifications(userSettings.notifications)
    }
  }, [
    userSettings.tz,
    userSettings.locale,
    userSettings.privacy,
    userSettings.notifications,
  ])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload: SettingsPayloadType = {}
    if (userSettings.tz !== tz) {
      payload.tz = tz
    }
    if (userSettings.locale !== locale) {
      payload.locale = locale
    }
    if (Object.keys(payload).length === 0) {
      toast.warning('Nothing to update')
      return
    }
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/me/settings`,
        payload,
        { headers: { Authorization: `Bearer ${session?.accessToken}` } }
      )
      const data = res.data
      dispatch(setUserSettings(data))
      toast.success('Settings updated!')
    } catch (error) {
      console.error(error)
      toast.error('Error updating profile')
      return
    }
  }

  return (
    <div className="ml-0 sm:ml-10 flex w-full flex-col justify-center">
      <HeaderText text="Settings" />
      <ProfileCard>
        <form className="w-full" onSubmit={handleSave}>
          <div className="flex flex-col w-full gap-4 items-center">
            <FormControl className="w-full" variant="standard">
              <div className=" mb-4">
                <InputLabel className="ml-2">Tz</InputLabel>
              </div>

              <Select
                disableUnderline
                classes={{
                  root: 'border border-emerald-500 rounded pl-2',
                }}
                value={tz}
                label="Tz"
                onChange={(e: SelectChangeEvent) => setTz(e.target.value)}
              >
                {timezones.map((zone) => {
                  return (
                    <MenuItem key={zone} value={zone}>
                      {zone}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            <FormControl className="w-full" variant="standard">
              <div className=" mb-4">
                <InputLabel className="ml-2">Locale</InputLabel>
              </div>
              <Select
                disableUnderline
                classes={{
                  root: 'border border-emerald-500 rounded pl-2',
                }}
                value={locale}
                label="Locale"
                onChange={(e: SelectChangeEvent) => setLocale(e.target.value)}
              >
                {locales.map((l) => {
                  return (
                    <MenuItem key={l} value={l}>
                      {l}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            <Button
              className="bg-lime-300 self-start rounded-full"
              text="Save"
              type="submit"
            />
          </div>
        </form>
      </ProfileCard>
    </div>
  )
}

export default Settings
