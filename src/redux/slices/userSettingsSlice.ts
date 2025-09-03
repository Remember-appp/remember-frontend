import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState: UserSettingsTypes = {
  user_id: '0198e8b4-db95-70b4-9cb7-2ffe956561de',
  tz: null,
  locale: null,
  privacy: [],
  notifications: [],
}

const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState,
  reducers: {
    setUserSettings: (state, action: PayloadAction<UserSettingsTypes>) => {
      Object.assign(state, action.payload)
    },
    resetUserSettings: () => {
      return initialState
    },
  },
})

export const { setUserSettings, resetUserSettings } = userSettingsSlice.actions

export const selectUserSettings = (state: RootState) => state.userSettings

export default userSettingsSlice.reducer
