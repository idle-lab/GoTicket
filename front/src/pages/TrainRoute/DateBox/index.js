import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Card } from 'antd'
import './styles.css'

export default function DateBox() {
  const [selectedIndex, setSelectedIndex] = useState(null)

  return (
    <Card className="w-4/5" style={{ padding: '0' }}>
      <div className="mx-auto h-11">
        <Swiper
          slidesPerView={9}
          spaceBetween={0}
          navigation={true}
          modules={[Navigation]}
          className="w-full h-full"
        >
          {[...Array(15).keys()].map((_, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center bg-white flex-col"
              onClick={() => setSelectedIndex(index)} // 更新选中的索引
            >
              <div
                className={`w-3/5 h-full cursor-pointer rounded-md ${
                  selectedIndex === index ? 'bg-blue-500 text-white' : 'hover:bg-blue-200'
                }`}
              >
                <div>Sat</div>
                <div className="font-bold">Dec {14 + index}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Card>
  )
}

