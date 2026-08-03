import chatModel from '../model/chat.model.js';
import messageModel from '../model/messages.model.js';
import { MISTRALAL, sendmessagestitle } from '../Services/AI.service.js';

export const sendmessages = async (req, res) => {
  try {
    const { message, chatId } = req.body;

    let chat = null;
    let title = null;
    let activeChatId = chatId;

    // 1. Agar chatId NAHI aai hai -> Matlab NEW CHAT hai
    if (!activeChatId) {
      title = await sendmessagestitle(message);

      chat = await chatModel.create({
        user: req.user.id,
        title,
      });

      activeChatId = chat._id; // Nayi bane chat ki ID set kar di
    }

    // 2. User ka message DB mein save karo
    await messageModel.create({
      chat: activeChatId,
      content: message,
      role: 'user',
    });

    // 3. Iss chat ke saare puraane messages fetch karo (History ke liye)
    const messages = await messageModel.find({ chat: activeChatId });

    console.log(messages);

    // 4. AI se response lo
    const result = await MISTRALAL(messages);

    // 5. AI ka response DB mein save karo
    const AIMessage = await messageModel.create({
      chat: activeChatId,
      content: result,
      role: 'ai',
    });

    // 6. Response bhejo
    res.status(201).json({
      chatId: activeChatId, // Ye Frontend ko mil jayega
      title, // New chat par Title milega, existing par null
      AIMessage,
      chat,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong while sending the message.' });
  }
};
