import React, { useState } from 'react'
import { Table, Button, Modal, Tag, Space } from 'antd'
import moment from 'moment'

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: 'ORD202403200001',
      username: '张三',
      trainNumber: 'G101',
      startStation: '北京南',
      endStation: '上海虹桥',
      departureTime: '2024-03-20 08:00:00',
      price: 553.5,
      status: 'paid',
      createTime: '2024-03-19 14:30:00',
    },
    {
      id: 2,
      orderNumber: 'ORD202403200002',
      username: '李四',
      trainNumber: 'D301',
      startStation: '广州南',
      endStation: '深圳北',
      departureTime: '2024-03-20 09:30:00',
      price: 82.5,
      status: 'unpaid',
      createTime: '2024-03-19 15:20:00',
    },
  ])

  const handleDelete = (id) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个订单吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        setOrders(orders.filter((order) => order.id !== id))
      },
    })
  }

  const handleCancel = (id) => {
    Modal.confirm({
      title: '确认取消',
      content: '确定要取消这个订单吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        setOrders(
          orders.map((order) =>
            order.id === id ? { ...order, status: 'cancelled' } : order
          )
        )
      },
    })
  }

  const columns = [
    {
      title: '订单号',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
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
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '票价',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `¥${price.toFixed(2)}`,
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusMap = {
          unpaid: { color: 'warning', text: '待支付' },
          paid: { color: 'success', text: '已支付' },
          cancelled: { color: 'default', text: '已取消' },
          refunded: { color: 'error', text: '已退票' },
        }
        const { color, text } = statusMap[status] || { color: 'default', text: status }
        return <Tag color={color}>{text}</Tag>
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {record.status === 'unpaid' && (
            <Button type="primary" onClick={() => handleCancel(record.id)}>
              取消订单
            </Button>
          )}
          <Button type="primary" danger onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div className="order-management">
      <div className="order-management-header">
        <h2>订单管理</h2>
      </div>

      <Table
        dataSource={orders}
        columns={columns}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showTotal: (total) => `共 ${total} 条数据`,
        }}
      />
    </div>
  )
}

export default OrderManagement 