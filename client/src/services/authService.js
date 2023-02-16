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
import { message, Modal } from 'antd'
import jwt_decode from 'jwt-decode'
// import dayjs from 'dayjs'
const login = async (user, dispatch, navigate) => {
  dispatch(loginStart())
  try {
    const res = await axios.post('auth/login', user)
    dispatch(loginSuccess(res.data))
    navigate('/')
  } catch (err) {
    dispatch(loginError(err))
    console.log(err)
    if (err.response.status === 500) {
      message.error('Internal Server Error')
    }
    if (err.response.status === 401) {
      message.error('Password is wrong')
    }
    if (err.response.status === 404) {
      message.error('User not found')
    }
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
      },
    })
  } catch (err) {
    dispatch(registerFailed())
    console.log(err)
    if (err.response.status === 500) {
      message.error('Internal Server Error')
    }
    if (err.response.status === 400) {
      if (err.response.data.message === 'Failed! Email already in use!') {
        message.error('Email already exists.')
      } else {
        message.error('Username already exists.')
      }
    }
  }
}

const logout = async (dispatch, id, navigate, accessToken, axiosJWT) => {
  dispatch(logoutStart())
  try {
    await axiosJWT
      .post('auth/logout', id, {
        headers: { token: `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log(res)
        dispatch(logoutSuccess())
        navigate('/login')
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
        dispatch(logoutError())
      })
  } catch (err) {
    dispatch(logoutError())
  }
}
const refreshToken = async (navigate) => {
  try {
    const res = await axios.post('auth/refreshToken', {
      withCredentials: true,
    })
    return res.data
  } catch (err) {
    console.log(err)
  }
}

let myInterceptor = null

const createAxios = (user, dispatch, stateSuccess, navigate) => {
  // console.log(newInstance.interceptors)
  const getUser = () => user
  if (myInterceptor) return newInstance
  myInterceptor = newInstance.interceptors.request.use(
    async (config) => {
      // newInstance.interceptors.request.eject(interceptor)
      // console.log({ user })
      let date = new Date()
      const user = getUser()
      const decoded = jwt_decode(user?.accessToken)

      console.log(decoded)

      // console.log(decoded.exp, '^^', date.getTime() / 1000)
      if (decoded.exp < date.getTime() / 1000) {
        const data = await refreshToken(navigate)

        const refreshUser = {
          ...user,
          accessToken: data?.accessToken,
        }
        dispatch(loginSuccess(refreshUser))

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

const forgotPassword = async (value, navigate) => {
  console.log(value)
  await axios
    .post('auth/forgot-password', {
      email: value.email,
    })
    .then((res) => {
      Modal.success({
        title:
          'Your Password code has been sent to your email,and it will expire in 2 miunites after you receive it',
        onOk() {
          navigate('/login')
        },
      })
    })
    .catch((err) => {
      Modal.error({
        title: 'This account does not exist ',
        onOk() {},
      })
      console.log(err)
    })
}
const resetPassword = async (password, id, token, navigate) => {
  try {
    const res = await axios.post(`auth/reset-password/${id}/${token}`, {
      password: password,
    })
    Modal.success({
      title: 'Updated password successfully',
      onOk() {
        navigate('/login')
        return res
      },
    })
  } catch (err) {
    Modal.error({
      title: 'Your password code has expired!Send email request again ^^ ',
      onOk() {
        navigate('/forgot-password')
      },
    })
    console.log(err)
  }
}
const authService = {
  login,
  register,
  logout,
  createAxios,
  forgotPassword,
  resetPassword,
}
export default authService
