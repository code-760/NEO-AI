
import expsse from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoute from './Routes/auth.route.js';



const app = expsse();
app.use(cookieParser());


app.use(expsse.json())


app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));


app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});


app.use('/auth', authRoute);

export default app;
