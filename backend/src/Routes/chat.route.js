import express from 'express';
import { sendmessages } from '../Controller/chat.controller.js';


const chatRoute = express.Router()

chatRoute.post('/chat/messages',sendmessages);






export default chatRoute
