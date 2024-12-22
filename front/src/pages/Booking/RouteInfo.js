import React from 'react'
import { Card, Col, Row, Typography } from 'antd'

export default function RouteInfo({ route, selectedSeat }) {
  function formatDay(dateString) {
    const date = new Date(dateString) //
    const year = date.getUTCFullYear() //
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
    const day = date.getUTCDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  function formatTime(dateString) {
    const date = new Date(dateString) // 解析日期字符串
    const hours = date.getUTCHours().toString().padStart(2, '0') // 获取小时并确保是两位数
    const minutes = date.getUTCMinutes().toString().padStart(2, '0') // 获取分钟并确保是两位数
    return `${hours}:${minutes}` // 返回 HH:mm 格式
  }

  function caculateTime(dates) {
    if (dates.length < 2) {
      return 'Invalid input, need at least two dates'
    }

    const startTime = new Date(dates[0])
    const endTime = new Date(dates[dates.length - 1])

    const durationMs = endTime - startTime

    const hours = Math.floor(durationMs / 3600000)
    const minutes = Math.floor((durationMs % 3600000) / 60000)

    return `${hours}h ${minutes}min `
  }

  return (
    <div>
      <Card title="Route Info" bordered={false} className="my-4">
        <Row gutter={16}>
          <Col span={12}>
            <Typography.Text strong>Date:</Typography.Text>{' '}
            {formatDay(route.station_expected_departure_times[0])}
          </Col>
          <Col span={12}>
            <Typography.Text strong>Duration:</Typography.Text>{' '}
            {caculateTime(route.station_expected_departure_times)}
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Typography.Text strong>Class:</Typography.Text> {selectedSeat.seatType}
          </Col>
          <Col span={12}>
            <Typography.Text strong>Train Number:</Typography.Text> {route.code}
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Typography.Text strong>Arrival:</Typography.Text>
            {route.station_expected_departure_times?.[0]
              ? formatTime(
                  route.station_expected_departure_times[
                    route.station_expected_departure_times.length - 1
                  ],
                )
              : 'N/A'}{' '}
            | {route.stations[route.stations.length - 1]}
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Typography.Text strong>Departure:</Typography.Text>{' '}
            {route.station_expected_departure_times?.[0]
              ? formatTime(route.station_expected_departure_times[0])
              : 'N/A'}{' '}
            | {route.stations[0]}
          </Col>
        </Row>
      </Card>
    </div>
  )
}

