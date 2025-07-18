const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  authNameError: null,
  authEmailError: null,
  authPasswordError: null,
  authConfirmPasswordError: null,
}

const authValidationSlice = createSlice({
  name: 'authValidation',
  initialState,
  reducers: {
    setAuthNameError(state, action) {
      state.authNameError = action.payload
    },
    setAuthEmailError(state, action) {
      state.authEmailError = action.payload
    },
    setAuthPasswordError(state, action) {
      state.authPasswordError = action.payload
    },
    setAuthConfirmPasswordError(state, action) {
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

export const selectAuthNameError = (state) => state.authValidation.authNameError
export const selectAuthEmailError = (state) =>
  state.authValidation.authEmailError
export const selectAuthPasswordError = (state) =>
  state.authValidation.authPasswordError
export const selectAuthConfirmPasswordError = (state) =>
  state.authValidation.authConfirmPasswordError

export default authValidationSlice.reducer
