import registerAuth from '@/services/authService/register'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { authState, AuthStatus, UserDataType } from '@/types/authTypes'

const initialState: authState = {
  status: 'idle',
  error: null,
}

export const registerUser = createAsyncThunk<
  string,
  UserDataType,
  { rejectValue: string | { message: string } }
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
  reducers: {
    setAuthStatus: (state, action: PayloadAction<AuthStatus>) => {
      state.status = action.payload
    },
    setAuthError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    }
  },
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
        const payload = action.payload
        state.error =
          typeof payload === 'string'
            ? payload
            : payload?.message || 'Unknown error'
      })
  },
})

export const { setAuthStatus, setAuthError } = authSlice.actions

export const selectAuthStatus = (state: RootState) => state.auth.status
export const selectAuthError = (state: RootState) => state.auth.error

export default authSlice.reducer
