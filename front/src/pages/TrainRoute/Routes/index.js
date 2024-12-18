import React, { useState } from 'react'
import { Card, Button, Row, Col, Typography, Divider } from 'antd'
import './index.css'

const routes = [
  {
    departureTime: '02:56',
    departureStation: 'Hangzhou South',
    arrivalTime: '05:28',
    arrivalStation: 'Shanghai South',
    train: 'K802',
    duration: '2h 32m',
    price: 'HK$30.47',
    type: 'High speed',
  },
  {
    departureTime: '04:04',
    departureStation: 'Hangzhou South',
    arrivalTime: '06:20',
    arrivalStation: 'Shanghai South',
    train: 'K2882',
    duration: '2h 16m',
    price: 'HK$30.47',
    type: 'High speed',
  },
  {
    departureTime: '04:31',
    departureStation: 'Hangzhou South',
    arrivalTime: '07:23',
    arrivalStation: 'Shanghai South',
    train: 'K5122',
    duration: '2h 52m',
    price: 'HK$30.47',
    type: 'Normal',
  },
  {
    departureTime: '04:52',
    departureStation: 'Hangzhou South',
    arrivalTime: '07:09',
    arrivalStation: 'Shanghai South',
    train: 'K1128',
    duration: '2h 17m',
    price: 'HK$30.47',
    type: 'High speed',
  },
]

export default function Routes() {
  const [expanded, setExpanded] = useState({}) // 用于存储每个 route 的展开状态

  const toggleBox = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index], // 切换对应 index 的状态
    }))
  }

  return (
    <>
      <Card>
        {routes.map((route, index) => (
          <Card.Grid
            key={index}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Row gutter={[24, 16]} align="middle">
              <Col
                span={5}
                className="departure-col"
                style={{ textAlign: 'left', position: 'relative' }}
              >
                <Typography.Text style={{ fontSize: '14px', color: '#888' }}>
                  Departure
                </Typography.Text>
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{route.departureTime}</div>
                <div style={{ color: '#555' }}>{route.departureStation}</div>
              </Col>

              <Col span={5} style={{ textAlign: 'left' }}>
                <Typography.Text style={{ fontSize: '14px', color: '#888' }}>
                  Arrival
                </Typography.Text>
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{route.arrivalTime}</div>
                <div style={{ color: '#555' }}>{route.arrivalStation}</div>
              </Col>

              <Col span={6} style={{ textAlign: 'left' }}>
                <div className="flex items-center">
                  <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{route.train}</div>
                  <Divider type="vertical" />
                  <div style={{ color: '#555' }}>{route.duration}</div>
                </div>
              </Col>

              <Col span={6} style={{ textAlign: 'right' }}>
                <Typography.Text strong style={{ fontSize: '16px', color: '#333' }}>
                  From
                </Typography.Text>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#000' }}>
                  {route.price}
                </div>
                <Button
                  type="primary"
                  style={{ marginTop: '10px' }}
                  onClick={() => toggleBox(index)}
                >
                  {expanded[index] ? 'Hide' : 'Select'}
                </Button>
              </Col>
            </Row>

            {expanded[index] && (
              <div className="my-5">
                <Row gutter={16}>
                  <Col span={8}>
                    <Card title="2nd Class" bordered={false}>
                      <Row className="w-full mt-3 mx-6">
                        <Typography.Title level={4}>HK$30</Typography.Title>
                      </Row>
                      <Row className="w-full mx-6 mb-3">
                        <Button className="w-full">BOOK NOW!</Button>
                      </Row>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title="1st Class" bordered={false}>
                      <Row className="w-full mt-3 mx-6">
                        <Typography.Title level={4}>HK$30</Typography.Title>
                      </Row>
                      <Row className="w-full mx-6 mb-3">
                        <Button className="w-full">BOOK NOW!</Button>
                      </Row>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title="Business class" bordered={false}>
                      <Row className="w-full mt-3 mx-6">
                        <Typography.Title level={4}>HK$30</Typography.Title>
                      </Row>
                      <Row className="w-full mx-6 mb-3">
                        <Button className="w-full">BOOK NOW!</Button>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              </div>
            )}
          </Card.Grid>
        ))}
      </Card>
    </>
  )
}

