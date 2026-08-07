import { createSlice } from '@reduxjs/toolkit';

const chatslice = createSlice({
  name: 'chat',
  initialState: {
    chats: {},
    createdchatId:null ,
    loading: false,
    error: false,
  },

  reducers: {
    createNewChat: (state, action) => {
      const { chatId, title } = action.payload;
      state.chats[chatId] = {
        id: chatId,
        title,
        messages: [],
        lesUpdated: new Date().toISOString(),
      };
    },
    addnewmessage: (state, action) => {
      const { chatId, content, role } = action.payload;
      if (state.chats[chatId]) {
        state.chats[chatId].messages.push({
          content,
          role,
          timestamp: new Date().toISOString(),
        });
        state.chats[chatId].lesUpdated = new Date().toISOString();
      }
    },

    setchat: (state, action) => {
      state.chats = action.payload;
    },
    setcreatedchatId: (state, action) => {
      state.createdchatId = action.payload;
    },
    setloading: (state, action) => {
      state.loading = action.payload;
    },
    seterror: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  createNewChat,
  addnewmessage,
  setchat,
  setcreatedchatId,
  setloading,
  seterror,
} = chatslice.actions;

export default chatslice.reducer;
