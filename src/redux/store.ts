import { configureStore } from '@reduxjs/toolkit';
import authFormReducer from './slices/authFormSlice'
import authValidationReducer from './slices/authValidationSlice'
import authReducer from './slices/authSlice'
import userInfoReducer from './slices/userInfoSlice'
import userSettingsReducer from './slices/userSettingsSlice'

export const store = configureStore({
  reducer: {
    authForm: authFormReducer,
    auth: authReducer,
    authValidation: authValidationReducer,
    userInfo: userInfoReducer,
    userSettings: userSettingsReducer
  },
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
