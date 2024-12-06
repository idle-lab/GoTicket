import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import UserManagement from './UserManagement'
import RoleManagement from './RoleManagement'
import TicketManagement from './TicketManagement'
import OrderManagement from './OrderManagement'

import {
  UserOutlined,
  LockOutlined,
  ScheduleOutlined,
  OrderedListOutlined,
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
    key: 'roles',
    icon: <LockOutlined />,
    label: '权限管理',
  },
  {
    key: 'tickets',
    icon: <ScheduleOutlined />,
    label: '车票管理',
  },
  {
    key: 'orders',
    icon: <OrderedListOutlined />,
    label: '订单管理',
  },
]

const Admin = () => {
  const [selectedKey, setSelectedKey] = useState('users')

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key)
  }

  const renderContent = () => {
    switch (selectedKey) {
      case 'users':
        return <UserManagement />
      case 'roles':
        return <RoleManagement />
      case 'tickets':
        return <TicketManagement />
      case 'orders':
        return <OrderManagement />
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

