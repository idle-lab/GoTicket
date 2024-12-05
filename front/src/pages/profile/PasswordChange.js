import React from 'react';
import { Form, Input, Button, message, Space } from 'antd';
import { LockOutlined } from '@ant-design/icons';

const PasswordChange = () => {
  const onFinish = async (values) => {
    const { currentPassword, newPassword, confirmPassword } = values;
    
    if (newPassword !== confirmPassword) {
      message.error('New password and confirm password do not match!');
      return;
    }

    try {
      // 假设有一个 API 函数 changePassword 用于处理密码修改
    //   await changePassword(currentPassword, newPassword);
      message.success('Password changed successfully!');
    } catch (error) {
      message.error('Failed to change password. Please try again.');
    }
  };

  return (
    <Form 
      layout="vertical" 
      onFinish={onFinish}
      style={{ maxWidth: 400, padding: '20px' }}
    >
      <Form.Item
        name="currentPassword"
        label="Current Password"
        rules={[
          { required: true, message: 'Please input your current password!' },
          { min: 6, message: 'Password must be at least 6 characters!' }
        ]}
      >
        <Input.Password 
          prefix={<LockOutlined />} 
          placeholder="Enter current password"
        />
      </Form.Item>
      <Form.Item
        name="newPassword"
        label="New Password"
        rules={[
          { required: true, message: 'Please input your new password!' },
          { min: 6, message: 'Password must be at least 6 characters!' },
        ]}
      >
        <Input.Password 
          prefix={<LockOutlined />}
          placeholder="Enter new password"
        />
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
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords do not match!'));
            },
          }),
        ]}
      >
        <Input.Password 
          prefix={<LockOutlined />}
          placeholder="Confirm new password"
        />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" size="large">
            Change Password
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default PasswordChange;