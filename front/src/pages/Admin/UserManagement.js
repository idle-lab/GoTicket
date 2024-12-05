import React, { useState } from 'react'
import { Table, Button, Modal, Form, Input, Space } from 'antd'

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: '张三', phone: '13800138000', sex: '男', idNumber: '110101199001011234' },
    { id: 2, name: '李四', phone: '13900139000', sex: '女', idNumber: '110101199001011235' },
  ])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingUser, setEditingUser] = useState(null)

  const showModal = (user) => {
    setEditingUser(user)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setEditingUser(null)
  }

  const handleSave = (values) => {
    if (editingUser) {
      // 编辑用户
      setUsers(users.map((user) => (user.id === editingUser.id ? { ...user, ...values } : user)))
    } else {
      // 添加新用户
      const newUser = { id: Date.now(), ...values }
      setUsers([...users, newUser])
    }
    setIsModalVisible(false)
    setEditingUser(null)
  }

  const handleDelete = (id) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个用户吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        setUsers(users.filter((user) => user.id !== id))
      },
    })
  }

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    },
    {
      title: '身份证号',
      dataIndex: 'idNumber',
      key: 'idNumber',
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: '创建日期',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showModal(record)}>
            编辑
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div className="user-management">
      <div className="user-management-header">
        <h2>用户管理</h2>
        <Button type="primary" onClick={() => showModal(null)}>
          添加用户
        </Button>
      </div>

      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showTotal: (total) => `共 ${total} 条数据`,
        }}
      />

      <Modal
        title={editingUser ? '编辑用户' : '添加用户'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={
            editingUser || {
              name: '',
              phone: '',
              sex: '',
              idNumber: '',
              password: '',
              createTime: '',
            }
          }
          onFinish={handleSave}
          layout="vertical"
        >
          <Form.Item label="姓名" name="name" rules={[{ required: true, message: '请输入姓名' }]}>
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            label="手机号"
            name="phone"
            rules={[{ required: true, message: '请输入手机号' }]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item label="性别" name="sex" rules={[{ required: true, message: '请输入性别' }]}>
            <Input placeholder="请输入性别" />
          </Form.Item>
          <Form.Item
            label="身份证号"
            name="idNumber"
            rules={[{ required: true, message: '请输入身份证号' }]}
          >
            <Input placeholder="请输入身份证号" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item
            label="创建日期"
            name="createTime"
            rules={[{ required: true, message: '请输入创建日期' }]}
          >
            <Input placeholder="请输入创建日期" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button onClick={handleCancel}>取消</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default UserManagement

