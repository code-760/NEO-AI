import { createSlice } from '@reduxjs/toolkit';

const chatslice = createSlice({
  name: 'chat',
  initialState: {
    chats: {}, // Key-Value pair: { chatId: { id, title, messages: [] } }
    createdchatId: null,
    loading: false,
    error: false,
  },

  reducers: {
    createNewChat: (state, action) => {
      const { chatId, title } = action.payload;
      if (!state.chats[chatId]) {
        state.chats[chatId] = {
          id: chatId,
          title,
          messages: [],
          lastUpdated: new Date().toISOString(),
        };
      }
    },

    addnewmessage: (state, action) => {
      const { chatId, content, role } = action.payload;
      if (state.chats[chatId]) {
        state.chats[chatId].messages.push({
          content,
          role,
          timestamp: new Date().toISOString(),
        });
        state.chats[chatId].lastUpdated = new Date().toISOString();
      }
    },

    addMessages: (state, action) => {
      const { chatId, messages } = action.payload;
      if (!state.chats[chatId]) {
        state.chats[chatId] = { id: chatId, title: 'Chat', messages: [] };
      }
      // Overwrite/Set messages for the fetched chat
      state.chats[chatId].messages = messages;
    },

    setchat: (state, action) => {
      // Convert incoming array into Key-Value Object format
      const chatsObj = {};
      action.payload.forEach((chat) => {
        chatsObj[chat.id] = {
          ...chat,
          messages: chat.messages || [],
        };
      });
      state.chats = chatsObj;
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

export const { createNewChat, addnewmessage, addMessages, setchat, setcreatedchatId, setloading, seterror } =
  chatslice.actions;

export default chatslice.reducer;
