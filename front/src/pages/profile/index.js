import React, { useState } from 'react';
import { Card, Avatar, Button, Form, Input, Radio, message, Descriptions, Modal, Menu, Layout } from 'antd';
import { 
  UserOutlined, 
  EditOutlined, 
  KeyOutlined, 
  HistoryOutlined,
  SettingOutlined 
} from '@ant-design/icons';
import { useUser } from '../../contexts/UserContext';
import { put } from '../../utils/request';
import './index.css';
import ProfileInfo from './ProfileInfo';
import PasswordChange from './PasswordChange';
import OrderHistory from './OrderHistory';
import Helps from './Helps';
import { useLocation, useNavigate } from 'react-router-dom';

const { Sider, Content } = Layout;

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo, updateUserInfo } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  // 从 URL 参数中获取选中的 key，如果没有则默认为 'profile'
  const getDefaultSelectedKey = () => {
    const params = new URLSearchParams(location.search);
    return params.get('tab') || 'profile';
  };

  const [selectedKey, setSelectedKey] = useState(getDefaultSelectedKey());

  // 处理菜单点击，更新 URL 参数
  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
    navigate(`/profile?tab=${key}`);
  };

  // 导航菜单项
  const menuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Personal Info'
    },
    {
      key: 'password',
      icon: <KeyOutlined />,
      label: 'Change Password'
    },
    {
      key: 'orders',
      icon: <HistoryOutlined />,
      label: 'Order History'
    },
    {
      key: 'helps',
      icon: <SettingOutlined />,
      label: 'Helps'
    }
    ];
    
 

  // 渲染内容区
  const renderContent = () => {
    switch (selectedKey) {
      case 'profile':
        return <ProfileInfo userInfo={userInfo} updateUserInfo={updateUserInfo} />;
      case 'password':
        return <PasswordChange />;
      case 'orders':
        return <OrderHistory />;
      case 'helps':
        return <Helps />;
      default:
        return null;
    }
  };

  return (
    <Layout className="profile-layout">
      <Sider width={250} className="profile-sider">
        <div className="user-info-brief">
          <Avatar
            size={64}
            icon={<UserOutlined />}
            style={{
              backgroundColor: userInfo?.is_admin ? '#f56a00' : '#87d068'
            }}
          />
          <div className="user-name">
            <h3>{userInfo?.name}</h3>
            {userInfo?.is_admin && <span className="admin-badge">Admin</span>}
          </div>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={handleMenuClick}
          className="profile-menu"
        />
      </Sider>
      <Content className="profile-content">
        {renderContent()}
      </Content>
    </Layout>
  );
};

export default Profile; 