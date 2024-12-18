import { Typography, Button } from 'antd'
import React, { useState } from 'react'
import { Col, Row } from 'antd'
import RoutesCard from './RoutesCard'

export default function HotRoutes() {
  const routesData = {
    Shanghai: [
      {
        pictureUrl: 'https://s3.bmp.ovh/imgs/2024/12/13/cf2147da77136f3b.jpg',
        title: 'Hangzhou to Shanghai',
        price: '100',
      },
      {
        pictureUrl: 'https://s3.bmp.ovh/imgs/2024/12/13/df3f6997b897c4f2.jpg',
        title: 'Beijing to Shanghai',
        price: '120',
      },
      {
        pictureUrl: 'https://s3.bmp.ovh/imgs/2024/12/13/cf2147da77136f3b.jpg',
        title: 'Nanjing to Shanghai',
        price: '100',
      },
      {
        pictureUrl: 'https://s3.bmp.ovh/imgs/2024/12/13/df3f6997b897c4f2.jpg',
        title: 'Suzhou to Shanghai',
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
        title: 'Tianjin to Beijing',
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
    Shenzhen: [
      {
        pictureUrl: 'https://s3.bmp.ovh/imgs/2024/12/13/cf2147da77136f3b.jpg',
        title: 'HK West Kowloon to Shenzhen',
        price: '100',
      },
      {
        pictureUrl: 'https://s3.bmp.ovh/imgs/2024/12/13/df3f6997b897c4f2.jpg',
        title: 'Guangzhou to Shenzhen',
        price: '120',
      },
      {
        pictureUrl: 'https://s3.bmp.ovh/imgs/2024/12/13/8151d40a6077a8ed.jpg',
        title: 'Xiamen to Shenzhen',
        price: '150',
      },
      {
        pictureUrl: 'https://s3.bmp.ovh/imgs/2024/12/13/96158b08bb17c91b.jpg',
        title: 'Guilin to Shenzhen',
        price: '200',
      },
    ],
    Guangzhou: [
      {
        pictureUrl: 'https://s3.bmp.ovh/imgs/2024/12/13/cf2147da77136f3b.jpg',
        title: 'HK West Kowloon to Guangzhou',
        price: '100',
      },
      {
        pictureUrl: 'https://s3.bmp.ovh/imgs/2024/12/13/df3f6997b897c4f2.jpg',
        title: 'Shenzhen to Guangzhou',
        price: '120',
      },
      {
        pictureUrl: 'https://s3.bmp.ovh/imgs/2024/12/13/8151d40a6077a8ed.jpg',
        title: 'Zhuhai to Guangzhou',
        price: '150',
      },
      {
        pictureUrl: 'https://s3.bmp.ovh/imgs/2024/12/13/96158b08bb17c91b.jpg',
        title: 'Shanghai to Guangzhou',
        price: '200',
      },
    ],
  }

  const [selectedCity, setSelectedCity] = useState('Shanghai')

  const handleCityChange = (city) => {
    setSelectedCity(city)
  }
  return (
    <div>
      <div className="flex justify-center mt-11">
        <div className="pb-8 font-bold w-4/5 ">
          <Typography.Title level={1}>China Train and High-speed Train Routes</Typography.Title>
          <div className="flex mt-6 mb-6 space-x-2 items-center">
            Trains to &nbsp;
            {Object.keys(routesData).map((city) => (
              <Button
                key={city}
                style={{
                  backgroundColor: selectedCity === city ? '#0f294d' : '#f0f2f5',
                  color: selectedCity === city ? '#ffffff' : '#000000',
                  borderColor: selectedCity === city ? '#0f294d' : '#f0f2f5',
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
                <RoutesCard pictureUrl={route.pictureUrl} title={route.title} price={route.price} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  )
}

