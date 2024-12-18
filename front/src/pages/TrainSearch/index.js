import { Card } from 'antd'
import { Cascader, Typography, DatePicker, Button, Checkbox } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import React from 'react'
import dayjs from 'dayjs'

export default function TrainSearch() {
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

  return (
    <Card className="w-4/5">
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
  )
}

