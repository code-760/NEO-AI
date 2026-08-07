import { useDispatch } from 'react-redux';
import { sendmessage } from '../Services/chat.service.js';
import { initializeSocket } from '../Services/chat.socket.js';
import {
  createNewChat,
  addnewmessage,
  setcreatedchatId,
  setloading,
} from '../chat.slice.js';

export const usechat = () => {
  const dispatch = useDispatch();

  const hendalsendchat = async ({ message, chatId }) => {
    dispatch(setloading(true));
    const data = await sendmessage({ message, chatId });

    const { chat, AIMessage } = data.data;

   
    dispatch(
      createNewChat({
        chatId: chat.id,
        title: chat.title,
      })
    );
    dispatch(
      addnewmessage({
        chatId: chat.id,
        content: message,
        role: 'user',
      })
    );
    dispatch(
      addnewmessage({
        chatId: chat.id,
        content: AIMessage.content,
        role: 'ai',
      }),
    );

    dispatch(setcreatedchatId(chat.id));
    dispatch(setloading(false));
  };

  return {
    initializeSocket,
    hendalsendchat,
  };
};
