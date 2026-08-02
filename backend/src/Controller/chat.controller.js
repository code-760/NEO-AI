import { MISTRALAL } from "../Services/AI.service.js"

export const sendmessages=(req,res)=>{
  const { messages }=req.body


  MISTRALAL(messages);
}
