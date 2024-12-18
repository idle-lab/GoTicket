import React, { useState } from 'react'

import 'swiper/css'
import 'swiper/css/navigation'
import { Card, Typography, Divider, Checkbox, Button } from 'antd'

export default function FilterBox() {
  const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues)
  }
  const seatTypes = [
    { label: 'Hard seat', value: 'Hard seat' },
    { label: 'Hard sleeper', value: 'Hard sleeper' },
    { label: 'Soft sleeper', value: 'Soft sleeper' },
    { label: '2nd Class', value: '2nd Class' },
    { label: '1st Class', value: '1st Class' },
    { label: 'Business class', value: 'Business class' },
    { label: 'Standing', value: 'Standing' },
  ]

  const departureStation = [
    {
      label: 'Apple',
      value: 'Apple',
    },
    {
      label: 'Pear',
      value: 'Pear',
    },
    {
      label: 'Orange',
      value: 'Orange',
    },
  ]
  const arrivalStation = [
    {
      label: 'Apple1',
      value: 'Apple1',
    },
    {
      label: 'Pear1',
      value: 'Pear1',
    },
    {
      label: 'Orange1',
      value: 'Orange1',
    },
  ]

  const departureTime = [
    {
      label: '00:00–06:00',
      value: '00:00–06:00',
    },
    {
      label: '06:00–12:00',
      value: '06:00–12:00',
    },
    {
      label: '12:00–18:00',
      value: '12:00–18:00',
    },
    {
      label: '18:00–24:00',
      value: '18:00–24:00',
    },
  ]

  const arrivalTime = [
    {
      label: '00:00–06:00',
      value: '00:00–06:00',
    },
    {
      label: '06:00–12:00',
      value: '06:00–12:00',
    },
    {
      label: '12:00–18:00',
      value: '12:00–18:00',
    },
    {
      label: '18:00–24:00',
      value: '18:00–24:00',
    },
  ]

  const [showMore, setShowMore] = useState(false)

  const toggleShowMore = () => {
    setShowMore(!showMore)
  }

  return (
    <Card>
      <div style={{ position: 'relative' }}>
        <Typography.Title level={5}>Seat Type</Typography.Title>
        <Checkbox.Group>
          <div className="flex flex-col">
            {seatTypes.slice(0, 3).map((seat, index) => (
              <Checkbox key={seat.value} value={seat.value} className="pb-2">
                {seat.label}
              </Checkbox>
            ))}

            {showMore &&
              seatTypes.slice(3).map((seat, index) => (
                <Checkbox
                  key={seat.value}
                  value={seat.value}
                  className={index !== seatTypes.length - 1 ? 'pb-2' : ''}
                >
                  {seat.label}
                </Checkbox>
              ))}
          </div>
        </Checkbox.Group>

        <Button
          type="link"
          onClick={toggleShowMore}
          style={{
            position: 'absolute',
            bottom: '1%',
            right: '1%',
          }}
        >
          {showMore ? 'Less' : 'More'}
        </Button>
        <Divider />
      </div>

      <Typography.Title level={5}>Departure Station</Typography.Title>
      <Checkbox.Group onChange={onChange}>
        <div className="flex flex-col">
          {departureStation.map((station, index) => (
            <Checkbox
              key={station.value}
              value={station.value}
              className={index !== departureStation.length - 1 ? 'pb-2' : ''}
            >
              {station.label}
            </Checkbox>
          ))}
        </div>
      </Checkbox.Group>
      <Divider />
      <Typography.Title level={5}>Arrival Station</Typography.Title>
      <Checkbox.Group onChange={onChange}>
        <div className="flex flex-col">
          {arrivalStation.map((station, index) => (
            <Checkbox
              key={station.value}
              value={station.value}
              className={index !== arrivalStation.length - 1 ? 'pb-2' : ''}
            >
              {station.label}
            </Checkbox>
          ))}
        </div>
      </Checkbox.Group>
      <Divider />
      <Typography.Title level={5}>Departure time</Typography.Title>
      <Checkbox.Group onChange={onChange}>
        <div className="flex flex-col">
          {departureTime.map((time, index) => (
            <Checkbox
              key={time.value}
              value={time.value}
              className={index !== departureTime.length - 1 ? 'pb-2' : ''}
            >
              {time.label}
            </Checkbox>
          ))}
        </div>
      </Checkbox.Group>
      <Divider />

      <Typography.Title level={5}>Arrival time</Typography.Title>
      <Checkbox.Group onChange={onChange}>
        <div className="flex flex-col">
          {arrivalTime.map((time, index) => (
            <Checkbox
              key={time.value}
              value={time.value}
              className={index !== arrivalTime.length - 1 ? 'pb-2' : ''}
            >
              {time.label}
            </Checkbox>
          ))}
        </div>
      </Checkbox.Group>
    </Card>
  )
}

