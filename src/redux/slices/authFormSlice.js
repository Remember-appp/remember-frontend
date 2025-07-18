const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const authFormSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuthName(state, action) {
      state.name = action.payload
    },
    setAuthEmail(state, action) {
      state.email = action.payload
    },
    setAuthPassword(state, action) {
      state.password = action.payload
    },
    setAuthConfirmPassword(state, action) {
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

export const selectAuthName = (state) => state.authForm.name
export const selectAuthEmail = (state) => state.authForm.email
export const selectAuthPassword = (state) => state.authForm.password
export const selectAuthConfirmPassword = (state) =>
  state.authForm.confirmPassword

export default authFormSlice.reducer
