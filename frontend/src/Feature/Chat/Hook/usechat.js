import { useDispatch } from 'react-redux';
import { getchat, getmessages, sendmessage } from '../Services/chat.service.js';
import { initializeSocket } from '../Services/chat.socket.js';
import {
  createNewChat,
  addnewmessage,
  addMessages,
  setchat,
  setcreatedchatId,
  setloading,
} from "../chat.slice.js"; 

export const usechat = () => {
  const dispatch = useDispatch();

  const hendalsendchat = async ({ message, chatId }) => {
    dispatch(setloading(true));
    const data = await sendmessage({ message, chatId });

    console.log(data.data);



    const userchat = data.data;

    const chat=userchat.chat
    const chatid=userchat.chatId
    const AIMessage=userchat.AIMessage


    console.log(chat,chatid,AIMessage)

    dispatch(
      createNewChat({
        chatId: chatid,
        title: chat?.title,
      }),
    );

    dispatch(
      addnewmessage({
        chatId: chatid,
        content: message,
        role: 'user',
      }),
    );

    dispatch(
      addnewmessage({
        chatId: chatid,
        content: AIMessage?.content,
        role: 'ai',
      }),
    );

    dispatch(setcreatedchatId(chatid));
    dispatch(setloading(false));
  };

  const hendalgetchat = async () => {
    const data = await getchat();

    const chats = data.data.chatdeta.map((chat) => ({
      id: chat._id,
      title: chat.title,
      messages: chat.messages || [],
      lastUpdated: chat.lastUpdated,
    }));

    dispatch(setchat(chats));
  };

  const handelgetmessages = async (chatId) => {
    const data = await getmessages(chatId);

    const messages = data.data.messages.map((msg) => ({
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

    // Active chat set karna taaki main screen par messages show ho sakein
    dispatch(setcreatedchatId(chatId));
  };

  return {
    initializeSocket,
    hendalsendchat,
    hendalgetchat,
    handelgetmessages,
  };
};
