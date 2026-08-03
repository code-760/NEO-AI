import express from 'express';
import { sendmessages } from '../Controller/chat.controller.js';
import { userauth } from '../Middleware/auth.middleware.js';


const chatRoute = express.Router()

chatRoute.post('/chat/messages',userauth,sendmessages);






export default chatRoute
