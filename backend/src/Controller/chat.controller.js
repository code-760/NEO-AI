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

export const getchat = async (req, res) => {
  const token = req.user.id;

  console.log(req.user.id)


  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const chatdeta = await chatModel.find({ user: req.user.id });

  if (!chatdeta) {
    return res.status(404).json({
      message: 'Chat not found',
      success: false,
    });
  }

  res.status(201).json({
    message: 'chat fetched successfully',
    success: true,
    chatdeta,
  });

};

export const getmessages = async (req, res) => {
  const  userId  = req.user.id;
 const { chatId } = req.params;

  console.log(chatId,userId)

  const chat = await chatModel.findOne({
    _id:chatId ,
    user: userId,
  });

  console.log(chat)

  if (!chat) {
    return res.status(404).json({
      message: 'chat is not found',
    });
  }

  const messages = await messageModel.find({
    chat: chatId,
  });

  console.log(messages.length)

  if(!messages){
   return res.status(404).json({
    message:"messages is not fonde",
    success:false
   })
  }

  
  res.status(200).json({
    message: 'messages fetched successfully ',
    success:true,
    messages
  });


};


export const deletchat=async (req,res)=>{

  const {chatId}=req.qurey


  const chat= await chatModel.findByIdAndDelete({id:chatId,user:req.user.id})

  if(!chat){
    return req.status(404).json({
      message:"chat not found"
    })
  }

  const message = await messageModel.deleteMany({chat:chatId})


  res.status(201).json({
    message:"messages and chat deleted",
    success:true
  })

}
