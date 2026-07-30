import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: true,
});


export const register=(username,email,password)=>{
  const respons = api.post('auth/registration',{username,email,password});

  return respons.data
}
export const login=(username,password)=>{
  const respons = api.post('auth/login',{username,password});

  return respons.data
}
export const getme=()=>{
  const respons = api.get('auth/get-me');

  return respons.data
}
