import mongoose from "mongoose";
import "dotenv/config"
 

const MONGO = process.env.MONGU_URI;

export const consctdb=()=>{
  mongoose.connect(MONGO).then(() => {
    console.log('db conact');
  });
}



