import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Card, Col, Row, Button } from 'antd'
import ContactInfo from './ContactInfo'
import PersonalInfo from './PersonalInfo'
import PriceInfo from './PriceInfo'
import RouteInfo from './RouteInfo'
import SeatPreference from './SeatsPreference'

export default function Booking() {
  const [ticketCount, setTicketCount] = useState(0)
  const [passengerInfo, setPassengerInfo] = useState([]) // 存储乘客信息
  const [contactData, setContactData] = useState({}) // 存储联系人信息
  const [selectedSeats, setSelectedSeats] = useState([]) // 存储已选座位
  const location = useLocation()
  const { route, selectedSeat } = location.state || {}

  console.log(route)

  // 更新票数
  const updateTicketCount = (newCount) => {
    setTicketCount(newCount)
  }

  // 更新乘客信息
  const updatePassengerInfo = (newPassengerInfo) => {
    setPassengerInfo(newPassengerInfo)
  }

  const updateContactData = (newContactData) => {
    setContactData(newContactData)
  }

  const updateSelectedSeats = (seats) => {
    setSelectedSeats(seats)
  }

  const handleBooking = () => {
    // 提交数据给后端
    console.log('Passenger Info:', passengerInfo)
    console.log('Contact Data:', contactData)
    console.log('Selected Seats:', selectedSeats)

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
            <ContactInfo updateContactData={updateContactData} />
            <SeatPreference ticketCount={ticketCount} updateSelectedSeats={updateSelectedSeats} />
            <Button type="primary" block onClick={handleBooking}>
              BOOK
            </Button>
          </Col>
          {/* 右侧 Col */}
          <Col span={8}>
            <RouteInfo route={route} selectedSeat={selectedSeat} />
            {ticketCount > 0 && <PriceInfo ticketCount={ticketCount} selectedSeat={selectedSeat} />}
          </Col>
        </Row>
      </div>
    </div>
  )
}

