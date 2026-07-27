
import expsse from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';


import authRoute from './Routes/auth.route.js';



const app = expsse();
app.use(cookieParser());

app.use(expsse.json())


app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});


app.use('/auth', authRoute);

export default app;
