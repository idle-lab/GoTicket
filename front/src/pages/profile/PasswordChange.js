import React, { useState } from 'react'
import { Form, Input, Button, message, Space } from 'antd'
import { LockOutlined } from '@ant-design/icons'
import { put } from '../../utils/request'
import { useUser } from '../../contexts/UserContext'

const PasswordChange = () => {
  const { userInfo } = useUser() // 获取当前用户信息
  const [loading, setLoading] = useState(false) // 用于显示加载状态

  const onFinish = async (values) => {
    const { newPassword, confirmPassword } = values

    if (newPassword !== confirmPassword) {
      message.error('New password and confirm password do not match!')
      return
    }

    setLoading(true) // 启用加载状态

    try {
      const response = await put('/userInfo', {
        id: userInfo.id,
        name: userInfo.name,
        phone: userInfo.phone,
        sex: userInfo.sex,
        id_number: userInfo.id_number,
        password: newPassword,
      })

      message.success('Password changed successfully!')
      window.location.reload() // 更新成功后刷新页面
    } catch (error) {
      message.error('Failed to change password. Please try again.')
    } finally {
      setLoading(false) // 关闭加载状态
    }
  }

  return (
    <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 400, padding: '20px' }}>
      <Form.Item
        name="newPassword"
        label="New Password"
        rules={[
          { required: true, message: 'Please input your new password!' },
          { min: 6, message: 'Password must be at least 6 characters!' },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Enter new password" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        dependencies={['newPassword']}
        rules={[
          { required: true, message: 'Please confirm your new password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('The two passwords do not match!'))
            },
          }),
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Confirm new password" />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" size="large" loading={loading}>
            Change Password
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default PasswordChange

