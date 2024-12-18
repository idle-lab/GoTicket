import React from 'react'
import { Card, Col, Row, Typography } from 'antd'

const routeInfo = {
  date: 'Thu Dec 19',
  duration: '5h 38m',
  class: '2nd Class',
  departureTime: '06:20',
  departureStation: 'Beijing South',
  trainNumber: 'G103',
  arrivalTime: '11:58',
  arrivalStation: 'Shanghai Hongqiao',
}

export default function RouteInfo() {
  return (
    <div>
      <Card title="Route Info" bordered={false} className="my-4">
        <Row gutter={16}>
          <Col span={12}>
            <Typography.Text strong>Date:</Typography.Text> {routeInfo.date}
          </Col>
          <Col span={12}>
            <Typography.Text strong>Duration:</Typography.Text> {routeInfo.duration}
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Typography.Text strong>Class:</Typography.Text> {routeInfo.class}
          </Col>
          <Col span={12}>
            <Typography.Text strong>Train Number:</Typography.Text> {routeInfo.trainNumber}
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Typography.Text strong>Arrival:</Typography.Text> {routeInfo.arrivalTime} |{' '}
            {routeInfo.arrivalStation}
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Typography.Text strong>Departure:</Typography.Text> {routeInfo.departureTime} |{' '}
            {routeInfo.departureStation}
          </Col>
        </Row>
      </Card>
    </div>
  )
}

