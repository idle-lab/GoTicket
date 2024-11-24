import React from 'react'
import { Col, Row } from 'antd'
import './index.css'
import { AudioOutlined } from '@ant-design/icons'
import { Input, Typography } from 'antd'
import { Divider } from 'antd'
import { Link } from 'react-router-dom'

const { Search } = Input
const { Text } = Typography

const onSearch = (value, _e, info) => console.log(info?.source, value)

const Top = () => {
  return (
    <div className="container">
      <div className="container-box">
        <Row>
          <Col span={4}>
            <div className="logo">GoTicket</div>
          </Col>
          <Col span={14}>
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              size="large"
              style={{
                width: 500,
              }}
            />
          </Col>
          <Col span={2}>
            <div className="support">
              <Text strong>Support</Text>
            </div>
          </Col>
          <Col span={4}>
            <div className="loginSignin">
              <Text strong>
                <Link to="/login">Login</Link>
              </Text>
              <Divider type="vertical" />
              <Text strong>
                <Link to="/login">Sign in</Link>
              </Text>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Top

