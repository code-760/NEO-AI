import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/",
  withCredentials: true,
});



export const register = async ({ username, email, password }) => {
  const response = await api.post("/auth/registration", {
    username,
    email,
    password,
  });

  return response;
};

export const login = ({ email, password }) => {
  const respons = api.post("/auth/login", { email, password });

  return respons;
};

export const getme = () => {
  const respons = api.get("auth/get-me");

  return respons;
};

export const logout= async()=>{
  const response = await api.post('auth/logout');

  return response
}

