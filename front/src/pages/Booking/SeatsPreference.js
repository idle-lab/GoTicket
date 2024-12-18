import React, { useState } from 'react'
import { Card, Row, Col, Typography } from 'antd'

const seatLayout = [
  ['Window', 'A', 'B', 'C', 'Aisle', 'D', 'F', 'Window'],
  ['Window', 'A', 'B', 'C', 'Aisle', 'D', 'F', 'Window'],
]

export default function SeatPreference() {
  const [selectedSeats, setSelectedSeats] = useState({})

  const toggleSeatSelection = (rowIndex, seatIndex) => {
    const seat = seatLayout[rowIndex][seatIndex]
    if (seat === 'Window' || seat === 'Aisle') return
    const seatKey = `${rowIndex}-${seatIndex}`
    setSelectedSeats((prevSelectedSeats) => ({
      ...prevSelectedSeats,
      [seatKey]: !prevSelectedSeats[seatKey],
    }))
  }

  return (
    <div>
      <Card title="Seat Preference" bordered={false} className="my-4">
        {seatLayout.map((row, rowIndex) => (
          <Row key={rowIndex} gutter={[16, 16]} className="seat-row" justify="center">
            {row.map((seat, seatIndex) => {
              const seatKey = `${rowIndex}-${seatIndex}`
              const isSelected = selectedSeats[seatKey]
              const isUnselectable = seat === 'Window' || seat === 'Aisle' // 判断座位是否不可选择

              return (
                <Col
                  key={seatIndex}
                  span={3}
                  className={`seat-col ${isSelected ? 'selected' : ''} ${
                    isUnselectable ? 'unselectable' : ''
                  }`}
                  onClick={() => toggleSeatSelection(rowIndex, seatIndex)}
                  style={{
                    textAlign: 'center',
                    cursor: isUnselectable ? 'not-allowed' : 'pointer',
                    padding: '8px',
                    backgroundColor: isSelected ? '#1890ff' : '#fff',
                    color: isSelected ? '#fff' : '#000',
                  }}
                >
                  <Typography.Text>{seat}</Typography.Text>
                </Col>
              )
            })}
          </Row>
        ))}
      </Card>
    </div>
  )
}

