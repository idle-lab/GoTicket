import { useLocation } from 'react-router-dom'
import TrainSearch from '../TrainSearch'
import DateBox from './DateBox'
import FilterBox from './FilterBox'
import Routes from './Routes'
import { Row, Col } from 'antd'
export default function TrainRoute() {
  const location = useLocation()
  const { searchParams } = location.state || {} // 从路由 state 获取传递的搜索参数

  return (
    <div>
      <div
        className="w-full"
        style={{
          background: 'linear-gradient(to bottom, #3b82f6 50%, transparent 50%)',
        }}
      >
        <div className="h-14"></div>
        <div className="flex justify-center items-center">
          <TrainSearch initialValues={searchParams} />
        </div>
      </div>

      <div className="w-full">
        <div className="h-5"></div>
        <div className="flex justify-center items-center">
          <DateBox />
        </div>
      </div>

      {/* 第三部分 */}
      <div className="w-full">
        <div className="h-5"></div>
        <div className="w-4/5 mx-auto">
          {' '}
          {/* 设置 Row 的父容器居中 */}
          <Row gutter={[16, 0]}>
            {/* 左侧 Col */}
            <Col span={5}>
              <FilterBox />
            </Col>
            {/* 右侧 Col */}
            <Col span={19}>
              <Routes />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

