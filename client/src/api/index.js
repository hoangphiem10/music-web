import axios from 'axios'
const BASE_URL = 'https://pt20-music.onrender.com/api/'

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})
export const newInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})
