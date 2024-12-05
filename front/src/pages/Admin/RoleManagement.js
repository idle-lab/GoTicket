import React, { useState } from 'react'
import { Table, Button, Modal, Form, Input, Space, Select } from 'antd'

const { Option } = Select

const RoleManagement = () => {
  const [roles, setRoles] = useState([
    {
      id: 1,
      roleName: '管理员',
      description: '系统管理员',
      permissions: ['user', 'role', 'ticket'],
    },
    { id: 2, roleName: '普通用户', description: '普通用户权限', permissions: ['ticket'] },
  ])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingRole, setEditingRole] = useState(null)

  const permissionOptions = [
    { label: '用户管理', value: 'user' },
    { label: '角色管理', value: 'role' },
    { label: '票务管理', value: 'ticket' },
  ]

  const showModal = (role) => {
    setEditingRole(role)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setEditingRole(null)
  }

  const handleSave = (values) => {
    if (editingRole) {
      // 编辑角色
      setRoles(roles.map((role) => (role.id === editingRole.id ? { ...role, ...values } : role)))
    } else {
      // 添加新角色
      const newRole = { id: Date.now(), ...values }
      setRoles([...roles, newRole])
    }
    setIsModalVisible(false)
    setEditingRole(null)
  }

  const handleDelete = (id) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个角色吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        setRoles(roles.filter((role) => role.id !== id))
      },
    })
  }

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '权限',
      dataIndex: 'permissions',
      key: 'permissions',
      render: (permissions) =>
        permissions
          .map((perm) => permissionOptions.find((opt) => opt.value === perm)?.label)
          .join(', '),
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
    <div className="role-management">
      <div className="role-management-header">
        <h2>角色管理</h2>
        <Button type="primary" onClick={() => showModal(null)}>
          添加角色
        </Button>
      </div>

      <Table
        dataSource={roles}
        columns={columns}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showTotal: (total) => `共 ${total} 条数据`,
        }}
      />

      <Modal
        title={editingRole ? '编辑角色' : '添加角色'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={
            editingRole || {
              roleName: '',
              description: '',
              permissions: [],
            }
          }
          onFinish={handleSave}
          layout="vertical"
        >
          <Form.Item
            label="角色名称"
            name="roleName"
            rules={[{ required: true, message: '请输入角色名称' }]}
          >
            <Input placeholder="请输入角色名称" />
          </Form.Item>

          <Form.Item
            label="描述"
            name="description"
            rules={[{ required: true, message: '请输入角色描述' }]}
          >
            <Input.TextArea placeholder="请输入角色描述" />
          </Form.Item>

          <Form.Item
            label="权限"
            name="permissions"
            rules={[{ required: true, message: '请选择权限' }]}
          >
            <Select mode="multiple" placeholder="请选择权限" style={{ width: '100%' }}>
              {permissionOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
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

export default RoleManagement
