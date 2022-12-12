import React, { useState } from 'react'
import { Typography, Button, Form, Input, Card, Modal } from 'antd'
import { LockOutlined } from '@ant-design/icons'
import AuthSlider from '../../components/AuthSlider'
import { useNavigate, useParams } from 'react-router-dom'
import authService from '../../services/authService'
import jwt_decode from 'jwt-decode'
const { Text } = Typography
const Reset = () => {
  const [form] = Form.useForm()
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const { id, token } = useParams()
  const navigate = useNavigate()

  const onFinish = (value) => {
    authService.resetPassword(value.password, id, token, navigate)
  }
  return (
    <div className="login-container">
      <div className="left-container">
        <Card style={{ margin: '100px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <img
              style={{
                maxWidth: '50%',
                marginBottom: '20px',
                borderRadius: '10px',
              }}
              src="https://cpad.ask.fm/599/967/778/-159996978-1tisl61-4h3cjckc7eioagk/original/file.jpg"
              alt=""
            />
            <Text>Update your password </Text>
          </div>

          <Form
            name="reset-password"
            className="login-form"
            initialValues={{ remember: true }}
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                onChange={(e) => {
                  setNewPassword(e.target.value)
                }}
                minLength={8}
                value={newPassword}
                type="password"
                placeholder="Your new password"
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
                  setConfirmNewPassword(e.target.value)
                }}
                value={confirmNewPassword}
                placeholder="Confirm your new password"
              />
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
                className="forgot-form-button"
                // onClick={info}
              >
                Reset Password
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
      <AuthSlider />
    </div>
  )
}

export default Reset
