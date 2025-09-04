import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { UserInfoState } from '@/types/authTypes'

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
    setMainUserInfo: (
      state,
      action: PayloadAction<Partial<UserInfoState['mainInfo']>>
    ) => {
      Object.assign(state.mainInfo, action.payload)
      state.mainInfo.loaded = true
      state.mainInfo.token = null
    },
    setProfileUserInfo: (
      state,
      action: PayloadAction<Partial<UserInfoState['profileInfo']>>
    ) => {
      Object.assign(state.profileInfo, action.payload)
    },
    clearUserInfo: (state) => {
      state.mainInfo = {
        id: null,
        name: null,
        email: null,
        email_verified_at: null,
        created_at: null,
        updated_at: null,
        loaded: false,
        token: null,
      }
      state.profileInfo = {
        user_id: null,
        display_name: null,
        bio: null,
        photo_asset_id: null,
        birth_date: null,
        favorite_phrases: [],
      }
    },
  },
})

export const { setMainUserInfo, setProfileUserInfo, clearUserInfo } =
  userInfoSlice.actions

export const selectUserInfo = (state: RootState) => state.userInfo
export const selectUserName = (state: RootState) => state.userInfo.mainInfo.name
export const selectUserEmail = (state: RootState) =>
  state.userInfo.mainInfo.email
export const selectIsUserLoaded = (state: RootState) =>
  state.userInfo.mainInfo.loaded

export default userInfoSlice.reducer
