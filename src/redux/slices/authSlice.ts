import loginAuth from '@/services/authService/login'
import registerAuth from '@/services/authService/register'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

type authState = {
  user: string | boolean | null
  token: string | boolean | null
  status: string
  error: string | boolean | null
}

const initialState: authState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
}

type YourUserDataType = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export const registerUser = createAsyncThunk<
  string,
  YourUserDataType,
  { rejectValue: string }
>('auth/registerUser', async (userData, thunkAPI) => {
  try {
    const response = await registerAuth(userData)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Unknown error'
      })
  },
})

export const selectAuthStatus = (state: RootState) => state.auth.status
export const selectAuthError = (state: RootState) => state.auth.error

export default authSlice.reducer
