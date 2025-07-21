import loginAuth from '@/services/authService/login'
import registerAuth from '@/services/authService/register'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, thunkAPI) => {
    try {
      const response = await registerAuth(userData)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, thunkAPI) => {
    try {
      const response = await loginAuth(userData)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
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
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
        state.token = action.payload.token
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Unknown error'
      })

      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
        state.token = action.payload.token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Unknown error'
      })
  },
})

export const selectAuthUser = (state) => state.auth.user
export const selectAuthStatus = (state) => state.auth.status
export const selectAuthError = (state) => state.auth.error

export default authSlice.reducer
