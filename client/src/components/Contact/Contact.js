import React, { useState } from 'react'
import { Button, Card, Col, Form, Input, Row, Typography } from 'antd'
import '../../assets/scss/layout.scss'
import Navbar from '../Layout/Navbar'
import Logout from '../Logout'
import axios from '../../api'
const Contact = () => {
  const { TextArea } = Input
  const { Title } = Typography
  const [form] = Form.useForm()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const onFinish = async (values) => {
    // await axios.post()
  }
  return (
    <div className="body">
      <div className="navbar-Container">
        <div></div>
        <Logout />
      </div>
      <div className="body__contents">
        <Card style={{ margin: '20px 200px ' }}>
          <Title
            style={{
              textAlign: 'center',
              marginBottom: '20px',
              color: '#1890ff',
            }}
            level={3}
          >
            Contact Me
          </Title>
          <Form
            form={form}
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item name="username">
              <Row>
                <Col sm={{ offset: 1, span: 10 }}>
                  <Form.Item
                    name="firstname"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your firstname!',
                      },
                    ]}
                  >
                    <Input
                      value={firstName}
                      minLength={6}
                      maxLength={20}
                      onChange={(e) => {
                        setFirstName(e.target.value)
                      }}
                      placeholder="First Name"
                    />
                  </Form.Item>
                </Col>
                <Col sm={{ offset: 1, span: 10 }}>
                  <Form.Item
                    name="lastname"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your lastname!',
                      },
                    ]}
                  >
                    <Input
                      minLength={6}
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value)
                      }}
                      placeholder="LastName"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item
              rules={[{ required: true, message: 'Please input your email!' }]}
              wrapperCol={{ offset: 1, span: 21 }}
              name="email"
            >
              <Input
                minLength={6}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                value={email}
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item
              rules={[
                { required: true, message: 'Please input your message!' },
              ]}
              wrapperCol={{ offset: 1, span: 21 }}
              name="message"
            >
              <TextArea
                rows={4}
                placeholder="Message"
                onChange={(e) => {
                  setMessage(e.target.value)
                }}
                value={message}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 9, span: 5 }}>
              <Button
                style={{
                  width: '100%',
                  backgroundColor: '#1890ff',
                  borderRadius: '10px',
                  border: '1px solid #1890ff',
                  color: 'white',
                }}
                type=""
                htmlType="submit"
                className="login-form-button"
              >
                Submit now
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default Contact
