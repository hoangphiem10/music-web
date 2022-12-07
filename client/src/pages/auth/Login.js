import React, { useState } from 'react'
import { Typography, Button, Form, Input, Card } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthSlider from '../../components/AuthSlider'
import '../../assets/scss/auth.scss'
const { Title } = Typography

const Login = () => {
  const [form] = Form.useForm()

  return (
    <div className="login-container">
      <div className="left-container">
        <Card style={{ margin: '100px' }}>
          <Title
            style={{ textAlign: 'center', marginBottom: '30px' }}
            level={3}
          >
            Welcome to PT20's Music
          </Title>
          <Form
            form={form}
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            // onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Please input your Username!' },
              ]}
            >
              <Input
                // value={username}
                minLength={6}
                maxLength={20}
                onChange={(e) => {
                  // setUsername(e.target.value)
                }}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                minLength={6}
                // value={password}
                onChange={(e) => {
                  // setPassword(e.target.value)
                }}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <a style={{ float: 'left  ', color: '#9400D3' }} href="/register">
                Register now!
              </a>
              <a
                style={{ float: 'right', color: '#9400D3' }}
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
                  backgroundColor: '#9400D3',
                  borderRadius: '10px',
                  border: '1px solid #7DA863',
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
      <AuthSlider />
    </div>
  )
}

export default Login
