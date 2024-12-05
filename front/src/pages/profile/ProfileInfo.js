import React, { useState } from 'react';
import { Card, Avatar, Button, Form, Input, Radio, message, Descriptions, Modal } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import { put } from '../../utils/request';

const ProfileInfo = ({ userInfo, updateUserInfo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const initFormData = () => {
    form.setFieldsValue({
      name: userInfo.name,
      phone: userInfo.phone,
      sex: userInfo.sex,
      id_number: userInfo.id_number
    });
  };

  // 打开编辑模式
  const handleEdit = () => {
    initFormData();
    setIsEditing(true);
  };

  // 处理表单提交
  const handleSubmit = async (values) => {
    try {
      // 这里需要后端提供更新用户信息的 API
      const response = await put('/userInfo', {
        name: values.name.trim(),
        phone: values.phone.trim(),
        sex: values.sex,
        id_number: values.id_number.trim()
      });

      updateUserInfo(response.data.data);
      message.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      message.error(error.message || 'Failed to update profile');
    }
  };

  // 渲染用户信息展示卡片
  const renderUserInfo = () => (
    <Card className="profile-card">
      <div className="profile-header">
        <Avatar
          size={64}
          icon={<UserOutlined />}
          style={{
            backgroundColor: userInfo?.is_admin ? '#f56a00' : '#87d068'
          }}
        />
        <div className="profile-title">
          <h2>{userInfo?.name}</h2>
          {userInfo?.is_admin && <span className="admin-badge">Admin</span>}
        </div>
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={handleEdit}
          className="edit-button"
        >
          Edit Profile
        </Button>
      </div>

      <Descriptions column={1} className="profile-info">
        <Descriptions.Item label="Name">{userInfo?.name}</Descriptions.Item>
        <Descriptions.Item label="Phone">{userInfo?.phone}</Descriptions.Item>
        <Descriptions.Item label="Sex">{userInfo?.sex}</Descriptions.Item>
        <Descriptions.Item label="ID Number">{userInfo?.id_number}</Descriptions.Item>
        <Descriptions.Item label="Join Date">
          {new Date(userInfo?.create_date).toLocaleDateString()}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );

  // 渲染编辑表单
  const renderEditForm = () => (
    <Modal
      title="Edit Profile"
      open={isEditing}
      onCancel={() => setIsEditing(false)}
      footer={null}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="edit-form"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: 'Please input your name!' },
            { max: 20, message: 'Name cannot exceed 20 characters!' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            { required: true, message: 'Please input your phone number!' },
            { pattern: /^\d+$/, message: 'Phone number must contain only digits!' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="sex"
          label="Sex"
          rules={[{ required: true, message: 'Please select your sex!' }]}
        >
          <Radio.Group>
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="id_number"
          label="ID Number"
          rules={[
            { required: true, message: 'Please input your ID number!' },
            { 
              pattern: /^\d{15}$|^\d{17}(\d|X|x)$/, 
              message: 'Please enter a valid ID number!' 
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item className="form-buttons">
          <Button onClick={() => setIsEditing(false)} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );

  return (
    <>
      {renderUserInfo()}
      {renderEditForm()}
    </>
  );
};

export default ProfileInfo;
