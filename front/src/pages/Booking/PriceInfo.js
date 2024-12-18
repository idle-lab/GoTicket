import React from 'react'
import { Card, Col, Divider, Row, Typography } from 'antd'

export default function PriceInfo() {
  return (
    <div>
      <Card title="Price Details" bordered={false} className="my-4">
        <Row>
          <Col span={12}>
            <Typography.Text>Ticket x1</Typography.Text>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Typography.Text strong>HK$589.86</Typography.Text>
          </Col>
        </Row>
        <Row>
          <Divider />
        </Row>
        <Row style={{ marginTop: 10 }}>
          <Col span={12}>
            <Typography.Text>Total</Typography.Text>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Typography.Text strong style={{ fontSize: '18px' }}>
              HK$589.86
            </Typography.Text>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

