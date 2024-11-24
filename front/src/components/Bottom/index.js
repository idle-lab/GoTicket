import { Col, Row } from 'antd'
import { Typography } from 'antd'
const { Text } = Typography

const Bottom = () => {
  return (
    <div className="container">
      <div className="container-box">
        <Row type="flex" justify="center" align="middle">
          <Col span={12} offset={10}>
            <Text>Copyright@GoTicket</Text>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Bottom

