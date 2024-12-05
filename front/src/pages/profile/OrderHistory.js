import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, message } from 'antd';
// import { getOrderHistory } from '../../api/order'; // 假设有这个API方法

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const response = await getOrderHistory();
//       setOrders(response.data);
//     } catch (error) {
//       message.error('获取订单记录失败');
//     } finally {
//       setLoading(false);
//     }
//   };

  const columns = [
    {
      title: '订单号',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
    },
    {
      title: '出发站',
      dataIndex: 'departureStation',
      key: 'departureStation',
    },
    {
      title: '到达站',
      dataIndex: 'arrivalStation',
      key: 'arrivalStation',
    },
    {
      title: '出发时间',
      dataIndex: 'departureTime',
      key: 'departureTime',
    },
    {
      title: '车次',
      dataIndex: 'trainNumber',
      key: 'trainNumber',
    },
    {
      title: '座位类型',
      dataIndex: 'seatType',
      key: 'seatType',
    },
    {
      title: '座位号',
      dataIndex: 'seatNumber',
      key: 'seatNumber',
    },
    {
      title: '票价',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `¥${price}`,
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'green';
        let text = '已完成';
        
        switch(status) {
          case 'PENDING':
            color = 'gold';
            text = '待支付';
            break;
          case 'CANCELLED':
            color = 'red';
            text = '已取消';
            break;
          case 'REFUNDED':
            color = 'gray';
            text = '已退票';
            break;
          default:
            break;
        }
        
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {record.status === 'PENDING' && (
            <>
              <a onClick={() => handlePayment(record)}>支付</a>
              <a onClick={() => handleCancel(record)}>取消</a>
            </>
          )}
          {record.status === 'COMPLETED' && (
            <a onClick={() => handleRefund(record)}>退票</a>
          )}
          <a onClick={() => handleViewDetail(record)}>详情</a>
        </Space>
      ),
    },
  ];

  const handlePayment = (record) => {
    // 实现支付逻辑
    console.log('支付订单:', record);
  };

  const handleCancel = (record) => {
    // 实现取消订单逻辑
    console.log('取消订单:', record);
  };

  const handleRefund = (record) => {
    // 实现退票逻辑
    console.log('退票:', record);
  };

  const handleViewDetail = (record) => {
    // 实现查看详情逻辑
    console.log('查看详情:', record);
  };

  return (
    <div className="order-history">
      <h2>订票记录</h2>
      <Table
        columns={columns}
        dataSource={orders}
        loading={loading}
        rowKey="orderNumber"
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条记录`,
        }}
      />
    </div>
  );
};

export default OrderHistory;
