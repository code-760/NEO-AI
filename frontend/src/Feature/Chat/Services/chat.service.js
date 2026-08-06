import axios from "axios"

const api = axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: true,
});


export const  sendmessage=async({message ,chatId})=>{

  const response=await api.post("chat/messages",{message,chatId})

  return response

}


export const getchat=async()=>{
  const respons =await api.get("chat/chats")

  return respons

}

export const getmessages=async({chatId})=>{
  const respons = await api.get(`chat/chat/messages/:${chatId}`);

  return respons
}

export const deletechat=async(chatId)=>{
  const response=await api.delete(`chat/delete/:${chatId}`)
  return  response
}
