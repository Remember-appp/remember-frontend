import { configureStore } from '@reduxjs/toolkit';
import authFormReducer from './slices/authFormSlice'
import authValidationReducer from './slices/authValidationSlice'

export const store = configureStore({
  reducer: {
    authForm: authFormReducer,
    authValidation: authValidationReducer,
  },
});