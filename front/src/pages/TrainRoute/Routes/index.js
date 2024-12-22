import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import React, { useState } from 'react'
import dayjs from 'dayjs'
import { Card, Button, Row, Col, Typography, Divider } from 'antd'
import './index.css'

export default function Routes() {
  const location = useLocation() // 获取传递的 state
  const navigate = useNavigate()
  const { searchParams, searchResults } = location.state || {} // 解构传递的数据
  const [expanded, setExpanded] = useState({}) // 用于存储每个 route 的展开状态
  const [selectedSeats, setSelectedSeats] = useState({}) // 用于存储选择的座位类型及价格

  console.log(searchResults)

  function formatTime(dateString) {
    const date = new Date(dateString) // 解析日期字符串
    const hours = date.getUTCHours().toString().padStart(2, '0') // 获取小时并确保是两位数
    const minutes = date.getUTCMinutes().toString().padStart(2, '0') // 获取分钟并确保是两位数
    return `${hours}:${minutes}` // 返回 HH:mm 格式
  }

  // 如果没有传递搜索结果，显示提示信息
  if (!searchResults || searchResults.length === 0) {
    return (
      <Typography.Title level={3}>No routes found. Please try another search.</Typography.Title>
    )
  }

  const toggleBox = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index], // 切换对应 index 的状态
    }))
  }

  const handleSeatSelection = (route, seatType) => {
    const seatPrice =
      seatType === '2nd Class'
        ? route.price
        : seatType === '1st Class'
        ? route.price * 1.75
        : route.price * 3

    const selectedSeat = { seatType, price: seatPrice }

    // 直接将选中的座位信息传递，而不依赖于 state 更新
    navigate('/booking', { state: { route, selectedSeat } })
  }

  return (
    <>
      <Typography.Title level={3} style={{ marginBottom: '20px' }}>
        Train Routes from {searchParams?.from} to {searchParams?.to}
      </Typography.Title>

      <Card>
        {searchResults.map((route, index) => (
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
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                  {route.station_expected_departure_times?.[0]
                    ? formatTime(route.station_expected_departure_times[0])
                    : 'N/A'}
                </div>

                <div style={{ color: '#555' }}>{route.stations[0]}</div>
              </Col>

              <Col span={5} style={{ textAlign: 'left' }}>
                <Typography.Text style={{ fontSize: '14px', color: '#888' }}>
                  Arrival
                </Typography.Text>
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                  {route.station_expected_departure_times?.[1]
                    ? dayjs(
                        route.station_expected_departure_times[
                          route.station_expected_departure_times.length - 1
                        ].split('.')[0],
                      ).format('HH:mm')
                    : 'N/A'}
                </div>

                <div style={{ color: '#555' }}>{route.stations[route.stations.length - 1]}</div>
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
                  HK${route.price}
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
                        <Typography.Title level={4}>HK${route.price}</Typography.Title>
                      </Row>
                      <Row className="w-full mx-6 mb-3">
                        <Button
                          className="w-full"
                          onClick={() => handleSeatSelection(route, '2nd Class')}
                        >
                          Select and Book Now
                        </Button>
                      </Row>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title="1st Class" bordered={false}>
                      <Row className="w-full mt-3 mx-6">
                        <Typography.Title level={4}>HK${route.price * 1.75}</Typography.Title>
                      </Row>
                      <Row className="w-full mx-6 mb-3">
                        <Button
                          className="w-full"
                          onClick={() => handleSeatSelection(route, '1st Class')}
                        >
                          Select and Book Now
                        </Button>
                      </Row>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title="Business Class" bordered={false}>
                      <Row className="w-full mt-3 mx-6">
                        <Typography.Title level={4}>HK${route.price * 3}</Typography.Title>
                      </Row>
                      <Row className="w-full mx-6 mb-3">
                        <Button
                          className="w-full"
                          onClick={() => handleSeatSelection(route, 'Business Class')}
                        >
                          Select and Book Now
                        </Button>
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

