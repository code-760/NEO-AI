import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Feature/Auth/app.Slice';
import chatReducer from '../Feature/Chat/chat.slice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});
