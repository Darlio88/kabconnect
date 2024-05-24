import axios from "axios";

export const baseUrl = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL:"https://kabconnect.onrender.com"
});
