import React, { useState } from 'react'
import { Card, Col, Row, Input, Button, Form } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'

export default function PersonalInfo({ updateTicketCount, updatePassengerData }) {
  const [passengers, setPassengers] = useState([])

  const addPassenger = () => {
    const newPassengers = [...passengers, { id: passengers.length + 1 }]
    setPassengers(newPassengers)
    updateTicketCount(newPassengers.length) // 更新票数
    updatePassengerData(newPassengers) // 更新乘客数据
  }

  const deletePassenger = (id) => {
    const newPassengers = passengers.filter((passenger) => passenger.id !== id)
    setPassengers(newPassengers)
    updateTicketCount(newPassengers.length) // 更新票数
  }

  return (
    <div>
      <Card title="Personal Info" bordered={false} className="my-4">
        {passengers.map((passenger, index) => (
          <Card
            key={passenger.id}
            type="inner"
            title={`Passenger ${index + 1}`}
            extra={
              <Button
                type="text"
                icon={<DeleteOutlined />}
                danger
                onClick={() => deletePassenger(passenger.id)}
              >
                Delete
              </Button>
            }
            className="mb-3"
          >
            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="ID Number"
                    name={`idNumber-${passenger.id}`}
                    rules={[{ required: true, message: 'Please enter ID number' }]}
                  >
                    <Input placeholder="Enter ID number" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Name"
                    name={`name-${passenger.id}`}
                    rules={[{ required: true, message: 'Please enter name' }]}
                  >
                    <Input placeholder="Enter name" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        ))}

        <Button type="dashed" icon={<PlusOutlined />} onClick={addPassenger} block>
          Add Passenger
        </Button>
      </Card>
    </div>
  )
}

