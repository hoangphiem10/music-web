import axios from 'axios'
// const BASE_URL = 'http://localhost:8080/api/'
const BASE_URL = 'https://pt20s-music.onrender.com/api/'

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})
export const newInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})
