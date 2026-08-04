import { Server } from "socket.io";



let io;


export const initsocket =(httpserver)=>{
  io=new Server(httpserver,{
    cors:{
      origin:"http://localhost:5173",
      credentials:true
    }
  })

  console.log("socket.io initialized")


  io.on("connection",(socket)=>{
    console.log("a user connected",socket.id)
  })
}


export const getsocket=()=>{
  if(!io){
    throw new Error("socket.io not initialized")
  }
  return io;
}
