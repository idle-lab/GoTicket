import React, { useState } from 'react'
import { Table, Button, Modal, Form, Input, Space, DatePicker, InputNumber, Select } from 'antd'
import moment from 'moment'

const { Option } = Select

const TicketManagement = () => {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      trainNumber: 'G101',
      startStation: '北京南',
      endStation: '上海虹桥',
      departureTime: '2024-03-20 08:00:00',
      arrivalTime: '2024-03-20 13:00:00',
      duration: '5小时',
      price: 553.5,
      remainingSeats: 120,
      status: 'available',
    },
    {
      id: 2,
      trainNumber: 'D301',
      startStation: '广州南',
      endStation: '深圳北',
      departureTime: '2024-03-20 09:30:00',
      arrivalTime: '2024-03-20 10:30:00',
      duration: '1小时',
      price: 82.5,
      remainingSeats: 200,
      status: 'available',
    },
  ])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingTicket, setEditingTicket] = useState(null)

  const statusOptions = [
    { label: '可售', value: 'available' },
    { label: '已售罄', value: 'sold_out' },
    { label: '��售', value: 'suspended' },
  ]

  const showModal = (ticket) => {
    setEditingTicket(ticket)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setEditingTicket(null)
  }

  const handleSave = (values) => {
    const formattedValues = {
      ...values,
      departureTime: values.departureTime.format('YYYY-MM-DD HH:mm:ss'),
      arrivalTime: values.arrivalTime.format('YYYY-MM-DD HH:mm:ss'),
    }

    if (editingTicket) {
      setTickets(
        tickets.map((ticket) =>
          ticket.id === editingTicket.id ? { ...ticket, ...formattedValues } : ticket,
        ),
      )
    } else {
      const newTicket = {
        id: Date.now(),
        ...formattedValues,
      }
      setTickets([...tickets, newTicket])
    }
    setIsModalVisible(false)
    setEditingTicket(null)
  }

  const handleDelete = (id) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个车票信息吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        setTickets(tickets.filter((ticket) => ticket.id !== id))
      },
    })
  }

  const columns = [
    {
      title: '车次',
      dataIndex: 'trainNumber',
      key: 'trainNumber',
    },
    {
      title: '出发站',
      dataIndex: 'startStation',
      key: 'startStation',
    },
    {
      title: '到达站',
      dataIndex: 'endStation',
      key: 'endStation',
    },
    {
      title: '出发时间',
      dataIndex: 'departureTime',
      key: 'departureTime',
    },
    {
      title: '到达时间',
      dataIndex: 'arrivalTime',
      key: 'arrivalTime',
    },
    {
      title: '历时',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: '票价',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `¥${price.toFixed(2)}`,
    },
    {
      title: '剩余座位',
      dataIndex: 'remainingSeats',
      key: 'remainingSeats',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusMap = {
          available: '可售',
          sold_out: '已售罄',
          suspended: '停售',
        }
        return statusMap[status] || status
      },
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
    <div className="ticket-management">
      <div className="ticket-management-header">
        <h2>车票管理</h2>
        <Button type="primary" onClick={() => showModal(null)}>
          添加车票
        </Button>
      </div>

      <Table
        dataSource={tickets}
        columns={columns}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showTotal: (total) => `共 ${total} 条数据`,
        }}
      />

      <Modal
        title={editingTicket ? '编辑车票' : '添加车票'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Form
          initialValues={
            editingTicket
              ? {
                  ...editingTicket,
                  departureTime: moment(editingTicket.departureTime),
                  arrivalTime: moment(editingTicket.arrivalTime),
                }
              : {
                  status: 'available',
                }
          }
          onFinish={handleSave}
          layout="vertical"
        >
          <Form.Item
            label="车次"
            name="trainNumber"
            rules={[{ required: true, message: '请输入车次' }]}
          >
            <Input placeholder="请输入车次" />
          </Form.Item>

          <Space size="large" style={{ display: 'flex' }}>
            <Form.Item
              label="出发站"
              name="startStation"
              rules={[{ required: true, message: '请输入出发站' }]}
            >
              <Input placeholder="请输入出发站" />
            </Form.Item>

            <Form.Item
              label="到达站"
              name="endStation"
              rules={[{ required: true, message: '请输入到达站' }]}
            >
              <Input placeholder="请输入到达站" />
            </Form.Item>
          </Space>

          <Space size="large" style={{ display: 'flex' }}>
            <Form.Item
              label="出发时间"
              name="departureTime"
              rules={[{ required: true, message: '请选择出发时间' }]}
            >
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>

            <Form.Item
              label="到达时间"
              name="arrivalTime"
              rules={[{ required: true, message: '请选择到达时间' }]}
            >
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
          </Space>

          <Space size="large" style={{ display: 'flex' }}>
            <Form.Item
              label="历时"
              name="duration"
              rules={[{ required: true, message: '请输入历时' }]}
            >
              <Input placeholder="请输入历时" />
            </Form.Item>

            <Form.Item
              label="票价"
              name="price"
              rules={[{ required: true, message: '请输入票价' }]}
            >
              <InputNumber min={0} step={0.1} precision={2} prefix="¥" style={{ width: '100%' }} />
            </Form.Item>
          </Space>

          <Space size="large" style={{ display: 'flex' }}>
            <Form.Item
              label="剩余座位"
              name="remainingSeats"
              rules={[{ required: true, message: '请输入剩余座位数' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label="状态"
              name="status"
              rules={[{ required: true, message: '请选择状态' }]}
            >
              <Select style={{ width: '200px' }}>
                {statusOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Space>

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

export default TicketManagement
