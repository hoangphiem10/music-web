import React, { useState } from 'react'
import { Typography, Button, Form, Input, Card } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import '../../assets/scss/auth.scss'
import background from '../../assets/Images/login.jpg'
import authService from '../../services/authService'
import { useDispatch } from 'react-redux'
const { Title } = Typography

const Login = () => {
  const [form] = Form.useForm()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = (values) => {
    authService.login(values, dispatch, navigate)
  }
  return (
    <div
      className="auth-container"
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <Card style={{ margin: '100px', background: 'none' }}>
        <Title
          style={{ textAlign: 'center', marginBottom: '30px', color: 'white' }}
          none
          level={3}
        >
          Welcome to PT20's Music
        </Title>
        <Form
          form={form}
          name="normal_login"
          className="auth-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              value={username}
              minLength={6}
              maxLength={20}
              onChange={(e) => {
                setUsername(e.target.value)
              }}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              minLength={6}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <a style={{ float: 'left  ', color: 'white' }} href="/register">
              Register now!
            </a>
            <a
              style={{ float: 'right', color: 'white' }}
              className="login-form-forgot"
              href="/forgot-password"
            >
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              style={{
                width: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                borderRadius: '10px',
                border: '1px solid ',
                color: 'white',
              }}
              type=""
              htmlType="submit"
              className="login-form-button"
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
