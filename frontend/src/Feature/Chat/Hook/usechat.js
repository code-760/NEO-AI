import { useDispatch } from 'react-redux';
import { getchat, getmessages, searchchat, sendmessage } from '../Services/chat.service.js';
import { initializeSocket, disconnectSocket } from '../Services/chat.socket.js';
import {
  createNewChat,
  addnewmessage,
  addMessages,
  setchat,
  setcreatedchatId,
  setloading,
  setSearchChats,
} from '../chat.slice.js';

export const usechat = () => {
  const dispatch = useDispatch();

  const hendalsendchat = async ({ message, chatId }) => {
    const trimmedMessage = typeof message === 'string' ? message.trim() : '';
    if (!trimmedMessage) return false;

    dispatch(setloading(true));

    try {
      const { data } = await sendmessage({ message: trimmedMessage, chatId });
      const userchat = data?.data ?? data;
      const chatIdValue = userchat?.chatId ?? chatId;
      const aiMessageContent = userchat?.AIMessage?.content;

      if (!chatIdValue) {
        return false;
      }

      dispatch(
        createNewChat({
          chatId: chatIdValue,
          title: userchat?.chat?.title || 'New chat',
        }),
      );

      if (aiMessageContent) {
        dispatch(
          addnewmessage({
            chatId: chatIdValue,
            content: aiMessageContent,
            role: 'ai',
          }),
        );
      }

      dispatch(setcreatedchatId(chatIdValue));
      return true;
    } catch (error) {
      console.error('Failed to send chat message', error);
      return false;
    } finally {
      dispatch(setloading(false));
    }
  };

  const hendalgetchat = async () => {
    try {
      const { data } = await getchat();
      const chats = (data?.chatdeta ?? []).map((chat) => ({
        id: chat._id,
        title: chat.title,
        messages: chat.messages || [],
        lastUpdated: chat.lastUpdated,
      }));

      dispatch(setchat(chats));
    } catch (error) {
      console.error('Failed to fetch chats', error);
    }
  };

  const handelgetmessages = async (chatId) => {
    try {
      const { data } = await getmessages(chatId);
      const messages = (data?.messages ?? []).map((msg) => ({
        id: msg._id,
        content: msg.content,
        role: msg.role,
        timestamp: msg.timestamp,
      }));

      dispatch(
        addMessages({
          chatId,
          messages,
        }),
      );

      dispatch(setcreatedchatId(chatId));
    } catch (error) {
      console.error('Failed to fetch chat messages', error);
    }
  };

  const hendalsearchchat = async (search) => {
    try {
      const { data } = await searchchat(search);
      dispatch(setSearchChats(data?.chats ?? []));
    } catch (error) {
      console.error('Failed to search chats', error);
      dispatch(setSearchChats([]));
    }
  };

  const handellogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  return {
    initializeSocket,
    disconnectSocket,
    hendalsendchat,
    hendalgetchat,
    handelgetmessages,
    hendalsearchchat,
   
  };
};
