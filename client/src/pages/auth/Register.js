import React, { useState } from 'react'
import { Typography, Button, Form, Input, Card, message, Modal } from 'antd'
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons'
import '../../assets/scss/auth.scss'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../../services/authService'
import background from '../../assets/Images/login.jpg'

const { Title } = Typography

const Register = () => {
  const [form] = Form.useForm()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setcConfirmPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = (values) => {
    authService.register(values, dispatch, navigate)
  }
  return (
    <div
      className="auth-container"
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
      }}
    >
      <Card
        className="auth-card"
        style={{ margin: '100px', background: 'none' }}
      >
        <Title
          style={{ textAlign: 'center', marginBottom: '30px', color: 'white' }}
          none
          level={3}
        >
          Welcome to PT20's Music
        </Title>
        <Form
          form={form}
          name="normal_register"
          className="auth-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              minLength={6}
              maxLength={30}
              onChange={(e) => {
                setUsername(e.target.value)
              }}
              value={username}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              value={email}
              placeholder="Enter email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              minLength={8}
              value={password}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!',
                    ),
                  )
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              onChange={(e) => {
                setcConfirmPassword(e.target.value)
              }}
              value={confirmPassword}
              placeholder="Confirm Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              style={{
                width: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',

                borderRadius: '10px',
                border: '1px solid white',
                color: 'white',
              }}
              type=""
              htmlType="submit"
              className="login-form-button"
            >
              Sign Up
            </Button>
          </Form.Item>
          <div style={{ color: 'white' }}>
            Already have an account?
            <a
              style={{ paddingLeft: '8px', color: '#DCDCDC' }}
              className="login-form-forgot"
              href="/login"
            >
              Sign In
            </a>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default Register
