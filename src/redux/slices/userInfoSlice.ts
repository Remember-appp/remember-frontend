import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type UserInfoState = {
  id: number | null
  name: string | null
  email: string | null
  email_verified_at: string | null
  created_at: string | null
  updated_at: string | null
  loaded: boolean
}

const initialState: UserInfoState = {
  id: null,
  name: null,
  email: null,
  email_verified_at: null,
  created_at: null,
  updated_at: null,
  loaded: false,
}

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<Partial<UserInfoState>>) => {
      Object.assign(state, action.payload)
      state.loaded = true
    },
    clearUserInfo: (state) => {
      state.id = null
      state.name = null
      state.email = null
      state.email_verified_at = null
      state.created_at = null
      state.updated_at = null
      state.loaded = false
    },
  },
})

export const { setUserInfo, clearUserInfo } = userInfoSlice.actions

export const selectUserInfo = (state: RootState) => state.userInfo
export const selectUserName = (state: RootState) => state.userInfo.name
export const selectUserEmail = (state: RootState) => state.userInfo.email
export const selectIsUserLoaded = (state: RootState) => state.userInfo.loaded

export default userInfoSlice.reducer
