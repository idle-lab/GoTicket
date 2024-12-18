import React, { useState } from 'react'
import { Card, Col, Row, Button } from 'antd'
import ContactInfo from './ContactInfo'
import PersonalInfo from './PersonalInfo'
import PriceInfo from './PriceInfo'
import RouteInfo from './RouteInfo'
import SeatPreference from './SeatsPreference'

export default function Booking() {
  const [ticketCount, setTicketCount] = useState(0)
  const [passengerInfo, setPassengerInfo] = useState([]) // 存储乘客信息

  // 更新票数
  const updateTicketCount = (newCount) => {
    setTicketCount(newCount)
  }

  // 更新乘客信息
  const updatePassengerInfo = (newPassengerInfo) => {
    setPassengerInfo(newPassengerInfo)
  }

  const handleBooking = () => {
    // 提交数据给后端
    console.log('Passenger Info:', passengerInfo)
    // 在此处进行 API 调用，提交数据到后端
  }

  return (
    <div className="w-full">
      <div className="w-4/5 mx-auto my-10">
        <Row gutter={[16, 0]}>
          {/* 左侧 Col */}
          <Col span={16}>
            <PersonalInfo
              updateTicketCount={updateTicketCount}
              updatePassengerInfo={updatePassengerInfo}
            />
            <ContactInfo />
            <SeatPreference />
            <Button type="primary" block onClick={handleBooking}>
              BOOK
            </Button>
          </Col>
          {/* 右侧 Col */}
          <Col span={8}>
            <RouteInfo />
            {ticketCount > 0 && <PriceInfo ticketCount={ticketCount} />}
          </Col>
        </Row>
      </div>
    </div>
  )
}

