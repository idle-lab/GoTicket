import { Card, Typography } from 'antd'
import { RightOutlined } from '@ant-design/icons'

const { Meta } = Card

const RoutesCard = ({ pictureUrl, title, price, onArrowClick }) => (
  <Card
    style={{
      width: 300,
      overflow: 'hidden',
    }}
    cover={
      <div className="overflow-hidden">
        <img
          alt={title}
          src={pictureUrl}
          className="w-full h-full transform transition-transform duration-300 hover:scale-105"
        />
      </div>
    }
  >
    <Meta
      title={
        <Typography.Text style={{ fontSize: '18px', fontWeight: 'bold' }}>{title}</Typography.Text>
      }
      description={
        <div>
          <Typography.Text type="secondary">From</Typography.Text>
          <div>
            <Typography.Text style={{ fontSize: '18px', fontWeight: 'bold' }}>
              {' '}
              HK${price}
            </Typography.Text>
          </div>
        </div>
      }
    />
    <RightOutlined
      className="absolute bottom-4 right-4 text-gray-500 hover:text-blue-500 text-lg cursor-pointer transition-colors duration-200"
      onClick={onArrowClick}
    />
  </Card>
)

export default RoutesCard

