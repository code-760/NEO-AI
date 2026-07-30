import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Feature/Auth/app.Slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
