import React, { useState } from 'react'
import { Card, Row, Col, Typography } from 'antd'

const seatLayout = [
  ['Window', 'A', 'B', 'C', 'Aisle', 'D', 'F', 'Window'],
  ['Window', 'A', 'B', 'C', 'Aisle', 'D', 'F', 'Window'],
]

export default function SeatPreference({ ticketCount, updateSelectedSeats }) {
  const [selectedSeats, setSelectedSeats] = useState([])

  const toggleSeatSelection = (rowIndex, seatIndex) => {
    const seatKey = `${rowIndex}-${seatIndex}`
    const seat = seatLayout[rowIndex][seatIndex]

    if (seat === 'Window' || seat === 'Aisle') return

    if (selectedSeats.includes(seatKey)) {
      const updatedSeats = selectedSeats.filter((key) => key !== seatKey)
      setSelectedSeats(updatedSeats)
      updateSelectedSeats(updatedSeats)
      return
    }

    if (selectedSeats.length < ticketCount) {
      const updatedSeats = [...selectedSeats, seatKey]
      setSelectedSeats(updatedSeats)
      updateSelectedSeats(updatedSeats)
    }
  }

  return (
    <div>
      <Card title="Seat Preference" bordered={false} className="my-4">
        {seatLayout.map((row, rowIndex) => (
          <Row key={rowIndex} gutter={[16, 16]} className="seat-row" justify="center">
            {row.map((seat, seatIndex) => {
              const seatKey = `${rowIndex}-${seatIndex}`
              const isSelected = selectedSeats.includes(seatKey)
              const isUnselectable = seat === 'Window' || seat === 'Aisle'

              return (
                <Col
                  key={seatIndex}
                  span={3}
                  className={`seat-col ${isSelected ? 'selected' : ''} ${
                    isUnselectable ? 'unselectable' : ''
                  }`}
                  onClick={
                    !isUnselectable ? () => toggleSeatSelection(rowIndex, seatIndex) : undefined
                  }
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

