import React, { useState } from 'react'
import { Form, Input, Button, Tabs } from 'antd'
import { CSSTransition } from 'react-transition-group'
import './index.css'

const Login = () => {
  const [activeTab, setActiveTab] = useState('login')

  // 表单提交事件
  const onFinish = (values) => {
    console.log(`${activeTab.toUpperCase()} Form Values:`, values)
  }

  return (
    <div className="login-container">
      {/* 标题 */}
      <h1 className="login-title">Welcome to GoTicket</h1>

      {/* 登录/注册切换选项 */}
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        centered
        className="login-tabs"
      >
        <Tabs.TabPane tab="LOG IN" key="login" />
        <Tabs.TabPane tab="SIGN UP" key="signup" />
      </Tabs>

      {/* 动态表单 */}
      <CSSTransition
        in={activeTab === 'login' || activeTab === 'signup'}
        timeout={300}
        classNames="form-transition"
        unmountOnExit
      >
        <Form
          name={activeTab === 'login' ? 'loginForm' : 'signupForm'}
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
          className="login-form"
        >
          {activeTab === 'signup' ? (
            // 注册表单
            <>
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input placeholder="Enter your username" size="large" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
              >
                <Input placeholder="Enter your email" size="large" />
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
          ) : (
            // 登录表单
            <>
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input placeholder="Enter your username" size="large" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please enter your password!' }]}
              >
                <Input.Password placeholder="Enter your password" size="large" />
              </Form.Item>
            </>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large" className="login-btn">
              {activeTab === 'login' ? 'LOGIN' : 'SIGN UP'}
            </Button>
          </Form.Item>
        </Form>
      </CSSTransition>
    </div>
  )
}

export default Login
