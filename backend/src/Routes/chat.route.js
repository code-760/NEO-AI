import express from 'express';
import { deletchat, getchat, getmessages, sendmessages } from '../Controller/chat.controller.js';
import { userauth } from '../Middleware/auth.middleware.js';


const chatRoute = express.Router()

chatRoute.post('/chat/messages',userauth,sendmessages);
chatRoute.get('/chat/chats',userauth,getchat);
chatRoute.get('/chat/messages/:chatId',userauth,getmessages);
chatRoute.delete('/chat/delete/:chaId',userauth,deletchat);






export default chatRoute
