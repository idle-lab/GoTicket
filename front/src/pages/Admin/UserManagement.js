import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Input, Space, message } from 'antd'
import axios from 'axios'

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [token, setToken] = useState('')

  // 获取 token 并加载用户数据
  useEffect(() => {
    const token = localStorage.getItem('token')
    setToken(token)

    if (token) {
      axios
        .get('/admin/userInfo', {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          if (response.data.code === 200) {
            setUsers(response.data.data) // 假设返回的用户数据在 data 字段中
          }
        })
        .catch((error) => {
          console.error('Error fetching users:', error)
          message.error('获取用户数据失败')
        })
    }
  }, [])

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
      const newUser = {
        name: values.name,
        sex: values.sex,
        password: values.password,
        phone: values.phone,
        id_number: values.idNumber,
      }

      axios
        .post('/user', newUser)
        .then((response) => {
          if (response.data.code === 200) {
            const newUserWithToken = { ...newUser, id: Date.now() }
            setUsers([...users, newUserWithToken])
            message.success('用户添加成功')
            console.log('User added:', newUserWithToken)
          } else {
            message.error('用户添加失败')
          }
        })
        .catch((error) => {
          console.error('Error adding user:', error)
          message.error('添加用户失败')
        })
    }

    setIsModalVisible(false) // Hide modal
    setEditingUser(null) // Reset editing user
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
      dataIndex: 'id_number',
      key: 'idNumber',
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
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

