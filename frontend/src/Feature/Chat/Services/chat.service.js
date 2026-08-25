import axios from "axios"

const api = axios.create({
  baseURL: 'https://neo-ai-terv.onrender.com/',
  withCredentials: true,
});


export const  sendmessage=async({message ,chatId})=>{

  const response = await api.post('chats/messages', { message, chatId });

  return response

}


export const getchat=async()=>{
  const respons =await api.get("chats/user/chats")

  return respons

}

export const getmessages=async(chatId)=>{


  const respons = await api.get(`chats/messages/${chatId}`);



  return respons
}

export const searchchat=async(search)=>{

  const respons =await api.get(`chats/search?search=${search}`)

 
  return respons
}

export const deletechat=async(chatId)=>{
  const response=await api.delete(`chats/delete/${chatId}`)
  return  response
}


