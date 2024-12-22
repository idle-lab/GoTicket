import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Input, Space, message } from 'antd'
import axios from 'axios'

const StationManagement = () => {
  const [stations, setStations] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingStation, setEditingStation] = useState(null)

  // 模拟获取 token
  const token = localStorage.getItem('token')

  useEffect(() => {
    // 获取车站列表
    axios
      .get('/station', {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.data.code === 200) {
          setStations(response.data.data)
        }
      })
      .catch((error) => {
        console.error('Error fetching stations:', error)
      })
  }, [])

  const showModal = (station) => {
    setEditingStation(station)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setEditingStation(null)
  }

  const handleSave = (values) => {
    if (editingStation) {
      // 编辑车站

      setStations(
        stations.map((station) =>
          station.id === editingStation.id ? { ...station, ...values } : station,
        ),
      )
      message.success('Station updated successfully')
    } else {
      // 添加新车站
      axios
        .post('/station', values, {
          headers: { Authorization: token },
        })
        .then(() => {
          setStations([...stations, { id: Date.now(), ...values }])
          message.success('Station added successfully')
        })
        .catch((error) => {
          message.error('Error adding station')
        })
    }
    setIsModalVisible(false)
    setEditingStation(null)
  }

  const handleDelete = (id) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个车站吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        setStations(stations.filter((station) => station.id !== id))
        message.success('Station deleted successfully')
      },
    })
  }

  const columns = [
    {
      title: '车站名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '车站所在城市',
      dataIndex: 'postion',
      key: 'postion',
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
    <div className="station-management">
      <div className="station-management-header">
        <h2>车站管理</h2>
        <Button type="primary" onClick={() => showModal(null)}>
          添加车站
        </Button>
      </div>

      <Table
        dataSource={stations}
        columns={columns}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showTotal: (total) => `共 ${total} 条数据`,
        }}
      />

      <Modal
        title={editingStation ? '编辑车站' : '添加车站'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <Form
          initialValues={editingStation ? { ...editingStation } : {}}
          onFinish={handleSave}
          layout="vertical"
        >
          <Form.Item
            label="车站名称"
            name="name"
            rules={[{ required: true, message: '请输入车站名称' }]}
          >
            <Input placeholder="请输入车站名称" />
          </Form.Item>

          <Form.Item
            label="车站所在城市"
            name="postion"
            rules={[{ required: true, message: '请输入车站所在城市' }]}
          >
            <Input placeholder="请输入车站所在城市" />
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

export default StationManagement

