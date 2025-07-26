import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { authValidationState } from '@/types/authTypes'

const initialState: authValidationState = {
  authNameError: null,
  authEmailError: null,
  authPasswordError: null,
  authConfirmPasswordError: null,
}

const authValidationSlice = createSlice({
  name: 'authValidation',
  initialState,
  reducers: {
    setAuthNameError(state, action: PayloadAction<string>) {
      state.authNameError = action.payload
    },
    setAuthEmailError(state, action: PayloadAction<string>) {
      state.authEmailError = action.payload
    },
    setAuthPasswordError(state, action: PayloadAction<string>) {
      state.authPasswordError = action.payload
    },
    setAuthConfirmPasswordError(state, action: PayloadAction<string>) {
      state.authConfirmPasswordError = action.payload
    },
    clearAuthValidationErrors() {
      return initialState
    },
  },
})

export const {
  setAuthNameError,
  setAuthEmailError,
  setAuthPasswordError,
  setAuthConfirmPasswordError,
  clearAuthValidationErrors,
} = authValidationSlice.actions

export const selectAuthNameError = (state: RootState) =>
  state.authValidation.authNameError
export const selectAuthEmailError = (state: RootState) =>
  state.authValidation.authEmailError
export const selectAuthPasswordError = (state: RootState) =>
  state.authValidation.authPasswordError
export const selectAuthConfirmPasswordError = (state: RootState) =>
  state.authValidation.authConfirmPasswordError

export default authValidationSlice.reducer
