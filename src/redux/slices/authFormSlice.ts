import { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { authFormState } from '@/types/authTypes'

const initialState: authFormState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  bio: '',
  birth: '',
  favoritePhrases: '',
}

const authFormSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuthName(state, action: PayloadAction<string>) {
      state.name = action.payload
    },
    setAuthEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
    },
    setAuthPassword(state, action: PayloadAction<string>) {
      state.password = action.payload
    },
    setAuthConfirmPassword(state, action: PayloadAction<string>) {
      state.confirmPassword = action.payload
    },
    setBio(state, action: PayloadAction<string>) {
      state.bio = action.payload
    },
    setBirth(state, action: PayloadAction<string>) {
      state.birth = action.payload
    },
    setFavoritePhrases(state, action: PayloadAction<string>) {
      state.favoritePhrases = action.payload
    },
    resetAuthForm() {
      return initialState
    },
  },
})

export const {
  setAuthName,
  setAuthEmail,
  setAuthPassword,
  setAuthConfirmPassword,
  setBio,
  setBirth,
  setFavoritePhrases,
  resetAuthForm,
} = authFormSlice.actions

export const selectAuthName = (state: RootState) => state.authForm.name
export const selectAuthEmail = (state: RootState) => state.authForm.email
export const selectAuthPassword = (state: RootState) => state.authForm.password
export const selectAuthConfirmPassword = (state: RootState) =>
  state.authForm.confirmPassword
export const selectBio = (state: RootState) => state.authForm.bio
export const selectBirth = (state: RootState) => state.authForm.birth
export const selectFavoritePhrases = (state: RootState) =>
  state.authForm.favoritePhrases

export default authFormSlice.reducer
