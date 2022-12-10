import axios, { newInstance } from '../api'
import {
  loginError,
  loginStart,
  loginSuccess,
  logoutError,
  logoutStart,
  logoutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from '../redux/authSlice'
import { Modal } from 'antd'
import jwt_decode from 'jwt-decode'

const login = async (user, dispatch, navigate) => {
  dispatch(loginStart())
  try {
    const res = await axios.post('auth/login', user)
    dispatch(loginSuccess(res.data))
    navigate('/')
  } catch (err) {
    dispatch(loginError(err))
    console.log(err)
  }
}
const register = async (user, dispatch, navigate) => {
  dispatch(registerStart())
  try {
    await axios.post('auth/register', {
      username: user.username,
      email: user.email,
      password: user.password,
    })
    dispatch(registerSuccess())
    Modal.success({
      content: 'Register successfully ^^',
      onOk() {
        navigate('/login')
        window.location.reload()
      },
    })
  } catch (err) {
    dispatch(registerFailed())
    console.log(err)
  }
}

const logout = async (dispatch, id, navigate, accessToken, axiosJWT) => {
  dispatch(logoutStart())
  try {
    await axiosJWT.post('auth/logout', id, {
      headers: { token: `Bearer ${accessToken}` },
    })
    dispatch(loginSuccess())
    navigate('/login')
    window.location.reload()
  } catch (err) {
    dispatch(logoutError())
  }
}
const refreshToken = async () => {
  try {
    const res = await axios.post('auth/refreshToken', {
      withCredentials: true,
    })
    return res.data
  } catch (err) {
    console.log(err)
  }
}
const createAxios = (user, dispatch, stateSuccess) => {
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date()
      const decodedToken = jwt_decode(user?.accessToken)
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken()
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        }
        dispatch(stateSuccess(refreshUser))
        config.headers['token'] = 'Bearer ' + data.accessToken
      }
      return config
    },
    (err) => {
      return Promise.reject(err)
    },
  )
  return newInstance
}
const authService = {
  login,
  register,
  logout,
  createAxios,
}
export default authService
