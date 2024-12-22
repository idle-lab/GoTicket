import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Input, Space, message, Select } from 'antd'
import axios from 'axios'
import { PlusOutlined, OrderedListOutlined } from '@ant-design/icons'

const { Option } = Select

const TrainNumberManagement = () => {
  const [trainNumbers, setTrainNumbers] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingTrainNumber, setEditingTrainNumber] = useState(null)
  const [trainName, setTrainName] = useState('')
  const [routeName, setRouteName] = useState('')
  const [status, setStatus] = useState('Online')
  const [dwellTime, setDwellTime] = useState('')
  const [startTime, setStartTime] = useState('')
  const [code, setCode] = useState('')

  // 模拟获取 token
  const token = localStorage.getItem('token')

  // 获取所有车次
  useEffect(() => {
    axios
      .get('/trainNumber', {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.data.code === 200) {
          setTrainNumbers(response.data.data)
        }
      })
      .catch((error) => {
        console.error('Error fetching train numbers:', error)
      })
  }, [])

  const showModal = (trainNumber) => {
    setEditingTrainNumber(trainNumber)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setEditingTrainNumber(null)
  }

  const handleSave = (values) => {
    // 将 dwell_time_per_stop 字符串转为数组
    const dwellTimeArray = values.dwell_time_per_stop.split(',').map(Number)

    const trainData = {
      ...values,
      dwell_time_per_stop: dwellTimeArray, // 保存为数组形式
    }
    if (editingTrainNumber) {
      // 编辑车次
      setTrainNumbers(
        trainNumbers.map((trainNumber) =>
          trainNumber.id === editingTrainNumber.id ? { ...trainNumber, ...trainData } : trainNumber,
        ),
      )
    } else {
      // 添加新车次
      axios
        .post('/admin/trainNumber', trainData, {
          headers: { Authorization: token },
        })
        .then(() => {
          setTrainNumbers([...trainNumbers, { id: Date.now(), ...trainData }])
          message.success('Train number added successfully')
        })
        .catch((error) => {
          message.error('Error adding train number')
        })
    }
    setIsModalVisible(false)
    setEditingTrainNumber(null)
  }

  const handleDelete = (id) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条车次吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        setTrainNumbers(trainNumbers.filter((trainNumber) => trainNumber.id !== id))
      },
    })
  }

  const columns = [
    {
      title: '车次号',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '车次状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '车次开始时间',
      dataIndex: 'start_time',
      key: 'start_time',
    },
    {
      title: '每站停留时间',
      dataIndex: 'dwell_time_per_stop',
      key: 'dwell_time_per_stop',
      render: (dwellTime) => <div>{dwellTime.join(', ')}</div>,
    },
    {
      title: '列车名',
      dataIndex: 'train_name',
      key: 'train_name',
    },
    {
      title: '路线名',
      dataIndex: 'route_name',
      key: 'route_name',
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
    <div className="train-number-management">
      <div className="train-number-management-header">
        <h2>
          <OrderedListOutlined /> 车次管理
        </h2>
        <Button type="primary" onClick={() => showModal(null)}>
          <PlusOutlined /> 添加车次
        </Button>
      </div>

      <Table
        dataSource={trainNumbers}
        columns={columns}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showTotal: (total) => `共 ${total} 条数据`,
        }}
      />

      <Modal
        title={editingTrainNumber ? '编辑车次' : '添加车次'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <Form
          initialValues={editingTrainNumber ? { ...editingTrainNumber } : {}}
          onFinish={handleSave}
          layout="vertical"
        >
          <Form.Item
            label="车次号"
            name="code"
            rules={[{ required: true, message: '请输入车次号' }]}
          >
            <Input placeholder="请输入车次号" />
          </Form.Item>

          <Form.Item
            label="车次状态"
            name="status"
            rules={[{ required: true, message: '请选择车次状态' }]}
          >
            <Select
              value={status}
              onChange={setStatus}
              options={[
                { value: 'Online', label: '在线' },
                { value: 'Offline', label: '离线' },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="车次开始时间"
            name="start_time"
            rules={[{ required: true, message: '请输入车次开始时间' }]}
          >
            <Input placeholder="请输入车次开始时间" />
          </Form.Item>

          <Form.Item
            label="每站停留时间"
            name="dwell_time_per_stop"
            rules={[{ required: true, message: '请输入每站停留时间' }]}
          >
            <Input
              placeholder="请输入每站停留时间（以逗号分隔）"
              value={dwellTime}
              onChange={(e) => setDwellTime(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="列车名"
            name="train_name"
            rules={[{ required: true, message: '请输入列车名' }]}
          >
            <Input placeholder="请输入列车名" />
          </Form.Item>

          <Form.Item
            label="路线名"
            name="route_name"
            rules={[{ required: true, message: '请输入路线名' }]}
          >
            <Input placeholder="请输入路线名" />
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

export default TrainNumberManagement

