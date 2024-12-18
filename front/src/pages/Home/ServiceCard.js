import { Typography, Card } from 'antd'
import React from 'react'
const ServiceCard = ({ icon, title, description }) => (
  <Card
    style={{
      textAlign: 'center',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
    bordered={false}
  >
    {icon}
    <Typography.Title level={5} className="font-bold mt-2">
      {title}
    </Typography.Title>
    <Typography.Text type="secondary">{description}</Typography.Text>
  </Card>
)

export default ServiceCard

