import { configureStore } from '@reduxjs/toolkit';

const dummyReducer = (state = {}) => state;

export const store = configureStore({
  reducer: {
    dummy: dummyReducer
  },
});