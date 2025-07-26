import { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { authFormState } from '@/types/authTypes'

const initialState: authFormState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
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
  resetAuthForm,
} = authFormSlice.actions

export const selectAuthName = (state: RootState) => state.authForm.name
export const selectAuthEmail = (state: RootState) => state.authForm.email
export const selectAuthPassword = (state: RootState) => state.authForm.password
export const selectAuthConfirmPassword = (state: RootState) =>
  state.authForm.confirmPassword

export default authFormSlice.reducer
