import { useNavigate } from 'react-router-dom'
import { Card, AutoComplete, Typography, DatePicker, Button, message } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import dayjs from 'dayjs'
import axios from 'axios'

export default function TrainSearch({ initialValues }) {
  const [from, setFrom] = useState(initialValues?.from || '')
  const [to, setTo] = useState(initialValues?.to || '')
  const [dates, setDates] = useState(initialValues?.dates || [dayjs(), null])
  console.log(from, to, dates)
  const [options, setOptions] = useState([])

  const navigate = useNavigate() // React Router 的导航函数

  const handleSearch = async (value) => {
    if (value) {
      const result = await fetchStations(value)
      setOptions(result)
    } else {
      setOptions([])
    }
  }

  const fetchStations = async (query) => {
    const token = localStorage.getItem('token') // 从本地存储中获取 token
    if (!token) {
      message.error('Token is missing. Please log in again.')
      return []
    }

    try {
      const response = await axios.get('/station', {
        headers: {
          Authorization: `${token}`, // 添加授权头
        },
      })

      // 过滤数据并转换为 AutoComplete 的选项格式
      const stations = response.data?.data || []
      const uniquePositions = new Set()

      return stations
        .filter((station) => station.name.toLowerCase().includes(query.toLowerCase()))
        .filter((station) => {
          // 检查 position 是否已存在，如果不存在，则添加到 Set 中
          if (uniquePositions.has(station.postion)) {
            return false
          }
          uniquePositions.add(station.postion)
          return true
        })
        .map((station) => ({
          value: station.postion,
          label: `${station.postion}`,
        }))
    } catch (error) {
      console.error(error)
      message.error('Failed to fetch stations')
      return []
    }
  }

  const handleSearchTickets = async () => {
    if (!from || !to || !dates[0]) {
      message.error('Please select both stations and a departure date')
      return
    }
    console.log(from, to, dates)
    const departure_time_after = dates[0]?.format('YYYY-MM-DD HH:mm')
    const departure_time_before = dates[0]?.endOf('day').format('YYYY-MM-DD HH:mm')
    const arrival_time_after = dates[0]?.format('YYYY-MM-DD HH:mm')
    const arrival_time_before = dates[0]?.endOf('day').format('YYYY-MM-DD HH:mm')
    const token = localStorage.getItem('token')

    try {
      const response = await axios.post(
        '/oneWayTickets',
        {
          // 请求的主体数据 (JSON 格式)
          start_station: from,
          end_station: to,
          preferences: {
            departure_time_before,
            departure_time_after,
            arrival_time_before,
            arrival_time_after,
          },
        },
        {
          // 请求的配置，包括 headers 和其他参数
          headers: {
            Authorization: `${token}`, // 确保 token 的格式正确
            'Content-Type': 'application/json',
          },
        },
      )

      console.log(response.data)
      navigate('/routes', {
        state: {
          searchParams: { from, to, dates },
          searchResults: response.data?.data || [],
        },
      })
    } catch (error) {
      console.error(error)
      message.error('Failed to fetch tickets')
    }
  }

  return (
    <Card className="w-4/5">
      <div className="flex justify-between items-start gap-8">
        {/* 第一部分 */}
        <div className="flex gap-4">
          <div>
            <Typography.Title level={5}>From</Typography.Title>
            <AutoComplete
              size="large"
              value={from}
              options={options}
              onSearch={handleSearch}
              onSelect={(value) => setFrom(value)}
              onChange={(value) => setFrom(value)}
              placeholder="Please select"
              style={{ width: 200 }}
            />
          </div>
          <div>
            <Typography.Title level={5}>To</Typography.Title>
            <AutoComplete
              size="large"
              value={to}
              options={options}
              onSearch={handleSearch}
              onSelect={(value) => setTo(value)}
              onChange={(value) => setTo(value)}
              placeholder="Please select"
              style={{ width: 200 }}
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
            maxDate={dayjs().add(24, 'day')}
            allowEmpty={[false, true]}
            onChange={(dates) => setDates(dates)}
          />
          <div className="mt-4 flex justify-between items-center">
            <div></div>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              size="large"
              onClick={handleSearchTickets}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

