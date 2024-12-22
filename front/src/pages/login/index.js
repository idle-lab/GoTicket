import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Tabs, Radio, message } from 'antd'
import { CSSTransition } from 'react-transition-group'
import { CloseOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { get, post } from '../../utils/request'
import { useSearchParams } from 'react-router-dom'
import './index.css'
import { useUser } from '../../contexts/UserContext'

const Login = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'login')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { updateUserInfo } = useUser()
  const [coolDown, setcoolDown] = useState(0)

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab === 'login' || tab === 'signup') {
      setActiveTab(tab)
    }
  }, [searchParams])

  useEffect(() => {
    let timer
    if (coolDown > 0) {
      timer = setInterval(() => {
        setcoolDown((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [coolDown])

  const handleClose = () => {
    navigate('/')
  }

  const handleTabChange = (key) => {
    setActiveTab(key)
    setSearchParams({ tab: key })
  }

  const renderSignupForm = () => (
    <>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input placeholder="Enter your name" size="large" />
      </Form.Item>

      <Form.Item
        label="Phone"
        name="phone"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input placeholder="Enter your phone number" size="large" />
      </Form.Item>

      <Form.Item
        label="ID Number"
        name="id_number"
        rules={[{ required: true, message: 'Please input your ID number!' }]}
      >
        <Input placeholder="Enter your ID number" size="large" />
      </Form.Item>

      <Form.Item
        label="Sex"
        name="sex"
        rules={[{ required: true, message: 'Please select your sex!' }]}
      >
        <Radio.Group>
          <Radio value="Male">Male</Radio>
          <Radio value="Female">Female</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please enter your password!' }]}
      >
        <Input.Password placeholder="Enter your password" size="large" />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('Passwords do not match!'))
            },
          }),
        ]}
      >
        <Input.Password placeholder="Confirm your password" size="large" />
      </Form.Item>
    </>
  )

  const renderLoginForm = () => (
    <>
      <Form.Item
        label="Phone"
        name="phone"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input placeholder="Enter your phone number" size="large" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please enter your password!' }]}
      >
        <Input.Password placeholder="Enter your password" size="large" />
      </Form.Item>
    </>
  )

  const handleLogin = async (values) => {
    if (loading || coolDown > 0) return
    setLoading(true)
    try {
      let response

      if (activeTab === 'login') {
        response = await get('/token', {
          phone: values.phone.trim(),
          password: values.password,
        })
      } else {
        const data = {
          name: values.name.trim(),
          sex: values.sex,
          password: values.password,
          phone: values.phone,
          id_number: values.id_number,
        }

        response = await post('/user', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      }

      const token = response.headers.authorization
      if (!token) {
        throw new Error(activeTab === 'login' ? '手机号或密码错误！' : '注册失败！')
      }

      localStorage.setItem('token', token)

      const userResponse = await get('/userInfo')
      updateUserInfo(userResponse.data.data)

      message.success(activeTab === 'login' ? '登录成功' : '注册成功')
      navigate('/')
    } catch (error) {
      console.error('Error:', error)
      message.error(error.message || '操作失败，请稍后重试')
      setcoolDown(5)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <CloseOutlined
        className="close-icon"
        onClick={handleClose}
        style={{
          position: 'absolute',
          top: '10%',
          right: '15%',
          fontSize: '24px',
          cursor: 'pointer',
          color: '#2e2e2e',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid #2e2e2e',
          borderRadius: '50%',
        }}
      />

      <h1 className="login-title">Welcome to GoTicket</h1>

      <Tabs activeKey={activeTab} onChange={handleTabChange} centered className="login-tabs">
        <Tabs.TabPane tab="LOG IN" key="login" className="login-tab-btn" />
        <Tabs.TabPane tab="SIGN UP" key="signup" className="login-tab-btn" />
      </Tabs>

      <CSSTransition
        in={activeTab === 'login' || activeTab === 'signup'}
        timeout={300}
        classNames="form-transition"
        unmountOnExit
      >
        <Form
          name={activeTab === 'login' ? 'loginForm' : 'signupForm'}
          onFinish={handleLogin}
          layout="vertical"
          requiredMark={false}
          className="login-form"
        >
          {activeTab === 'signup' ? renderSignupForm() : renderLoginForm()}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className="login-btn"
              loading={loading}
              disabled={loading || coolDown > 0}
            >
              {loading
                ? activeTab === 'login'
                  ? '登录中...'
                  : '注册中...'
                : coolDown > 0
                ? `请等待 ${coolDown} 秒`
                : activeTab === 'login'
                ? 'LOGIN'
                : 'SIGN UP'}
            </Button>
          </Form.Item>
        </Form>
      </CSSTransition>
    </div>
  )
}

export default Login

