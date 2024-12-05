import React, { useEffect } from 'react';
import { Typography, Divider, Dropdown, Avatar, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, LogoutOutlined, ProfileOutlined } from '@ant-design/icons';
import { get } from '../../utils/request';
import { useUser } from '../../contexts/UserContext';
import './index.css';

const { Text } = Typography;

const UserSection = () => {
  const navigate = useNavigate();
  const { userInfo, updateUserInfo } = useUser();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserInfo();
    }
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await get('/userInfo');
      updateUserInfo(response.data.data);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        updateUserInfo(null);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    updateUserInfo(null);
    message.success('Logout successful');
    navigate('/');
  };

  const dropdownItems = [
    {
      key: 'profile',
      label: 'Profile',
      icon: <ProfileOutlined />,
      onClick: () => navigate('/profile')
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: handleLogout
    }
  ];

  if (userInfo) {
    return (
      <Dropdown
        menu={{ items: dropdownItems }}
        placement="bottomRight"
        arrow
      >
        <div className="user-info">
          <Avatar 
            icon={<UserOutlined />} 
            style={{ 
              backgroundColor: userInfo.is_admin ? '#f56a00' : '#87d068'
            }}
          />
          <Text strong className="username">
            {userInfo.name}
            {userInfo.is_admin && <span className="admin-badge">Admin</span>}
          </Text>
        </div>
      </Dropdown>
    );
  }

  return (
    <div className="login-register">
      <Text strong>
        <Link to="/login?tab=login">Login</Link>
      </Text>
      <Divider type="vertical" />
      <Text strong>
        <Link to="/login?tab=signup">Register</Link>
      </Text>
    </div>
  );
};

export default UserSection; 