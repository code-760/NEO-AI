
import expsse from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from "path"
import authRoute from './Routes/auth.route.js';
import chatRoute from './Routes/chat.route.js';
import { fileURLToPath } from 'url';



const app = expsse();
app.use(cookieParser());


app.use(expsse.json())


app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(expsse.static("./public"))


app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use('/auth', authRoute);
app.use('/chats', chatRoute);

console.log(__dirname)
app.use("*name",(req,res)=>{
  res.sendFile(path.join(__dirname,"..","/public/index.html"));

})


export default app;
