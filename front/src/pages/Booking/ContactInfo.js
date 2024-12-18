import React, { useState } from 'react'
import { Card, Col, Row, Input, Form } from 'antd'

export default function ContactInfo({ updateContactData }) {
  const [formData, setFormData] = useState({
    contactName: '',
    phoneNumber: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    const updatedData = { ...formData, [name]: value }
    setFormData(updatedData)
    updateContactData(updatedData) // 更新联系人数据
  }

  return (
    <div>
      <Card title="Contact Info" bordered={false} className="my-4">
        <Form layout="vertical">
          <Row gutter={16}>
            {/* Contact Name */}
            <Col span={12}>
              <Form.Item
                label="Contact Name"
                name="contactName"
                rules={[{ required: true, message: 'Please enter contact name' }]}
              >
                <Input
                  name="contactName"
                  value={formData.contactName}
                  placeholder="Enter contact name"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>

            {/* Phone Number */}
            <Col span={12}>
              <Form.Item
                label="Phone Number (Required)"
                name="phoneNumber"
                rules={[
                  { required: true, message: 'Please enter phone number' },
                  { pattern: /^[0-9]{11}$/, message: 'Please enter a valid 11-digit phone number' },
                ]}
              >
                <Input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  addonBefore="+86"
                  placeholder="Enter phone number"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  )
}

