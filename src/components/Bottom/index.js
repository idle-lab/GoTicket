import { Col, Row } from 'antd'
import './index.css'
import { AudioOutlined } from '@ant-design/icons'
import { Input, Typography } from 'antd'
import { Divider } from 'antd'
const { Search } = Input
const { Text } = Typography

const onSearch = (value, _e, info) => console.log(info?.source, value)

const Bottom = () => {
  return (
    <div className="container">
      <div className="container-box">
        <Row>
          <Col span={4}>
            <div className="logo">GoTicket</div>
          </Col>
          <Col span={4}>
            <Text>Copyright@GoTicket</Text>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Bottom

