import { configureStore } from '@reduxjs/toolkit';
import authFormReducer from './slices/authFormSlice'

export const store = configureStore({
  reducer: {
    authForm: authFormReducer,
  },
});