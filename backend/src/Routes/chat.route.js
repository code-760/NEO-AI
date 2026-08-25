import express from 'express';
import { deletchat, getchat, getmessages, searchchat, sendmessages } from '../Controller/chat.controller.js';
import { userauth } from '../Middleware/auth.middleware.js';


const chatRoute = express.Router()

chatRoute.post('/messages',userauth,sendmessages);
chatRoute.get('/user/chats',userauth,getchat);
chatRoute.get('/messages/:chatId',userauth,getmessages);
chatRoute.get('/search',userauth, searchchat);
chatRoute.delete('/delete/:chatId',userauth,deletchat);






export default chatRoute
