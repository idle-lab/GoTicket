import { Card } from 'antd'
import { Cascader, Typography, Flex } from 'antd'
import React, { useEffect, useState } from 'react'
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
  const filter = (inputValue, path) =>
    path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)

  return (
    <div>
      <div style={{ backgroundImage: `url(${bgImage})` }} className="w-full bg-cover bg-center">
        <div className="h-36"></div>
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
          <Card className="w-3/5 ">
            <Flex gap="large">
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
              <div className="w-56"></div>
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
            </Flex>
          </Card>
        </div>
      </div>
    </div>
  )
}

