import React, { useState } from 'react'
import { Button, Card, Col, Form, Input, Modal, Row, Typography } from 'antd'
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
    await axios
      .post('contact/createContact', {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        message: values.message,
      })
      .then((res) => {
        console.log(res)
        Modal.success({
          title: "Your message has been sent to Phu Ty's email",
          onOk() {
            form.resetFields()
          },
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className="body">
      <div className="navbar-Container" style={{ padding: '2em' }}>
        <div></div>
        <Logout />
      </div>
      <div className="body__contents contact-form ">
        <Card
          style={{
            margin: '20px 10em ',
            backgroundColor: 'rgba(243 ,244,246,0.8)',
          }}
        >
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
            // style={{padding:'20px'}}
          >
            <Form.Item name="username">
              <Row>
                <Col sm={{ span: 12 }} xs={24}>
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
                      minLength={1}
                      maxLength={20}
                      onChange={(e) => {
                        setFirstName(e.target.value)
                      }}
                      placeholder="First Name"
                    />
                  </Form.Item>
                </Col>
                <Col sm={{ offset: 1, span: 11 }} xs={24}>
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
                      minLength={1}
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
              lg={{ span: 24 }}
              name="email"
              style={{ marginTop: '-2em' }}
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
              wrapperCol={{ span: 24 }}
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
            <Form.Item xs={{ offset: 0 }}>
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
