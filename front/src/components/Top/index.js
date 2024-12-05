import React from 'react'
import { Col, Row, Input, Typography } from 'antd'
import { Link } from 'react-router-dom'
import UserSection from '../UserSection'
import './index.css'

const { Search } = Input
const { Text } = Typography

const Top = () => {
  const handleSearch = (value, _e, info) => {
    console.log(info?.source, value)
  }

  return (
    <div className="container">
      <div className="container-box">
        <Row align="middle">
          <Col span={4}>
            <div className="logo">
              <Link to="/">GoTicket</Link>
            </div>
          </Col>

          <Col span={14}>
            <Search
              placeholder="Search for tickets"
              onSearch={handleSearch}
              size="large"
              style={{ width: 500 }}
            />
          </Col>

          <Col span={2}>
            <div className="support">
              <Text strong>Support</Text>
            </div>
          </Col>

          <Col span={4}>
            <UserSection />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Top

