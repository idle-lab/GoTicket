import { Card } from 'antd'
import { Cascader, Typography, Flex, DatePicker, Button, Checkbox, Space, Divider } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import {
  BookOutlined,
  RocketOutlined,
  TagOutlined,
  ShoppingCartOutlined,
  ClockCircleOutlined,
  MobileOutlined,
} from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import dayjs from 'dayjs'
import ServiceCard from './ServiceCard'
import RoutesCard from './RoutesCard'

export default function Home() {
  const bgImage = 'https://s3.bmp.ovh/imgs/2024/12/12/e5ed90a02e914e29.webp'
  const options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
        },
        {
          value: 'ningbo',
          label: 'Ningbo',
        },
        {
          value: 'wenzhou',
          label: 'Wenzhou',
        },
      ],
    },
    {
      value: 'shanghai',
      label: 'Shanghai',
    },
    {
      value: 'guangdong',
      label: 'Guangdong',
      children: [
        {
          value: 'guangzhou',
          label: 'Guangzhou',
        },
        {
          value: 'shenzhen',
          label: 'Shenzhen',
        },
        {
          value: 'foshan',
          label: 'Foshan',
        },
      ],
    },
    {
      value: 'beijing',
      label: 'Beijing',
    },
    {
      value: 'tianjin',
      label: 'Tianjin',
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
        },
        {
          value: 'suzhou',
          label: 'Suzhou',
        },
        {
          value: 'wuxi',
          label: 'Wuxi',
        },
      ],
    },
    {
      value: 'hunan',
      label: 'Hunan',
      children: [
        {
          value: 'changsha',
          label: 'Changsha',
        },
        {
          value: 'xiangtan',
          label: 'Xiangtan',
        },
      ],
    },
    {
      value: 'sichuan',
      label: 'Sichuan',
      children: [
        {
          value: 'chengdu',
          label: 'Chengdu',
        },
        {
          value: 'mianyang',
          label: 'Mianyang',
        },
      ],
    },
    {
      value: 'fujian',
      label: 'Fujian',
      children: [
        {
          value: 'xiamen',
          label: 'Xiamen',
        },
        {
          value: 'quanzhou',
          label: 'Quanzhou',
        },
      ],
    },
    {
      value: 'jiangxi',
      label: 'Jiangxi',
      children: [
        {
          value: 'nanchang',
          label: 'Nanchang',
        },
        {
          value: 'jingdezhen',
          label: 'Jingdezhen',
        },
      ],
    },
    {
      value: 'henan',
      label: 'Henan',
      children: [
        {
          value: 'zhengzhou',
          label: 'Zhengzhou',
        },
        {
          value: 'luoyang',
          label: 'Luoyang',
        },
      ],
    },
    {
      value: 'liaoning',
      label: 'Liaoning',
      children: [
        {
          value: 'shenyang',
          label: 'Shenyang',
        },
        {
          value: 'dalian',
          label: 'Dalian',
        },
      ],
    },
  ]

  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions)
  }
  const onChangecheck = (e) => {
    console.log(`checked = ${e.target.checked}`)
  }
  const filter = (inputValue, path) =>
    path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)

  const routesData = {
    Shanghai: [
      {
        pictureUrl: 'https://s3.bmp.ovh/imgs/2024/12/13/cf2147da77136f3b.jpg',
        title: 'Shanghai to Beijing',
        price: '100',
      },
      {
        pictureUrl: 'https://s3.bmp.ovh/imgs/2024/12/13/df3f6997b897c4f2.jpg',
        title: 'Shanghai to Tianjin',
        price: '120',
      },
    ],
    Beijing: [
      {
        pictureUrl: 'https://s3.bmp.ovh/imgs/2024/12/13/cf2147da77136f3b.jpg',
        title: 'Shanghai to Beijing',
        price: '100',
      },
      {
        pictureUrl: 'https://s3.bmp.ovh/imgs/2024/12/13/df3f6997b897c4f2.jpg',
        title: 'Shanghai to Tianjin',
        price: '120',
      },
      {
        pictureUrl: 'https://s3.bmp.ovh/imgs/2024/12/13/8151d40a6077a8ed.jpg',
        title: 'Nanjing to Beijing',
        price: '150',
      },
      {
        pictureUrl: 'https://s3.bmp.ovh/imgs/2024/12/13/96158b08bb17c91b.jpg',
        title: 'Xi’an to Beijing',
        price: '200',
      },
    ],
  }

  const RoutesPage = () => {
    const [selectedCity, setSelectedCity] = useState('Shanghai')

    const handleCityChange = (city) => {
      setSelectedCity(city)
    }
  }

  const [selectedCity, setSelectedCity] = useState('Shanghai')

  const handleCityChange = (city) => {
    setSelectedCity(city)
  }

  return (
    <div>
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="w-full bg-cover bg-center rounded-b-3xl"
      >
        <div className="h-28"></div>
        <div className="flex justify-center">
          <div className="text-5xl text-slate-50 pb-8 font-bold w-3/5 ">
            Book China High-speed Train Tickets Online
          </div>
        </div>
        <div className="flex justify-center">
          <div className="text-4xl text-slate-50 pb-8 font-bold w-3/5 ">
            Search high-speed train fares, routes, and timetables
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Card className="w-3/5">
            <div className="flex justify-between items-start gap-8">
              {/* 第一部分 */}
              <div className="flex gap-4">
                <div>
                  <Typography.Title level={5}>From</Typography.Title>
                  <Cascader
                    size="large"
                    options={options}
                    onChange={onChange}
                    placeholder="Please select"
                    showSearch={{
                      filter,
                    }}
                    onSearch={(value) => console.log(value)}
                  />
                </div>
                <div>
                  <Typography.Title level={5}>To</Typography.Title>
                  <Cascader
                    size="large"
                    options={options}
                    onChange={onChange}
                    placeholder="Please select"
                    showSearch={{
                      filter,
                    }}
                    onSearch={(value) => console.log(value)}
                  />
                </div>
              </div>

              {/* 第二部分 */}
              <div className="flex flex-col flex-grow">
                <div className="flex justify-between w-full">
                  <Typography.Title type="secondary" level={5} className="text-left flex-1">
                    Departure Time
                  </Typography.Title>
                  <Typography.Title type="secondary" level={5} className="text-left flex-1 !mt-0">
                    Return Time
                  </Typography.Title>
                </div>
                <DatePicker.RangePicker
                  size="large"
                  placeholder={['', 'Add Return Trip']}
                  defaultValue={[dayjs(), null]}
                  minDate={dayjs()}
                  maxDate={dayjs().add(24, 'day')}
                  allowEmpty={[false, true]}
                  onChange={(date, dateString) => {
                    console.log(date, dateString)
                  }}
                />
                <div className="mt-4 flex justify-between items-center">
                  <Checkbox onChange={onChangecheck}>High speed only</Checkbox>
                  <Button type="primary" icon={<SearchOutlined />} size="large">
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="flex justify-center items-center mt-8">
          <Card className="w-3/5">
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
      <div>
        <div className="flex justify-center mt-11">
          <div className="pb-8 font-bold w-3/5 ">
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
      <div>
        <div className="flex justify-center mt-11">
          <div className="pb-8 font-bold w-3/5 ">
            <Typography.Title level={1}>China Train and High-speed Train Routes</Typography.Title>
            <div className="flex mt-6 mb-6 space-x-4 items-center">
              Trains to &nbsp;
              {Object.keys(routesData).map((city) => (
                <Button
                  key={city}
                  style={{
                    backgroundColor: selectedCity === city ? '#0f294d' : '#f0f2f5', // 修改背景颜色
                    color: selectedCity === city ? '#ffffff' : '#000000', // 修改文字颜色
                    borderColor: selectedCity === city ? '#0f294d' : '#f0f2f5', // 修改边框颜色
                  }}
                  onClick={() => handleCityChange(city)}
                >
                  {city}
                </Button>
              ))}
            </div>
            <Row
              gutter={[16, 16]}
              justify="center"
              style={{ display: 'flex', alignItems: 'stretch' }}
            >
              {routesData[selectedCity].map((route, index) => (
                <Col span={6} style={{ display: 'flex' }} key={index}>
                  <RoutesCard
                    pictureUrl={route.pictureUrl}
                    title={route.title}
                    price={route.price}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </div>
  )
}

