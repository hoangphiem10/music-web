import React from 'react'
import { Typography, Button, Form, Input, Card, Modal } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import authService from '../../services/authService'
import background from '../../assets/Images/login.jpg'
import '../../assets/scss/auth.scss'

const { Text } = Typography
const { Title } = Typography

const Forgot = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const onFinish = (value) => {
    authService.forgotPassword(value, navigate)
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
      <Card style={{ margin: '100px', background: 'none' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <Title
            style={{
              textAlign: 'center',
              color: 'white',
            }}
            none
            level={4}
          >
            Please enter your email address.{' '}
          </Title>
          <Text
            style={{
              color: 'white  ',
            }}
          >
            You will receive a link to create a new password via email
          </Text>
        </div>

        <Form
          name="reset-password"
          className="login-form"
          initialValues={{ remember: true }}
          form={form}
          onFinish={onFinish}
        >
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
              placeholder="Enter email"
            />
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
              className="forgot-form-button"
              // onClick={info}
            >
              Reset Password
            </Button>
          </Form.Item>
          <p style={{ textAlign: 'center' }}>
            <a href="/login" style={{ color: 'white' }}>
              Cancel
            </a>
          </p>
        </Form>
      </Card>
    </div>
  )
}

export default Forgot
