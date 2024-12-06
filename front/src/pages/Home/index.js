import React from 'react'
import './index.css'
import { Tabs, Input, Button, DatePicker, Select } from 'antd'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const { RangePicker } = DatePicker
const { Option } = Select

const onChange = (key) => {
  console.log(key)
}

const items = [
  {
    key: '1',
    label: '往返',
    children: '往返内容',
  },
  {
    key: '2',
    label: '单程',
    children: '单程内容',
  },
  {
    key: '3',
    label: '多程',
    children: '多程内容',
  },
]

export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  }

  return (
    <div className="home-container">
      <div className="slider-container">
        <Slider {...settings}>
          <div className="slide">
            <div className="slide-content">
              <h2>春季特惠</h2>
              <p>多条热门线路低至5折</p>
              <Button type="primary" size="large">立即抢购</Button>
            </div>
            <div className="slide-bg slide-bg-1"></div>
          </div>
          <div className="slide">
            <div className="slide-content">
              <h2>暑期出行计划</h2>
              <p>早订早优惠，最高立减500元</p>
              <Button type="primary" size="large">查看详情</Button>
            </div>
            <div className="slide-bg slide-bg-2"></div>
          </div>
          <div className="slide">
            <div className="slide-content">
              <h2>商务出行优选</h2>
              <p>高铁商务座特惠</p>
              <Button type="primary" size="large">了解更多</Button>
            </div>
            <div className="slide-bg slide-bg-3"></div>
          </div>
        </Slider>
      </div>

      <div className="container2">
        <div className="container2-box">
          <div className="searchTitle">搜索车票</div>
          <div className="searchTab">
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          </div>
          <div className="searchForm">
            <Input.Group compact>
              <Input style={{ width: '20%' }} placeholder="出发地" />
              <Input style={{ width: '20%' }} placeholder="目的地" />
              <RangePicker style={{ width: '30%' }} />
              <Select defaultValue="economy" style={{ width: '15%' }}>
                <Option value="economy">经济舱</Option>
                <Option value="premium">高端经济舱</Option>
                <Option value="business">商务舱</Option>
                <Option value="first">头等舱</Option>
              </Select>
              <Button type="primary" style={{ width: '15%' }}>
                搜索
              </Button>
            </Input.Group>
          </div>
        </div>
      </div>
    </div>
  )
}

