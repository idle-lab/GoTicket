import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Input, Space, message, Select } from 'antd'
import axios from 'axios'
import { PlusOutlined, OrderedListOutlined } from '@ant-design/icons'

const { Option } = Select

const TrainManagement = () => {
  const [trains, setTrains] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingTrain, setEditingTrain] = useState(null)
  const [trainType, setTrainType] = useState('G')
  const [maxCapacity, setMaxCapacity] = useState(0)
  const [seats, setSeats] = useState('')
  const [avgSpeed, setAvgSpeed] = useState(0)

  // 模拟获取 token
  const token = localStorage.getItem('token')

  // 获取所有列车
  useEffect(() => {
    axios
      .get('/train', {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.data.code === 200) {
          setTrains(response.data.data)
        }
      })
      .catch((error) => {
        console.error('Error fetching trains:', error)
      })
  }, [])

  const showModal = (train) => {
    setEditingTrain(train)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setEditingTrain(null)
  }

  const handleSave = (values) => {
    // 确保类型正确
    const updatedValues = {
      ...values,
      avg_speed: parseFloat(values.avg_speed), // 将 avg_speed 转换为浮点数
      max_capacity: parseInt(values.max_capacity), // 将 max_capacity 转换为整数
      seats: JSON.parse(values.seats), // 将 seats 字符串转换为二维数组
    }

    if (editingTrain) {
      // 编辑列车
      setTrains(
        trains.map((train) =>
          train.id === editingTrain.id ? { ...train, ...updatedValues } : train,
        ),
      )
      message.success('列车信息更新成功')
    } else {
      // 添加新列车
      axios
        .post('/admin/train', updatedValues, {
          headers: { Authorization: token },
        })
        .then(() => {
          setTrains([...trains, { id: Date.now(), ...updatedValues }])
          message.success('列车添加成功')
        })
        .catch((error) => {
          message.error('Error adding train')
        })
    }
    setIsModalVisible(false)
    setEditingTrain(null)
  }

  const handleDelete = (id) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条车次吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        // 删除对应的列车记录
        setTrains((prevTrains) => prevTrains.filter((train) => train.id !== id))
        message.success('列车删除成功')
      },
    })
  }

  const columns = [
    {
      title: '列车名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '列车类型',
      dataIndex: 'train_type',
      key: 'train_type',
    },
    {
      title: '最大容量',
      dataIndex: 'max_capacity',
      key: 'max_capacity',
      render: (maxCapacity) => <div>{maxCapacity}</div>,
    },
    {
      title: '座位布局',
      dataIndex: 'seats',
      key: 'seats',
      render: (seats) => <div>{JSON.stringify(seats)}</div>, // 座位布局以 JSON 字符串形式显示
    },
    {
      title: '平均速度 (km/h)',
      dataIndex: 'avg_speed',
      key: 'avg_speed',
      render: (avgSpeed) => <div>{avgSpeed.toFixed(2)}</div>, // 保留两位小数
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
    <div className="train-management">
      <div className="train-management-header">
        <h2>
          <OrderedListOutlined /> 列车管理
        </h2>
        <Button type="primary" onClick={() => showModal(null)}>
          <PlusOutlined /> 添加列车
        </Button>
      </div>

      <Table
        dataSource={trains}
        columns={columns}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showTotal: (total) => `共 ${total} 条数据`,
        }}
      />

      <Modal
        title={editingTrain ? '编辑列车' : '添加列车'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <Form
          initialValues={editingTrain ? { ...editingTrain } : {}}
          onFinish={handleSave}
          layout="vertical"
        >
          <Form.Item
            label="列车名"
            name="name"
            rules={[{ required: true, message: '请输入列车名' }]}
          >
            <Input placeholder="请输入列车名" />
          </Form.Item>

          <Form.Item
            label="列车类型"
            name="train_type"
            rules={[{ required: true, message: '请选择列车类型' }]}
          >
            <Select
              value={trainType}
              onChange={setTrainType}
              options={[
                { value: 'G', label: '高铁' },
                { value: 'D', label: '动车' },
                { value: 'K', label: '普通火车' },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="最大容量"
            name="max_capacity"
            rules={[{ required: true, message: '请输入最大容量' }]}
          >
            <Input
              type="number"
              value={maxCapacity}
              onChange={(e) => setMaxCapacity(e.target.value)}
              placeholder="请输入最大容量"
            />
          </Form.Item>

          <Form.Item
            label="座位布局"
            name="seats"
            rules={[{ required: true, message: '请输入座位布局' }]}
          >
            <Input.TextArea
              placeholder="请输入座位布局 (字符串形式)"
              value={seats} // 直接绑定输入值
              onChange={(e) => setSeats(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="平均速度 (km/h)"
            name="avg_speed"
            rules={[{ required: true, message: '请输入平均速度' }]}
          >
            <Input
              type="number"
              value={avgSpeed}
              onChange={(e) => setAvgSpeed(e.target.value)}
              placeholder="请输入平均速度"
            />
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

export default TrainManagement

