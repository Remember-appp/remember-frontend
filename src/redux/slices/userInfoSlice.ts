import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { UserInfoState } from '@/types/authTypes'
import { stat } from 'fs'

const initialState: UserInfoState = {
  mainInfo: {
    id: null,
    name: null,
    email: null,
    email_verified_at: null,
    created_at: null,
    updated_at: null,
    loaded: false,
    token: null,
  },
  profileInfo: {
    user_id: null,
    display_name: null,
    bio: null,
    photo_asset_id: null,
    birth_date: null,
    favorite_phrases: [],
  },
}

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setMainUserInfo: (state, action: PayloadAction<Partial<UserInfoState>>) => {
      Object.assign(state.mainInfo, action.payload)
      state.mainInfo.loaded = true
      state.mainInfo.token = null
    },
    setProfileUserInfo: (
      state,
      action: PayloadAction<Partial<UserInfoState>>
    ) => {
      Object.assign(state.profileInfo, action.payload)
    },
    clearUserInfo: (state) => {
      state.mainInfo.id = null
      state.mainInfo.name = null
      state.mainInfo.email = null
      state.mainInfo.email_verified_at = null
      state.mainInfo.created_at = null
      state.mainInfo.updated_at = null
      state.mainInfo.loaded = false
      state.profileInfo.user_id = null
      state.profileInfo.display_name = null
      state.profileInfo.bio = null
      state.profileInfo.photo_asset_id = null
      state.profileInfo.birth_date = null
      state.profileInfo.favorite_phrases = []
    },
  },
})

export const { setMainUserInfo,setProfileUserInfo, clearUserInfo } = userInfoSlice.actions

export const selectUserInfo = (state: RootState) => state.userInfo
export const selectUserName = (state: RootState) => state.userInfo.mainInfo.name
export const selectUserEmail = (state: RootState) =>
  state.userInfo.mainInfo.email
export const selectIsUserLoaded = (state: RootState) =>
  state.userInfo.mainInfo.loaded

export default userInfoSlice.reducer
