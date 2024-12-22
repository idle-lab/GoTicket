import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'
import { Layout, Menu, message } from 'antd'
import UserManagement from './UserManagement'
import TicketManagement from './TicketManagement'
import OrderManagement from './OrderManagement'
import StationManagement from './StationManagement'
import RouteManagement from './RouteManagement'
import TrainManagement from './TrainManagement'
import TrainNumberManagement from './TrainNumberManagement'

import {
  UserOutlined,
  LockOutlined,
  ScheduleOutlined,
  OrderedListOutlined,
  FileTextOutlined,
  RocketOutlined,
  CarOutlined,
} from '@ant-design/icons'
import './index.css'

const { Sider, Content } = Layout

const MENU_ITEMS = [
  {
    key: 'users',
    icon: <UserOutlined />,
    label: '用户管理',
  },
  {
    key: 'stations',
    icon: <FileTextOutlined />,
    label: '车站管理',
  },
  {
    key: 'routes',
    icon: <RocketOutlined />,
    label: '路线管理',
  },
  {
    key: 'trains',
    icon: <CarOutlined />,
    label: '列车管理',
  },
  {
    key: 'trainNumbers',
    icon: <ScheduleOutlined />,
    label: '车次管理',
  },
  {
    key: 'orders',
    icon: <OrderedListOutlined />,
    label: '订单管理',
  },
]

const Admin = () => {
  const navigate = useNavigate()
  const { userInfo } = useUser() // 获取当前的用户信息

  const [selectedKey, setSelectedKey] = useState('users')

  useEffect(() => {
    if (userInfo?.role !== 'admin') {
      //返回提示给用户
      message.error('You are not authorized to access this page')
      navigate('/')
    }
  }, [userInfo, navigate])

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key)
  }

  const renderContent = () => {
    switch (selectedKey) {
      case 'users':
        return <UserManagement />
      case 'trainNumbers':
        return <TrainNumberManagement />
      case 'orders':
        return <OrderManagement />
      case 'stations':
        return <StationManagement />
      case 'routes':
        return <RouteManagement />
      case 'trains':
        return <TrainManagement />
      default:
        return null
    }
  }

  return (
    <Layout className="admin-layout">
      <Sider width={250} className="admin-sider">
        <div className="admin-logo">管理系统</div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={MENU_ITEMS}
          onClick={handleMenuClick}
          className="admin-menu"
        />
      </Sider>
      <Content className="admin-content">{renderContent()}</Content>
    </Layout>
  )
}

export default Admin

