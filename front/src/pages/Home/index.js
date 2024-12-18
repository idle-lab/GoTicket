import { Card } from 'antd'
import { Typography, Space, Divider } from 'antd'
import {
  BookOutlined,
  RocketOutlined,
  TagOutlined,
  ShoppingCartOutlined,
  ClockCircleOutlined,
  MobileOutlined,
} from '@ant-design/icons'
import React from 'react'
import { Col, Row } from 'antd'
import ServiceCard from './ServiceCard'
import FAQs from './FAQs/FAQs'
import HotRoutes from './HotRoutes'
import TrainSearch from '../TrainSearch'

export default function Home() {
  const bgImage = 'https://s3.bmp.ovh/imgs/2024/12/12/e5ed90a02e914e29.webp'

  return (
    <div>
      {/* { 有背景的 } */}
      <div
        className="w-full bg-cover bg-center rounded-b-3xl bg-blue-500"
      >
        <div className="h-28"></div>
        <div className="flex justify-center">
          <div className="text-5xl text-slate-50 pb-8 font-bold w-4/5 ">
            Book China High-speed Train Tickets Online
          </div>
        </div>
        <div className="flex justify-center">
          <div className="text-4xl text-slate-50 pb-8 font-bold w-4/5 ">
            Search high-speed train fares, routes, and timetables
          </div>
        </div>
        <div className="flex justify-center items-center">
          <TrainSearch />
        </div>

        <div className="flex justify-center items-center mt-8">
          <Card className="w-4/5">
            <div className="flex justify-around items-center">
              <Space align="center" className="cursor-pointer hover:shadow-md">
                <BookOutlined />
                <Typography.Text className="font-bold">My Bookings</Typography.Text>
              </Space>
              <Divider type="vertical" />
              <Space align="center" className="cursor-pointer hover:shadow-md">
                <RocketOutlined />
                <Typography.Text className="font-bold">Train Guide</Typography.Text>
              </Space>
            </div>
          </Card>
        </div>
        <div className="h-5"></div>
      </div>
      {/* {why booking} */}
      <div>
        <div className="flex justify-center mt-11">
          <div className="pb-8 font-bold w-4/5 ">
            <Typography.Title level={1}>Why Book High-speed Trains on Goticket?</Typography.Title>
            <Row
              gutter={[16, 16]}
              justify="center"
              style={{ display: 'flex', alignItems: 'stretch' }}
            >
              <Col span={6} style={{ display: 'flex' }}>
                <ServiceCard
                  icon={<TagOutlined style={{ fontSize: '40px', color: '#ffa900' }} />}
                  title="24/7 Ticketing Service"
                  description="24/7 ticketing service, convenient for booking tickets anytime"
                />
              </Col>
              <Col span={6} style={{ display: 'flex' }}>
                <ServiceCard
                  icon={<ShoppingCartOutlined style={{ fontSize: '40px', color: '#06aebd' }} />}
                  title="Reserve Seats in Advance"
                  description="Reserve your seats in advance, faster than most platforms!"
                />
              </Col>
              <Col span={6} style={{ display: 'flex' }}>
                <ServiceCard
                  icon={<ClockCircleOutlined style={{ fontSize: '40px', color: '#ffa900' }} />}
                  title="Book in 3 Minutes, Tickets Issued in 10 Minutes"
                  description="Complete booking within 3 minutes, get your tickets issued within 10 minutes, and travel worry-free"
                />
              </Col>
              <Col span={6} style={{ display: 'flex' }}>
                <ServiceCard
                  icon={<MobileOutlined style={{ fontSize: '40px', color: '#06aebd' }} />}
                  title="E-tickets Available"
                  description="E-tickets on your phone for contactless travel"
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
      {/* {热门的票} */}
      <HotRoutes />
      {/* {China High-speed Train FAQ} */}
      <FAQs />
    </div>
  )
}

